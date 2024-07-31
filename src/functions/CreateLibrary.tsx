import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface ICreateSubject {
  nameSubject: string;
  bookName: string;
  schedule: string;
}

export default async function CreateLibraryFunction(props: ICreateSubject) {
  if (!auth.currentUser) return;

  await setDoc(
    doc(db, 'Users', auth.currentUser.uid),
    {
      books: arrayUnion({
        nameSubject: props.nameSubject,
        bookName: props.bookName,
        schedule: props.schedule,
      }),
    },
    {
      merge: true,
    }
  );
}
