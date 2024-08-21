import formatDate from '../FormatDate';
import formatTime from '../FormatTime';
import ActivateExamFunction from './ActivateExamFunction';
import FinalizeExamFunction from './FinalizeExam';

import { Timestamp } from 'firebase/firestore';

interface Subject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  startTime: Date;
  endTime: Date;
  local: string;
  id: string;
  status: string;
  tasks: [];
  exams: [];
}

interface Exam {
  code: string;
  score: string;
  date: Date;
  id: string;
  time: Date;
  room: string;
  status: string;
}

export default function ControlExamStatusBasedOnTime(subject: Subject) {
  const today = new Date();
  const firebaseTimestamp = Timestamp.fromDate(today);

  if (subject.status == 'Active') {
    Object.values(subject.exams).forEach((exam: Exam) => {
      if (
        exam.status != 'Deleted' &&
        ((formatDate(firebaseTimestamp) == formatDate(exam.date) &&
          formatTime(firebaseTimestamp) > formatTime(exam.time)) ||
          formatDate(firebaseTimestamp) > formatDate(exam.date))
      ) {
        FinalizeExamFunction(subject.id, exam.id);
      } else if (exam.status != 'Deleted') {
        ActivateExamFunction(subject.id, exam.id);
      }
    });
  }
}
