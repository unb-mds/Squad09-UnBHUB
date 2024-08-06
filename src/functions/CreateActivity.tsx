import { arrayUnion, doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface ICreateSubject {
  codeSubject: string;
  taskName: string;
  deliveryDay: Timestamp;
  status: string
  description: string;
  taskId: string;
}

export default async function CreateActivityFunction(props: ICreateSubject) {
  if (!auth.currentUser) return;
  const taskId = Math.random().toString(36).substring(7);
  await setDoc(
    doc(db, 'Users', auth.currentUser.uid),
    {
      subjects: arrayUnion({
        codeSubject: props.codeSubject,
        taskName: props.taskName,
        deliveryDay: props.deliveryDay,
        status: props.status,
        description: props.description,
        taskId: props.taskId
      }),
    },
    {
      merge: true,
    }
  );
}
