import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface ICreateSubject {
  bookName: string;
  schedule: string;
}

export default async function CreateLibraryFunction(props: ICreateSubject) {
  if (!auth.currentUser) return;

  await setDoc(
    doc(db, 'Users', auth.currentUser.uid),
    {
      subjects: arrayUnion({
        bookName: props.bookName,
        schedule: props.schedule,   
      }),
    },
    {
      merge: true,
    }
  );
}