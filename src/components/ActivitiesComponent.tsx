import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

interface Task {
  id: string;
  nameSubject: string;
  taskName: string;
  deliveryDay: Timestamp;
  status: number;
}

interface ActivitiesComponentProps {
  CreatesetVisible: (visibleCreate: boolean) => void;
  setTask: (task: Task) => void;
  EditsetVisible: (activityData: {
    nameActivity: string;
    deliveryDay: Timestamp;
  }) => void;
}

const cardButtonStyles: React.CSSProperties = {
  color: 'white',
  border: '2px solid',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  backgroundColor: '#2c3e50',
  minHeight: '4rem', // Garante um tamanho mínimo consistente
  marginBottom: '0.5rem', // Espaçamento entre os botões
};

const containerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem', // Espaçamento entre os botões
};

const getStatusLabelColor = (status: number): string => {
  switch (status) {
    case 1:
      return '#007bff'; // Em andamento
    case 2:
      return '#dc3545'; // Atrasadas
    case 3:
      return '#28a745'; // Finalizadas
    default:
      return '#2c3e50'; // Cor padrão
  }
};

export default function ActivitiesComponent({
  CreatesetVisible,
  setTask,
  EditsetVisible,
}: ActivitiesComponentProps) {
  const [subjects, setSubjects] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'Users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData && userData.subjects) {
              const subjectsData = Object.values(userData.subjects) as Task[];
              const today = new Date();

              const tasks = subjectsData.flatMap((item) => {
                return Object.keys(item.tasks).map((key) => {
                  const task = item.tasks[key];
                  const deliveryDay = task.deliveryDay.toDate();
                  const status =
                    deliveryDay < today
                      ? 2
                      : task.status === 'Finalizada'
                      ? 3
                      : 1;

                  return {
                    ...task,
                    nameSubject: item.nameSubject,
                    status,
                  } as Task;
                });
              });

              setSubjects(tasks);
            }
          }
        } catch (error) {
          console.error('Error fetching tasks:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getTasksByStatus = (status: number) =>
    subjects.filter((task) => task.status === status);

  const handleTaskClick = (task: Task) => {
    setTask(task);
  };

  return (
    <div className="flex flex-column mx-3 my-3 gap-0 w-full">
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-book text-4xl" style={{ color: 'white' }} />
          <h1 style={{ color: 'white' }}>Tarefas</h1>
        </div>
      </div>

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-forward mb-2 mx-3" style={{ color: '#007bff' }} />
          Em andamento
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

      <div style={containerStyles}>
        {getTasksByStatus(1).map((task) => (
          <Button
            className="w-full"
            style={{
              ...cardButtonStyles,
              borderColor: getStatusLabelColor(task.status),
            }}
            key={task.id}
            label={`${task.nameSubject} - Nome da Tarefa: ${
              task.taskName
            } - Data de Entrega: ${task.deliveryDay
              .toDate()
              .toLocaleDateString()}`}
            onClick={() => handleTaskClick(task)}
          />
        ))}
      </div>

      <Divider className="my-0" />

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-clock mb-2 mx-3" style={{ color: '#dc3545' }} />
          Atrasadas
        </div>
      </div>

      <div style={containerStyles}>
        {getTasksByStatus(2).map((task) => (
          <Button
            className="w-full"
            style={{
              ...cardButtonStyles,
              borderColor: getStatusLabelColor(task.status),
            }}
            key={task.id}
            label={`${task.nameSubject} - Nome da Tarefa: ${
              task.taskName
            } - Data de Entrega: ${task.deliveryDay
              .toDate()
              .toLocaleDateString()}`}
            onClick={() => handleTaskClick(task)}
          />
        ))}
      </div>

      <Divider className="my-0" />

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-check mb-2 mx-3" style={{ color: '#28a745' }} />
          Finalizadas
        </div>
      </div>

      <div style={containerStyles}>
        {getTasksByStatus(3).map((task) => (
          <Button
            className="w-full"
            style={{
              ...cardButtonStyles,
              borderColor: getStatusLabelColor(task.status),
            }}
            key={task.id}
            label={`${task.nameSubject} - Nome da Tarefa: ${
              task.taskName
            } - Data de Entrega: ${task.deliveryDay
              .toDate()
              .toLocaleDateString()}`}
            onClick={() => handleTaskClick(task)}
          />
        ))}
      </div>

      <Divider className="my-0" />
    </div>
  );
}
