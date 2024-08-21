import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import DeleteExamFunction from './DeleteExam';
import DeletedActivityFunction from '../DeleteActivity';

export default async function DeleteSubjectFunction(id: string) {
  if (!auth.currentUser) return;

  const subjectRef = doc(db, 'Users', auth.currentUser.uid);
  const subjectSnapshot = await getDoc(subjectRef);

  if (subjectSnapshot.exists()) {
    const tasks = subjectSnapshot.get(`subjects.${id}.tasks`);
    const exams = subjectSnapshot.get(`subjects.${id}.exams`);

    if (tasks) {
      const taskIds = Object.keys(tasks);
      for (const taskId of taskIds) {
        await DeletedActivityFunction(id, taskId);
      }
    }

    await updateDoc(subjectRef, {
      [`subjects.${id}.status`]: 'Deleted',
    });

    if (exams) {
      const examIds = Object.keys(exams);
      for (const examId of examIds) {
        await DeleteExamFunction(id, examId);
      }
    }
  }
}
