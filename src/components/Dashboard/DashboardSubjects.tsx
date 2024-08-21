import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import SubjectCardConstructorComponent from '../Subject/subjectsCardConstructor';

interface Subject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  startTime: Date;
  endTime: Date;
  local: string;
  status: string;
  id: string;
  tasks: [];
  exams: [];
}

export default function DashboardSubjectsComponent(props: {
  subjects: Subject[];
}) {
  return (
    <div className="flex flex-column mx-3 my-3">
      <div className="flex justify-content-between">
        <p className="flex w-4 h-1rem gap-2 align-items-center">
          <i className="pi pi-book"></i>
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
          />
        </div>
      </ScrollPanel>
    </div>
  );
}
