import { Timestamp } from 'firebase/firestore';
import { Card } from 'primereact/card';
import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';

interface Task {
  codeSubject: string;
  taskName: string;
  description: string;
  deliveryDay: Timestamp;
  status: string;
}

interface Subject {
  tasks: Task[];
}

interface TasksComponentProps {
  subject: Subject;
  status: string;
  handleEditClick: (activityData: {
    taskName: string;
    deliveryDay: Timestamp;
    codeSubject: string;
  }) => void;
}

export default function TasksComponent({
  subject,
  status,
  handleEditClick,
}: TasksComponentProps) {
  if (!subject || !subject.tasks) {
    return null;
  }

  const filteredTasks = Object.values(subject.tasks)
    .filter((task) => task.status === status)
    .map((task, index) => {
      const border = (() => {
        switch (status) {
          case 'Active':
            return '2px solid #3498db';
          case 'Late':
            return '2px solid #e41223';
          case 'Finalized':
            return '2px solid #12e42b';
          default:
            return '2px solid gray'; // Default border color if status is not matched
        }
      })();

      return (
        <Card
          title={task.codeSubject}
          className="w-3"
          key={index}
          style={{
            color: 'white',
            border: border,
          }}
        >
          <div className="flex flex-column">
            <p
              className="pi pi-arrow-right mt-0"
              onClick={() =>
                handleEditClick({
                  taskName: task.taskName,
                  deliveryDay: task.deliveryDay,
                  codeSubject: task.codeSubject,
                })
              }
            >
              {' '}
              {task.taskName}
            </p>
            <p className="pi pi-arrow-right mt-0">
              {formatDate(task.deliveryDay.toDate())}{' '}
              {formatTime(task.deliveryDay.toDate())}
            </p>
            <p className="pi pi-arrow-right mt-0"> {task.description}</p>
          </div>
        </Card>
      );
    });

  return (
    <div className="flex w-full">
      {filteredTasks.length > 0 ? filteredTasks : <p>No tasks available</p>}
    </div>
  );
}
