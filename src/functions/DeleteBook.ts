import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

export default async function DeleteBookFunction(id: string) {
  if (!auth.currentUser) return;

  const examRef = doc(db, 'Users', auth.currentUser.uid);
  await updateDoc(examRef, {
    [`books.${id}.status`]: 'Deleted',
  });
}
