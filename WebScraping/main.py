from MyLibs.calendar_class import Calendar
from MyLibs.menu_class import Cardapio
import firebase_admin
from firebase_admin import credentials, firestore


if __name__ == "__main__":
    credenciais_firebase = '' # localização do json com as credenciais do firebase

    # Initialize Firebase
    cred = credentials.Certificate(credenciais_firebase)
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    url_saa_unb = 'https://www.saa.unb.br/graduacao/calendario-academico#calendario-por-atividades'
    chave_calendario = 'Atividades'
    url_base_saa_unb = 'https://www.saa.unb.br'

    calendar_webscraper = Calendar(
        url_saa_unb,
        chave_calendario,
        url_base_saa_unb,
        db
    )

    url_ru_unb = 'https://ru.unb.br/index.php/cardapio-refeitorio'
    chave_cardapio = 'Gama'
    url_base_ru_unb = 'https://ru.unb.br'

    ru_webscraper = Cardapio(
        url_ru_unb,
        chave_cardapio,
        url_base_ru_unb,
        db
    )

    while True:
        print("1. Cardápio do Restaurante Universitário da UNB\n"
              "2. Calendário acadêmico de Atividades UNB")

        match input("Qual opção você deseja selecionar?(1/2): "):
            case "1":
                ru_webscraper.html_request()
                ru_webscraper.anchor_finder()
                ru_webscraper.save_to_firestore()

            case "2":
                calendar_webscraper.html_request()
                calendar_webscraper.anchor_finder()
                text, url = calendar_webscraper.find_closest_date()

                if text and url:
                    pdf_filename = 'calendario.pdf'
                    calendar_webscraper.download_pdf(url, pdf_filename)
                    pdf_text = calendar_webscraper.extract_text_from_pdf(pdf_filename)
                    data = {
                        'text': text,
                        'url': url,
                        'content': pdf_text,
                        'calendar': {}
                    }
                    formatted_data = calendar_webscraper.format_calendar_data(data)
                    calendar_webscraper.save_data_to_json(formatted_data, 'calendario.json')
                    calendar_webscraper.upload_to_firestore(formatted_data)
                    calendar_webscraper.clean_up_files('calendario.pdf', 'calendario.json')

            case _:
                print("Opção inválida")
