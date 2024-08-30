import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import EditExamDialog from './EditExamDialog';
import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';
import ControlExamStatusBasedOnTime from '../../functions/Exams/ControlExamStatusBasedOnTime';
import { ISubject, IExam } from './examInterfaces';

export default function ExamsDataTableConstructorComponent(props: {
  Usersubjects: ISubject[];
  status: string;
}) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentExam, setCurrentExam] = useState<IExam | null>(null);

  const showEditDialog = (exam: IExam) => {
    setCurrentExam(exam);
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentExam(null);
  };

  const exams = Object.values(props.Usersubjects)
    .map((subject: ISubject) => {
      ControlExamStatusBasedOnTime(subject);
      return subject;
    })
    .flatMap((subject) =>
      Object.values(subject.exams).map((exam) => ({
        ...exam,
        codeSubject: subject.codeSubject,
        subjectID: subject.id,
      }))
    )
    .filter((exam) => exam.status === props.status);

  return (
    <div className="flex flex-column">
      <DataTable
        value={exams}
        tableStyle={{ minWidth: '50rem' }}
        className="text-sm"
        scrollable
        scrollHeight="450px"
      >
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
        <Column
          header="Editar"
          body={(rowData) => (
            <Button
              icon="pi pi-pen-to-square"
              className="p-button-rounded p-button-text"
              onClick={() => showEditDialog(rowData)}
            />
          )}
        />
      </DataTable>

      {currentExam && (
        <EditExamDialog
          visible={dialogVisible}
          onHide={handleDialogClose}
          exam={currentExam}
          subjectID={currentExam?.subjectID} // Passa o subjectID para o diálogo
        />
      )}
    </div>
  );
}
