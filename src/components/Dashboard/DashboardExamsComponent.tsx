import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Timestamp } from 'firebase/firestore';
import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';
import ControlExamStatusBasedOnTime from '../../functions/Subjects/ControlExamStatusBasedOnTime';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

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
  const exams = Object.values(props.subjects)
    .map((subject: ISubject) => {
      ControlExamStatusBasedOnTime(subject);
      return subject;
    })
    .flatMap((subject) =>
      Object.values(subject.exams).map((exam) => ({
        ...exam,
        codeSubject: subject.codeSubject,
      }))
    )
    .filter((exam) => exam.status === 'Active');

  return (
    <div className="flex flex-column mx-3 my-3">
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
            style={{ marginBottom: '-1.4rem'}}
          />
        </a>
      </div>

      <Divider className='mt-0'/>

      <DataTable value={exams} tableStyle={{ minWidth: '50rem' }} className='text-sm'>
        <Column field="codeSubject" header="Matéria"></Column>
        <Column field="code" header="Nome"></Column>
        <Column field="score" header="Nota"></Column>
        <Column
          field="date"
          header="Data"
          body={(rowData) => formatDate(rowData.date)}
        />
        <Column
          field="time"
          header="Horário"
          body={(rowData) => formatTime(rowData.time)}
        />
        <Column field="room" header="Sala"></Column>
        <Column
          field="status"
          header="Status"
          body={(rowData) => (
            <span>
              {rowData.status === 'Finalized' ? 'Finalizado' : 'Em andamento'}
            </span>
          )}
        />
      </DataTable>
    </div>
  );
}
