import { withAuth } from '../../utils/auth';
import SideBarComponent from '../components/SideBar';

function TestScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
    </div>
  );
}

const tests = withAuth(TestScreen);
export default tests;
