import { useState } from 'react';
import SideBarComponent from '../components/SideBar';
import CreateSubjectComponent from '../components/Subject/createSubject';
import SubjectsComponent from '../components/SubjectsComponents';
import SubjectDialogComponent from '../components/Subject/SubjectDialogComponent';

export default function SubjectsScreen() {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleSubject, setVisibleSubject] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        <CreateSubjectComponent visible={visible} setVisible={setVisible} />
        <SubjectDialogComponent
          visibleSubject={visibleSubject}
          setVisibleSubject={setVisibleSubject}
        />
        <SideBarComponent />
        <SubjectsComponent
          setVisible={setVisible}
          setVisibleSubject={setVisibleSubject}
        />
      </div>
    </>
  );
}
