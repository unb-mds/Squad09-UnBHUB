import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import 'primeicons/primeicons.css';
import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';
import EditExamDialog from './EditExamDialog'; // Supondo que o componente de diálogo esteja neste caminho

interface Exam {
  code: string;
  score: string;
  date: Date;
  time: Date; // Certifique-se de que 'time' está presente em Exam
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
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);

  const showEditDialog = (exam: Exam) => {
    setCurrentExam(exam);
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentExam(null);
  };

  return (
    <>
      <DataTable value={subject.exams} tableStyle={{ minWidth: '50rem' }}>
        <Column field="code" header="Código" />
        <Column field="score" header="Nota" />
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
        <Column field="room" header="Sala" />
        <Column field="status" header="Status" />
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
        />
      )}
    </>
  );
}
