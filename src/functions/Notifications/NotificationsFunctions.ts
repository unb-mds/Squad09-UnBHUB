import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';


export async function NotificationControlBookFunction(state:boolean) {
  if (!auth.currentUser) return;

  const subjectRef = doc(db, 'Users', auth.currentUser.uid);
  await updateDoc(subjectRef, {
    [`notifications.book`]: {state},
  });
}

export async function NotificationControlTaskFunction(state:boolean) {
    if (!auth.currentUser) return;
  
    const subjectRef = doc(db, 'Users', auth.currentUser.uid);
    await updateDoc(subjectRef, {
      [`notifications.task`]: {state},
    });
  }

  export async function NotificationControlExamFunction(state:boolean) {
    if (!auth.currentUser) return;
  
    const subjectRef = doc(db, 'Users', auth.currentUser.uid);
    await updateDoc(subjectRef, {
      [`notifications.exam`]: {state},
    });
}