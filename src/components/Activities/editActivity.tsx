import { useState, useEffect } from 'react'; 
import { Button } from 'primereact/button'; 
import { Dialog } from 'primereact/dialog'; 
import { FloatLabel } from 'primereact/floatlabel'; 
import { InputText } from 'primereact/inputtext'; 
import { Calendar } from 'primereact/calendar'; 
import EditActivityFunction from '../../functions/EditActivity'; 
import FinalizeActivityFunction from '../../functions/FinalizedActivity'; 
import DeletedActivityFunction from '../../functions/DeleteActivity'; 
import { ActiveActivityFunction } from "../../functions/CheckDateActivity";

interface ActivityData {
  taskName: string;
  deliveryDay: Date | null;
  description: string;
}

interface EditActivityComponentProps {
  visibleEdit: boolean;
  EditsetVisible: (visibleEdit: boolean) => void;
  activityData: ActivityData | null;
  onSave: (updatedActivityData: ActivityData) => void;
  onDelete: () => void;
  activityIndex: number;
  subjectId: string; // Adicionei a prop subjectId
  taskId: string; // Adicionei a prop taskId
  status: string; // Adicionei a prop status
}

export default function EditActivityComponent(props: EditActivityComponentProps) {
  const { activityData, visibleEdit, EditsetVisible } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ActivityData | null>(null);
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
        ...prevData!,
        [id]: value || '', 
      }));
    }
  };

  const handleDateChange = (e: { value: Date }) => {
    if (formData) {
      setFormData((prevData) => ({
        ...prevData!,
        deliveryDay: e.value ?? null,
      }));
    }
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData) {
      EditActivityFunction(
        formData, // Passa o objeto `formData`
        props.subjectId, // Passa o `subjectId`
        props.taskId, // Passa o `taskId`
        props.status // Passa o `status`
      );
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

  const handleRestore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    ActiveActivityFunction(props.subjectId, props.taskId);
    EditsetVisible(false);
  };

  const handleFinalized = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    FinalizeActivityFunction(props.subjectId, props.taskId);
    EditsetVisible(false);
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
        <form className="flex flex-column gap-5 p-4" onSubmit={(e) => e.preventDefault()}>
          <FloatLabel>
            <InputText
              className="w-full"
              id="taskName"
              value={formData?.taskName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label htmlFor="taskName">Nome da Tarefa</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              className="w-full"
              id="description"
              value={formData?.description || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label htmlFor="description">Descrição</label>
          </FloatLabel>
          <FloatLabel>
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
                {props.status === 'Finalized' && (
                  <Button label="Restaurar" onClick={handleRestore} />
                )}

                {(props.status === 'Active' || props.status === 'Late') && (
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
                  label="Editar"
                  style={{
                    borderColor: '#f3d300',
                    color: 'white',
                    backgroundColor: '#f3d300',
                  }}
                  onClick={() => setIsEditing(true)}
                />
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
        <p>Você tem certeza que deseja excluir esta tarefa?</p>
      </Dialog>
    </>
  );
}
