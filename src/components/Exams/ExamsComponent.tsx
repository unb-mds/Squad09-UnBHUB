import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Timestamp } from 'firebase/firestore';

import ExamsDataTableConstructorComponent from './ExamsDataTableConstructor';

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

export default function ExamsComponents(props: {
  UserSubjects: ISubject[];
  setVisibleCreateExam: (visibleCreateExam: boolean) => void;
}) {
  return (
    <div>
      <div className="flex h-1rem gap-2 align-items-center px-6 py-5 mb-6">
        <i className="pi pi-file text-4xl"> </i>
        <h1>Provas</h1>
      </div>
      <div className="flex justify-content-between align-items-center px-2">
        <div>
          <i className="pi pi-forward mx-2" style={{ color: '#3498db' }} />
          Em Andamento
        </div>

        <Button
          label="Adicionar"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          text
          link
          onClick={() => props.setVisibleCreateExam(true)}
        />
      </div>
      <Divider className="mb-4 mt-1"></Divider>

      <ExamsDataTableConstructorComponent
        Usersubjects={props.UserSubjects}
        status={'Active'}
      />

      <div className="flex align-items-center px-2">
        <i className="pi pi-check my-3 mx-2" style={{ color: 'green' }} />
        Finalizadas
      </div>
      <Divider className="mb-4 mt-1"></Divider>
      <ExamsDataTableConstructorComponent
        Usersubjects={props.UserSubjects}
        status={'Finalized'}
      />
    </div>
  );
}
