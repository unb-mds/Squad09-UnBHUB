import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import SearchDropdownComponent from '../Activities/SearchDropdown';

import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateExamFunction from '../../functions/Exams/CreateExam';

import { Timestamp } from 'firebase/firestore';

import { ISubject } from './examInterfaces';

type ExamValues = {
  code: string;
  score: string;
  date: Timestamp | null;
  time: Timestamp | null;
  room: string;
  status: string;
  id: string;
  codeSubject: string;
  subjectID: string;
};

export default function CreateExamDialogComponent(props: {
  userSubjects: ISubject[];
  visibleCreateExam: boolean;
  setVisibleCreateExam: (visible: boolean) => void;
}) {
  return (
    <Formik
      initialValues={{
        subject: {
          name: '',
          code: '',
        },
        code: '',
        score: '',
        date: null,
        time: null,
        room: '',
        status: '',
        id: '',
        codeSubject: '',
        subjectID: '',
      }}
      validationSchema={Yup.object({
        subject: Yup.object().shape({
          name: Yup.string().required('A matéria é obrigatória'),
          code: Yup.string().required('O código da matéria é obrigatório'),
        }),
        code: Yup.string().required('O código é obrigatório'),
        date: Yup.date().required('A data é obrigatória'),
        time: Yup.date().required('O horário é obrigatório'),
        room: Yup.string().required('A sala é obrigatória'),
      })}
      onSubmit={(values, { resetForm }) => {
        const { subject, ...examValues } = values;
        const time = values.time
          ? Timestamp.fromDate(new Date(values.time))
          : null;
        const date = values.date
          ? Timestamp.fromDate(new Date(values.date))
          : null;

        const examData: ExamValues = {
          code: examValues.code,
          score: examValues.score,
          date: date,
          time: time,
          room: examValues.room,
          status: examValues.status,
          id: examValues.id,
          codeSubject: '',
          subjectID: '',
        };

        CreateExamFunction(subject.code, examData).then(() => {
          props.setVisibleCreateExam(false);
          resetForm();
        });
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
              visible={props.visibleCreateExam}
              onHide={() => props.setVisibleCreateExam(false)}
            >
              <div className="p-fluid">
                <div className="field">
                  <label htmlFor="subject">Matéria</label>
                  <SearchDropdownComponent
                    selectedSubject={values.subject}
                    setSelectedSubject={(selectedSubject) =>
                      setFieldValue('subject', {
                        name: selectedSubject.name,
                        code: selectedSubject.code,
                      })
                    }
                  />
                </div>

                <div>
                  {errors.subject && touched.subject ? (
                    <div className="text-red-500">{errors.subject.name}</div>
                  ) : null}
                </div>

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

              <Button
                label="Confirmar"
                icon="pi pi-check"
                type="submit"
                onClick={handleButtonClick}
              />
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
}
