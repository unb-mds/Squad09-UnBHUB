import SideBarComponent from '../components/SideBar';

import { withAuth } from '../../utils/auth';

function MessagesPage() {
  return (
    <>
      <SideBarComponent />
    </>
  );
}
const messages = withAuth(MessagesPage);
export default messages;
