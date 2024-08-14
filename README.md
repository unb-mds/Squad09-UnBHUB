[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![Stars](https://img.shields.io/github/stars/unb-mds/Squad09-UnBHUB)
[![GitHub contributors](https://img.shields.io/github/contributors/unb-mds/Squad09-UnBHUB)](https://img.shields.io/github/contributors/unb-mds/Squad09-UnBHUB)
![Stars](https://img.shields.io/github/issues/unb-mds/Squad09-UnBHUB.svg)
![]((https://img.shields.io/github/issues/unb-mds/Squad09-UnBHUB))
![](https://img.shields.io/github/issues-closed/unb-mds/Squad09-UnBHUB.svg)

## UNBHUB - Squad 09
![UnbHub](./documentation/mkdocs/docs/assets/Logo_UNBHUB.jpg)

Projeto da disciplina Métodos de Desenvolvimento de Software cujo intuito é auxiliar os alunos da Faculdade do Gama na organização de suas atividades acadêmicas. A página permite ao usuário registrar sua grade e informações específicas de cada matéria, como datas das provas e notas dos trabalhos, ajudando-os a se manterem em dia com cada matéria.

## 💻 Tecnologias 

- 💾 **Banco de Dados:**  ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)
- 🎨 **Prototipação:**  ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)  
- 📋 **Linguagens:**  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- 🖼️ **Framework Web:**  ![ReactJs](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)

## 🗃️ Documentação
Para acessar a página web da nossa documentação [Clique aqui](https://unb-mds.github.io/Squad09-UnBHUB/)

### StoryMap
[![Miro](https://img.shields.io/badge/Miro-F7C922?style=for-the-badge&logo=Miro&logoColor=050036)](https://miro.com/app/board/uXjVKQTq3Zw=/)

## 🎬 Execução

### Pré-Requisitos
- [**Yarn:** >= v1.22.22](https://classic.yarnpkg.com/lang/en/docs/install/)
- [**NodeJs:** >= v20.16.0](https://nodejs.org/en/download/package-manager)
- [**FireBase**](https://firebase.google.com/)

### Configuração do Firebase
#### Criar Novo projeto
1. Logue-se no [Fire Base](https://firebase.google.com/) com o seu email
2. Clique em **Go to console** no header da página para entrar na página de desenvolvimento
3. Crie um novo projeto clicando em **+ Criar Projeto**
- **Obs:** O uso do Google Analytics fica a critério de quem quiser rodar o projeto não sendo necessário para a sua execução

#### Autenticação
1. Dentro da página do projeto navegue até **Criação > Authentication**
2. Clique no botão **Vamos começar**
3. Em **Authentication > Métodos de login** selecione a opção "E-mail/senha" da aba de Provedores nativos
4. Ative o serviço de **E-mail/senha**
- **Obs:** Não precisa ativar o serviço de "Link do e-mail(login sem senha)"

#### Banco de Dados
1. Dentro da página do projeto navegue até **Criação > Firestore Database**
2. Clique no botão **Criar banco de dados**
3. Mude o local do servidor para **southamerica-east1 (São Paulo)** ou para outra região de sua preferência
4. Inicie o banco de dados na opção **modo de teste**

####  Armazenamento de Fotos
1. Dentro da página do projeto navegue até **Criação > Storage**
2. Clique em **Começar**
3. Inicie o armazenamento na opção **modo de teste**

#### Aplicativo
1. Dentro da página do projeto navegue até **Configuracoes do projeto > Geral** que pode ser acessada pela engrenagem no canto superior esquerdo da sidebar
2. Abaixo de "Seus aplicativos" clique no icone **</>** (aplicativo web)
3. De um nome ao seu aplicativo
4. Marque a opção **Usar o npm**
- **Obs:** A opção de hosting fica a critério de quem quiser rodar o projeto

### Como Rodar o projeto

> Clone o Repositório do projeto
```bash
git clone https://github.com/unb-mds/Squad09-UnBHUB.git
```
> Navegue para a pasta do projeto e baixe as dependências com o seguinte comando
```bash
yarn
```
> Cadastre os dados do seu aplicativo do FireBase criando um arquivo `.env` preenchendo-o com as seguintes infomações
```bash
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
```
**Obs:** Os dados do cadastro estão localizados em **Configuracoes do projeto > Geral** na página do projeto do Firebase, devendo ser preenchidos sem as aspas nos seus respectivos campos do arquivo .env 

> Execute o projeto em local host com o seguinte comando
```bash
yarn run dev
```
Por fim o projeto pode ser acessado em http://localhost:5173/

## 👥 Desenvolvedores

<center>
<table style="margin-left: auto; margin-right: auto;">
    <tr>
        <td align="center">
            <a href="https://github.com/luccameds">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/63163895?v=4" width="150px;"/>
                <h5 class="text-center">Lucca M. Silva</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/G0ndim">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/118084068?v=4" width="150px;"/>
                <h5 class="text-center">Pedro F. Gondim</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/antonioscarvalho">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/135462889?v=4" width="150px;"/>
                <h5 class="text-center">Antonio A. de S. Carvalho </h5>
            </a>
        </td>
        </td>
        <td align="center">
            <a href="https://github.com/CristianoMoraiss">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/164538943?v=4)" width="150px;"/>
                <h5 class="text-center">Cristiano B. de Morais</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/TulioCeleri">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/122989234?v=4" width="150px;"/>
                <h5 class="text-center">Túlio A. Celeri</h5>
            </a>
        </td>
          <td align="center">
            <a href="https://github.com/anawcarol">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/122827734?v=4" width="150px;"/>
                <h5 class="text-center">Ana Carolina M. Fialho</h5>
            </a>
        </td>
          <td align="center">
            <a href="https://github.com/FelipeRibeirooo">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/143733331?v=4" width="150px;"/>
                <h5 class="text-center">Felipe R. de O. França </h5>
            </a>
        </td>
</table>
</center>
