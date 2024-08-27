# Sprint 12 - Organização e Correções Críticas

**Período: 21/08/2024 - 29/08/2024**

## Descrição

Nesta Sprint, o objetivo principal é a organização e documentação de processos essenciais, além da correção de erros críticos para garantir o bom funcionamento da plataforma. A Sprint focará na reestruturação dos arquivos, estilização da plataforma, documentação dos testes unitários e correção de erros relacionados ao Typescript. Também serão abordadas tarefas gerais e de estilo para melhorar a funcionalidade e a aparência do projeto.

---

## Objetivos

- **Reorganizar Arquivos Dentro de Pastas**: Melhorar a estrutura de arquivos para facilitar a manutenção e a acessibilidade.
- **Estilizar Cores da Plataforma**: Aplicar uma estilização adequada para aprimorar a estética e a consistência visual da plataforma.
- **Iniciar Documentação de Testes Unitários**: Documentar os testes unitários para assegurar que todas as funcionalidades estejam bem testadas e documentadas.
- **Corrigir Erros do Typescript para Deploy**: Resolver erros críticos no Typescript que estão impedindo o deploy da aplicação.
- **Documentar Reuniões e Sprints**: Atualizar a documentação com as reuniões e sprints faltantes.

---

## Tarefas

### Reorganização de Arquivos Dentro de Pastas

- **Issue #132**
  - **Prioridade:** Alta
  - **Descrição:** Reorganizar a estrutura de arquivos nas pastas para melhorar a organização e facilitar a manutenção do projeto.

### Estilização de Cores da Plataforma

- **Issue #131**
  - **Prioridade:** Baixa
  - **Descrição:** Aplicar estilização adequada às cores da plataforma para aprimorar a estética e a consistência visual.

### Iniciação da Documentação de Testes Unitários

- **Issue #130**
  - **Prioridade:** Alta
  - **Descrição:** Começar a documentação dos testes unitários para assegurar que todas as funcionalidades estejam bem testadas e documentadas.

### Correção de Erros do Typescript para Deploy

- **Issue #129**
  - **Prioridade:** Alta
  - **Descrição:** Corrigir erros relacionados ao Typescript que estão impedindo o deploy da aplicação.

### Documentação de Reuniões e Sprints

- **Issue #134**
  - **Descrição:** Documentar reuniões e sprints faltantes em Docs.

---

## Reuniões da Sprint

### 1ª Reunião

- **Data:** 21/08/2024
- **Horário:** 20:00 - 20:35
- **Local:** Discord
- **Participantes:** Antonio, Ana Carolina, Carol, Cristiano, Felipe, Lucca, Pedro, Túlio

#### Ata

A reunião teve como objetivo discutir as tarefas da Sprint 12 e organizar a documentação dos processos essenciais, bem como corrigir erros críticos para garantir o bom funcionamento da plataforma. Cada membro discutiu as responsabilidades atribuídas e os seguintes pontos foram abordados:

- **Sprint 12**: Foco na organização, documentação e correção de erros críticos.

  - **Reorganização de Arquivos Dentro de Pastas**:

    - **Issue #132**: Reorganizar a estrutura de arquivos nas pastas para melhorar a organização e facilitar a manutenção do projeto. Prioridade: Alta.

  - **Estilização de Cores da Plataforma**:

    - **Issue #131**: Aplicar estilização adequada às cores da plataforma para aprimorar a estética e a consistência visual. Prioridade: Baixa.

  - **Iniciação da Documentação de Testes Unitários**:

    - **Issue #130**: Começar a documentação dos testes unitários para assegurar que todas as funcionalidades estejam bem testadas e documentadas. Prioridade: Alta.

  - **Correção de Erros do Typescript para Deploy**:

    - **Issue #129**: Corrigir erros relacionados ao Typescript que estão impedindo o deploy da aplicação. Prioridade: Alta.

  - **Documentação de Reuniões e Sprints**:
    - **Issue #134**: Documentar reuniões e sprints faltantes em Docs.

#### Tarefas Gerais

- **Geral**:

  - Corrigir bug de loop de envio e leitura de informações.

- **DashBoard**:

  - Arrumar bug de shuffle de cards ao trocar da página de Tasks para a de DashBoard.

- **SignIn**:

  - Exibir mensagem de erro de login caso o email ou senha estejam errados.

