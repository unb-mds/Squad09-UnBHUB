import pdfplumber
import json
import os
import requests


def download_pdf(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as file:
            file.write(response.content)
        print(f'PDF baixado e salvo como {filename}')
    else:
        print(f'\033[31mFalha ao baixar o PDF. Status code: {response.status_code}\033[0m')


def extract_text_from_pdf(pdf_path):
    text = ''
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + '\n'
    return text


def save_data_to_json(data, json_path):
    with open(json_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
    print(f'Dados salvos em {json_path}.')


def clean_up_files(*filenames, debug=True):
    for filename in filenames:
        if os.path.exists(filename):
            os.remove(filename)
            if debug:
                print('\033[36m-->\033[0m', end=' ')
                print(f'Arquivo {filename} removido com sucesso')


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
    os.environ['GRPC_VERBOSITY'] = 'ERROR'
