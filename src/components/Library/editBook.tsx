import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Timestamp } from 'firebase/firestore';
import EditBookFunction from '../../functions/EditBook';

interface BookData {
  id: string;
  codeSubject: string;
  bookName: string;
  deliveryDay: Timestamp | null; // Tipar como Timestamp ou null
}
export default function EditBookComponent(props: {
  visibleEdit1: boolean;
  EditsetVisible1: (visibleEdit1: boolean) => void;
  bookData: BookData | null;
  onSave: (updatedBookData: BookData) => void;
  onDelete: () => void;
}) {
  const { bookData, visibleEdit1, EditsetVisible1 } = props;
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<{
    codeSubject: string;
    bookName: string;
    deliveryDay: Date | null;
  } | null>(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (bookData) {
      setFormData({
        codeSubject: bookData.codeSubject,
        bookName: bookData.bookName,
        deliveryDay:
          bookData.deliveryDay instanceof Timestamp
            ? bookData.deliveryDay.toDate()
            : null,
      });
    }
  }, [bookData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleDateChange = (e: { value: Date }) => {
    if (formData) {
      setFormData((prevData) => ({
        ...prevData,
        deliveryDay: e.value,
      }));
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData && bookData) {
      // Verifica se deliveryDay não é null
      const deliveryDayTimestamp = formData.deliveryDay
        ? Timestamp.fromDate(formData.deliveryDay)
        : null;

      await EditBookFunction({
        id: bookData.id,
        codeSubject: formData.codeSubject,
        bookName: formData.bookName,
        deliveryDay: deliveryDayTimestamp,
      });
      setIsEditing(false);
      EditsetVisible1(false);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(false);
    if (bookData) {
      setFormData({
        codeSubject: bookData.codeSubject,
        bookName: bookData.bookName,
        deliveryDay:
          bookData.deliveryDay instanceof Timestamp
            ? bookData.deliveryDay.toDate()
            : null,
      });
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    props.onDelete();
    setShowConfirmDialog(false);
    EditsetVisible1(false);
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
  };

  if (!visibleEdit1) {
    return null;
  }

  return (
    <>
      <Dialog
        header={isEditing ? 'Editar Livro' : 'Visualizar Livro'}
        visible={visibleEdit1}
        style={{ width: '40vw', maxWidth: '600px' }}
        onHide={() => EditsetVisible1(false)}
      >
        <form
          className="flex flex-column gap-5 p-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="codeSubject"
              value={formData?.codeSubject || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label htmlFor="codeSubject">Código do Livro</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="bookName"
              value={formData?.bookName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label htmlFor="bookName">Nome do Livro</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <Calendar
              className="w-full"
              id="deliveryDay"
              value={formData?.deliveryDay || null}
              onChange={handleDateChange}
              disabled={!isEditing}
              showIcon
              dateFormat="dd/mm/yy"
            />
            <label htmlFor="deliveryDay">Dia de Entrega</label>
          </FloatLabel>
          <div className="flex justify-content-between gap-2 mt-4">
            {isEditing ? (
              <>
                <Button
                  outlined
                  label="Cancelar"
                  style={{
                    borderColor: '#156eccb0',
                    color: '#156eccb0',
                  }}
                  onClick={handleCancel}
                />
                <Button
                  outlined
                  label="Salvar"
                  style={{
                    borderColor: '#f3d300',
                    color: '#f3d300',
                  }}
                  onClick={handleSave}
                />
              </>
            ) : (
              <>
                <Button
                  outlined
                  label="Voltar"
                  style={{
                    borderColor: '#3e74aeb1',
                    color: '#3e74aeb1',
                  }}
                  onClick={() => EditsetVisible1(false)}
                />
                <Button
                  outlined
                  label="Editar"
                  style={{
                    borderColor: '#f3d300',
                    color: '#f3d300',
                  }}
                  onClick={() => setIsEditing(true)}
                />
                <Button
                  outlined
                  label="Excluir"
                  style={{
                    borderColor: '#ff6060',
                    color: '#ff6060',
                  }}
                  onClick={handleDelete}
                />
              </>
            )}
          </div>
        </form>
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
        <p>Você tem certeza que deseja excluir este livro?</p>
      </Dialog>
    </>
  );
}
