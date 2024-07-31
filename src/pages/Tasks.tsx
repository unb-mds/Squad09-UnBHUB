import { withAuth } from '../../utils/auth';
import ExercisesComponent from '../components/Exercises';
import SideBarComponent from '../components/SideBar';

function TaskScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <ExercisesComponent />
    </div>
  );
}

const Tasks = withAuth(TaskScreen);
export default Tasks;
