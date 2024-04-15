import { Button } from 'primereact/button';
import CheckboxComponent from '../components/Checkbox';
import InputComponent from '../components/Input';

export default function SignUpCardComponent() {
  return (
    <div className="flex flex-column surface-card p-4 shadow-2 border-round lg:w-4 absolute h-screen justify-content-center">
      <div className="text-center mb-5">
        <div className="text-900 text-3xl font-medium mb-3">
          Entre no UnBHUB
        </div>
        <div>Conecte-se para explorar sua vida univerditária</div>
      </div>
      <div>
        <InputComponent label="Endereço de E-mail" />
        <InputComponent label="Nome completo" />
        <InputComponent label="Senha" />
        <div className="flex align-items-center justify-content-between mb-6">
          <div className="flex align-items-center">
            <CheckboxComponent />
          </div>
        </div>

        <Button className="py-3 px-8 w-full text-white my-3" label="Entrar" />
        <div className="flex justify-content-center align-content-center my-3">
          <span className="text-600 font-medium ">
            Ainda não tem uma conta?
          </span>
          <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
            Cadastrar-se
          </a>
        </div>
      </div>
    </div>
  );
}
