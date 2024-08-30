import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';

export async function DeleteBookFunction(id: string) {
  if (!auth.currentUser) return;

  const examRef = doc(db, 'Users', auth.currentUser.uid);
  await updateDoc(examRef, {
    [`books.${id}.status`]: 'Deleted',
  });
}

export async function ActiveBookFunction(id: string) {
  if (!auth.currentUser) return;

  const examRef = doc(db, 'Users', auth.currentUser.uid);
  await updateDoc(examRef, {
    [`books.${id}.status`]: 'Ongoing',
  });
}

export async function LateBookFunction(id: string) {
  if (!auth.currentUser) return;

  const examRef = doc(db, 'Users', auth.currentUser.uid);
  await updateDoc(examRef, {
    [`books.${id}.status`]: 'Late',
  });
}
