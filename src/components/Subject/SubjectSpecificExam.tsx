import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';

export default function SubjectSpecificExams({ subject }) {
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
