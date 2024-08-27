# Tabela de Requisitos Funcionais

| ID   | Alvo   | Funcionalidade          | Requisito                             | Prioridade | Status  |
|------|--------|-------------------------|---------------------------------------|------------|---------|
| #U1  | User   | Criar uma conta         | Salvar Cadastro de login              | Alta       | Done    |
| #U2  | User   | Logar no site           | Acessar lista de cadastros de login  | Alta       | Done    |
| #AU1 | Admin & User | Remover conta     | Remover cadastro de login            | Alta       | Done    |
| #U3  | User   | Editar conta            | Mudar parâmetros do cadastro de login| Alta       | Done    |
| #U4  | User   | Acessar Matérias        | Acessar lista de matérias cadastradas| Alta       | Done    |
| #U5  | User   | Cadastrar Matérias      | Salvar o cadastro de matéria         | Alta       | Done    |
| #U6  | User   | Editar Matérias         | Mudar parâmetros da matéria cadastrada| Alta       | Done    |
| #U7  | User   | Remover Matérias        | Remover da lista de matérias         | Alta       | Done    |
| #U8  | User   | Cadastrar provas        | Salvar no cadastro de provas         | Alta       | Done    |
| #U9  | User   | Acessar provas          | Acessar lista de provas cadastradas  | Alta       | Done    |
| #U10 | User   | Editar provas           | Mudar parâmetros da prova cadastrada | Alta       | Done    |
| #U11 | User   | Remover Provas          | Remover da lista de provas           | Alta       | Done    |
| #U12 | User   | Cadastrar tarefas       | Salvar no cadastro de tarefas        | Alta       | Done    |
| #U13 | User   | Acessar tarefas         | Acessar lista de tarefas cadastradas | Alta       | Done    |
| #U14 | User   | Editar tarefas          | Mudar parâmetros da tarefa cadastrada| Alta       | Done    |
| #U15 | User   | Remover tarefas         | Remover da lista de tarefas          | Alta       | Done    |
| #U16 | User   | Cadastrar livro         | Salvar no cadastro de livros         | Média      | Done    |
| #U17 | User   | Acessar livros          | Acessar lista de livros cadastrados  | Média      | Done    |
| #U18 | User   | Editar livros           | Mudar parâmetros do livro cadastrado | Média      | Done    |
| #U19 | User   | Remover livro           | Remover da lista de livros           | Média      | Done    |
| #U20 | User   | Visualizar Calendário Acadêmico | Acessar calendário da “SAA Unb” | Média      | Done    |
| #U21 | User   | Visualizar Cardápio Semanal do RU | Acessar  cardápio do “RU Unb” | Média      | Done    |
| #S1  | System | Notificar sobre prova   | Acessar cadastro dos parâmetros das provas| Média      | Done    |
| #S2  | System | Notificar sobre livro   | Acessar cadastro dos parâmetros dos livros| Média      | Done    |
| #S3  | System | Notificar sobre tarefa  | Acessar cadastro dos parâmetros das tarefas| Média      | Done    |
| #U22 | User   | Pedir cadastro de evento| Notificar Admin                      | Baixa      | Waiting |
| #A1  | Admin  | Cadastrar Evento        | Salvar cadastro de evento            | Baixa      | Waiting |
| #A2  | Admin  | Remover Evento          | Remover cadastro de evento           | Baixa      | Waiting |

ESCOPO MÍNIMO DO MVP1: #U1, #U2, #AU1, #U3, #U4, #U5, #U6, #U7, #U8, #U9, #U10, #U11, #U12, #U13, #U14, #U15.


# Requisitos das Páginas

## Home
- Início ✅
- Funcionalidades ✅
- Sobre Nós ✅
- Acessar a página de SignIn ✅
- Acessar a página de SignUp ✅

## SignIn
- Entrar no DashBoard com email e senha ✅
- Recuperar senha ❌
- Entrar no DashBoard com Google  ♻️ 
- Acessar página do SignUp ("Não possui uma conta") ✅
- Voltar para a página Inicial ✅

## SignUp
- Cadastrar email ✅
- Cadastrar senha ✅
- Cadastrar nome de usuário ✅
- Acessar página de SignIn ("Já possui uma conta") ✅

## DashBoard
- Ver matérias em andamento ✅
- Ver provas não finalizadas ✅
- Ver tarefas não finalizadas ✅
- Acessar página das Matérias ✅
- Acessar página das Provas ✅
- Acessar página das Tarefas ✅
- Acessar o Cárdapio semanal do RU ✅
- Acessar o Calendário Acadêmico da SAA ✅
- Acessar a Grade Horária Semanal ✅
- Acessar página de livros emprestados da Biblioteca ✅
- Acessar página de eventos ✅

## Matérias
- Ver matérias em andamento ✅
- Ver matérias finalizadas ✅
- Editar parâmetros das matérias ✅
- Adicionar matérias ✅
- Finalizar matérias ✅
- Trancar (Remover) matérias ✅
- Acessar matéria específica ✅

## Matéria Específica
- Editar parâmetros da matéria ✅
- Ver provas dessa matéria ✅
- Adicionar provas para essa matéria ✅
- Editar provas dessa matéria ✅
- Remover provas dessa matéria ✅
- Ver tarefas dessa matéria ✅
- Editar tarefas dessa matéria ♻️
- Adicionar tarefas para essa matéria ♻️
- Remover tarefas dessa matéria ♻️

