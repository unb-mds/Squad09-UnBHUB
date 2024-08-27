import { createBrowserRouter } from 'react-router-dom';
import CalendarComponent from '../components/Calendar';
import DashboardScreen from '../pages/Dashboard';
import LandingPage from '../pages/Landing';
import LibraryScreen from '../pages/Library';
import MenuScreen from '../pages/Menu';
import EventsPage from '../pages/EventsPage';
import SignInScreen from '../pages/SignIn';
import SignUpScreen from '../pages/SignUp';
import ProfilePage from '../pages/Profile';
import SpecificSubjectPage from '../pages/SpecificSubjectPage';
import SubjectsScreen from '../pages/Subjects';
import Activities from '../pages/TaskScreen';
import CalendarScreen from '../pages/CalendarPage';
import SignUserScreen from '../pages/SignUser';
import ExamsScreen from '../pages/ExamsScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardScreen />,
    children: [
      {
        path: '/Calendar',
        element: <CalendarComponent />,
      },
    ],
  },
  {
    path: '/Subjects',
    element: <SubjectsScreen />,
  },
  {
    path: '/Events',
    element: <EventsPage />,
  },
  {
    path: '/SignIn',
    element: <SignInScreen />,
  },
  {
    path: '/SignUp',
    element: <SignUpScreen />,
  },
  {
    path: '/Landing',
    element: <LandingPage />,
  },
  {
    path: '/Tasks',
    element: <Activities />,
  },
  {
    path: '/Library',
    element: <LibraryScreen />,
  },
  {
    path: '/SpecificSubject',
    element: <SpecificSubjectPage />,
  },
  {
    path: '/Menu',
    element: <MenuScreen />,
  },
  {
    path: '/CalendarPage',
    element: <CalendarScreen />,
  },
  {
    path: '/Profile',
    element: <ProfilePage />,
  },
  {
    path: '/SignUser',
    element: <SignUserScreen />,
  },
  {
    path: '/Exams',
    element: <ExamsScreen />,
  },
]);

export default router;
