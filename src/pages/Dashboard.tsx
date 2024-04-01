import { Outlet } from 'react-router-dom';
import SideBarComponent from '../components/SideBar';

export default function DashboardScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
