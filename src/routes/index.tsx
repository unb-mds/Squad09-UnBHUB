import { createBrowserRouter } from 'react-router-dom';
import DashboardScreen from '../pages/Dashboard';
import CalendarComponent from '../components/Calendar';
import SignInScreen from '../pages/SignIn';
import SignUpScreen from '../pages/SignUp';

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
    path: '/SignIn',
    element: <SignInScreen />,
  },
  {
    path: '/SignUp',
    element: <SignUpScreen />,
  },
]);

export default router;
