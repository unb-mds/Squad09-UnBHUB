import { withAuth } from '../../utils/auth';
import SideBarComponent from '../components/SideBar';
import CalendarComp from '../components/Calendar/CalendarComponent';
import Index from '../components/Calendar/CalendarIndex';
import Footer from '../components/Calendar/CalendarFooter';
import NavbarComponent5 from '../components/Calendar/CalendarNavbar';

function CalendarScreen() {
  return (
    <div className="flex">
      <SideBarComponent />
      <div className="flex flex-column w-full">
        <NavbarComponent5 />
        <div className="flex justify-content-between align-items-center my-1 mx-3 border-round-xl">
          <div className="flex flex-column justify-content-center w-12 px-6">
            <div className="mb-4">
              <CalendarComp />
            </div>
            <Index />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

const Calendar = withAuth(CalendarScreen);
export default Calendar;
