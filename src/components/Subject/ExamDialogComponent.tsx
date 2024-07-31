import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import CreateExamFunction from '../../functions/CreateExam';

interface ExamDialogComponentProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  subjectId: string;
  refreshExams: () => void;
}

const ExamDialogComponent: React.FC<ExamDialogComponentProps> = ({
  visible,
  setVisible,
  subjectId,
}) => {
  const [exam, setExam] = useState({
    code: '',
    score: '',
    date: null as Date | null,
    room: '',
    status: '',
  });

  return (
    <Dialog
      header="Adicionar Prova"
      visible={visible}
      onHide={() => setVisible(false)}
    >
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="code">Código</label>
          <InputText
            id="code"
            value={exam.code}
            onChange={(e) => setExam({ ...exam, code: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="score">Nota</label>
          <InputText
            id="score"
            value={exam.score}
            onChange={(e) => setExam({ ...exam, score: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="date">Data</label>
          <Calendar
            id="date"
            value={exam.date}
            onChange={(e) => setExam({ ...exam, date: e.value as Date | null })}
            showIcon
          />
        </div>
        <div className="field">
          <label htmlFor="room">Sala</label>
          <InputText
            id="room"
            value={exam.room}
            onChange={(e) => setExam({ ...exam, room: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <InputText
            id="status"
            value={exam.status}
            onChange={(e) => setExam({ ...exam, status: e.target.value })}
          />
        </div>
      </div>
      <Button
        label="Adicionar"
        icon="pi pi-check"
        onClick={() => CreateExamFunction(subjectId, exam)}
      />
    </Dialog>
  );
};

export default ExamDialogComponent;
