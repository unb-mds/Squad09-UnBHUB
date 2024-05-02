import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function Exams() {
  return (
    <div className="flex flex-column ">
      <div className="flex justify-content-between">
        <p>Provas</p>
        <Button
          label="Ver Tudo"
          icon="pi pi-angle-right"
          iconPos="right"
          size="small"
          text
        />
      </div>
      <DataTable tableStyle={{ minWidth: '50rem' }}>
        <Column field="subjects" header="Matérias"></Column>
        <Column field="course" header="Curso"></Column>
        <Column field="date" header="Data"></Column>
        <Column field="time" header="Horário"></Column>
        <Column field="room" header="Sala"></Column>
        <Column field="status" header="Status"></Column>
      </DataTable>
    </div>
  );
}
