import { Outlet } from 'react-router-dom';
import { withAuth } from '../../utils/auth';

import ExamsComponent from '../components/Dashboard/Exams';
import NavbarComponent from '../components/Dashboard/Navbar';
import SideBarComponent from '../components/SideBar';

import DashboardSubjectsComponent from '../components/Dashboard/DashboardSubjects';
import TasksComponent from '../components/Dashboard/Task';

function DashboardScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <div>
        <Outlet />
      </div>
      <div className="flex flex-column pl-1 gap-1">
        <NavbarComponent />
        <div className="flex flex-row">{/* <PanelDashboardComponent /> */}</div>
        <div className="flex flex-row">
          <div className="flex flex-column w-9">
            <DashboardSubjectsComponent />
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

const Dashboard = withAuth(DashboardScreen);
export default Dashboard;
