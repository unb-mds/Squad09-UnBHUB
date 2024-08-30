import ActivateExamFunction from './ActivateExamFunction';
import DeleteExamFunction from './DeleteExam';
import FinalizeExamFunction from './FinalizeExam';

import { IExam } from '../../components/Exams/examInterfaces';
import { ISubject } from '../../components/Exams/examInterfaces';

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
