import { Outlet } from 'react-router-dom';
import SideBarComponent from '../components/SideBar';
import Navbar from '../components/Navbar';

export default function DashboardScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <div>
        <Outlet />
      </div>
      <Navbar></Navbar>
    </div>
  );
}
