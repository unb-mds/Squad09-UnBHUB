import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import SubjectCardConstructorComponent from '../Subject/subjectsCardConstructor';

import { Timestamp } from 'firebase/firestore';

interface ITask {
  deliveryDay: Timestamp;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

// Interface para definir a estrutura de um objeto Exam (prova)
interface IExam {
  code: string;
  score: string;
  date: Timestamp;
  room: string;
  status: string;
  id: string;
  time: Timestamp;
}

// Interface para definir a estrutura de um objeto Subject (matéria)
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

export default function DashboardSubjectsComponent(props: {
  subjects: ISubject[];
}) {
  return (
    <div className="flex flex-column mx-3 my-3">
      <div className="flex justify-content-between">
        <p className="flex w-4 h-1rem gap-2 align-items-center">
          <i className="pi pi-bookmark"></i>
          Matérias
        </p>
        <a href="http://localhost:5173/Subjects">
          <Button
            label="Ver Tudo"
            icon="pi pi-angle-right"
            iconPos="right"
            size="small"
            text
            link
          />
        </a>
      </div>

      <ScrollPanel style={{ width: '100%', height: '22rem' }}>
        <div className="flex">
          <SubjectCardConstructorComponent
            UserSubjects={props.subjects}
            status="Active"
            size="small"
          />
        </div>
      </ScrollPanel>
    </div>
  );
}
