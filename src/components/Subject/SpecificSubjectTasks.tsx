import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';

import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';
import CheckDate from '../../functions/CheckDateActivity';

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
  code: string; // Código da prova
  score: string; // Nota da prova
  date: Date; // Data da prova
  room: string; // Sala onde a prova será realizada
  status: string; // Status da prova (por exemplo, agendada, realizada, etc.)
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
  tasks: ITask[]; // Ajuste o tipo conforme necessário para suas tarefas
  exams: IExam[]; // Ajuste o tipo conforme necessário para seus exames
}

interface SpecificSubjectTasksProps {
  subject: ISubject | null; // Pode ser null se não houver um subject definido
  status: string;
  styleOption: string;
}

export default function SpecificSubjectTasks({
  subject,
  status,
  styleOption,
}: SpecificSubjectTasksProps) {
  if (!subject || !subject.tasks) {
    return null; // Retorna null se subject ou subject.tasks não estiver definido
  }

  // Filtra e mapeia as tarefas com base no status
  const filteredTasks = Object.values(subject.tasks)
    .filter((task: ITask) => task.status === status)
    .map((task: ITask, index) => {
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

      if (styleOption == 'Horizontal') {
        return (
          <Card
            title={task.taskName}
            key={index}
            className="w-3"
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
      } else if (styleOption == 'Vertical') {
        return (
          <Card
            title={task.taskName}
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
      }
    });

  if (styleOption == 'Horizontal') {
    if (filteredTasks.length > 0) {
      return (
        <ScrollPanel style={{ width: '100%', height: '12rem' }}>
          <div className="flex flex-wrap w-full">{filteredTasks}</div>
        </ScrollPanel>
      );
    } else if (filteredTasks.length == 0) {
      return (
        <div className="flex flex-wrap w-full">{<p>No tasks found.</p>}</div>
      );
    }
  }
  if (styleOption == 'Vertical') {
    return (
      <div className="flex flex-column w-full gap-2">
        {filteredTasks.length > 0 ? filteredTasks : <p>No tasks found.</p>}
      </div>
    );
  }
}
