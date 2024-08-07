import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface ICreateUser {
    userName: string;
    course: string;
    currentSemester: number; 
    endSemester: number;
  }

export default async function CreateSubjectFunction(props: ICreateUser) {
  if (!auth.currentUser) return;

  await setDoc(
    doc(db, 'Users', auth.currentUser.uid),
    {
      UserInfo: {
        userName: props.userName,
        course: props.course,
        currentSemester: props.currentSemester,
        endSemester: props.endSemester, 
      },
    },
    {
      merge: true,
    }
  );
}
