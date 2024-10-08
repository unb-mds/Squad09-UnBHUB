import { Formik } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';

import InputComponent from '../../components/Input';
import SignUpFunction from '../../functions/SignUp/SignUp';
import { useNavigate } from 'react-router-dom';

interface InputProps {
  email: string;
  password: string;
  confirm_password: string;
}

export default function SignUpCardComponent() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido.')
      .required('O campo de e-mail é obrigatório.'),
    password: Yup.string().required('O campo de senha é obrigatório.'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'As senhas devem ser iguais.')
      .required('O campo de confirmação de senha é obrigatório.'),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: InputProps) => {
    await SignUpFunction({ email: values.email, password: values.password });
    navigate('/SignUser'); // Redireciona para a página de preenchimento de informações adicionais
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        email: '',
        password: '',
        confirm_password: '',
      }}
    >
      {({ handleChange, values, errors, touched, handleSubmit }) => (
        <div className="flex flex-column surface-card p-6 shadow-2 relative w-full border-round lg:w-5 h-screen justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-5">
              <img src="/images/logo.svg" alt="Logo" width={150} height={150} />
              <div className="text-900 text-3xl font-medium mb-3">
                Crie sua conta e conecte-se!
              </div>
              <div>Registro gratuito para começar a aproveitar! </div>
            </div>
            <div className="flex gap-2 flex-column">
              <InputComponent
                label="Endereço de E-mail"
                value={values.email}
                onChange={handleChange('email')}
                errors={errors.email}
                touched={touched.email}
              />

              <InputComponent
                label="Senha"
                value={values.password}
                onChange={handleChange('password')}
                errors={errors.password}
                touched={touched.password}
                type="password"
              />

              <InputComponent
                label="Senha novamente"
                value={values.confirm_password}
                onChange={handleChange('confirm_password')}
                errors={errors.confirm_password}
                touched={touched.confirm_password}
                type="password"
              />

              <Button
                type="submit"
                className="py-3 px-8 w-full text-white my-0"
                label="Cadastre-se"
              />
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
}
