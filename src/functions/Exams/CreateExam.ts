import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';

import { Timestamp } from 'firebase/firestore';

export interface ICreateExam {
  code: string;
  score: string;
  date: Timestamp | null;
  room: string;
  status: string;
  id: string;
  time: Timestamp | null;
  codeSubject: string;
  subjectID: string;
}

const CreateExamFunction = async (subjectId: string, exam: ICreateExam) => {
  if (!auth.currentUser) return;
  try {
    const examID = Math.random().toString(36).substring(7);

    const examRef = doc(db, 'Users', auth.currentUser.uid);

    await updateDoc(examRef, {
      [`subjects.${subjectId}.exams.${examID}`]: {
        id: examID,
        code: exam.code,
        date: exam.date,
        time: exam.time,
        room: exam.room,
        score: 'A definir',
        status: 'Active',
      },
    });
  } catch (error) {
    console.error('Erro ao adicionar prova: ', error);
  }
};

export default CreateExamFunction;
