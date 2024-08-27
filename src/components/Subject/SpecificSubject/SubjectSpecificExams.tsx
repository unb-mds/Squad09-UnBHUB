import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import formatDate from '../../../functions/FormatDate';
import formatTime from '../../../functions/FormatTime';
import EditExamDialog from './EditExamDialog';
import ControlExamStatusBasedOnTime from '../../../functions/Subjects/SpecificSubjects/ControlExamStatusBasedOnTime';

import { Timestamp } from 'firebase/firestore';

interface IExam {
  code: string;
  score: string;
  date: Timestamp;
  room: string;
  status: string;
  id: string;
  time: Timestamp;
}

export default function SubjectSpecificExams({ subject }) {
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

  ControlExamStatusBasedOnTime(subject);

  const filteredExams = Object.values(subject.exams).filter(
    (exam) => exam.status !== 'Deleted'
  );

  return (
    <>
      <DataTable
        value={filteredExams}
        tableStyle={{ minWidth: '50rem' }}
        emptyMessage="Nenhuma prova encontrada"
      >
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
        />
      )}
    </>
  );
}
