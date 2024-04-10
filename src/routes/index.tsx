import { createBrowserRouter } from 'react-router-dom';
import DashboardScreen from '../pages/Dashboard';
import CalendarComponent from '../components/Calendar';
import SignInScreen from '../pages/SignIn';

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
]);

export default router;