## Tarefas
- Ver tarefas concluidas ✅
- Ver tarefas em progresso ✅
- Ver tarefas atrasadas ✅
- Editar parâmetros das tarefas ✅
- Concluir uma tarefa ✅
- Remover uma tarefa ✅

## Calendário
- Ver o calendário acadêmico do SAA ✅
- Ver datas de entrega de Tarefas ➕ ✅
- Ver datas de entrega de Livros ➕ ✅
- Ver datas de realização de Provas ➕ ✅

## Cardápio do RU
- Ver o cardápio semanal de café da manhã do RU ✅
- Ver o cardápio semanal de almoço do RU ✅
- Ver o cardápio semanal de jantar do RU ✅

## Biblioteca
- Ver livros emprestados da biblioteca ✅
- Ver livros atrasados da biblioteca ✅
- Editar parâmetros dos livros ✅
- Editar data de entrega dos livros ✅
- Remover Livros ✅

## Eventos
- Em Análise 

## Notificações
- Notificar sobre prova próxima ✅
- Notificar sobre devolução de livro atrasado ✅
- Notificar sobre tarefa atrasada ✅ 
- Notificar mensagem do Admin ♻️

## Configurações
- Editar nome de Usuário ✅
- Editar Curso ✅
- Editar Semestre ✅
- Trocar Senha ❌
- Editar notificações ❌
- Excluir conta ✅


# Requisitos do Banco de dados

## Protótipo Inicial
```
Usuário:
└── Nome: String
└── Email: String
└── Senha: String
└── Curso: String
└── Semetre: Integer
└── Materias:
|   └── Materia1:
|   |   └── Nome: String
|   |   └── Professor: String
|   |   └── DiasSemana: String
|   |   └── Horarios: Time
|   |   └── Local: String
|   |   └── Provas:
|   |   |   └──  P1:
|   |   |   |    └── Código: String
|   |   |   |    └── Nota: String
|   |   |   |    └── Data: String
|   |   |   |    └── Horário: Time
|   |   |   |    └── Sala: String
|   |   |   |    └── Conteudo: String
|   |   |   |    └── Status: String -> Completo, Por vir
|   |   └── Tarefas:
|   |   |   └── Tarefa1:
|   |   |   |   └── Nome: String
|   |   |   |   └── Descrição: String
|   |   |   |   └── DataEntrega: DateTime
|   |   |   |   └── Status: String -> Entregue, Atrasada, Em andamento
|   └── Livros:
|   |   └── Livro1:
|   |   |   └── Nome: String
|   |   |   └── DataEmprestimo: String
|   |   |   └── DataEntrega: String
|   |   |   └── Status: String -> Entregue, Atrasado, Lendo.
```

## Implementação MVP1

```
Users
    └── ...
    └── userId11 {...}
    └── userId12
    |   └── UseInfo
    |   |   └── userName: string
    |   |   └── course: string
    |   |   └── currentSemester: integer
    |   |   └── endSemester: integer
    |   |   └── profileImageUrl: string
    |   └── books
    |   |   └── ...
    |   |   └── bookId11 {...}        
    |   |   └── bookId12
    |   |   |   └── autor: string
    |   |   |   └── bookName: string
    |   |   |   └── deliveryDate: timestamp
    |   |   |   └── id: string
    |   |   |   └── status: string  -> Finalized, Active, Late, Deleted
    |   |   └── bookId13 {...}        
    |   |   └── ...        
    |   └── subjects
    |       └── ...
    |       └── subjectId11 {...}        
    |       └── subjectId12
    |       |   └── codeSubject: string
    |       |   └── endTime: timestamp
    |       |   └── Exams
    |       |   |   └── ...
    |       |   |   └── examId11 {...}        
    |       |   |   └── exmaId12:
    |       |   |   |   └── code: string
    |       |   |   |   └── date: timestamp
    |       |   |   |   └── id: string
    |       |   |   |   └── room: string
    |       |   |   |   └── score: string
    |       |   |   |   └── status: string -> Finalized, Active, Deleted
    |       |   |   |   └── time: timestamp       
    |       |   |   └── examId13 {...}        
    |       |   |   └── ...  
    |       |   └── id: string
    |       |   └── local: string
    |       |   └── nameSubject: string
    |       |   └── professor: string
    |       |   └── startTime: timestamp
    |       |   └── status: string  -> Finalized, Active, Deleted
    |       |   └── tasks
    |       |   |   └── ...
    |       |   |   └── taskId11 {...}        
    |       |   |   └── taskId12:
    |       |   |   |   └── deliveryDay: timestamp
    |       |   |   |   └── description: string
    |       |   |   |   └── status: string  -> Finalized, Active, Late, Deleted
    |       |   |   |   └── subjectId: String
    |       |   |   |   └── taskId: String 
    |       |   |   |   └── taskName: String
    |       |   |   └── taskId13 {...}        
    |       |   |   └── ...        
    |       |   └── weekDays: string  -> Segunda, Terça, Quarta, Quinta, Sexta, Sabado, Domingo
    |       └── subjectId13 {...}        
    |       └── ...         
    └── userId13 {...}
    └── userId14 {...}
    └── ...
```
