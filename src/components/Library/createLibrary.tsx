import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateLibraryFunction from '../../functions/CreateLibrary';
import { Timestamp } from 'firebase/firestore';

export default function CreateLibrary(props: {
  visibleCreate1: boolean;
  CreatesetVisible1: (visibleCreate: boolean) => void;
}) {
  return (
    <Formik
      initialValues={{
        codeSubject: '',
        bookName: '',
        deliveryDay: null,
      }}
      onSubmit={(values) => {
        // Converte a data selecionada para um Timestamp
        const deliveryDayTimestamp = Timestamp.fromDate(values.deliveryDay);

        CreateLibraryFunction({
          codeSubject: values.codeSubject,
          bookName: values.bookName,
          deliveryDay: deliveryDayTimestamp,
        }).then(() => {
          props.CreatesetVisible1(false);
        });
      }}
      validationSchema={Yup.object().shape({
        codeSubject: Yup.string().required(
          'Obrigatório fornecer nome da matéria'
        ),
        bookName: Yup.string().required('Obrigatório fornecer nome do livro'),
        deliveryDay: Yup.date().required('Obrigatório fornecer data'),
      })}
    >
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
        errors,
        touched,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="card flex justify-content-center gap-6"
        >
          <Dialog
            header="Cadastrar livro"
            visible={props.visibleCreate1}
            style={{ width: '30vw' }}
            onHide={() => props.CreatesetVisible1(false)}
          >
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="codeSubject"
                name="codeSubject"
                value={values.codeSubject}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="codeSubject">Nome da matéria</label>
            </FloatLabel>
            {errors.codeSubject && touched.codeSubject ? (
              <div className="text-red-500">{errors.codeSubject}</div>
            ) : null}

            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="bookName"
                name="bookName"
                value={values.bookName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="bookName">Nome do livro</label>
            </FloatLabel>
            {errors.bookName && touched.bookName ? (
              <div className="text-red-500">{errors.bookName}</div>
            ) : null}

            <FloatLabel>
              <Calendar
                className="flex mt-5 mb-5 w-full"
                id="deliveryDay"
                name="deliveryDay"
                value={values.deliveryDay}
                onChange={(e) => setFieldValue('deliveryDay', e.value)}
                onBlur={handleBlur}
                showIcon
                dateFormat="dd/mm/yy"
              />
              <label htmlFor="deliveryDay">Data de devolução</label>
            </FloatLabel>
            {errors.deliveryDay && touched.deliveryDay ? (
              <div className="text-red-500 my-5">{errors.deliveryDay}</div>
            ) : null}

            <div className="flex justify-content-between flex-wrap">
              <Button
                outlined
                label="Fechar"
                style={{
                  borderColor: '#ff6060',
                  color: '#ff6060',
                }}
                onClick={() => props.CreatesetVisible1(false)}
              />
              <Button onClick={handleSubmit} label="Confirmar" />
            </div>
          </Dialog>
        </form>
      )}
    </Formik>
  );
}
