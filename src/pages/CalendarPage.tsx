import SideBarComponent from '../components/SideBar';
import NavbarComponent from '../components/Navbar';
import CalendarComp from '../components/CalendarComponent';

export default function CalendarScreen() {
  return (
    <div className="flex">
      <SideBarComponent />
      <div className="flex flex-column w-full">
        <NavbarComponent />
        <CalendarComp />
      </div>
    </div>
  );
}
