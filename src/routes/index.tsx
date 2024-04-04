import { createBrowserRouter } from 'react-router-dom';
import DashboardScreen from '../pages/Dashboard';
import CalendarComponent from '../components/Calendar';
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
    path: '/SignUp',
    element: <SignUpScreen />,
  },
]);

export default router;
