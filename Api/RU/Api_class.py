import requests
from bs4 import BeautifulSoup


class UrlHandler:
    def __init__(self, url, keyword, base_url):
        super().__init__()
        self.url = url
        self.keyword = keyword
        self.base_url = base_url
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


if __name__ == '__main__':
    api_ru = UrlHandler(
        'https://ru.unb.br/index.php/cardapio-refeitorio',
        'Gama',
        'https://ru.unb.br'
    )

    api_ru.html_request()
    api_ru.anchor_finder()