- **Tasks**:

  - Corrigir bug onde você pode selecionar uma matéria excluída no formulário de adição.
  - Corrigir mensagem de exclusão da tarefa: "Você tem certeza que deseja excluir este livro?"

- **Library**:

  - Arrumar bug onde o formulário de adição aparece já preenchido com os dados do último livro cadastrado.

- **Calendar**:

  - Retirar o destaque de livros que foram finalizados antes da data de entrega.

- **Subjects**:

  - Arrumar bug onde o formulário de adição aparece já preenchido com os dados da última matéria cadastrada.
  - Mudar o status de todas as tarefas e provas de uma matéria para "Finalized" quando essa for finalizada.
  - Mudar o status de todas as tarefas e provas de uma matéria para "Deleted" quando essa for deletada.
  - Arrumar bug de shuffle dos cards quando finaliza um Subject ou põe ele em andamento.

- **SpecificSubject**:
  - Arrumar bug onde o formulário de adição aparece já preenchido com os dados da última prova cadastrada.

#### Tarefas de Estilo e Layout

- **Geral**:

  - Criar um header.
  - Ajustar o tamanho do sidebar.
  - Ajustar o espaçamento entre os itens do sidebar.
  - Mudar as cores dos caracteres, cards e ícones das páginas.

- **DashBoard**:

  - Incluir o Header na página.
  - Modificar o Navbar.
  - Ajustar tamanho e distância dos cards.
  - Arrumar escape de descrição dos cards.
  - Implementar os ScrollBars e Carrosséis dos cards.
  - Adicionar o componente das provas.

- **Calendário & Cardápio**:

  - Incluir o Header na página.
  - Mudar o tamanho dos cards de datas para caber 4 na mesma linha.
  - Corrigir overflow das datas de tarefas.
  - Mudar o formato das datas para o padrão brasileiro.
  - Retirar o footer deixando só o link de referência.
  - Adaptar o Navbar para seguir o padrão das outras páginas.
  - Remover a cor de fundo.
  - Melhorar o front da página de cardápio.

- **Subjects & SpecificSubject**:

  - Incluir o Header na página.
  - Modificar o Navbar para seguir o padrão das outras páginas (tirar os botões).
  - Ajustar o espaçamento e tamanho dos cards.
  - Ajustar o espaçamento e tamanho dos cards das tarefas na SpecificSubject.
  - Exibir mensagem de "Nenhuma matéria em andamento" e "Nenhuma matéria finalizada".
  - Alterar tamanho do título do card de matéria.

- **Tasks**:

  - Incluir o Header na página.
  - Adicionar mensagem de "Nenhuma tarefa Em andamento", "Nenhuma tarefa Atrasada" e "Nenhuma tarefa Finalizada".
  - Ajustar o tamanho dos cards e distância entre eles.
  - Consertar o escape de caracteres.

- **Library**:

  - Incluir o Header na página.
  - Ajustar o tamanho dos cards e distância entre eles.
  - Trocar o parâmetro "Nome da matéria" para "Autor" do formulário de adição de livro.
  - Trocar o título do card para o Nome do livro.

- **Profile**:

  - Incluir o Header na página.
  - Modificar o Navbar para seguir o padrão das outras páginas.
  - Remover a cor de fundo.

- **Landing**:
  - Consertar responsividade dos botões.
  - Padronizar o footer.

---

### 2ª Reunião

- **Data:** 26/08/2024
- **Horário:** 20:00 - 20:52
- **Local:** Discord
- **Participantes:** Antonio, Cristiano, Felipe, Lucca, Pedro, Túlio

#### Ata

A reunião teve como objetivo revisar o progresso das tarefas da Sprint 12 e discutir o início da próxima Sprint. Os seguintes pontos foram abordados:

- **Sprint 12**: Todas as tarefas foram concluídas com sucesso. A equipe revisou as correções feitas e a implementação das melhorias planejadas.

- **Início da Sprint 13**: A Sprint 13 foi oficialmente iniciada. A equipe discutiu as prioridades e os objetivos para a próxima sprint, que incluirão novas tarefas e a continuidade do trabalho em curso.

## Encaminhamentos

- **Estabelecimento de Prazo**: Definir um prazo para a conclusão das tarefas para garantir que todos os problemas sejam resolvidos de forma eficiente e o projeto avance conforme o planejado.

- **Próxima Reunião**: Agendar e preparar a pauta para a reunião de acompanhamento da Sprint 12, revisando o progresso das tarefas e ajustando o planejamento conforme necessário.
