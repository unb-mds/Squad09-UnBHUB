import { useState } from 'react';
import SideBarComponent from '../components/SideBar';
import CreateSubjectComponent from '../components/Subject/createSubject';
import SubjectsComponent from '../components/SubjectsComponents';

export default function SubjectsScreen() {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        <CreateSubjectComponent visible={visible} setVisible={setVisible} />
        <SideBarComponent />
        <SubjectsComponent setVisible={setVisible} />
      </div>
    </>
  );
}
