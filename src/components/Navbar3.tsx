import { Button } from 'primereact/button';

export default function NavbarComponent3() {
  return (
    <div className="flex justify-content-between align-items-center surface-50 my-1 mx-0 border-round-xl w-full">
      <div className="flex justify-content-between w-9 px-6">
        <h2>Perfil de Usuário</h2>
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
      </div>
    </div>
  );
}