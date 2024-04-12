import { Button } from 'primereact/button';
import InputComponent from '../components/Input';

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
                <label htmlFor="rememberme">Remember me</label>
              </div>
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                Forgot your password?
              </a>
            </div>

            <Button className="py-3 px-8 w-full text-white" label="Entrar" />
            <span className="text-600 font-medium line-height-3">
              Don't have an account?
            </span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
              Create today!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
