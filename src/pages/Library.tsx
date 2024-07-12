import { useState } from 'react';
import SideBarComponent from '../components/SideBar';
import LibraryScreen1 from "../components/LibraryScreen";
import CreateLibrary from "../components/Library/createLibrary";

export default function SubjectsScreen() {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        <CreateLibrary visible={visible} setVisible={setVisible} />
        <SideBarComponent />
        <LibraryScreen1 setVisible={setVisible} />
      </div>
    </>
  );
}