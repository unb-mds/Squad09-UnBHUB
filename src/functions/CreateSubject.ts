import { doc, setDoc } from 'firebase/firestore';
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
  const cardID: string = Math.random().toString(36).substring(7);

  await setDoc(
    doc(db, 'Users', auth.currentUser.uid),
    {
      subjects: {
        [cardID]: {
          id: cardID,
          status: 'Active',
          codeSubject: props.codeSubject,
          nameSubject: props.nameSubject,
          professor: props.professor,
          weekDays: props.weekDays,
          schedule: props.schedule,
          local: props.local,
          tasks: [],
          exams: [],
        },
      },
    },
    {
      merge: true,
    }
  );
}