import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

// Define um componente funcional React chamado EditActivityComponent.
export default function EditActivityComponent(props: {
  visibleEdit: boolean;
  EditsetVisible: (visibleEdit: boolean) => void;
  activityData: {
    codeSubject: string;
    nameActivity: string;
    deliveryDay: string;
  };
  onSave: (updatedData: {
    codeSubject: string;
    nameActivity: string;
    deliveryDay: string;
  }) => void;
  onDelete: () => void; // Função para excluir a atividade
}) {
  const { activityData, visibleEdit, EditsetVisible, onSave, onDelete } = props;

  // Usa o estado local para armazenar e atualizar os dados da atividade
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(activityData);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Estado para o diálogo de confirmação

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditedData({ ...editedData, [id]: value });
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do botão
    onSave(editedData); // Chama a função passada como prop para salvar os dados
    setIsEditing(false); // Sai do modo de edição
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do botão
    setShowConfirmDialog(true); // Mostra o diálogo de confirmação
  };

  const confirmDelete = () => {
    onDelete(); // Chama a função passada como prop para excluir a atividade
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
    EditsetVisible(false); // Fecha o diálogo principal
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
  };

  if (!activityData) {
    return null; // Não renderiza nada se os dados da atividade não estiverem disponíveis
  }

  return (
    <>
      <Dialog
        header={isEditing ? 'Editar Atividade' : 'Visualizar Atividade'}
        visible={visibleEdit}
        style={{ width: '40vw', maxWidth: '600px' }} // Ajusta a largura do diálogo
        onHide={() => EditsetVisible(false)}
      >
        <form
          className="flex flex-column gap-5 p-4"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Ajustado para Flexbox e adicionado padding */}
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="codeSubject"
              value={
                isEditing ? editedData.codeSubject : activityData.codeSubject
              }
              onChange={isEditing ? handleInputChange : undefined}
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
            />
            <label htmlFor="codeSubject">Código da matéria</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="nameActivity"
              value={
                isEditing ? editedData.nameActivity : activityData.nameActivity
              }
              onChange={isEditing ? handleInputChange : undefined}
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
            />
            <label htmlFor="nameActivity">Nome da Atividade</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="deliveryDay"
              value={
                isEditing ? editedData.deliveryDay : activityData.deliveryDay
              }
              onChange={isEditing ? handleInputChange : undefined}
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
            />
            <label htmlFor="deliveryDay">Dia de entrega</label>
          </FloatLabel>
          <div className="flex justify-content-between gap-2 mt-4">
            {/* Ajustado para Flexbox e adicionado espaçamento */}
            {!isEditing ? (
              <>
                <Button
                  outlined
                  label="Voltar"
                  style={{
                    borderColor: '#3e74aeb1',
                    color: '#3e74aeb1',
                  }}
                  onClick={() => EditsetVisible(false)}
                />
                <Button
                  outlined
                  label="Editar"
                  style={{
                    borderColor: '#f3d300',
                    color: '#f3d300',
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Previne comportamento padrão do botão
                    setIsEditing(true); // Alterna para o modo de edição
                  }}
                />
                <Button
                  outlined
                  label="Excluir"
                  style={{
                    borderColor: '#ff6060',
                    color: '#ff6060',
                  }}
                  onClick={handleDelete} // Mostra o diálogo de confirmação
                />
              </>
            ) : (
              <>
                <Button
                  outlined
                  label="Cancelar"
                  style={{
                    borderColor: '#3e74aeb1',
                    color: '#3e74aeb1',
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Previne comportamento padrão do botão
                    setIsEditing(false); // Sai do modo de edição
                  }}
                />
                <Button
                  outlined
                  label="Salvar"
                  style={{
                    borderColor: '#f3d300',
                    color: '#f3d300',
                  }}
                  onClick={handleSave} // Salva as alterações
                />
              </>
            )}
          </div>
        </form>
      </Dialog>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog
        header="Confirmar Exclusão"
        visible={showConfirmDialog}
        style={{ width: '30vw', maxWidth: '400px' }} // Ajusta a largura do diálogo
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
        <p>Você tem certeza que deseja excluir esta atividade?</p>
      </Dialog>
    </>
  );
}
