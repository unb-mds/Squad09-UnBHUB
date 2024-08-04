## Dependências

Para rodar o projeto, você precisará das seguintes dependências:

- **FireBase**: Projeto gratuito
- **Python3**: v3.10.12
- **Pip**: v24.1.2

## Bibliotecas

- **Requests**: v2.32.2
- **Beautiful Soup**: v4.12.3
- **Pdf Plumber**: v0.11.2
- **FireBase Admin**: v6.5.0

Para instalar as bibliotecas do projeto execute o seguinte comando:

```
pip install -r requirements.txt
```

## Fire Base
Para linkar o seu projeto do FireBase com o web scraper basta seguir as seguintes etapas:
-  Acesse **Configurações do projeto > Contas de serviço**
-  Baixe o json com as credenciais clicando em **Gerar nova chave privada**
-  Mova o documento baixado para a mesma pasta que contem o arquivo "main.py"
-  Dentro do arquivo main altere a string da variavel "credenciais_firebase" para a localização do seu json. Ex: credenciais_firebase = './chave_exemplo.json' 

## Execução

Para executar o projeto utilize o seguinte comando:

```
python3 main.py
```
Após a sua execução é aberto um prompt dentro do terminal que pode ser interagido digitando:
- **"1"**: Atualiza as informações do cardápio do Restaurante Universitário da UNB a partir dos dados retirados pelo web scraping
- **"2"**: Atualiza as informações do Calendário acadêmico de Atividades UNB a partir dos dados retirados pelo web scraping
