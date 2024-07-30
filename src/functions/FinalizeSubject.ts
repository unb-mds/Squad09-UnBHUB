import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

export default async function FinalizeSubjectFunction(id: string) {
  if (!auth.currentUser) return;

  const subjectRef = doc(db, 'Users', auth.currentUser.uid);
  await updateDoc(subjectRef, {
    [`subjects.${id}.status`]: 'Finalized',
  });
}
