import NavbarComponent3 from '../components/Navbar3';
import SideBarComponent from '../components/SideBar';
import User from '../components/UserInfo';
import { withAuth } from '../../utils/auth';


 function ProfileScreen() {
  return (
    <div className="flex">
      <SideBarComponent />
      <div className="flex flex-column w-full ml-2">
        <NavbarComponent3 />
        <User />
      </div>
    </div>
  );
}

const Profile = withAuth(ProfileScreen);
export default Profile;