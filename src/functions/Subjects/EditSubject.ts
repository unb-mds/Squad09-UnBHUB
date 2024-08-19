import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';

interface IEditSubject {
  id: string;
  codeSubject?: string;
  nameSubject?: string;
  professor?: string;
  weekDays?: string;
  startTime?: Date;
  endTime?: Date;
  local?: string;
}

export default async function EditSubjectFunction(
  props: IEditSubject,
  subjectID: string
) {
  if (!auth.currentUser) return;

  const SubjectRef = doc(db, 'Users', auth.currentUser.uid);
  // Constrói o objeto com os campos atualizados
  const updatedFields: { [key: string]: any } = {};
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
