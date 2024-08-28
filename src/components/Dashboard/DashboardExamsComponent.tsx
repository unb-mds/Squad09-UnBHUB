import { Timestamp } from 'firebase/firestore';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

import ExamsDataTableConstructorComponent from '../Exams/ExamsDataTableConstructor';

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

export default function DashboardExamsComponent(props: {
  subjects: ISubject[];
}) {
  return (
    <div className="flex flex-column mx-3">
      <div className="flex justify-content-between">
        <p className="flex w-4 h-1rem gap-2 align-items-center text-sm">
          <i className="pi pi-file" />
          Provas
        </p>
        <a href="/Exams">
          <Button
            label="Ver Tudo"
            icon="pi pi-angle-right"
            iconPos="right"
            size="small"
            text
            style={{ marginBottom: '-1.4rem' }}
          />
        </a>
      </div>

      <Divider className="mt-0" />
      <ExamsDataTableConstructorComponent
        Usersubjects={props.subjects}
        status="Active"
      />
    </div>
  );
}
