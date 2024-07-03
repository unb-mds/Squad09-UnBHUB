import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface ICreateSubject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  schedule: string;
  local: string;
}

export default async function CreateSubjectFunction(props: ICreateSubject) {
  if (!auth.currentUser) return;

  await setDoc(
    doc(db, 'Users', auth.currentUser.uid),
    {
      subjects: arrayUnion({
        codeSubject: props.codeSubject,
        nameSubject: props.nameSubject,
        professor: props.professor,
        weekDays: props.weekDays,
        schedule: props.schedule,
        local: props.local,
      }),
    },
    {
      merge: true,
    }
  );
}
