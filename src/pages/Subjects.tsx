import { useState } from 'react';
import { withAuth } from '../../utils/auth';

import SideBarComponent from '../components/SideBar';
import CreateSubjectComponent from '../components/Subject/createSubject';
import EditSubjectComponent from '../components/Subject/EditSubjectComponent';
import SubjectDialogComponent from '../components/Subject/SubjectDialogComponent';
import SubjectsComponent from '../components/Subject/SubjectsComponents';

import { ISubject } from '../components/Exams/examInterfaces';

import { Timestamp } from 'firebase/firestore';

function SubjectsScreen() {
  const [subject, setSubject] = useState<ISubject>({
    codeSubject: '',
    nameSubject: '',
    professor: '',
    weekDays: '',
    startTime: new Timestamp(0, 0), // Inicialize com Timestamp
    endTime: new Timestamp(0, 0), // Inicialize com Timestamp
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
