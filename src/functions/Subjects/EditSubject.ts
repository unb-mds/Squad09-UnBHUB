import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import { Timestamp } from 'firebase/firestore';

interface IEditSubject {
  id: string;
  codeSubject?: string;
  nameSubject?: string;
  professor?: string;
  weekDays?: string;
  startTime?: Timestamp | null;
  endTime?: Timestamp | null;
  local?: string;
}

// Cria uma interface para os campos atualizados
interface IUpdatedFields {
  [key: string]: string | Timestamp | null;
}

export default async function EditSubjectFunction(
  props: IEditSubject,
  subjectID: string
) {
  if (!auth.currentUser) return;

  const SubjectRef = doc(db, 'Users', auth.currentUser.uid);

  // Constrói o objeto com os campos atualizados
  const updatedFields: IUpdatedFields = {};
  if (props.codeSubject)
    updatedFields[`subjects.${subjectID}.codeSubject`] = props.codeSubject;
  if (props.nameSubject)
    updatedFields[`subjects.${subjectID}.nameSubject`] = props.nameSubject;
  if (props.professor)
    updatedFields[`subjects.${subjectID}.professor`] = props.professor;
  if (props.weekDays)
    updatedFields[`subjects.${subjectID}.weekDays`] = props.weekDays;
  if (props.startTime)
    updatedFields[`subjects.${subjectID}.startTime`] = props.startTime;
  if (props.endTime)
    updatedFields[`subjects.${subjectID}.endTime`] = props.endTime;
  if (props.local) updatedFields[`subjects.${subjectID}.local`] = props.local;

  await updateDoc(SubjectRef, updatedFields);
}
