import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import FinalizeActivityFunction from '../FinalizedActivity';
import FinalizeExamFunction from './FinalizeExam';

export default async function FinalizeSubjectFunction(id: string) {
  if (!auth.currentUser) return;

  const subjectRef = doc(db, 'Users', auth.currentUser.uid);
  const subjectSnapshot = await getDoc(subjectRef);

  if (subjectSnapshot.exists()) {
    const tasks = subjectSnapshot.get(`subjects.${id}.tasks`);
    const exams = subjectSnapshot.get(`subjects.${id}.exams`);

    // Finalizar cada tarefa
    if (tasks) {
      const taskIds = Object.keys(tasks);
      for (const taskId of taskIds) {
        await FinalizeActivityFunction(id, taskId);
      }
    }

    // Finalizar a matéria
    await updateDoc(subjectRef, {
      [`subjects.${id}.status`]: 'Finalized',
    });

    // Finalizar cada exame
    if (exams) {
      const examIds = Object.keys(exams);
      for (const examId of examIds) {
        await FinalizeExamFunction(id, examId);
      }
    }
  }
}
