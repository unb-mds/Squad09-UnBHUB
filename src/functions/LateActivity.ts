import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

export async function LateActivityFunction(id: string, taskId: string) {
  if (!auth.currentUser) return;

  const subjectRef = doc(db, 'Users', auth.currentUser.uid);
  await updateDoc(subjectRef, {
    [`subjects.${id}.tasks.${taskId}.status`]: 'Late',
  });
}

export async function ActiveActivityFunction(id: string, taskId: string) {
    if (!auth.currentUser) return;
  
    const subjectRef = doc(db, 'Users', auth.currentUser.uid);
    await updateDoc(subjectRef, {
      [`subjects.${id}.tasks.${taskId}.status`]: 'Active',
    });
  }
