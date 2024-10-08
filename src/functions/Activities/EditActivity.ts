import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import { Timestamp } from 'firebase/firestore';

interface IEditActivity {
  taskName: string;
  description: string;
  deliveryDay: Timestamp | null;
}

export default async function EditActivityFunction(
  props: IEditActivity,
  subjectId: string,
  taskId: string,
  status: string
) {
  if (!auth.currentUser) return;

  const taskRef = doc(db, 'Users', auth.currentUser.uid);

  try {
    await updateDoc(taskRef, {
      [`subjects.${subjectId}.tasks.${taskId}`]: {
        taskName: props.taskName,
        description: props.description,
        deliveryDay: props.deliveryDay,
        subjectId: subjectId,
        taskId: taskId,
        status: status,
      },
    });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}
