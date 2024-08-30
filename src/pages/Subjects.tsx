import { useState } from 'react';
import { withAuth } from '../../utils/auth';

import SideBarComponent from '../components/SideBar';
import CreateSubjectComponent from '../components/Subject/createSubject';
import EditSubjectComponent from '../components/Subject/EditSubjectComponent';
import SubjectDialogComponent from '../components/Subject/SubjectDialogComponent';
import SubjectsComponent from '../components/Subject/SubjectsComponents';

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

function SubjectsScreen() {
  const [subject, setSubject] = useState<ISubject>({
    codeSubject: '',
    nameSubject: '',
    professor: '',
    weekDays: '',
    startTime: new Date(),
    endTime: new Date(),
    local: '',
    status: '',
    id: '',
    tasks: [],
    exams: [],
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleSubject, setVisibleSubject] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        <CreateSubjectComponent visible={visible} setVisible={setVisible} />
        <EditSubjectComponent
          visible={editVisible}
          setVisible={setEditVisible}
          subject={subject}
        />
        <SubjectDialogComponent
          subject={subject}
          visibleSubject={visibleSubject}
          setVisibleSubject={setVisibleSubject}
          setEditVisible={setEditVisible}
        />
        <SideBarComponent />
        <SubjectsComponent
          setSubject={setSubject}
          setVisible={setVisible}
          setVisibleSubject={setVisibleSubject}
        />
      </div>
    </>
  );
}

const Subjects = withAuth(SubjectsScreen);
export default Subjects;
