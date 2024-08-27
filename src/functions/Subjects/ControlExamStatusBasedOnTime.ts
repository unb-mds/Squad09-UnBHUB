import formatDate from '../FormatDate';
import formatTime from '../FormatTime';
import ActivateExamFunction from './ActivateExamFunction';
import FinalizeExamFunction from './FinalizeExam';

import { Timestamp } from 'firebase/firestore';

interface ITask {
  deliveryDay: Timestamp;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

interface IExam {
  code: string;
  score: string;
  date: Timestamp;
  room: string;
  status: string;
  id: string;
  time: Timestamp;
}

interface ISubject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  startTime: Date;
  endTime: Date;
  local: string;
  status: string;
  id: string;
  tasks: ITask[];
  exams: IExam[];
}

export default function ControlExamStatusBasedOnTime(subject: ISubject) {
  const today = new Date();
  const firebaseTimestamp = Timestamp.fromDate(today);

  if (subject.status === 'Active') {
    Object.values(subject.exams).forEach((exam: IExam) => {
      if (
        exam.status !== 'Deleted' &&
        ((formatDate(firebaseTimestamp) === formatDate(exam.date) &&
          formatTime(firebaseTimestamp) > formatTime(exam.time)) ||
          formatDate(firebaseTimestamp) > formatDate(exam.date))
      ) {
        FinalizeExamFunction(subject.id, exam.id);
      } else {
        console.log(exam.status);
        if (exam.status !== 'Deleted') {
          ActivateExamFunction(subject.id, exam.id);
        }
      }
    });
  }
}
