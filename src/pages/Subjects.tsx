import { useState } from 'react';
import SideBarComponent from '../components/SideBar';
import CreateSubjectComponent from '../components/Subject/createSubject';
import SubjectsComponent from '../components/SubjectsComponents';
import SubjectDialogComponent from '../components/Subject/SubjectDialogComponent';

export default function SubjectsScreen() {
  const [subject, setSubject] = useState({});
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleSubject, setVisibleSubject] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        <CreateSubjectComponent visible={visible} setVisible={setVisible} />
        <SubjectDialogComponent
          subject={subject}
          visibleSubject={visibleSubject}
          setVisibleSubject={setVisibleSubject}
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
