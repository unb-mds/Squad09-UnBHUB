import { Formik } from 'formik';
import { Button } from 'primereact/button';

import * as Yup from 'yup';
import InputComponent from '../components/Input';

export default function SignUpCardComponent() {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Username must be at least 3 characters long')
      .required('Required'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Required'),
    Senha: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Required'),
    SenhaNovamente: Yup.string()
      .oneOf([Yup.ref('Senha'), ''], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = () => {};

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        name: '',
        email: '',
        Senha: '',
        SenhaNovamente: '',
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <div className="flex flex-column surface-card p-6 shadow-2 relative w-full border-round lg:w-5 h-screen justify-content-center">
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
            />
            {errors.email ? <div>{errors.email}</div> : null}

            <InputComponent
              label="Username"
              value={values.name}
              setValue={handleChange('name')}
            />
            {errors.name ? <div>{errors.name}</div> : null}
            <InputComponent
              label="Senha"
              value={values.Senha}
              setValue={handleChange('Senha')}
            />
            {errors.Senha ? <div>{errors.Senha}</div> : null}
            <InputComponent
              label="Senha novamente"
              value={values.SenhaNovamente}
              setValue={handleChange('SenhaNovamente')}
            />
            {errors.SenhaNovamente ? <div>{errors.SenhaNovamente}</div> : null}
            <div className="flex align-items-center justify-content-between mb-6"></div>
            <Button
              onClick={() => handleSubmit()}
              className="py-3 px-8 w-full text-white my-0"
              label="Cadastre-se"
            />
          </div>
        </div>
      )}
    </Formik>
  );
}
