import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';

export default function Navbar() {
  return (
    <div className="flex ">
      <div>
        <InputText type="text" placeholder="Buscar"></InputText>
      </div>
      <div className="absolute top-0 right-0 flex align-items-center justify-content-center gap-4  w-20rem h-4rem border-round">
        <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '2rem' }}>
          <Badge></Badge>
        </i>
        <i className="pi pi-inbox p-overlay-badge" style={{ fontSize: '2rem' }}>
          <Badge></Badge>
        </i>
        <i>
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            size="large"
            className="mr-2"
            shape="circle"
          />
        </i>
      </div>
    </div>
  );
}
