import requests
from bs4 import BeautifulSoup


class Cardapio:
    def __init__(self, url, keyword, base_url, db):
        self.url = url
        self.keyword = keyword
        self.base_url = base_url
        self.db = db
        self.addresses = []
        self.html_content = ''

    def html_request(self):
        response = requests.get(self.url)
        if response.status_code == 200:
            self.html_content = response.text
            print('Página HTML baixada com sucesso.')
        else:
            print(f'Falha ao baixar a página. Status code: {response.status_code}')

    def anchor_finder(self):
        soup = BeautifulSoup(self.html_content, 'html.parser')
        anchors = soup.find_all('a', href=lambda href: href and self.keyword in href)

        if anchors:
            self.addresses = [{anchor.get_text(strip=True): self.base_url + anchor['href']} for anchor in anchors]
            print('Endereços encontrados:')
            for address in self.addresses:
                for text, url in address.items():
                    print(f"Texto: {text}, URL: {url}")
        else:
            print(f'Nenhuma âncora com "{self.keyword}" no href foi encontrada.')

    def save_to_firestore(self):
        # Reference to the specific document in the APIs collection
        doc_ref = self.db.collection('APIs').document('RU')

        # Get the current data from Firestore
        doc = doc_ref.get()
        existing_data = doc.to_dict() if doc.exists else {}

        # Update the document with the new addresses, avoiding duplicates
        new_data = {}
        for item in self.addresses:
            for text, url in item.items():
                if text and url and text not in existing_data:
                    new_data[text] = url

        if new_data:
            doc_ref.set(new_data, merge=True)
            print('Documento atualizado com novos dados:', new_data)
        else:
            print('Nenhum dado novo para adicionar.')
