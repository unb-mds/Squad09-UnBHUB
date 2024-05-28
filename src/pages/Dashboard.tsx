import { Outlet } from 'react-router-dom';
import ExamsComponent from '../components/Exams';
import NavbarComponent from '../components/Navbar';
import PanelDashboardComponent from '../components/PanelDashboard';
import SideBarComponent from '../components/SideBar';
import SubjectsComponent from '../components/Subjects';
import TasksComponent from '../components/Task';

export default function DashboardScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <div>
        <Outlet />
      </div>
      <div className="flex flex-column pl-1 gap-1">
        <NavbarComponent />
        <div className="flex flex-row">
          <PanelDashboardComponent />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-column w-9">
            <SubjectsComponent />
            <ExamsComponent />
          </div>
          <div className="flex flex-column w-3 pl-3">
            <TasksComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
