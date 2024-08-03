import { createBrowserRouter } from 'react-router-dom';
import CalendarComponent from '../components/Calendar';
import DashboardScreen from '../pages/Dashboard';
import LandingPage from '../pages/Landing';
import LibraryScreen from '../pages/Library';
import MenuScreen from '../pages/Menu';
import MessagesPage from '../pages/Messages';
import SignInScreen from '../pages/SignIn';
import SignUpScreen from '../pages/SignUp';
import SpecificSubjectPage from '../pages/SpecificSubjectPage';
import SubjectsScreen from '../pages/Subjects';
import Activities from '../pages/TaskScreen';

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
    path: '/Messages',
    element: <MessagesPage />,
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
]);

export default router;
