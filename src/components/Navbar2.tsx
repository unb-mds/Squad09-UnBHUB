import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

export default function NavbarComponent2() {
  return (
    <div
      className="flex justify-content-between align-items-center surface-50"
      style={{ overflow: 'hidden' }}
    >
      <div
        className="flex align-items-center w-3"
        style={{ marginLeft: '30px' }}
      >
        <Image src="/images/logo.svg" width="100" height="100" alt="UnBHUB" />
      </div>
      <div className="flex align-items-center justify-content-end w-9 flex-nowrap">
        <a href="http://localhost:5173/SignIn" className="mx-2">
          <Button
            style={{
              minWidth: '120px',
              maxWidth: '150px',
              whiteSpace: 'nowrap',
            }}
            className="py-3 px-5 text-white"
            label="Entrar"
          />
        </a>
        <a href="http://localhost:5173/signUp" className="mx-2">
          <Button
            style={{
              minWidth: '120px',
              maxWidth: '150px',
              whiteSpace: 'nowrap',
            }}
            className="py-3 px-5 text-white"
            label="Cadastre-se"
          />
        </a>
      </div>
    </div>
  );
}
