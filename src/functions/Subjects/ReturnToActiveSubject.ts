import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';

export default async function ReactivateSubjectFunction(id: string) {
  if (!auth.currentUser) return;

  const subjectRef = doc(db, 'Users', auth.currentUser.uid);
  const subjectSnapshot = await getDoc(subjectRef);

  if (subjectSnapshot.exists()) {
    const tasks = subjectSnapshot.get(`subjects.${id}.tasks`);

    await updateDoc(subjectRef, {
      [`subjects.${id}.status`]: 'Active',
    });

    if (tasks) {
      const taskIds = Object.keys(tasks);
      for (const taskId of taskIds) {
        await updateDoc(doc(db, 'Users', auth.currentUser.uid), {
          [`subjects.${id}.tasks.${taskId}.status`]: 'Active',
        });
      }
    }
  }
}
