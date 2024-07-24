import { useState } from 'react';
import { withAuth } from '../../utils/auth';

import SideBarComponent from '../components/SideBar';
import CreateSubjectComponent from '../components/Subject/createSubject';
import SubjectDialogComponent from '../components/Subject/SubjectDialogComponent';
import SubjectsComponent from '../components/SubjectsComponents';

function SubjectsScreen() {
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

const Subjects = withAuth(SubjectsScreen);
export default Subjects;
