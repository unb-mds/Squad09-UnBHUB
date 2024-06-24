import SideBarComponent from '../components/SideBar';
import SubjectsComponent from '../components/SubjectsComponents';

export default function SubjectsScreen() {
  return (
    <>
      <div className="flex">
        <SideBarComponent />
        <SubjectsComponent />
      </div>
    </>
  );
}
