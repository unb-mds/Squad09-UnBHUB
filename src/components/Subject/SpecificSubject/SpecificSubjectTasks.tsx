import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { ScrollPanel } from 'primereact/scrollpanel';
import formatDate from '../../../functions/FormatDate';
import formatTime from '../../../functions/FormatTime';
import CheckDate from '../../../functions/CheckDateActivity';
import { Timestamp } from 'firebase/firestore';

interface ITask {
  deliveryDay: Timestamp;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

interface IExam {
  code: string;
  score: string;
  date: Timestamp;
  room: string;
  status: string;
  id: string;
  time: Timestamp;
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
  exams: IExam[];
}

interface SpecificSubjectTasksProps {
  subject: ISubject | null;
  status: string;
  styleOption: string;
}

const mediumCardStyles = {
  width: '300px',
  height: '170px',
  titleFontSize: '1rem',
  textFontSize: '1rem',
  margin: '0.75rem',
  titleMarginBottom: '1rem',
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
};

// Função para obter a classe CSS de acordo com o status da tarefa
const getCardBackgroundClass = (taskStatus: string) => {
  switch (taskStatus) {
    case 'Late':
      return 'bg-red-100';
    case 'Finalized':
      return 'bg-green-100';
    case 'Ongoing':
      return 'bg-cyan-100';
    default:
      return 'bg-cyan-100';
  }
};

export default function SpecificSubjectTasks({
  subject,
  status,
  styleOption,
}: SpecificSubjectTasksProps) {
  if (!subject || !subject.tasks) {
    return null;
  }

  const filteredTasks = Object.values(subject.tasks)
    .filter((task: ITask) => task.status === status)
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
        taskStatus = 'Late';
      }
      if (
        deliveryDay >= today &&
        task.status !== 'Finalized' &&
        task.status !== 'Deleted'
      ) {
        CheckDate(deliveryDay, today, task.subjectId, task.taskId, task.status);
        taskStatus = 'Active';
      }
      if (task.status === 'Finalized') {
        taskStatus = 'Finalized';
      }
      if (task.status === 'Deleted') {
        taskStatus = 'Deleted';
      }

      const border = (() => {
        switch (taskStatus) {
          case 'Active':
            return '2px solid #3498db';
          case 'Late':
            return '2px solid #e41223';
          case 'Finalized':
            return '2px solid #12e42b';
        }
      })();

      const {
        width,
        height,
        titleFontSize,
        textFontSize,
        margin,
        titleMarginBottom,
      } = mediumCardStyles;

      return (
        <Card
          key={index}
          style={{
            color: '#4b4b4b',
            border: border,
            width: width,
            height: height,
            display: 'flex',
            flexDirection: 'column',
            padding: margin,
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
          className={getCardBackgroundClass(taskStatus)} // Aplica a classe CSS de fundo
        >
          <div
            style={{
              fontSize: titleFontSize,
              fontWeight: 'bold',
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: titleMarginBottom,
              marginTop: '-1.5rem', // Move title up
            }}
          >
            {truncateText(task.taskName, 20)}
          </div>
          <Divider className="mb-3 mt-2" />
          <div
            style={{
              fontSize: textFontSize,
              textAlign: 'left',
              width: '100%',
              overflowWrap: 'break-word',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p
              className="pi pi-book mt-2"
              style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}
            >
              {truncateText(task.description, 31)}
            </p>
            <p className="pi pi-calendar mt-1" style={{ fontSize: '0.9rem' }}>
              {formatDate(task.deliveryDay)} {formatTime(task.deliveryDay)}
            </p>
          </div>
        </Card>
      );
    });

  if (styleOption === 'Horizontal') {
    if (filteredTasks.length > 0) {
      return (
        <ScrollPanel style={{ width: '100%', height: '12rem' }}>
          <div className="flex flex-wrap w-full gap-4">{filteredTasks}</div>
        </ScrollPanel>
      );
    } else if (filteredTasks.length === 0) {
      return (
        <div className="flex flex-wrap w-full gap-4">
          <p>Nenhuma tarefa encontrada</p>
        </div>
      );
    }
  }
  if (styleOption === 'Vertical') {
    return (
      <div className="flex flex-column w-full gap-2">
        {filteredTasks.length > 0 ? (
          filteredTasks
        ) : (
          <p>Nenhuma tarefa encontrada</p>
        )}
      </div>
    );
  }
}
