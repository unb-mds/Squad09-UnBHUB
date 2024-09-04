### 05/08/2024

- **Horário:** 20:00 - 21:12
- **Local:** Discord
- **Participantes:** Antonio, Carol, Cristiano, Felipe, Lucca, Pedro, Túlio

#### Ata

A reunião foi realizada para discutir o progresso do projeto e identificar as pendências necessárias para a sua conclusão.

- **Revisão das Pendências**: A equipe fez uma análise detalhada do que ainda falta ser entregue para a finalização do projeto. Foram identificadas as seguintes áreas críticas que necessitam de atenção: Bug fixes e User Experience.

  - **Sign In:**

    - O link "Esqueceu sua senha?" não realiza nenhuma ação.

  - **Sign Up:**

    - O nome do usuário não está sendo salvo no banco de dados após o cadastro.

  - **DashBoard:**

    - Não está exibindo informações do banco de dados.
    - O botão "Ver tudo" de Tarefas está redirecionando para Matérias.
    - O botão "Ver tudo" de Provas está redirecionando para Matérias.

  - **CalendarPage:**

    - As datas de provas, tarefas e entrega de livros não estão sendo exibidas.

  - **Subjects:**

    - A função Editar abre um menu com informações vazias, exigindo o preenchimento de todos os campos para editar.
    - Dias da semana e local estão aceitando strings ao invés de tipos específicos (como nas provas, onde há um menu de seleção de dias e horários).
    - Após finalizar uma matéria, não é possível alterar o status para "Em Andamento".

  - **SpecificSubject:**

    - As tarefas não estão sendo exibidas.
    - Não é possível editar as provas.
    - Falta autopreencher a Nota para "a definir" quando adicionada pela primeira vez.
    - Falta autopreencher o Status para "Em Andamento" ou "Finalizada" de acordo com a data.

  - **Profile:**

    - Não está exibindo as informações do banco de dados sobre o usuário.
    - Não há como editar ou acessar essas informações.

  - **Messages:**

    - Não está notificando o usuário sobre entrega de livros, provas e tarefas.

  - **Configurações:**
    - A seção de configurações não foi implementada.

- **Páginas não testadas**: A equipe ainda não conseguiu testar as páginas de Tarefas e Biblioteca, pois elas não estão atualizadas na Main.

---

#### Encaminhamentos

- **Correção dos Bugs Identificados**: A equipe deve se concentrar na correção dos bugs e na melhoria da experiência do usuário conforme discutido.

- **Próxima Reunião**: Será agendada uma nova reunião para revisar o progresso dessas correções e planejar os próximos passos.

---
