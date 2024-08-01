import requests
from bs4 import BeautifulSoup
from datetime import datetime
import re
from typing import List, Dict, Any


class Calendar:
    def __init__(self, calendar_url, keyword, base_url, db):
        self.url = calendar_url
        self.keyword = keyword
        self.base_url = base_url
        self.db = db
        self.addresses = []
        self.html_content = None
        self.closest_date_text = None
        self.closest_date_url = None

    def html_request(self):
        response = requests.get(self.url)
        if response.status_code == 200:
            self.html_content = response.text
            print('Página HTML baixada com sucesso')
        else:
            print(f'\033[31mFalha ao baixar a página. Status code: {response.status_code}\033[0m')

    def anchor_finder(self):
        soup = BeautifulSoup(self.html_content, 'html.parser')
        anchors = soup.find_all('a', href=lambda href: href and self.keyword in href)

        if anchors:
            for anchor in anchors:
                text = anchor.get_text(strip=True)
                if text:  # Verifica se o texto não é uma string vazia
                    self.addresses.append({text: self.base_url + anchor['href']})
            print('Endereço(s) encontrado(s):')
            for address in self.addresses:
                for text, url in address.items():
                    print(f"    \033[1m{text}\033[0m : {url}")
        else:
            print(f'\033[31mNenhuma âncora com "{self.keyword}" no href foi encontrada\033[0m')

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
            print(f"    \033[1m{closest_text}\033[0m : {closest_url}")
            return closest_text, closest_url
        else:
            print('\033[31mNenhuma data válida encontrada nos textos\033[0m')
            return None, None

    def upload_to_firestore(self, data):
        doc_ref = self.db.collection('APIs').document('Calendar')
        doc = doc_ref.get()

        if doc.exists:
            existing_data = doc.to_dict()
            if existing_data.get('title') == data.get('title'):
                print("\033[31mO título do calendário é o mesmo do já existente. "
                      "Nenhuma atualização feita no Firestore\033[0m")
                return

        doc_ref.set(data)
        print("\033[32mNovos dados enviados para o Firestore com sucesso\033[0m")

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
            entry_point = "REVALIDAÇÃO DE DIPLOMAS"  # Texto usado como entry point para a busca das datas
            start_index = text.find(entry_point)
            if start_index != -1:
                text = text[start_index:]
            else:
                print(f"\033[31mCabeçalho '{entry_point}' não encontrado\033[0m")
                return []

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
