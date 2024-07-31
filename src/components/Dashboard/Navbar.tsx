import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

export default function NavbarComponent() {
  return (
    <div className="flex justify-content-between align-items-center surface-50 my-1 mx-3 border-round-xl">
      <div className="flex justify-content-between w-9 px-6">
        <h2>👋 Bem-Vindo!</h2>
      </div>
      <div className="flex align-items-center">
        <a href="http://localhost:5173/Messages">
          <Button
            icon="pi pi-bell p-overlay-badge"
            rounded
            text
            size="large"
            badge="2"
            badgeClassName="p-badge-danger"
            link
          />
        </a>
        <a href="http://localhost:5173/Messages">
          <Button
            icon="pi pi-inbox p-overlay-badge"
            rounded
            text
            size="large"
            link
          />
        </a>
        <Button className="" rounded text>
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            size="large"
            className="mr-2"
            shape="circle"
          />
        </Button>
      </div>
    </div>
  );
}
