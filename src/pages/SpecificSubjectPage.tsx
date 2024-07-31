import SpecificSubjectComponents from '../components/SpecificSubjectComponents';
import SideBarComponent from '../components/SideBar';
import { useState } from 'react';
import { withAuth } from '../../utils/auth';

function SpecificSubjectPage() {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="flex">
      <SideBarComponent />
      <SpecificSubjectComponents setVisible={setVisible} />
    </div>
  );
}

const specificSubject = withAuth(SpecificSubjectPage);
export default specificSubject;
