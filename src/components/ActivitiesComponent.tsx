import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase'; // Importa as configurações de autenticação e banco de dados do Firebase.
import { onAuthStateChanged } from 'firebase/auth'; // Importa a função para monitorar mudanças no estado de autenticação do usuário.
import CheckDate from '../functions/CheckDateActivity'; // Importa uma função personalizada para verificar datas de atividades.
import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'; // Importa funções para interação com o Firestore do Firebase.
import EditActivityComponent from '../components/Activities/editActivity'; // Importa o componente para edição de atividades.
import GeneralHeader from './Header';

interface Task {
  id: string; // Identificador único da tarefa.
  codeSubject: string;
  taskName: string;
  deliveryDay: Timestamp;
  status: string; // Status da tarefa (por exemplo, 'Active', 'Late', 'Finalized').
  description: string;
}

interface ActivitiesComponentProps {
  CreatesetVisible: (visibleCreate: boolean) => void; // Função para atualizar a visibilidade do diálogo de criação.
  setTask: (task: Task) => void; // Função para definir a tarefa selecionada.
  EditsetVisible: (activityData: {
    taskName: string;
    deliveryDay: Timestamp;
    description: string;
  }) => void; // Função para atualizar a visibilidade do diálogo de edição.
}

const cardButtonStyles: React.CSSProperties = {
  color: 'white', // Cor do texto do botão.
  border: '1px solid', // Estilo da borda do botão.
  padding: '1rem', // Espaçamento interno do botão.
  display: 'flex', // Usa Flexbox para layout do botão.
  flexDirection: 'column', // Direção dos itens dentro do botão.
  alignItems: 'flex-start', // Alinha itens no início do botão.
  width: '350px', // Largura fixa do botão.
  height: '250px', // Altura fixa do botão.
  backgroundColor: 'transparent', // Cor de fundo do botão.
};

const containerStyles: React.CSSProperties = {
  display: 'flex', // Usa Flexbox para layout.
  flexDirection: 'row', // Direção dos itens dentro do container.
  flexWrap: 'wrap', // Adiciona o wrap para que os itens quebrem em novas linhas
  gap: '1rem', // Espaçamento entre os itens.
};

const getStatusLabelColor = (status: string) => {
  // Retorna a cor de acordo com o status da tarefa.
  switch (status) {
    case 'Active':
      return '#007bff'; // Cor azul para tarefas ativas.
    case 'Late':
      return '#dc3545'; // Cor vermelha para tarefas atrasadas.
    case 'Finalized':
      return '#28a745'; // Cor verde para tarefas finalizadas.
    default:
      return '#2c3e50'; // Cor padrão para status desconhecido.
  }
};

