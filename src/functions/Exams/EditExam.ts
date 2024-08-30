import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';

interface IExamValues {
  code?: string;
  room?: string;
  score?: string;
  date?: Date;
  time?: Date;
}

interface IUpdatedFields {
  [key: string]: string | Date;
}

export default async function EditExam(
  values: IExamValues,
  examID: string,
  subjectID: string
) {
  if (!auth.currentUser) return;

  const ExamRef = doc(db, 'Users', auth.currentUser.uid);

  const updatedFields: IUpdatedFields = {};

  if (values.code)
    updatedFields[`subjects.${subjectID}.exams.${examID}.code`] = values.code;
  if (values.room)
    updatedFields[`subjects.${subjectID}.exams.${examID}.room`] = values.room;
  if (values.score)
    updatedFields[`subjects.${subjectID}.exams.${examID}.score`] = values.score;
  if (values.date)
    updatedFields[`subjects.${subjectID}.exams.${examID}.date`] = values.date;
  if (values.time)
    updatedFields[`subjects.${subjectID}.exams.${examID}.time`] = values.time;

  await updateDoc(ExamRef, updatedFields);
}
