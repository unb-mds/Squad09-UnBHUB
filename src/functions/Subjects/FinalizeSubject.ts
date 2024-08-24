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

    // Finalizar cada tarefa cujo status não seja "Deleted"
    if (tasks) {
      const taskIds = Object.keys(tasks);
      for (const taskId of taskIds) {
        const taskStatus = tasks[taskId].status;
        if (taskStatus !== 'Deleted') {
          await FinalizeActivityFunction(id, taskId);
        }
      }
    }

    // Finalizar a matéria
    await updateDoc(subjectRef, {
      [`subjects.${id}.status`]: 'Finalized',
    });

    // Finalizar cada exame cujo status não seja "Deleted"
    if (exams) {
      const examIds = Object.keys(exams);
      for (const examId of examIds) {
        const examStatus = exams[examId].status;
        if (examStatus !== 'Deleted') {
          await FinalizeExamFunction(id, examId);
        }
      }
    }
  }
}
