import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { Timestamp } from 'firebase/firestore';

interface IEditActivity {
  taskId: string;
  taskName: string;
  description: string;
  deliveryDay: Timestamp;
  subjectId: string;
}

export default async function EditActivityFunction({
  taskId,
  taskName,
  description,
  deliveryDay,
  subjectId,
}: IEditActivity) {
  if (!auth.currentUser) return;

  const taskRef = doc(
    db,
    'Users',
    auth.currentUser.uid,
    'subjects',
    'tasks',
    taskId,
    subjectId
  );

  try {
    await updateDoc(taskRef, {
      taskName,
      description,
      deliveryDay,
    });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}