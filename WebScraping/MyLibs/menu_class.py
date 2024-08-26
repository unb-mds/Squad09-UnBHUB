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

    def save_to_firestore(self):
        # Referência ao documento específico na coleção APIs
        doc_ref = self.db.collection('APIs').document('RU')

        # Obtém os dados atuais do Firestore
        doc = doc_ref.get()
        existing_data = doc.to_dict() if doc.exists else {}

        # Inicializa ou atualiza o dicionário associado à keyword
        if self.keyword not in existing_data:
            existing_data[self.keyword] = {}

        # Atualiza o dicionário com novos endereços, evitando duplicatas
        new_data = {}
        for item in self.addresses:
            for text, url in item.items():
                if text and url and text not in existing_data[self.keyword]:
                    new_data[text] = url

        # Atualiza o Firestore se houver novos dados
        if new_data:
            existing_data[self.keyword].update(new_data)
            doc_ref.set(existing_data, merge=True)
            print('\033[32mDocumento atualizado com novos dados: \033[0m', new_data)
        else:
            print('\033[31mNenhum dado novo para adicionar no Banco de Dados\033[0m')
