import { Timestamp } from 'firebase/firestore'; // Importa o tipo 'Timestamp' para lidar com datas e horários do Firestore.
import { Card } from 'primereact/card'; // Importa o componente 'Card' da biblioteca PrimeReact para exibir informações em cartões.
import formatDate from '../../functions/FormatDate'; // Importa uma função para formatar datas.
import formatTime from '../../functions/FormatTime'; // Importa uma função para formatar horas.

interface Task {
  codeSubject: string; // Define o código da matéria à qual a tarefa pertence.
  taskName: string; // Define o nome da tarefa.
  description: string; // Define a descrição da tarefa.
  deliveryDay: Timestamp; // Define o dia de entrega da tarefa como um Timestamp do Firestore.
  status: string; // Define o status da tarefa (por exemplo, 'Active', 'Late', 'Finalized').
}

interface Subject {
  tasks: Task[]; // Define um array de tarefas para o assunto.
}

interface TasksComponentProps {
  subject: Subject; // Recebe o assunto com suas tarefas.
  status: string; // Recebe o status das tarefas a serem filtradas.
  handleEditClick: (activityData: {
    taskName: string; // Função de callback para lidar com o clique de edição.
    deliveryDay: Timestamp; // Dados da tarefa para edição.
    codeSubject: string;
  }) => void;
}

export default function TasksComponent({
  subject,
  status,
  handleEditClick,
}: TasksComponentProps) {
  if (!subject || !subject.tasks) {
    // Verifica se o assunto e suas tarefas estão disponíveis.
    return null; // Se não houver dados, retorna null para não renderizar nada.
  }

  // Filtra e mapeia as tarefas com base no status fornecido.
  const filteredTasks = Object.values(subject.tasks)
    .filter((task) => task.status === status) // Filtra tarefas pelo status.
    .map((task, index) => {
      // Define a borda do cartão com base no status da tarefa.
      const border = (() => {
        switch (status) {
          case 'Active':
            return '2px solid #3498db'; // Azul para tarefas ativas.
          case 'Late':
            return '2px solid #e41223'; // Vermelho para tarefas atrasadas.
          case 'Finalized':
            return '2px solid #12e42b'; // Verde para tarefas finalizadas.
          default:
            return '2px solid gray'; // Cor padrão se o status não corresponder a nenhum caso.
        }
      })();

      return (
        <Card
          title={task.codeSubject} // Define o título do cartão como o código da matéria.
          className="w-3" // Define a classe de largura para o cartão.
          key={index} // Define uma chave única para cada cartão.
          style={{
            color: 'white', // Define a cor do texto como branco.
            border: border, // Define a borda do cartão com base no status.
          }}
        >
          <div className="flex flex-column">
            {' '}
            {/* Contêiner flexível para organizar o conteúdo em coluna. */}
            <p
              className="pi pi-arrow-right mt-0" // Define um parágrafo com um ícone de seta e margem zero no topo.
              onClick={() =>
                handleEditClick({
                  // Adiciona um manipulador de clique para editar a tarefa.
                  taskName: task.taskName,
                  deliveryDay: task.deliveryDay,
                  codeSubject: task.codeSubject,
                })
              }
            >
              {' '}
              {task.taskName} {/* Exibe o nome da tarefa. */}
            </p>
            <p className="pi pi-arrow-right mt-0">
              {' '}
              {/* Exibe a data e hora de entrega formatadas. */}
              {formatDate(task.deliveryDay.toDate())}{' '}
              {formatTime(task.deliveryDay.toDate())}
            </p>
            <p className="pi pi-arrow-right mt-0">
              {' '}
              {/* Exibe a descrição da tarefa. */}
              {task.description}
            </p>
          </div>
        </Card>
      );
    });

  return (
    <div className="flex w-full">
      {' '}
      {/* Contêiner flexível que ocupa toda a largura disponível. */}
      {filteredTasks.length > 0 ? (
        filteredTasks
      ) : (
        <p>No tasks available</p>
      )}{' '}
      {/* Exibe as tarefas filtradas ou uma mensagem se não houver tarefas. */}
    </div>
  );
}
