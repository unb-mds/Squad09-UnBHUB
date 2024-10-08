import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';

export default async function DeleteExamFunction(
  SubjectID: string,
  ExamID: string
) {
  if (!auth.currentUser) return;

  const subjectRef = doc(db, 'Users', auth.currentUser.uid);
  await updateDoc(subjectRef, {
    [`subjects.${SubjectID}.exams.${ExamID}.score`]: 'Deleted',
    [`subjects.${SubjectID}.exams.${ExamID}.status`]: 'Deleted',
  });
}
