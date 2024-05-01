import { createBrowserRouter } from 'react-router-dom';
import DashboardScreen from '../pages/Dashboard';
import CalendarComponent from '../components/Calendar';
import SubjectsPage from '../pages/Subjects';
import MessagesPage from '../pages/Messages';

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
    element: <SubjectsPage />,
  },
  {
    path: '/Messages',
    element: <MessagesPage />,
  },
]);

export default router;
