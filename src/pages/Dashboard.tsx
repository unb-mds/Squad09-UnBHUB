import { Outlet } from 'react-router-dom';
import SideBarComponent from '../components/SideBar';
import Navbar from '../components/Navbar';
import Exams from '../components/Exams';
import InitialPanel from '../components/InitalPanelDashboard';
import Subjects from '../components/Subjects';
import Tasks from '../components/tasks';

export default function DashboardScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <div>
        <Outlet />
      </div>
      <div className="flex flex-column pl-1 gap-1">
        <Navbar></Navbar>
        <InitialPanel></InitialPanel>
        <div className="flex flex-row">
          <div className="flex flex-column w-9">
            <Subjects></Subjects>
            <Exams></Exams>
          </div>
          <div className="flex flex-column w-3 pl-3">
            <Tasks></Tasks>
          </div>
        </div>
      </div>
    </div>
  );
}
