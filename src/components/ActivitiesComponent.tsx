import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import CheckDate from "../functions/CheckDateActivity";
import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import EditActivityComponent from '../components/Activities/editActivity';

interface Task {
  id: string;
  nameSubject: string;
  taskName: string;
  deliveryDay: Timestamp;
  status: string;
  description: string;
}

interface ActivitiesComponentProps {
  CreatesetVisible: (visibleCreate: boolean) => void;
  setTask: (task: Task) => void;
  EditsetVisible: (activityData: {
    taskName: string;
    deliveryDay: Timestamp;
    description: string;
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
  minHeight: '4rem',
  marginBottom: '0.5rem',
};

const containerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const getStatusLabelColor = (status: string) => {
  switch (status) {
    case 'Active':
      return '#007bff';
    case 'Late':
      return '#dc3545';
    case 'Finalized':
      return '#28a745';
    default:
      return '#2c3e50';
  }
};

export default function ActivitiesComponent({
  CreatesetVisible,
}: ActivitiesComponentProps) {
  const [subjects, setSubjects] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

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

                const tasks = subjectsData.flatMap((item) => {
                  return Object.keys(item.tasks).map((key) => {
                    const task = item.tasks[key];
                    const deliveryDay = task.deliveryDay.toDate();
                    let status = '';  
                    if((deliveryDay < today) && task.status!= 'Finalized' && task.status!= 'Deleted'){
                      CheckDate(deliveryDay, today,task.subjectId, task.taskId, task.status)
                      status = 'Late' 
                    }
                    if((deliveryDay >= today) && task.status!= 'Finalized' && task.status!= 'Deleted' ){
                      CheckDate(deliveryDay, today, task.subjectId, task.taskId, task.status)
                      status = 'Active'
                    }
                    if(task.status == 'Finalized'){
                      status = 'Finalized'
                    }
                    if(task.status == 'Deleted'){
                      status = 'Deleted';
                    }

    

                    return {
                      
                      ...task,
                      id: key,
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
        });

        return () => unsubscribeSnapshot();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getTasksByStatus = (status: string) =>
    subjects.filter((task) => task.status === status);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setEditDialogVisible(true);
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
        selectedTask.nameSubject,
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
      );
      setEditDialogVisible(false);
    }
  };

  const handleEditDelete = async () => {
    if (selectedTask) {
      const userDocRef = doc(db, 'Users', auth.currentUser?.uid || '');
      const taskRef = doc(
        userDocRef,
        'subjects',
        selectedTask.nameSubject,
        'tasks',
        selectedTask.id
      );

      await deleteDoc(taskRef);

      setSubjects(subjects.filter((task) => task.id !== selectedTask.id));
      setEditDialogVisible(false);
    }
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
        {getTasksByStatus('Active').map((task) => (
          <Button
            className="w-full"
            style={{
              ...cardButtonStyles,
              borderColor: getStatusLabelColor(task.status),
            }}
            key={task.id}
            onClick={() => handleTaskClick(task)}
          >
            <h2 style={{ color: 'white' }}>{task.nameSubject}</h2>
            <div
              className="flex flex-column w-12"
              style={{ alignItems: 'flex-start', textAlign: 'left' }}
            >
              <i className="pi pi-book mb-3" style={{ color: 'white' }}>
                Nome da Tarefa: {task.taskName}
              </i>
              <p
                className="pi pi-calendar mb-3"
                style={{ color: 'white', margin: 0 }}
              >
                Data de Entrega:{' '}
                {task.deliveryDay.toDate().toLocaleDateString()}
              </p>

              <i className="pi pi-book mb-3" style={{ color: 'white' }}>
                Descrição: {task.description}
              </i>
            </div>
          </Button>
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
        {getTasksByStatus('Late').map((task) => (
          <Button
            className="w-full"
            style={{
              ...cardButtonStyles,
              borderColor: getStatusLabelColor(task.status),
            }}
            key={task.id}
            onClick={() => handleTaskClick(task)}
          >
            <h2 style={{ color: 'white' }}>{task.nameSubject}</h2>
            <div
              className="flex flex-column w-12"
              style={{ alignItems: 'flex-start', textAlign: 'left' }}
            >
              <i className="pi pi-book mb-3" style={{ color: 'white' }}>
                Nome da Tarefa: {task.taskName}
              </i>
              <p
                className="pi pi-calendar mb-3"
                style={{ color: 'white', margin: 0 }}
              >
                Data de Entrega:{' '}
                {task.deliveryDay.toDate().toLocaleDateString()}
              </p>

              <i className="pi pi-book mb-3" style={{ color: 'white' }}>
                Descrição: {task.description}
              </i>
            </div>
          </Button>
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
        {getTasksByStatus('Finalized').map((task) => (
          <Button
            className="w-full"
            style={{
              ...cardButtonStyles,
              borderColor: getStatusLabelColor(task.status),
            }}
            key={task.id}
            onClick={() => handleTaskClick(task)}
          >
            <h2 style={{ color: 'white' }}>{task.nameSubject}</h2>
            <div
              className="flex flex-column w-12"
              style={{ alignItems: 'flex-start', textAlign: 'left' }}
            >
              <i className="pi pi-book mb-3" style={{ color: 'white' }}>
                Nome da Tarefa: {task.taskName}
              </i>
              <p
                className="pi pi-calendar mb-3"
                style={{ color: 'white', margin: 0 }}
              >
                Data de Entrega:{' '}
                {task.deliveryDay.toDate().toLocaleDateString()}
              </p>

              <i className="pi pi-book mb-3" style={{ color: 'white' }}>
                Descrição: {task.description}
              </i>
            </div>
          </Button>
        ))}
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
