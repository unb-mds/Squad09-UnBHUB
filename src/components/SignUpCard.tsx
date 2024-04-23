import { Button } from 'primereact/button';
import InputComponent from '../components/Input';

export default function SignUpCardComponent() {
  return (
    <div className="flex flex-column surface-card p-6 shadow-2 relative w-full border-round lg:w-5 h-screen justify-content-center">
      <div className="text-center mb-5">
        <div className="text-900 text-3xl font-medium mb-3">
          Crie sua conta e conecte-se!
        </div>
        <div>Registro gratuito para começar a aproveitar! </div>
      </div>
      <div>
        <InputComponent label="Endereço de E-mail" />
        <InputComponent label="Username" />
        <InputComponent label="Senha" />
        <InputComponent label="Senha novamente" />
        <div className="flex align-items-center justify-content-between mb-6"></div>

        <Button
          className="py-3 px-8 w-full text-white my-3"
          label="Cadastre-se"
        />
      </div>
    </div>
  );
}
