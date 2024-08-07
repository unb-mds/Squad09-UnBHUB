import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import EditSubjectFunction from '../../functions/EditSubject';

export default function EditSubjectComponent(props: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  subject: any;
}) {
  return (
    <Formik
      initialValues={{
        codeSubject: props.subject.codeSubject,
        nameSubject: props.subject.nameSubject,
        professor: props.subject.professor,
        weekDays: props.subject.weekDays,
        schedule: props.subject.schedule,
        local: props.subject.local,
      }}
      onSubmit={(values) => {
        EditSubjectFunction(values, props.subject.id).then(() => {
          props.setVisible(false);
        });
      }}
      validationSchema={Yup.object().shape({
        codeSubject: Yup.string().required('O código da matéria é obrigatório'),
        nameSubject: Yup.string().required('O nome da matéria é obrigatório'),
        professor: Yup.string().required('O nome do professor é obrigatório'),
        weekDays: Yup.string().required('Os dias da semana são obrigatórios'),
        schedule: Yup.string().required('O horário é obrigatório'),
        local: Yup.string().required('O local é obrigatório'),
      })}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="card flex justify-content-center gap-6"
        >
          <Dialog
            header="Editar matéria"
            visible={props.visible}
            style={{ width: '30vw' }}
            onHide={() => props.setVisible(false)}
          >
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Código da matéria"
                value={values.codeSubject}
                onChange={handleChange('codeSubject')}
                onBlur={handleBlur}
              />
              <label htmlFor="codeSubject">Código da matéria</label>
            </FloatLabel>
            <div>
              {errors.codeSubject && touched.codeSubject ? (
                <div className="text-red-500">{errors.codeSubject}</div>
              ) : null}
            </div>

            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Nome da matéria"
                value={values.nameSubject}
                onChange={handleChange('nameSubject')}
                onBlur={handleBlur}
              />
              <label htmlFor="nameSubject">Nome da matéria</label>
            </FloatLabel>
            {errors.nameSubject && touched.nameSubject ? (
              <div className="text-red-500">{errors.nameSubject}</div>
            ) : null}

            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Professor"
                value={values.professor}
                onChange={handleChange('professor')}
                onBlur={handleBlur}
              />
              <label htmlFor="professor">Professor</label>
            </FloatLabel>
            {errors.professor && touched.professor ? (
              <div className="text-red-500">{errors.professor}</div>
            ) : null}

            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Dias da semana"
                value={values.weekDays}
                onChange={handleChange('weekDays')}
                onBlur={handleBlur}
              />
              <label htmlFor="weekDays">Dias da semana</label>
            </FloatLabel>
            {errors.weekDays && touched.weekDays ? (
              <div className="text-red-500">{errors.weekDays}</div>
            ) : null}

            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Horário"
                value={values.schedule}
                onChange={handleChange('schedule')}
                onBlur={handleBlur}
              />
              <label htmlFor="schedule">Horário</label>
            </FloatLabel>
            {errors.schedule && touched.schedule ? (
              <div className="text-red-500">{errors.schedule}</div>
            ) : null}

            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Local"
                value={values.local}
                onChange={handleChange('local')}
                onBlur={handleBlur}
              />
              <label htmlFor="local">Local</label>
            </FloatLabel>
            {errors.local && touched.local ? (
              <div className="text-red-500">{errors.local}</div>
            ) : null}

            <div className="flex justify-content-between flex-wrap">
              <Button
                outlined
                label="Fechar"
                style={{
                  borderColor: '#ff6060',
                  color: '#ff6060',
                }}
                onClick={() => props.setVisible(false)}
              />
              <Button onClick={handleSubmit} label="Confirmar" />
            </div>
          </Dialog>
        </form>
      )}
    </Formik>
  );
}
