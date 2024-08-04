import NavbarComponent3 from '../components/Navbar3';
import SideBarComponent from '../components/SideBar';
import User from '../components/UserInfo';

export default function DashboardScreen() {
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