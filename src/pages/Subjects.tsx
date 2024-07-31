import { useState } from 'react';
import { withAuth } from '../../utils/auth';

import SideBarComponent from '../components/SideBar';
import CreateSubjectComponent from '../components/Subject/createSubject';
import EditSubjectComponent from '../components/Subject/EditSubjectComponent';
import SubjectDialogComponent from '../components/Subject/SubjectDialogComponent';
import SubjectsComponent from '../components/Subject/SubjectsComponents';

function SubjectsScreen() {
  const [subject, setSubject] = useState({});
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
