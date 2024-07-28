import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, firestore

# descomente as linha a baixo para desativar os logs do firebase
# import os
# os.environ['GRPC_VERBOSITY'] = 'ERROR'


class UrlHandler:
    def __init__(self, url, keyword, base_url, cred_path):
        super().__init__()
        self.url = url
        self.keyword = keyword
        self.base_url = base_url
        self.cred_path = cred_path
        self.addresses = []
        self.html_content = ''

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

    def save_to_firestore(self):
        # Initialize Firestore DB
        cred = credentials.Certificate(self.cred_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()

        # Reference to the specific document in the APIs collection
        doc_ref = db.collection('APIs').document('RU')

        # Get the current data from Firestore
        doc = doc_ref.get()
        existing_data = doc.to_dict() if doc.exists else {}

        # Update the document with the new addresses, avoiding duplicates
        new_data = {}
        for item in self.addresses:
            for text, url in item.items():
                if text not in existing_data:
                    new_data[text] = url

        if new_data:
            doc_ref.set(new_data, merge=True)
            print('Document updated with new data:', new_data)
        else:
            print('No new data to add.')


if __name__ == '__main__':

    credenciais_firebase = ''   # coloque o caminho para o seu arquivo de credenciais JSON.
    url_pagina = 'https://ru.unb.br/index.php/cardapio-refeitorio'
    palavra_chave = 'Gama'
    url_base = 'https://ru.unb.br'

    api_ru = UrlHandler(
        url_pagina,
        palavra_chave,
        url_base,
        credenciais_firebase
    )

    api_ru.html_request()
    api_ru.anchor_finder()
    api_ru.save_to_firestore()
