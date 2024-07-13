import { createBrowserRouter } from 'react-router-dom';
import CalendarComponent from '../components/Calendar';
import DashboardScreen from '../pages/Dashboard';
import MessagesPage from '../pages/Messages';
import SubjectsScreen from '../pages/Subjects';
import SignInScreen from '../pages/SignIn';
import SignUpScreen from '../pages/SignUp';
import LandingPage from '../pages/Landing';
import TaskScreen from '../pages/Tasks';
<<<<<<< HEAD
import SpecificSubjectPage from '../pages/SpecificSubjectPage';
=======
import MenuScreen from '../pages/Menu';
>>>>>>> 9c0bf38 (Feat(#65): Criando sistema para redirecionar para o pdf do cardápio)

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
<<<<<<< HEAD

  {
    path: '/SpecificSubject',
    element: <SpecificSubjectPage />,
=======
  {
    path: '/Menu',
    element: <MenuScreen />,
>>>>>>> 9c0bf38 (Feat(#65): Criando sistema para redirecionar para o pdf do cardápio)
  },
]);

export default router;
