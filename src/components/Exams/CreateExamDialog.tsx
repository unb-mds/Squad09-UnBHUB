import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import SearchDropdownComponent from '../Activities/SearchDropdown';

import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateExamFunction from '../../functions/Subjects/CreateExam';

import { Timestamp } from 'firebase/firestore';

interface ITask {
  deliveryDay: Timestamp;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

interface IExam {
  code: string;
  score: string;
  date: Timestamp;
  room: string;
  status: string;
  id: string;
  time: Timestamp;
}

interface ISubject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  startTime: Date;
  endTime: Date;
  local: string;
  status: string;
  id: string;
  tasks: ITask[];
  exams: IExam[];
}

export default function CrateExamDialogComponent(props: {
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
        CreateExamFunction(subject.code, examValues).then(() => {
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
                    setSelectedSubject={(props) =>
                      setFieldValue('subject', {
                        name: props.name,
                        code: props.code,
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
                onClick={handleSubmit}
              />
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
}
