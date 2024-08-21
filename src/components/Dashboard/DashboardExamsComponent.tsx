import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DashboardExamsComponent() {
  return (
    <div className="flex flex-column mx-3 my-3">
      <div className="flex justify-content-between align-items-center">
        <p className="flex w-4 h-1rem gap-2 align-items-center">
          <i className="pi pi-file"></i>
          Provas
        </p>
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