export default function ActivitiesComponent({
  CreatesetVisible,
}: ActivitiesComponentProps) {
  const [subjects, setSubjects] = useState<Task[]>([]); // Estado para armazenar as tarefas.
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos dados.
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Estado para armazenar a tarefa selecionada.
  const [editDialogVisible, setEditDialogVisible] = useState(false); // Estado para controlar a visibilidade do diálogo de edição.

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);

        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
          try {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              if (userData && userData.subjects) {
                const subjectsData = Object.values(userData.subjects) as Task[];
                const today = new Date();

                // Mapeia as tarefas e atualiza o status baseado na data de entrega.
                const tasks = subjectsData.flatMap((item) => {
                  return Object.keys(item.tasks).map((key) => {
                    const task = item.tasks[key];
                    const deliveryDay = task.deliveryDay.toDate();
                    const delayDay = deliveryDay.setDate(
                      deliveryDay.getDate() + 1
                    );
                    let status = '';
                    if (
                      delayDay < today &&
                      task.status != 'Finalized' &&
                      task.status != 'Deleted'
                    ) {
                      CheckDate(
                        delayDay,
                        today,
                        task.subjectId,
                        task.taskId,
                        task.status
                      );
                      status = 'Late';
                    }
                    if (
                      delayDay >= today &&
                      task.status != 'Finalized' &&
                      task.status != 'Deleted'
                    ) {
                      CheckDate(
                        delayDay,
                        today,
                        task.subjectId,
                        task.taskId,
                        task.status
                      );
                      status = 'Active';
                    }
                    if (task.status == 'Finalized') {
                      status = 'Finalized';
                    }
                    if (task.status == 'Deleted') {
                      status = 'Deleted';
                    }

                    return {
                      ...task,
                      id: key,
                      codeSubject: item.codeSubject,
                      status,
                    } as Task;
                  });
                });

                setSubjects(tasks); // Atualiza o estado com as tarefas.
              }
            }
          } catch (error) {
            console.error('Error fetching tasks:', error); // Exibe erro caso ocorra um problema.
          } finally {
            setLoading(false); // Atualiza o estado de carregamento.
          }
        });

        return () => unsubscribeSnapshot(); // Limpa o listener quando o componente desmonta.
      } else {
        setLoading(false); // Atualiza o estado de carregamento se o usuário não estiver autenticado.
      }
    });

    return () => unsubscribeAuth(); // Limpa o listener de autenticação quando o componente desmonta.
  }, []); // Dependências vazias significam que o efeito é executado apenas uma vez após a montagem.

  if (loading) {
    return <div>Loading...</div>; // Exibe mensagem de carregamento enquanto os dados estão sendo carregados.
  }

  const getTasksByStatus = (status: string) =>
    subjects.filter((task) => task.status === status); // Filtra tarefas com base no status.

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task); // Define a tarefa selecionada.
    setEditDialogVisible(true); // Exibe o diálogo de edição.
  };

  const handleEditSave = async (updatedData: {
    taskName: string;
    deliveryDay: Date | null;
    description: string;
  }) => {
    if (selectedTask) {
      const updatedTask = {
        ...selectedTask,
        taskName: updatedData.taskName,
        deliveryDay: Timestamp.fromDate(updatedData.deliveryDay as Date),
        description: updatedData.description || selectedTask.description,
      };

      const userDocRef = doc(db, 'Users', auth.currentUser?.uid || '');
      const taskRef = doc(
        userDocRef,
        'subjects',
        selectedTask.codeSubject,
        'tasks',
        selectedTask.id
      );

      await updateDoc(taskRef, {
        taskName: updatedTask.taskName,
        deliveryDay: updatedTask.deliveryDay,
        description: updatedTask.description,
      });

      setSubjects(
        subjects.map((task) =>
          task.id === selectedTask.id ? updatedTask : task
        )
      ); // Atualiza a lista de tarefas com a tarefa editada.
      setEditDialogVisible(false); // Fecha o diálogo de edição.
    }
  };

  const handleEditDelete = async () => {
    if (selectedTask) {
      const userDocRef = doc(db, 'Users', auth.currentUser?.uid || '');
      const taskRef = doc(
        userDocRef,
        'subjects',
        selectedTask.codeSubject,
        'tasks',
        selectedTask.id
      );

      await deleteDoc(taskRef); // Exclui a tarefa do banco de dados.

      setSubjects(subjects.filter((task) => task.id !== selectedTask.id)); // Remove a tarefa excluída da lista.
      setEditDialogVisible(false); // Fecha o diálogo de edição.
    }
  };

  const truncateDescription = (title: string) => {
    return title.length > 32 ? `${title.slice(0, 29)}...` : title; // Limite de caracteres ajustado para 31
  };

  const truncateTaskName = (title: string) => {
    return title.length > 32 ? `${title.slice(0, 29)}...` : title; // Limite de caracteres ajustado para 31
  };

  return (
    <div className="flex flex-column mx-3 my-1 w-full">
      <GeneralHeader />
      <Divider className="mb-2 mt-0" />
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5 mb-6">
          <i className="pi pi-clipboard text-4xl" style={{ color: '#4b4b4b' }} />
          <h1 style={{ color: '#4b4b4b' }}>Tarefas</h1>
        </div>
      </div>

      <div
        className="flex justify-content-between align-items-center px-2 border-round-lg"
        style={{ color: '#4b4b4b' }}
      >
        <div>
          <i className="pi pi-forward mx-2" style={{ color: '#007bff' }} />
          Em Andamento
        </div>
        <Button
          type="button"
          label="Adicionar"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          text
          link
          onClick={() => CreatesetVisible(true)}
        />
      </div>

      <Divider className="mb-2 mt-1" />

      <div style={containerStyles} className="my-4">
        {getTasksByStatus('Active').length == 0 ? (
          <p>Nenhuma tarefa encontrada</p>
        ) : (
          getTasksByStatus('Active').map((task) => (
            <Button
              className="border-round-lg surface-200"
              style={{
                ...cardButtonStyles,
                borderColor: getStatusLabelColor(task.status),
              }}
              key={task.id}
              onClick={() => handleTaskClick(task)}
            >
              <h3 style={{ color: '#4b4b4b' }}>{task.codeSubject}</h3>

              <Divider className="mt-1" />

              <div
                className="flex flex-column"
                style={{ alignItems: 'flex-start', textAlign: 'left' }}
              >
                <i className="pi pi-clipboard mb-3" style={{ color: '#4b4b4b' }}>
                  Tarefa: {truncateTaskName(task.taskName)}
                </i>
                <p
                  className="pi pi-calendar mb-3"
                  style={{ color: '#4b4b4b', margin: 0 }}
                >
                  Entrega: {task.deliveryDay.toDate().toLocaleDateString()}
                </p>

                <i className="pi pi-book mb-3" style={{ color: '#4b4b4b' }}>
                  Descrição: {truncateDescription(task.description)}
                </i>
              </div>
            </Button>
          ))
        )}
      </div>

      <div
        className="flex justify-content-between align-items-center px-2 border-round-lg"
        style={{ color: '#4b4b4b' }}
      >
        <div>
          <i className="pi pi-clock mb-2 mx-2" style={{ color: '#dc3545' }} />
          Atrasadas
        </div>
      </div>

      <Divider className="mb-2 mt-1" />

      <div style={containerStyles} className="my-4">
        {getTasksByStatus('Late').length == 0 ? (
          <p>Nenhuma tarefa encontrada</p>
        ) : (
          getTasksByStatus('Late').map((task) => (
            <Button
              className="border-round-lg surface-200"
              style={{
                ...cardButtonStyles,
                borderColor: getStatusLabelColor(task.status),
              }}
              key={task.id}
              onClick={() => handleTaskClick(task)}
            >
              <h3 style={{ color: '#4b4b4b' }}>{task.codeSubject}</h3>

              <Divider className="mt-1" />

              <div
                className="flex flex-column"
                style={{ alignItems: 'flex-start', textAlign: 'left' }}
              >
                <i className="pi pi-clipboard mb-3" style={{ color: '#4b4b4b' }}>
                  Tarefa: {truncateTaskName(task.taskName)}
                </i>
                <p
                  className="pi pi-calendar mb-3"
                  style={{ color: '#4b4b4b', margin: 0 }}
                >
                  Entrega: {task.deliveryDay.toDate().toLocaleDateString()}
                </p>

                <i className="pi pi-book mb-3" style={{ color: '#4b4b4b' }}>
                  Descrição: {truncateDescription(task.description)}
                </i>
              </div>
            </Button>
          ))
        )}
      </div>

      <div
        className="flex justify-content-between align-items-center px-2 border-round-lg"
        style={{ color: '#4b4b4b' }}
      >
        <div>
          <i className="pi pi-check mb-2 mx-2" style={{ color: '#28a745' }} />
          Finalizadas
        </div>
      </div>

      <Divider className="mb-2 mt-1" />

      <div style={containerStyles} className="my-4">
        {getTasksByStatus('Finalized').length == 0 ? (
          <p>Nenhuma tarefa encontrada</p>
        ) : (
          getTasksByStatus('Finalized').map((task) => (
            <Button
              className="border-round-lg surface-200"
              style={{
                ...cardButtonStyles,
                borderColor: getStatusLabelColor(task.status),
              }}
              key={task.id}
              onClick={() => handleTaskClick(task)}
            >
              <h3 style={{ color: '#4b4b4b' }}>{task.codeSubject}</h3>

              <Divider className="mt-1" />

              <div
                className="flex flex-column"
                style={{ alignItems: 'flex-start', textAlign: 'left' }}
              >
                <i className="pi pi-clipboard mb-3" style={{ color: '#4b4b4b' }}>
                  Tarefa: {truncateTaskName(task.taskName)}
                </i>
                <p
                  className="pi pi-calendar mb-3"
                  style={{ color: '#4b4b4b', margin: 0 }}
                >
                  Entrega: {task.deliveryDay.toDate().toLocaleDateString()}
                </p>

                <i className="pi pi-book mb-3" style={{ color: '#4b4b4b' }}>
                  Descrição: {truncateDescription(task.description)}
                </i>
              </div>
            </Button>
          ))
        )}
      </div>

      {selectedTask && (
        <EditActivityComponent
          visibleEdit={editDialogVisible}
          EditsetVisible={setEditDialogVisible}
          activityData={{
            taskName: selectedTask.taskName,
            deliveryDay: selectedTask.deliveryDay.toDate(),
            description: selectedTask.description,
          }}
          {...selectedTask}
          onSave={handleEditSave}
          onDelete={handleEditDelete}
        />
      )}
    </div>
  );
}
