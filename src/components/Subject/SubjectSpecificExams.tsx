import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';

interface Exam {
  code: string;
  score: string;
  date: Date;
  room: string;
  status: string;
}

interface SubjectSpecificExamsProps {
  subject: {
    exams: Exam[];
  };
}

export default function SubjectSpecificExams({
  subject,
}: SubjectSpecificExamsProps) {
  return (
    <DataTable value={subject.exams} tableStyle={{ minWidth: '50rem' }}>
      <Column field="code" header="Código"></Column>
      <Column field="score" header="Nota"></Column>
      <Column
        field="date"
        header="Data"
        body={(rowData) => formatDate(rowData.date)}
      ></Column>
      <Column
        field="date"
        header="Horário"
        body={(rowData) => formatTime(rowData.date)}
      ></Column>
      <Column field="room" header="Sala"></Column>
      <Column field="status" header="Status"></Column>
    </DataTable>
  );
}
