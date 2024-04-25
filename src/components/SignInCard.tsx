import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useState } from 'react';

import CheckboxComponent from '../components/Checkbox';
import InputComponent from '../components/Input';
import SignInFunction from '../functions/SignIn';

export default function SignInCardComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitSignIn = () => {
    SignInFunction({ email, password });
  };

  return (
    <div className="flex flex-column surface-card p-4 shadow-2 border-round lg:w-4 absolute h-screen justify-content-center">
      <div className="text-center mb-5">
        <Image src="/images/logo.svg" width="100" height="100" alt="UnBHUB" />
        <div className="text-900 text-3xl font-medium mb-3">
          Entre no UnBHUB
        </div>
        <div>Conecte-se para explorar sua vida universitária</div>
      </div>
      <div>
        <InputComponent
          label="Endereço de E-mail"
          value={email}
          setValue={setEmail}
        />
        <InputComponent label="Senha" value={password} setValue={setPassword} />

        <div className="flex align-items-center justify-content-between mb-6">
          <div className="flex align-items-center">
            <CheckboxComponent />
          </div>
          <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
            Esqueceu sua senha?
          </a>
        </div>

        <Button
          className="py-3 px-8 w-full text-white my-3"
          label="Entrar"
          onClick={onSubmitSignIn}
        />
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
