# Sprint 13 - Preparação para o Deploy

**Período: 26/08/2024 - 30/09/2024**

## Descrição

Nesta Sprint, o foco está na preparação para o deploy da plataforma, com ênfase na correção de erros críticos e na implementação de testes automatizados. A reorganização da estrutura do projeto também será realizada para melhorar a organização e a manutenção. Todas as tarefas da Sprint 12 foram concluídas com sucesso, e agora a equipe se concentrará em garantir que a plataforma esteja pronta para o deploy.

---

## Objetivos

- **Reorganização de Arquivos e Pastas**: Reorganizar a estrutura de arquivos nas pastas do projeto para melhorar a organização e facilitar a manutenção. Esta tarefa é essencial para garantir que a documentação e os arquivos estejam bem estruturados e acessíveis, proporcionando maior clareza e facilidade de navegação para futuros desenvolvimentos.

- **Correção de Erros do Typescript para Deploy**: Corrigir erros relacionados ao Typescript que estão impedindo o deploy da aplicação. A resolução desses erros é crucial para garantir a compatibilidade do código com o ambiente de produção e para evitar falhas que possam comprometer a experiência do usuário.

- **Automatizar Testes de Build para PRs na Branch Main**: Implementar scripts de teste de build para controlar a qualidade do código na branch main. Esta funcionalidade garante que qualquer alteração feita diretamente na branch main seja verificada quanto à integridade do build, prevenindo que código quebrado seja incorporado ao projeto e assegurando que o sistema permaneça estável durante o desenvolvimento contínuo.

---

## Reuniões da Sprint

### 1ª Reunião

- **Data:** 29/08/2024

- **Horário:** 15:00 - 16:15

- **Local:** Discord

- **Participantes:** Ana Carolina, Cristiano, Felipe, Lucca, Pedro, Túlio

#### Ata

A reunião teve como objetivo revisar o progresso das tarefas da Sprint 13 e preparar a conclusão da sprint. Cada membro relatou o status de suas responsabilidades, destacando os avanços finais:

- **Antonio, Túlio e Cristiano**: Estão realizando uma reorganização dos arquivos e pastas do projeto para melhorar a estrutura e facilitar a manutenção. A reorganização visa criar uma estrutura de diretórios mais lógica e intuitiva, facilitando a localização e o gerenciamento dos arquivos, o que é fundamental para manter a organização do projeto à medida que ele cresce.

- **Pedro e Cristiano**: Estão adicionando a função de notificações na plataforma, para alertar os usuários sobre eventos importantes e prazos. Essa funcionalidade é crucial para garantir que os usuários sejam informados em tempo real sobre mudanças e prazos, melhorando a usabilidade e a experiência geral com a plataforma.

- **Felipe**: Está trabalhando na correção do CRUD das provas, visando corrigir bugs que afetam a funcionalidade de criação, leitura, atualização e exclusão de provas. A estabilidade dessas funcionalidades é fundamental para assegurar que o sistema funcione de maneira fluida e sem erros, permitindo que os usuários possam gerenciar suas provas de forma eficaz.

- **Pedro, Felipe e Cristiano**: Estão corrigindo erros identificados que precisam ser resolvidos antes do próximo deploy. A resolução desses erros é crítica para garantir que o próximo deploy seja bem-sucedido, sem introduzir novas falhas que possam comprometer o funcionamento do sistema.

#### Encaminhamentos

- **Finalização da Sprint 13**: Conclusão das tarefas e ajustes finais, preparando o terreno para o início da próxima sprint. A equipe deverá se concentrar em concluir todas as tarefas pendentes e revisar o trabalho realizado para garantir que tudo esteja em ordem antes do fechamento oficial da sprint.

- **Planejamento para a Reunião do Dia 05/09/2024**:
  - **Encerramento da Sprint 13**: Avaliação dos resultados e encerramento oficial da sprint. A equipe deve se preparar para uma análise detalhada do que foi realizado durante a sprint, destacando os pontos fortes e identificando áreas que precisam de melhorias para as próximas fases do projeto.

---

### 2ª Reunião

- **Data:** 30/08/2024

- **Horário:** 20:00 - 21:15

- **Local:** Discord

- **Participantes:** Antonio, Cristiano, Lucca, Pedro, Túlio

#### Ata

A reunião teve como objetivo discutir a finalização das issues da Sprint 13 e o planejamento de uma nova sprint para resolver problemas remanescentes no sistema e no projeto. Todos os participantes relataram o progresso das atividades, e ficou registrado que:

- **Finalização das Issues**: Todas as tarefas da reunião passada foram concluídas com sucesso, incluindo a reorganização de arquivos, adição de notificações, correção do CRUD das provas e resolução de erros antes do deploy. Isso demonstra o comprometimento da equipe em cumprir os prazos e entregar um produto de qualidade.

- **Implementação de Testes de Integração Contínua**: Foi destacado que uma nova Pull Request implementou a seguinte funcionalidade:

  - **Teste de Build em Push para a Branch Main**: Um pipeline de CI foi configurado para executar testes de build automaticamente em cada push feito para a branch main. Essa implementação é fundamental para manter a integridade do código e garantir que qualquer alteração seja devidamente verificada antes de ser integrada ao projeto principal.
  - **Garantia de Estabilidade**: Essa funcionalidade garante que qualquer alteração feita diretamente na branch main seja verificada quanto à integridade do build, prevenindo que código quebrado seja incorporado ao projeto. Isso é crucial para evitar que bugs sejam introduzidos inadvertidamente, assegurando a estabilidade e a funcionalidade do sistema.
  - Essa adição fortalece o processo de integração contínua, assegurando que o código na branch main permaneça estável e funcional. O uso de CI como parte do fluxo de trabalho diário garante que o desenvolvimento seja mais ágil e menos propenso a erros, permitindo que a equipe se concentre em agregar valor ao produto em vez de corrigir problemas recorrentes.

- **Abertura de Nova Sprint**: A próxima sprint foi oficialmente aberta para abordar os problemas ainda presentes no sistema, muitos dos quais foram indicados pela professora e seu monitor. Esses problemas incluem melhorias na usabilidade, correção de bugs menores e ajustes na documentação do projeto. A nova sprint terá como foco a continuidade do trabalho já iniciado e a resolução das pendências que ainda precisam ser endereçadas.

#### Encaminhamentos

- **Início da Nova Sprint**: Todos os participantes devem estar preparados para o início da nova sprint, focando na resolução dos problemas indicados. A equipe deve alinhar suas prioridades para garantir que as tarefas mais críticas sejam abordadas primeiro, mantendo o projeto no caminho certo para o próximo deploy.

- **Reunião de Acompanhamento**: Uma nova reunião será agendada para acompanhar o progresso e garantir que todas as pendências sejam resolvidas até o final da sprint. O acompanhamento regular permitirá que a equipe identifique problemas cedo e faça os ajustes necessários para manter o cronograma e os objetivos do projeto.

---
