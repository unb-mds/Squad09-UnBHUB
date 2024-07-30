import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface IEditSubject {
  id: string;
  codeSubject?: string;
  nameSubject?: string;
  professor?: string;
  weekDays?: string;
  schedule?: string;
  local?: string;
}

export default async function EditSubjectFunction(
  props: IEditSubject,
  id: string
) {
  if (!auth.currentUser) return;

  const subjectRef = doc(db, 'Users', auth.currentUser.uid);

  // Constrói o objeto com os campos atualizados
  const updatedFields: { [key: string]: any } = {};
  if (props.codeSubject)
    updatedFields[`subjects.${id}.codeSubject`] = props.codeSubject;
  if (props.nameSubject)
    updatedFields[`subjects.${id}.nameSubject`] = props.nameSubject;
  if (props.professor)
    updatedFields[`subjects.${id}.professor`] = props.professor;
  if (props.weekDays) updatedFields[`subjects.${id}.weekDays`] = props.weekDays;
  if (props.schedule) updatedFields[`subjects.${id}.schedule`] = props.schedule;
  if (props.local) updatedFields[`subjects.${id}.local`] = props.local;

  // Atualiza os campos no Firestore
  await updateDoc(subjectRef, updatedFields);
}
