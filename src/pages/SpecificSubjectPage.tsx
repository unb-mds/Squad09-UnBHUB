import SpecificSubjectComponents from '../components/SpecificSubjectComponents';
import SideBarComponent from '../components/SideBar';
import { useState } from 'react';

export default function SpecificSubjectPage() {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="flex">
      <SideBarComponent />
      <SpecificSubjectComponents setVisible={setVisible} />
    </div>
  );
}
