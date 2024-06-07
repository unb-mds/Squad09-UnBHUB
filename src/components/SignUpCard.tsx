import { Formik } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';

import InputComponent from '../components/Input';
import SignUpFunction from '../functions/SignUp';

interface InputProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function SignUpCardComponent() {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Username precisa ter no mínimo 3 caractéres')
      .required('Requerido'),
    email: Yup.string()
      .email('Por favor, forneça um email válido')
      .required('Requerido'),
    password: Yup.string()
      .min(6, 'A senha precisa de no mínimo 6 caractéres')
      .required('Requerido'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Senhas precisam combinar')
      .required('Requerido'),
  });

  const handleSubmit = (values: InputProps) => {
    SignUpFunction({ email: values.email, password: values.password }); // Chama a função SignUpFunctioalse);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      }}
    >
      {({ handleChange, values, errors, touched, handleSubmit }) => (
        <div className="flex flex-column surface-card p-6 shadow-2 relative w-full border-round lg:w-5 h-screen justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                Crie sua conta e conecte-se!
              </div>
              <div>Registro gratuito para começar a aproveitar! </div>
            </div>
            <div className="flex gap-2 flex-column">
              <InputComponent
                label="Endereço de E-mail"
                value={values.email}
                setValue={handleChange('email')}
                errors={errors.email}
                touched={touched.email}
              />

              <InputComponent
                label="Username"
                value={values.name}
                setValue={handleChange('name')}
                errors={errors.name}
                touched={touched.name}
              />

              <InputComponent
                label="Senha"
                value={values.password}
                setValue={handleChange('password')}
                errors={errors.password}
                touched={touched.password}
              />

              <InputComponent
                label="Senha novamente"
                value={values.confirm_password}
                setValue={handleChange('confirm_password')}
                errors={errors.confirm_password}
                touched={touched.confirm_password}
              />

              <div className="flex align-items-center justify-content-between mb-6"></div>
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
