import ActivateExamFunction from './ActivateExamFunction';
import DeleteExamFunction from './DeleteExam';
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

  const todayDateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  if (subject.status === 'Active') {
    Object.values(subject.exams).forEach((exam: IExam) => {
      if (exam.score == 'Deleted' && exam.status != 'Deleted') {
        DeleteExamFunction(subject.id, exam.id);
      }
      if (!(exam.status == 'Deleted' || exam.score == 'Deleted')) {
        const examDateOnly = new Date(exam.date.seconds * 1000);
        const examDate = new Date(
          examDateOnly.getFullYear(),
          examDateOnly.getMonth(),
          examDateOnly.getDate()
        );

        const examTime = new Date(todayDateOnly.getTime());
        examTime.setHours(new Date(exam.time.seconds * 1000).getHours());
        examTime.setMinutes(new Date(exam.time.seconds * 1000).getMinutes());

        if (
          (todayDateOnly.getTime() === examDate.getTime() &&
            today > examTime) ||
          todayDateOnly > examDate
        ) {
          FinalizeExamFunction(subject.id, exam.id);
        } else {
          ActivateExamFunction(subject.id, exam.id);
        }
      }
    });
  }
}
