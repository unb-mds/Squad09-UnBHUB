import GeneralHeader from '../Header';
import { Divider } from 'primereact/divider';

export default function NavbarComponent5() {
  return (
    <div className="flex flex-column mx-3 my-0">
      <GeneralHeader className="mb-1 mt-1" />
      <Divider className="mb-2 mt-0" />
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-calendar text-4xl" style={{ color: 'white' }} />
          <h1 style={{ color: 'white' }}>Calendário</h1>
        </div>
      </div>
    </div>
  );
}
