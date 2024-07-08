import ExercisesComponent from '../components/Exercises';
import SideBarComponent from '../components/SideBar';

export default function TaskScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <ExercisesComponent />
    </div>
  );
}