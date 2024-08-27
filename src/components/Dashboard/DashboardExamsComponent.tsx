import { Timestamp } from 'firebase/firestore';

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
    <div className="flex flex-column mx-3 my-3">
      <div className="flex justify-content-between align-items-center">
        <p className="flex w-4 h-1rem gap-2 align-items-center">
          <i className="pi pi-file"></i>
          Provas
        </p>
      </div>
      <ExamsDataTableConstructorComponent
        Usersubjects={props.subjects}
        status="Active"
      />
    </div>
  );
}
