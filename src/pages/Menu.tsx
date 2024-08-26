import SideBarComponent from '../components/SideBar';
import NavbarComponent4 from '../components/Cardapio/Navbar4';
import DisplayMenuComponent from '../components/Cardapio/DisplayMenu';
import Calltoaction2 from '../components/Calltoaction2';

export default function MenuScreen() {
  return (
    <div className="flex">
      <SideBarComponent />
      <div className="flex flex-column w-full ">
        <NavbarComponent4 />
        <DisplayMenuComponent />
        <Calltoaction2 />
      </div>
    </div>
  );
}
