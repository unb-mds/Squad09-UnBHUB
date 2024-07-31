import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'; // Certifique-se de que arrayUnion está importado
import { db } from '../../../config/firebase';

interface ExamDialogComponentProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  subjectId: string | null;
  refreshExams: () => void;
}

const ExamDialogComponent: React.FC<ExamDialogComponentProps> = ({
  visible,
  setVisible,
  subjectId,
  refreshExams,
}) => {
  const [exam, setExam] = useState({
    code: '',
    score: '',
    date: null as Date | null,
    room: '',
    status: '',
  });

  const handleAddExam = async () => {
    console.log('exam');
    if (subjectId) {
      console.log('id');
      const subjectRef = doc(db, 'Subjects', subjectId);
      await updateDoc(subjectRef, {
        exams: arrayUnion(exam),
      });
      refreshExams();
      setVisible(false);
    }
  };

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
      <Button label="Adicionar" icon="pi pi-check" onClick={handleAddExam} />
    </Dialog>
  );
};

export default ExamDialogComponent;
