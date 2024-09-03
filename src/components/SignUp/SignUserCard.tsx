import { Formik } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';

import InputComponent from '../Input';
import CreateUserInfoFunction from '../../functions/SignUp/CreateUserInfo';
import { useNavigate } from 'react-router-dom';

interface InputProps {
  userName: string;
  course: string;
  currentSemester: number;
  endSemester: number;
}

export default function SignUserCardComponent() {
  const schema = Yup.object().shape({
    userName: Yup.string().required(
      'O campo de nome de usuário é obrigatório.'
    ),
    course: Yup.string().required('O campo de curso é obrigatório.'),
    currentSemester: Yup.number().required(
      'O campo de semestre atual é obrigatório.'
    ),
    endSemester: Yup.number().required(
      'O campo de semestre provável de término é obrigatório.'
    ),
  });

  const navigate = useNavigate();

  const handleSubmit = (values: InputProps) => {
    CreateUserInfoFunction({
      userName: values.userName,
      course: values.course,
      currentSemester: values.currentSemester,
      endSemester: values.endSemester,
    }).then(() => navigate('/'));
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        userName: '',
        course: '',
        currentSemester: 0,
        endSemester: 0,
      }}
    >
      {({ handleChange, values, errors, touched, handleSubmit }) => (
        <div className="flex flex-column surface-card p-6 shadow-2 relative w-full border-round lg:w-5 h-screen justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-5">
              <img src="/images/logo.svg" alt="Logo" width={150} height={150} />
              <div className="text-900 text-3xl font-medium mb-3">
                Complete seu cadastro
              </div>
              <div>Preencha as informações para completar seu cadastro</div>
            </div>
            <div className="flex gap-2 flex-column">
              <InputComponent
                label="Nome de Usuário"
                value={values.userName}
                onChange={handleChange('userName')}
                errors={errors.userName}
                touched={touched.userName}
              />

              <InputComponent
                label="Curso"
                value={values.course}
                onChange={handleChange('course')}
                errors={errors.course}
                touched={touched.course}
              />

              <InputComponent
                label="Semestre Atual"
                value={values.currentSemester.toString()}
                onChange={handleChange('currentSemester')}
                errors={errors.currentSemester}
                touched={touched.currentSemester}
                type="number"
              />

              <InputComponent
                label="Semestre Provável de Término"
                value={values.endSemester.toString()}
                onChange={handleChange('endSemester')}
                errors={errors.endSemester}
                touched={touched.endSemester}
                type="number"
              />

              <Button
                type="submit"
                className="py-3 px-8 w-full text-white my-0"
                label="Finalizar Cadastro"
              />
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
}
