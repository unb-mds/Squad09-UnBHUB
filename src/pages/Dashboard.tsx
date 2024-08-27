import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { withAuth } from '../../utils/auth';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

import DashboardExamsComponent from '../components/Dashboard/DashboardExamsComponent';
import NavbarComponent from '../components/Dashboard/Navbar';
import SideBarComponent from '../components/SideBar';

import DashboardSubjectsComponent from '../components/Dashboard/DashboardSubjects';
import DashboardTaskComponent from '../components/Dashboard/DashboardTaskComponent';

import GeneralHeader from '../components/Header';
import { Divider } from 'primereact/divider';


function DashboardScreen() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists() && doc.data().subjects) {
            setSubjects(doc.data().subjects);
          } else {
            setSubjects([]);
          }
        });

        return () => unsub();
      }
    });
  }, []);

  return (
    <div className="flex">
      <SideBarComponent />
      <div>
        <Outlet />
      </div>
      <div className="flex flex-column pl-1 gap-1 w-full">
        <GeneralHeader />
        <Divider className="mb-2 mt-0" />
        <div className="flex flex-row">
          <div className="flex flex-column w-11">
            <NavbarComponent />
            <DashboardSubjectsComponent subjects={subjects} />
            <DashboardExamsComponent subjects={subjects}/>
          </div>
          <div className="flex flex-column w-3">
            <DashboardTaskComponent subjects={subjects} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Dashboard = withAuth(DashboardScreen);
export default Dashboard;
