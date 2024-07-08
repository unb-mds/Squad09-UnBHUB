import LibraryScreen1 from '../components/LibraryScreen';
import SideBarComponent from '../components/SideBar';

export default function LibraryScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <LibraryScreen1 />
    </div>
  );
}