import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

export default function NavbarComponent2() {
  return (
    <div className="flex justify-content-between align-items-center surface-50">
      <div className="flex justify-content-between w-9 px-6">
        <Image src="/images/logo.svg" width="100" height="100" alt="UnBHUB" />
      </div>
      <div className="flex align-items-center">
        <a href="http://localhost:5173/SignIn" className="mx-2">
          <Button className="py-3 px-5 w-full text-white " label="Entrar" />
        </a>
        <a href="http://localhost:5173/signUp" className="mx-2">
          <Button
            className="py-3 px-5 w-full text-white "
            label="Cadastre-se"
          />
        </a>
      </div>
    </div>
  );
}
