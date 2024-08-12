import { Card } from 'primereact/card';
import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';
import CheckDate from '../../functions/CheckDateActivity';
import { Timestamp } from 'firebase/firestore';

interface Task {
  deliveryDay: Timestamp;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

export default function SpecificSubjectTasks({ subject, status }) {
  if (!subject || !subject.tasks) {
    return null; // Retorna null se subject ou subject.tasks não estiver definido
  }

  // Filtra e mapeia as tarefas com base no status
  const filteredTasks = Object.values(subject.tasks)
    .filter((task) => task.status === status)
    .map((task: Task, index) => {
      const deliveryDay = task.deliveryDay.toDate();
      const today = new Date();
      let status = '';
      if (
        deliveryDay < today &&
        task.status != 'Finalized' &&
        task.status != 'Deleted'
      ) {
        CheckDate(deliveryDay, today, task.subjectId, task.taskId, task.status);
        status = 'Late';
      }
      if (
        deliveryDay >= today &&
        task.status != 'Finalized' &&
        task.status != 'Deleted'
      ) {
        CheckDate(deliveryDay, today, task.subjectId, task.taskId, task.status);
        status = 'Active';
      }
      if (task.status == 'Finalized') {
        status = 'Finalized';
      }
      if (task.status == 'Deleted') {
        status = 'Deleted';
      }

      const border = (() => {
        switch (status) {
          case 'Active':
            return '2px solid #3498db';
          case 'Late':
            return '2px solid #e41223';
          case 'Finalized':
            return '2px solid #12e42b';
        }
      })();

      return (
        <Card
          title={task.taskName}
          className="w-3"
          key={index}
          style={{
            color: 'white',
            border: border,
          }}
        >
          <div className="flex flex-column">
            <p className="pi pi-arrow-right mt-0"> {task.description}</p>
            <p className="pi pi-arrow-right mt-0">
              {formatDate(task.deliveryDay)} {formatTime(task.deliveryDay)}
            </p>
          </div>
        </Card>
      );
    });

  return (
    <div className="flex w-full">
      {filteredTasks.length > 0 ? filteredTasks : <p>No tasks found.</p>}
    </div>
  );
}
