import SideBarComponent from '../components/SideBar';
import { withAuth } from '../../utils/auth';
import { Divider } from 'primereact/divider';
import GeneralHeader from '../components/Header';
import { Message } from 'primereact/message';
import { Image } from 'primereact/image';

function EventsPage() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <div className="flex flex-column mx-3 my-1 w-full">
        <GeneralHeader className="mb-1 mt-1" />
        <Divider className="mb-2" />
        
        <div className="flex flex-column align-items-center justify-content-center h-full" style={{ height: '70vh' }}>
          <Image 
            src="../public/images/inDevelop.png" 
            alt="Em Desenvolvimento" 
            width="500"
          />
          <Message 
            severity="info" 
            text="Página em Desenvolvimento"
            className="mt-3 text-center"
          />
        </div>
      </div>
    </div>
  );
}

const events = withAuth(EventsPage);
export default events;
