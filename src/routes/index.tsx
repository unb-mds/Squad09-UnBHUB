import { createBrowserRouter } from 'react-router-dom';
import CalendarComponent from '../components/Calendar';
import DashboardScreen from '../pages/Dashboard';
import MessagesPage from '../pages/Messages';
import SubjectsScreen from '../pages/Subjects';
import SignInScreen from '../pages/SignIn';
import SignUpScreen from '../pages/SignUp';
import LandingPage from '../pages/Landing';
import TaskScreen from '../pages/Tasks';
import CalendarScreen from '../pages/CalendarPage';

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
    element: <TaskScreen />,
  },
  {
    path: '/CalendarPage',
    element: <CalendarScreen />,
  },
]);

export default router;
