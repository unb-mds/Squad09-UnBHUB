import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface ICreateSubject {
  codeSubject: string;
  nameActivity: string;
  deliveryDay: string;
}

export default async function CreateActivityFunction(props: ICreateSubject) {
  if (!auth.currentUser) return;

  await setDoc(
    doc(db, 'Users', auth.currentUser.uid),
    {
      subjects: arrayUnion({
        codeSubject: props.codeSubject,
        nameActivity: props.nameActivity,
        deliveryDay: props.deliveryDay,
      }),
    },
    {
      merge: true,
    }
  );
}
