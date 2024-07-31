import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface Exam {
  code: string;
  score: string;
  date: Date;
  time: Date;
  room: string;
  status: string;
}

const CreateExamFunction = async (subjectId: string, exam: Exam) => {
  if (!auth.currentUser) return;
  try {
    const examRef = doc(db, 'Users', auth.currentUser.uid);

    await updateDoc(examRef, {
      [`subjects.${subjectId}.exams`]: arrayUnion({
        id: Math.random().toString(36).substring(7),
        code: exam.code,
        date: exam.date,
        time: exam.time,
        room: exam.room,
        score: exam.score,
        status: exam.status,
      }),
    });
  } catch (error) {
    console.error('Erro ao adicionar prova: ', error);
  }
};

export default CreateExamFunction;
