import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import EditActivityFunction from '../../functions/EditActivity';
import FinalizeActivityFunction from '../../functions/FinalizedActivity';
import DeletedActivityFunction from "../../functions/DeleteActivity";

export default function EditActivityComponent(props: {
  visibleEdit: boolean;
  EditsetVisible: (visibleEdit: boolean) => void;
  activityData: {
    taskName: string;
    deliveryDay: Date | null;
    description: string;    
  } | null;

  onSave: (updatedActivityData: {
    taskName: string;
    description: string;
    deliveryDay: Date | null;
  }) => void;
  onDelete: () => void;
  activityIndex: number; // Adiciona o índice da atividade
}) {
  const { activityData, visibleEdit, EditsetVisible } = props;
  const [isEditing, setIsEditing] = useState(false);


  const [formData, setFormData] = useState<{
    taskName: string;
    description: string;
    deliveryDay: Date | null;
  } | null>(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (activityData) {
      setFormData(activityData);
    }
  }, [activityData]);

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

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData) {
      EditActivityFunction(formData, props.subjectId, props.taskId, props.status); // Passa o índice do livro para a função
      setIsEditing(false);
      EditsetVisible(false);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(false);
    if (activityData) {
      setFormData(activityData);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    props.onDelete();
    setShowConfirmDialog(false);
    DeletedActivityFunction(props.subjectId, props.taskId);
    EditsetVisible(false);
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
  };

  if (!visibleEdit) {
    return null;
  }

  return (
    <>
      <Dialog
        header={isEditing ? 'Editar atividade' : 'Visualizar atividade'}
        visible={visibleEdit}
        style={{ width: '40vw', maxWidth: '600px' }}
        onHide={() => EditsetVisible(false)}
      >
        <form
          className="flex flex-column gap-5 p-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="taskName"
              value={formData?.taskName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label htmlFor="taskName">Nome da Tarefa</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="description"
              value={formData?.description || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label htmlFor="description">Descrição</label>
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
                  label="Finalizar"
                  style={{
                    borderColor: '#3e74aeb1',
                    color: '#3e74aeb1',
                  }}
                  onClick={() =>
                    FinalizeActivityFunction(
                      props.subjectId,
                      props.taskId
                    ).then(() => EditsetVisible(false))
                  }
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
