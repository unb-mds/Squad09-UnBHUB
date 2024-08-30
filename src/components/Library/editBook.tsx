import { Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import EditBookFunction from '../../functions/EditBook';
import { DeleteBookFunction } from '../../functions/DeleteBook';
import { FinalizedBookFunction } from "../../functions/FinalizedBook";
import { ActiveBookFunction } from "../../functions/FinalizedBook";

interface BookData {
  id: string;
  author: string;
  bookName: string;
  deliveryDay: Timestamp | null;
  status: string;
}

interface EditBookComponentProps {
  visibleEdit1: boolean;
  EditsetVisible1: (visibleEdit1: boolean) => void;
  bookData: BookData | null;
  onSave: (updatedBookData: BookData) => void;
  onDelete: () => void;
}

export default function EditBookComponent(props: EditBookComponentProps) {
  const { bookData, visibleEdit1, EditsetVisible1, onSave, onDelete } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{
    author: string;
    bookName: string;
    deliveryDay: Date | null;
    status: string;
  } | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (bookData) {
      setFormData({
        author: bookData.author,
        bookName: bookData.bookName,
        deliveryDay:
          bookData.deliveryDay instanceof Timestamp
            ? bookData.deliveryDay.toDate()
            : null,
        status: bookData.status
      });
    }
  }, [bookData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData!,
        [id]: value || '',
      }));
    }
  };

  const handleDateChange = (e: { value: Date | null }) => {
    if (formData) {
      setFormData((prevData) => ({
        ...prevData!,
        deliveryDay: e.value || null,
      }));
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData && bookData?.id) {
      const deliveryDayTimestamp = formData.deliveryDay
        ? Timestamp.fromDate(formData.deliveryDay)
        : null;

      await EditBookFunction({
        id: bookData.id,
        author: formData.author,
        bookName: formData.bookName,
        deliveryDay: deliveryDayTimestamp,
        status: formData.status
      });
      setIsEditing(false);
      EditsetVisible1(false);
      onSave({
        id: bookData.id,
        author: formData.author,
        bookName: formData.bookName,
        deliveryDay: deliveryDayTimestamp,
        status: formData.status
      });
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(false);
    if (bookData) {
      setFormData({
        author: bookData.author,
        bookName: bookData.bookName,
        deliveryDay:
          bookData.deliveryDay instanceof Timestamp
            ? bookData.deliveryDay.toDate()
            : null,
        status: bookData.status
      });
    }
  };

  const handleRestore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (bookData?.id) {
      ActiveBookFunction(bookData.id);
      EditsetVisible1(false);
    }
  };

  const handleFinalized = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (bookData?.id) {
      FinalizedBookFunction(bookData.id);
      EditsetVisible1(false);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    if (bookData?.id) {
      DeleteBookFunction(bookData.id);
      onDelete();
    }
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
        <form className="flex flex-column gap-5 p-4" onSubmit={(e) => e.preventDefault()}>
          <FloatLabel>
            <InputText
              className="w-full"
              id="bookName"
              value={formData?.bookName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label htmlFor="bookName">Nome do Livro</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              className="w-full"
              id="author"
              value={formData?.author || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label htmlFor="author">Nome do Autor</label>
          </FloatLabel>
          <FloatLabel>
            <Calendar
              className="w-full"
              id="deliveryDay"
              value={formData?.deliveryDay || null}
              onChange={(e) => handleDateChange(e as any)} // Ajuste aqui
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
                    borderColor: '#ff6060',
                    color: 'white',
                    backgroundColor: '#ff6060',
                  }}
                  onClick={handleCancel}
                />
                <Button label="Salvar" onClick={handleSave} />
              </>
            ) : (
              <>
                {bookData?.status === 'Finalized' && (
                  <Button label="Restaurar" onClick={handleRestore} />
                )}
                {(bookData?.status === 'Ongoing' || bookData?.status === 'Late') && (
                  <Button
                    outlined
                    label="Finalizar"
                    style={{
                      borderColor: 'green',
                      color: 'white',
                      backgroundColor: 'green',
                    }}
                    onClick={handleFinalized}
                  />
                )}
                <Button
                  outlined
                  label="Excluir"
                  style={{
                    borderColor: '#ff6060',
                    color: 'white',
                    backgroundColor: '#ff6060',
                  }}
                  onClick={handleDelete}
                />
              </>
            )}
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-outlined p-button-secondary"
              onClick={() => setIsEditing((prev) => !prev)}
            />
          </div>
        </form>
      </Dialog>
      <Dialog
        header="Confirmar Exclusão"
        visible={showConfirmDialog}
        style={{ width: '30vw', maxWidth: '300px' }}
        modal
        footer={
          <div className="flex justify-content-end gap-2">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={cancelDelete}
              className="p-button-text"
            />
            <Button
              label="Excluir"
              icon="pi pi-check"
              onClick={confirmDelete}
            />
          </div>
        }
        onHide={() => setShowConfirmDialog(false)}
      >
        Tem certeza de que deseja excluir este livro?
      </Dialog>
    </>
  );
}
