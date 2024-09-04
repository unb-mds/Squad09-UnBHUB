# Sprint 10

**Período: 04/08/2024 - 12/08/2024**

## Descrição

Nesta Sprint, o foco foi finalizar o CRUD das páginas de subjects, specific subject, library e tasks, corrigir bugs existentes e exibir os dados do Firebase dinamicamente nessas páginas. Também foi implementada a opção de upload de imagens na página de usuário, junto com a finalização do seu CRUD, e a exibição de datas de tarefas, livros e provas no calendário.

---

## Objetivos

- **Implementar as funcionalidades finais da User Page**: Fazer o CRUD com os dados do usuário e possibilitar o upload de fotos de perfil no Firebase Storage.
- **Finalizar a Calendar Page**: Exibir as datas de provas, tarefas e entregas de livros no índice do calendário e destacá-las.
- **Adicionar funcionalidades às páginas Tasks e Library**: Vincular o CRUD das páginas de tarefas e biblioteca com os dados do Firestore Database, exibindo-os de forma dinâmica nas páginas.
- **Terminar as páginas Subject e Specific Subject**: Resolver bugs presentes nos formulários das páginas e finalizar o CRUD das provas.

---

## Reuniões da Sprint

### 1ª Reunião

- **Data:** 04/08/2024
- **Horário:** 20:00 - 21:12
- **Local:** Discord
- **Participantes:** Antonio, Ana Carolina, Carol, Cristiano, Felipe, Lucca, Pedro, Túlio

#### Ata

A reunião inicial foi realizada para discutir o plano de trabalho e definir as tarefas da Sprint 10. Cada membro foi designado para suas respectivas responsabilidades e os objetivos foram detalhados:

- **Felipe e Ana Carolina** foram designados para implementar e ajustar funcionalidades nas páginas "Subjects" e "Specific Subject". Eles devem ajustar a seleção de data e horário ao criar novas matérias, permitir que uma matéria finalizada volte a estar "em andamento", finalizar o CRUD das provas com funções para editar, remover e atualizar o status, e configurar o autopreenchimento da nota e status das provas.

- **Pedro** ficou responsável por reorganizar as rotas de todas as páginas e melhorar a experiência do usuário. As tarefas incluem trocar a página inicial para a LandingPage, organizar o endereçamento dos itens do SideBar, consertar redirecionamentos e ocultar campos de senha nas páginas de SignIn e SignUp.

- **Túlio** foi encarregado de implementar uma verificação de autenticação para garantir que apenas usuários logados possam acessar a página de calendário. Ele também deve exibir as datas de provas, tarefas e livros armazenadas no Firebase no calendário e destacar essas datas.

- **Antonio e Cristiano** foram responsáveis por terminar a configuração das páginas de tarefas e biblioteca com as funções CRUD. Eles devem integrar a criação de componentes diretamente com o Firebase, possibilitar a edição e adição de funções de deleção.

- **Lucca** ficou encarregado de garantir que o link para a página de SignUp esteja presente e redirecione corretamente a partir da página de login. Além disso, ele deve implementar e testar a funcionalidade de ocultar/mostrar senha em diferentes navegadores e dispositivos móveis.

#### Encaminhamentos

- **Planejamento Detalhado**: Cada equipe deve criar um plano detalhado de suas tarefas e definir marcos importantes para garantir o progresso contínuo.

- **Comunicação e Colaboração**: Manter uma comunicação ativa para resolver dúvidas e problemas que possam surgir durante o desenvolvimento das tarefas.

### 2ª Reunião

- **Data:** 12/08/2024
- **Horário:** 20:00 - 21h30
- **Local:** Discord
- **Participantes:** Antonio, Ana Carolina, Carol, Cristiano, Felipe, Lucca, Pedro, Túlio

#### Ata

Com o encerramento da Sprint 10, a equipe direcionará seus esforços para o planejamento da Sprint 11, com as seguintes tarefas designadas:

- **Alterações no Front-End:**

  - **Antonio e Cristiano** foram designados para realizar várias alterações no front-end. As principais tarefas incluem:
    - Fixar elementos (CardButtons) em um tamanho ideal para mostrar registros.
    - Corrigir o bug que impede a finalização do deliveryDay no mesmo dia.
    - Substituir o botão de "Finalizar" na seção "Finalizados" pelo botão "Em andamento", refletindo melhor o status das tarefas.

- **Documentação:**

  - **Pedro** ficou responsável por alinhar a documentação do projeto com o planejamento e a trajetória da equipe. Suas tarefas incluem:
    - Atualizar a página de documentação do MkDocs com as mudanças recentes na arquitetura do projeto.
    - Alterar o README para incluir um guia mais detalhado sobre a execução do projeto e a configuração do Firebase.

- **Ajustes na SubjectPage e SpecificSubjectPage:**

  - **Ana Carolina, Felipe e Lucca** foram encarregados de trabalhar em melhorias e correções nessas páginas. As tarefas incluem:
    - Resolver o bug relacionado à quantidade limitada de edições.
    - Ajustar o multiselect para a edição de matérias.
    - Alterar a descrição de erro ao adicionar uma prova sem horário ou data, para oferecer uma mensagem mais clara ao usuário.

- **Correções na Página de Calendário:**

  - **Túlio** foi encarregado de corrigir todos os erros da página de calendário. Ele focará especialmente em:
    - Correções de bugs relacionados à conversão de datas.
    - Remoção de elementos não utilizados nas funções de "fetch", para melhorar a performance e a usabilidade.

- **Integração do Dashboard com o Banco de Dados:**
  - **Felipe e Ana Carolina** ficaram responsáveis por integrar o dashboard ao banco de dados. Isso inclui:
    - Integração das matérias, tarefas, barra de progresso e provas ao banco de dados, garantindo que todos os dados sejam sincronizados corretamente e exibidos de forma precisa no dashboard.

---

#### Encaminhamentos

- **Execução das Tarefas Designadas**: Cada membro deve iniciar as atividades conforme suas atribuições, com foco em corrigir os bugs e aprimorar as funcionalidades do projeto.
- **Revisão e Ajustes**: À medida que as tarefas forem concluídas, será necessário realizar testes e ajustes para garantir a estabilidade e funcionalidade do sistema.
- **Acompanhamento da Sprint 11**: A Sprint 11 foi oficialmente iniciada, com os objetivos claramente definidos e as tarefas distribuídas entre os membros da equipe. Serão realizadas revisões periódicas para acompanhar o progresso e garantir que as metas sejam alcançadas dentro do prazo estabelecido.

---

## Conclusão

A Sprint 10 foi concluída com sucesso, com todas as funcionalidades planejadas implementadas e testadas. As melhorias nas páginas de usuário, calendário, tarefas e biblioteca foram validadas, e a reorganização das rotas melhorou a experiência do usuário. A próxima fase do projeto envolverá a revisão final das funcionalidades e a preparação para a próxima sprint.

---
