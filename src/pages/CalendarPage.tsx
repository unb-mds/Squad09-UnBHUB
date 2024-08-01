import SideBarComponent from '../components/SideBar';
import CalendarComp from '../components/Calendar/CalendarComponent';
import Index from '../components/Calendar/CalendarIndex';
import Footer from '../components/Calendar/CalendarFooter';
import NavbarComponent5 from '../components/Calendar/CalendarNavbar';

export default function CalendarScreen() {
  return (
    <div className="flex">
      <SideBarComponent />
      <div className="flex flex-column w-full">
        <NavbarComponent5 />
        <div className="flex justify-content-between align-items-center surface-50 my-1 mx-3 border-round-xl">
          <div className="flex flex-column justify-content-center w-12 px-6">
            <h1 className="text-center mb-4">📅 Calendário Acadêmico</h1>
            <div className="mb-4">
              <CalendarComp />
            </div>
            <Index />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
