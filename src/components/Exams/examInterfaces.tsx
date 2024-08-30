import { Timestamp } from 'firebase/firestore';

export interface ITask {
  deliveryDay: Timestamp;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

export interface IExam {
  code: string;
  score: string;
  date: Timestamp;
  room: string;
  status: string;
  id: string;
  time: Timestamp;
  codeSubject: string;
  subjectID: string;
}

export interface ISubject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  startTime: Timestamp;
  endTime: Timestamp;
  local: string;
  status: string;
  id: string;
  tasks: ITask[];
  exams: IExam[];
}
