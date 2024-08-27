import { Formik } from 'formik';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import * as Yup from 'yup';

import CheckboxComponent from './Checkbox';
import InputComponent from '../Input';
import SignInFunction from '../../functions/SignIn/SignIn';

import { useNavigate, useLocation } from 'react-router-dom';

interface InputProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function SignInCardComponent() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor, forneça um email válido.')
      .required('Por favor, forneça um email.'),
    password: Yup.string()
      .min(6, 'A senha precisa de no mínimo 6 caractéres')
      .required('Por favor, forneça uma senha.'),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail =
    location.state?.email || localStorage.getItem('email') || '';
  const initialPassword =
    location.state?.password || localStorage.getItem('password') || '';
  const initialRememberMe = localStorage.getItem('rememberMe') === 'true';

  const onSubmitSignIn = (values: InputProps) => {
    SignInFunction(values.email, values.password).then(() => {
      if (values.rememberMe) {
        localStorage.setItem('email', values.email);
        localStorage.setItem('password', values.password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
      navigate('/');
    });
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmitSignIn}
      initialValues={{
        email: initialEmail,
        password: initialPassword,
        rememberMe: initialRememberMe,
      }}
    >
      {({
        handleChange,
        values,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
      }) => (
        <div className="flex flex-column surface-card p-4 shadow-2 border-round lg:w-4 absolute h-screen justify-content-center">
          <div className="text-center mb-5">
            <Image
              src="/images/logo.svg"
              width="100"
              height="100"
              alt="UnBHUB"
            />
            <div className="text-900 text-3xl font-medium mb-3">
              Entre no UnBHUB
            </div>
            <div className="font-light">
              Conecte-se para explorar sua vida universitária
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <InputComponent
              label="Endereço de E-mail"
              value={values.email}
              setValue={handleChange('email')}
              errors={errors.email}
              touched={touched.email}
              type="text"
            />
            <InputComponent
              label="Senha"
              value={values.password}
              setValue={handleChange('password')}
              errors={errors.password}
              touched={touched.password}
              type="password"
            />

            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <CheckboxComponent
                  label="Lembre-se"
                  checked={values.rememberMe}
                  onChange={(e) =>
                    setFieldValue('rememberMe', e.target.checked)
                  }
                />
              </div>
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                Esqueceu sua senha?
              </a>
            </div>

            <Button
              type="submit"
              className="py-3 px-8 w-full text-white my-3"
              label="Entrar"
            />
            <div className="flex justify-content-center align-content-center my-3">
              <span className="text-600 font-medium ">
                Ainda não tem uma conta?
              </span>
              <a
                href="/signUp"
                className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
              >
                Cadastrar-se
              </a>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
}
