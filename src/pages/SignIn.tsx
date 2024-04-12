import { Button } from 'primereact/button';
import InputComponent from '../components/Input';
import CheckboxComponent from '../components/Checkbox';

export default function SignInScreens() {
  return (
    <div>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round lg:w-4">
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3">
              Entre no UnBHUB
            </div>
            <div>Conecte-se para explorar sua vida univerditária</div>
          </div>
          <div>
            <InputComponent label="Endereço de E-mail" />
            <InputComponent label="Senha" />
            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <CheckboxComponent />
              </div>
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                Esqueceu sua senha?
              </a>
            </div>

            <Button
              className="py-3 px-8 w-full text-white my-2"
              label="Entrar"
            />
            <span className="text-600 font-medium line-height-3">
              Ainda não tem uma conta?
            </span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
              Cadastrar-se
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Código para adicionar imagem de fundo
{
  /* <div className="overflow-hidden">
  <div
    className="bg-cover bg-center border-primary-500 border-2 border-round h-20rem w-full h-20rem"
    style={{
      backgroundImage: "url('public/images/imagemlogin.jpg')",
    }}
  ></div>
</div>; */
}
