import { createBrowserRouter } from 'react-router-dom';
import CalendarComponent from '../components/Calendar';
import DashboardScreen from '../pages/Dashboard';
import MessagesPage from '../pages/Messages';
import SubjectsScreen from '../pages/Subjects';

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
]);

export default router;
