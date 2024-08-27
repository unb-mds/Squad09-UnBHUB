import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import EditExamDialog from '../Subject/EditExamDialog';
import formatDate from '../../functions/FormatDate';
import formatTime from '../../functions/FormatTime';
import ControlExamStatusBasedOnTime from '../../functions/Subjects/ControlExamStatusBasedOnTime';

import { Timestamp } from 'firebase/firestore';

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
  codeSubject: string;
  subjectID: string; // Adiciona subjectID à interface IExam
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
    <div className="flex flex-column mx-3 my-3">
      <DataTable value={exams} tableStyle={{ minWidth: '50rem' }}>
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
