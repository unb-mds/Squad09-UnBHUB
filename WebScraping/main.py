from MyLibs.calendar_class import Calendar
from MyLibs.menu_class import Cardapio
import firebase_admin
from firebase_admin import credentials, firestore
from time import sleep


def clear_terminal():
    from subprocess import run
    from platform import system, release
    if system() == "Windows":
        if release() in {"10", "11"}:
            run("", shell=True)
            print("\033c", end="")
        else:
            run(["cls"])
    else:  # Linux e Mac
        print("\033c", end="")


def hide_fb_log():
    import os
    os.environ['GRPC_VERBOSITY'] = 'ERROR'


if __name__ == "__main__":
    hide_fb_log()  # comente essa linha para habilitar os logs do fire base

    credenciais_firebase = ''  # localização do json com as credenciais do firebase

    cred = credentials.Certificate(credenciais_firebase)
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    url_saa_unb = 'https://www.saa.unb.br/graduacao/calendario-academico#calendario-por-atividades'
    chave_de_busca_calendario = 'Atividades'
    url_base_saa_unb = 'https://www.saa.unb.br'

    url_ru_unb = 'https://ru.unb.br/index.php/cardapio-refeitorio'
    chave_de_busca_cardapio = 'Gama'
    url_base_ru_unb = 'https://ru.unb.br'

    while True:
        flag = False
        clear_terminal()

        calendar_webscraper = Calendar(
            url_saa_unb,
            chave_de_busca_calendario,
            url_base_saa_unb,
            db
        )

        ru_webscraper = Cardapio(
            url_ru_unb,
            chave_de_busca_cardapio,
            url_base_ru_unb,
            db
        )

        print(f"{'=-=' * 16}")
        print(f"{'UnbHub Web Scraper':^48}".upper())
        print(f"{'=-=' * 16}")
        print(f"{'Escolha uma das opções':^48}")
        print("\033[36m1. \033[0mCardápio do Restaurante Universitário da UNB\n"
              "\033[36m2. \033[0mCalendário acadêmico de Atividades UNB")
        print(f"{'---' * 16}")

        match input("Qual opção você deseja selecionar?\033[36m(1/2)\033[0m: "):
            case "1":
                clear_terminal()
                print(f"{'=-=' * 16}")
                print(f"{'Web Scraping RU UNB':^48}".upper())
                print(f"{'=-=' * 16}")

                flag = True
                print('\033[36m-->\033[0m', end=' ')
                ru_webscraper.html_request()
                print('\033[36m-->\033[0m', end=' ')
                ru_webscraper.anchor_finder()
                print('\033[36m-->\033[0m', end=' ')
                ru_webscraper.save_to_firestore()
                print(f"{'---' * 16}")

            case "2":
                clear_terminal()
                print(f"{'=-=' * 16}")
                print(f"{'Web Scraping Calendário SAA UNB':^48}".upper())
                print(f"{'=-=' * 16}")

                flag = True
                print('\033[36m-->\033[0m', end=' ')
                calendar_webscraper.html_request()
                print('\033[36m-->\033[0m', end=' ')
                calendar_webscraper.anchor_finder()
                print('\033[36m-->\033[0m', end=' ')
                text, url = calendar_webscraper.find_closest_date()

                if text and url:
                    pdf_filename = 'calendario.pdf'
                    print('\033[36m-->\033[0m', end=' ')
                    calendar_webscraper.download_pdf(url, pdf_filename)
                    pdf_text = calendar_webscraper.extract_text_from_pdf(pdf_filename)
                    data = {
                        'text': text,
                        'url': url,
                        'content': pdf_text,
                    }
                    formatted_data = calendar_webscraper.format_calendar_data(data)
                    print('\033[36m-->\033[0m', end=' ')
                    calendar_webscraper.save_data_to_json(formatted_data, 'calendario.json')
                    print('\033[36m-->\033[0m', end=' ')
                    calendar_webscraper.upload_to_firestore(formatted_data)
                    calendar_webscraper.clean_up_files('calendario.pdf', 'calendario.json', debug=False)

            case _:
                print("\033[31mOpção inválida!\033[0m")
                sleep(2)

        if flag:
            if input("Deseja continuar?\033[36m(s/n)\033[0m: ") not in 'Ss':
                break

        clear_terminal()
