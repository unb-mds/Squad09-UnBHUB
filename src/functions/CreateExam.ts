import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Exam {
  code: string;
  score: string;
  date: Date;
  room: string;
  status: string;
}

const CreateExamFunction = async (subjectId: string, exam: Exam) => {
  try {
    const subjectRef = doc(db, 'Subjects', subjectId);
    await updateDoc(subjectRef, {
      exams: arrayUnion(exam),
    });
  } catch (error) {
    console.error('Erro ao adicionar prova: ', error);
  }
};

export default CreateExamFunction;
