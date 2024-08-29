import GeneralHeader from '../Header';
import { Divider } from 'primereact/divider';

export default function NavbarComponent5() {
  return (
    <div className="flex flex-column mx-3 my-1">
      <GeneralHeader />
      <Divider className="mb-2 mt-0" />
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-th-large text-4xl" style={{ color: '#4b4b4b' }} />
          <h1 style={{ color: '#4b4b4b' }}>Cardápio</h1>
        </div>
      </div>
    </div>
  );
}
