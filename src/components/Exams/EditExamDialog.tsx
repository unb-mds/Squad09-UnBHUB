import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Formik } from 'formik';
import * as Yup from 'yup';

import DeleteExam from '../../functions/Exams/DeleteExam';
import EditExam from '../../functions/Exams/EditExam';

interface EditExamDialogProps {
  visible: boolean;
  onHide: () => void;
  subjectID: string; // Agora é obrigatório
  exam: {
    code: string;
    score: string;
    date: {
      seconds: number;
      nanoseconds: number;
    };
    time: {
      seconds: number;
      nanoseconds: number;
    };
    room: string;
    status: string;
    id: string; // ID da prova para identificar o documento no Firestore
  };
}

export default function EditExamDialog({
  visible,
  onHide,
  exam,
  subjectID,
}: EditExamDialogProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do evento
    setShowConfirmDialog(true); // Exibe o diálogo de confirmação de exclusão
  };

  const confirmDelete = () => {
    DeleteExam(subjectID, exam.id);
    onHide();
    setShowConfirmDialog(false);
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        code: exam.code,
        score: exam.score,
        date: new Date(
          exam.date.seconds * 1000 + exam.date.nanoseconds / 1000000
        ),
        time: new Date(
          exam.time.seconds * 1000 + exam.time.nanoseconds / 1000000
        ),
        room: exam.room,
        status: exam.status,
      }}
      validationSchema={Yup.object().shape({
        code: Yup.string().required('O código da prova é obrigatório'),
        score: Yup.string().required('A nota é obrigatória'),
        date: Yup.date().required('A data é obrigatória'),
        time: Yup.date().required('O horário é obrigatório'),
        room: Yup.string().required('A sala é obrigatória'),
        status: Yup.string().required('O status é obrigatório'),
      })}
      onSubmit={async (values) => {
        const formattedValues = {
          ...values,
          date: new Date(values.date),
          time: new Date(values.time),
        };
        // Atualiza o exame
        await EditExam(formattedValues, exam.id, subjectID); // Passa o subjectID aqui
        onHide(); // Fechar o diálogo após a atualização
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        errors,
        touched,
      }) => {
        const handleButtonClick = (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          e.preventDefault();
          handleSubmit(); // Chama a função handleSubmit do Formik
        };

        return (
          <form
            onSubmit={handleSubmit}
            className="card flex justify-content-center gap-6"
          >
            <Dialog
              header="Editar Prova"
              visible={visible}
              style={{ width: '30vw' }}
              onHide={onHide}
            >
              <FloatLabel>
                <InputText
                  className="flex mt-5 mb-5 w-full"
                  id="code"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="code">Código</label>
              </FloatLabel>
              {errors.code && touched.code ? (
                <div className="text-red-500">{errors.code}</div>
              ) : null}

              <FloatLabel>
                <InputText
                  className="flex mt-5 mb-5 w-full"
                  id="score"
                  name="score"
                  value={values.score}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="score">Nota</label>
              </FloatLabel>
              {errors.score && touched.score ? (
                <div className="text-red-500">{errors.score}</div>
              ) : null}

              <FloatLabel>
                <label htmlFor="date">Data</label>
                <Calendar
                  className="flex w-full"
                  id="date"
                  name="date"
                  value={values.date}
                  onChange={(e) => setFieldValue('date', e.value)}
                  showIcon
                  dateFormat="dd/mm/yy"
                />
              </FloatLabel>
              {errors.date && touched.date ? (
                <div className="text-red-500">
                  {typeof errors.date === 'string'
                    ? errors.date
                    : 'Erro inesperado'}
                </div>
              ) : null}

              <FloatLabel>
                <label htmlFor="time">Horário</label>
                <Calendar
                  className="flex w-full mt-5"
                  id="time"
                  name="time"
                  value={values.time}
                  onChange={(e) => setFieldValue('time', e.value)}
                  icon={() => <i className="pi pi-clock" />}
                  showIcon
                  timeOnly
                />
              </FloatLabel>
              {errors.time && touched.time ? (
                <div className="text-red-500">
                  {typeof errors.time === 'string'
                    ? errors.time
                    : 'Erro inesperado'}
                </div>
              ) : null}

              <FloatLabel>
                <InputText
                  className="flex mt-5 mb-5 w-full"
                  id="room"
                  name="room"
                  value={values.room}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="room">Sala</label>
              </FloatLabel>
              {errors.room && touched.room ? (
                <div className="text-red-500">{errors.room}</div>
              ) : null}

              <div className="flex justify-content-between">
                <Button
                  label="Excluir"
                  icon="pi pi-trash"
                  className="p-button-danger"
                  onClick={handleDelete}
                />
                <Button
                  label="Salvar"
                  icon="pi pi-check"
                  className="mr-2"
                  type="submit"
                  onClick={handleButtonClick} // Garante que handleButtonClick seja chamado
                />
              </div>
            </Dialog>

            <Dialog
              header="Confirmar Exclusão"
              visible={showConfirmDialog}
              style={{ width: '30vw', maxWidth: '400px' }}
              onHide={() => setShowConfirmDialog(false)}
              footer={
                <div className="flex justify-content-center gap-3 p-0">
                  <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    className="p-button-text"
                    onClick={cancelDelete}
                  />
                  <Button
                    label="Confirmar"
                    icon="pi pi-check"
                    className="p-button-text p-button-danger"
                    onClick={confirmDelete}
                  />
                </div>
              }
            >
              <p>Você tem certeza que deseja excluir esta prova?</p>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
}
