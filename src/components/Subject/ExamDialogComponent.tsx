import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateExamFunction from '../../functions/Exams/CreateExam';

import { Timestamp } from 'firebase/firestore';

interface ExamDialogComponentProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  subjectId: string;
}

const ExamDialogComponent: React.FC<ExamDialogComponentProps> = ({
  visible,
  setVisible,
  subjectId,
}) => {
  return (
    <Formik
      initialValues={{
        id: '',
        codeSubject: '',
        subjectID: '',
        code: '',
        score: '',
        date: null,
        time: null,
        room: '',
        status: '',
      }}
      validationSchema={Yup.object({
        code: Yup.string().required('O código é obrigatório'),
        date: Yup.date().required('A data é obrigatória'),
        time: Yup.date().required('O horário é obrigatório'),
        room: Yup.string().required('A sala é obrigatória'),
      })}
      onSubmit={(values) => {
        if (values.date && values.time) {
          const exam = {
            ...values,
            date: Timestamp.fromDate(new Date(values.date)),
            time: Timestamp.fromDate(new Date(values.time)),
          };

          CreateExamFunction(subjectId, exam).then(() => {
            setVisible(false);
          });
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
        errors,
        touched,
      }) => {
        const handleButtonClick = (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          e.preventDefault();
          handleSubmit();
        };
        return (
          <form onSubmit={handleSubmit}>
            <Dialog
              header="Adicionar Prova"
              visible={visible}
              onHide={() => setVisible(false)}
            >
              <div className="p-fluid">
                <div className="field">
                  <label htmlFor="code">Código</label>
                  <InputText
                    id="code"
                    name="code"
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.code && touched.code ? (
                    <div className="text-red-500">{errors.code}</div>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="date">Data</label>
                  <Calendar
                    id="date"
                    name="date"
                    value={values.date}
                    dateFormat="dd/mm/yy"
                    onChange={(e) => setFieldValue('date', e.value)}
                    showIcon
                  />
                  {errors.date && touched.date ? (
                    <div className="text-red-500">{errors.date}</div>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="time">Horário</label>
                  <Calendar
                    id="time"
                    name="time"
                    value={values.time}
                    onChange={(e) => setFieldValue('time', e.value)}
                    showIcon
                    icon={() => <i className="pi pi-clock" />}
                    timeOnly
                  />
                  {errors.time && touched.time ? (
                    <div className="text-red-500">{errors.time}</div>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="room">Sala</label>
                  <InputText
                    id="room"
                    name="room"
                    value={values.room}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.room && touched.room ? (
                    <div className="text-red-500">{errors.room}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-content-center">
                <Button
                  label="Confirmar"
                  icon="pi pi-check"
                  type="submit"
                  onClick={handleButtonClick}
                />
              </div>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
};

export default ExamDialogComponent;
