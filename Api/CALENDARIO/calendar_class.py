import requests
from bs4 import BeautifulSoup
from datetime import datetime
import pdfplumber
import json
import os
import re
from typing import List, Dict, Any
import firebase_admin
from firebase_admin import credentials, firestore


class UrlHandler:
    def __init__(self, url, keyword, base_url, credentials_path):
        self.url = url
        self.keyword = keyword
        self.base_url = base_url
        self.credentials_path = credentials_path
        self.addresses = []
        self.html_content = ''
        self.closest_date_text = None
        self.closest_date_url = None
        self.db = None

        self.initialize_firestore()

    def initialize_firestore(self):
        cred = credentials.Certificate(self.credentials_path)
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def html_request(self):
        response = requests.get(self.url)
        if response.status_code == 200:
            self.html_content = response.text

            with open('pagina_baixada.html', 'w', encoding='utf-8') as file:
                file.write(self.html_content)

            print('Arquivo HTML baixado e salvo com sucesso.')
        else:
            print(f'Falha ao baixar a página. Status code: {response.status_code}')

    def anchor_finder(self):
        soup = BeautifulSoup(self.html_content, 'html.parser')
        anchors = soup.find_all('a', href=lambda href: href and self.keyword in href)

        if anchors:
            self.addresses = [{anchor.get_text(): self.base_url + anchor['href']} for anchor in anchors]

            print('Endereços encontrados:')
            for address in self.addresses:
                for text, url in address.items():
                    print(f"Texto: {text}, URL: {url}")
        else:
            print(f'Nenhuma âncora com "{self.keyword}" no href foi encontrada.')

    def find_closest_date(self):
        current_date = datetime.now()
        closest_date = None
        closest_text = None
        closest_url = None

        for address in self.addresses:
            for text, url in address.items():
                try:
                    date_str = text.split('(')[-1].split(')')[0]
                    date_obj = datetime.strptime(date_str, '%d/%m/%Y')

                    if closest_date is None or abs((date_obj - current_date).days) < abs((closest_date - current_date).days):
                        closest_date = date_obj
                        closest_text = text
                        closest_url = url
                except ValueError:
                    continue

        if closest_text and closest_url:
            self.closest_date_text = closest_text
            self.closest_date_url = closest_url
            print('Endereço com a data mais próxima:')
            print(f"Texto: {closest_text}, URL: {closest_url}")
            return closest_text, closest_url
        else:
            print('Nenhuma data válida encontrada nos textos.')
            return None, None

    def download_pdf(self, url, filename):
        response = requests.get(url)
        if response.status_code == 200:
            with open(filename, 'wb') as file:
                file.write(response.content)
            print(f'PDF baixado e salvo como {filename}.')
        else:
            print(f'Falha ao baixar o PDF. Status code: {response.status_code}')

    def extract_text_from_pdf(self, pdf_path):
        text = ''
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + '\n'
        return text

    def save_data_to_json(self, data, json_path):
        with open(json_path, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)
        print(f'Dados salvos em {json_path}.')

    def upload_to_firestore(self, data):
        doc_ref = self.db.collection('APIs').document('Calendar')
        doc = doc_ref.get()

        if doc.exists:
            existing_data = doc.to_dict()
            if existing_data.get('title') == data.get('title'):
                print("O título do novo dado é o mesmo do existente. Nenhuma atualização necessária.")
                return

        doc_ref.set(data)
        print("Dados enviados para o Firestore com sucesso.")

    def format_calendar_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        def find_dates(text: str) -> List[str]:
            date_pattern = r'\b\d{2}/\d{2}(?:/\d{4})?\b'
            return re.findall(date_pattern, text)

        def split_by_dates(text: str) -> List[str]:
            dates = find_dates(text)
            if not dates:
                return [text]

            parts = []
            last_pos = 0
            for match in re.finditer(r'(\b\d{2}/\d{2}(?:/\d{4})?\b)', text):
                start, end = match.span()
                if start > last_pos:
                    parts.append(text[last_pos:start].strip())
                parts.append(text[start:end].strip())
                last_pos = end
            if last_pos < len(text):
                parts.append(text[last_pos:].strip())
            return parts

        def parse_event_sections(text: str) -> List[Dict[str, str]]:
            start_index = text.find("REVALIDAÇÃO DE DIPLOMAS")
            if start_index != -1:
                text = text[start_index:]
            else:
                print("Cabeçalho 'REVALIDAÇÃO DE DIPLOMAS' não encontrado. Processando todo o texto.")

            parts = split_by_dates(text)
            events = []

            current_event = {"event": "", "description": ""}

            for part in parts:
                if re.match(r'\b\d{2}/\d{2}(?:/\d{4})?\b', part):
                    if current_event["event"]:
                        events.append(current_event)
                    current_event = {"event": part, "description": ""}
                else:
                    current_event["description"] = part.split('\n')[0]

            if current_event["event"]:
                events.append(current_event)

            return events

        def modify_calendar_details(events):
            i = 0
            while i < len(events):
                current = events[i]
                if current["description"] == "a":
                    if i + 1 < len(events):
                        next_event = events[i + 1]
                        current["event"] = f"{current['event']} a {next_event['event']}"
                        current["description"] = next_event["description"]
                        events.pop(i + 1)
                i += 1
            return events

        parsed_events = parse_event_sections(data["content"])
        modified_events = modify_calendar_details(parsed_events)

        formatted_data = {
            "title": self.closest_date_text if self.closest_date_text else "Texto nao encontrado",
            "url": self.closest_date_url if self.closest_date_url else "Url nao encontrada",
            "content": modified_events,
        }
        return formatted_data

    def clean_up_files(self, *filenames):
        for filename in filenames:
            if os.path.exists(filename):
                os.remove(filename)
                print(f'Arquivo {filename} removido com sucesso.')


if __name__ == '__main__':
    url_pagina = 'https://www.saa.unb.br/graduacao/calendario-academico#calendario-por-atividades'
    palavra_chave = 'Atividades'
    url_base = 'https://www.saa.unb.br'
    caminho_credenciais = 'caminho/para/sua/chave.json'

    api_calendar = UrlHandler(
        url_pagina,
        palavra_chave,
        url_base,
        caminho_credenciais
    )

    api_calendar.html_request()
    api_calendar.anchor_finder()
    text, url = api_calendar.find_closest_date()

    if text and url:
        pdf_filename = 'calendario.pdf'
        api_calendar.download_pdf(url, pdf_filename)
        pdf_text = api_calendar.extract_text_from_pdf(pdf_filename)
        data = {
            'text': text,
            'url': url,
            'content': pdf_text,
            'calendar': {}
        }
        formatted_data = api_calendar.format_calendar_data(data)
        api_calendar.save_data_to_json(formatted_data, 'calendario.json')
        api_calendar.upload_to_firestore(formatted_data)
        api_calendar.clean_up_files('calendario.pdf', 'calendario.json', 'pagina_baixada.html')
