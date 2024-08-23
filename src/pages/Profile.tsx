import SideBarComponent from '../components/SideBar';
import User from '../components/UserInfo';
import { withAuth } from '../../utils/auth';
import { Divider } from 'primereact/divider';

import GeneralHeader from '../components/Header';


 function ProfileScreen() {
  return (
    <div className="flex">
      <SideBarComponent />
      <div className="flex flex-column w-full ml-2">
        <GeneralHeader />
        <Divider className="mb-2 mt-0" />
        <User />
      </div>
    </div>
  );
}

const Profile = withAuth(ProfileScreen);
export default Profile;