import SpecificSubjectComponents from '../components/Subject/SpecificSubject/SpecificSubjectComponents';
import SideBarComponent from '../components/SideBar';
import { withAuth } from '../../utils/auth';

function SpecificSubjectPage() {
  return (
    <div className="flex">
      <SideBarComponent />
      <SpecificSubjectComponents />
    </div>
  );
}

const specificSubject = withAuth(SpecificSubjectPage);
export default specificSubject;
