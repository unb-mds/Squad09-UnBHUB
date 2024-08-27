import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';
import CheckDate from '../../functions/Activities/CheckDateActivity';
import { Timestamp } from 'firebase/firestore';

// Define os tons de cores disponíveis
const colors = [
  'green',
  'yellow',
  'cyan',
  'pink',
  'indigo',
  'teal',
  'orange',
  'purple',
];

// Função para gerar uma cor fixa baseada no ID da tarefa
const getColorForTask = (taskId: string) => {
  const hash = Array.from(taskId).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return colors[hash % colors.length];
};

interface ITask {
  deliveryDay: Timestamp;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

interface ISubject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  startTime: Date;
  endTime: Date;
  local: string;
  status: string;
  id: string;
  tasks: ITask[];
}

interface DashBoardActivitiesProps {
  subject: ISubject | null;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
};

// Função para retornar a classe do status
const getStatusClass = (status: string) => {
  return status === 'Atrasada' ? 'bg-red-300' : 'bg-blue-100';
};

export default function DashBoardActivitiesComponent({
  subject,
}: DashBoardActivitiesProps) {
  if (!subject || !subject.tasks) {
    return null;
  }

  const filteredTasks = Object.values(subject.tasks)
    .filter((task: ITask) => task.status === 'Active' || task.status === 'Late')
    .map((task: ITask, index) => {
      const deliveryDay = task.deliveryDay.toDate();
      const today = new Date();
      today.setDate(today.getDate() - 1);
      let taskStatus = '';

      if (
        deliveryDay < today &&
        task.status !== 'Finalized' &&
        task.status !== 'Deleted'
      ) {
        CheckDate(deliveryDay, today, task.subjectId, task.taskId, task.status);
        taskStatus = 'Atrasada';
      } else if (task.status !== 'Finalized' && task.status !== 'Deleted') {
        CheckDate(deliveryDay, today, task.subjectId, task.taskId, task.status);
        taskStatus = 'Em andamento';
      }

      return (
        <Card
          key={index}
          style={{
            color: '#4b4b4b',
            border: '2px solid',
            width: '300px',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
            backgroundColor: 'var(--surface-200)',
          }}
          className={`border-${getColorForTask(task.taskId)}-300`}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
              marginTop: '-1.2rem',
            }}
          >
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                textAlign: 'right',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginLeft: '0.5rem',
                marginBottom: '-0.4rem',
              }}
            >
              {truncateText(task.taskName, 20)}
            </div>
            <div
              className={`${getStatusClass(taskStatus)}`}
              style={{
                padding: '0.2rem 0.4rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: '#4b4b4b',
              }}
            >
              {taskStatus}
            </div>
          </div>
          <Divider className="mb-3 mt-2" />
          <div
            style={{
              fontSize: '0.8rem',
              textAlign: 'left',
              overflowWrap: 'break-word',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p
              className="pi pi-book mt-0"
              style={{ marginBottom: '0.2rem', fontSize: '0.8rem' }}
            >
              {truncateText(task.description, 31)}
            </p>
            <p className="pi pi-calendar" style={{ fontSize: '0.8rem' }}>
              {formatDate(task.deliveryDay)} {formatTime(task.deliveryDay)}
            </p>
          </div>
        </Card>
      );
    });

  return (
    <div className="flex flex-wrap w-full gap-2">
      {filteredTasks.length > 0 ? (
        filteredTasks
      ) : (
        <p>Nenhuma tarefa encontrada</p>
      )}
    </div>
  );
}
