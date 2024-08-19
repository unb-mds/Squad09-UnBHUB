import { useState, useEffect } from 'react'; // Importa os hooks useState e useEffect do React.
import { Button } from 'primereact/button'; // Importa o componente Button da biblioteca PrimeReact.
import { Dialog } from 'primereact/dialog'; // Importa o componente Dialog da biblioteca PrimeReact.
import { FloatLabel } from 'primereact/floatlabel'; // Importa o componente FloatLabel da biblioteca PrimeReact.
import { InputText } from 'primereact/inputtext'; // Importa o componente InputText da biblioteca PrimeReact.
import { Calendar } from 'primereact/calendar'; // Importa o componente Calendar da biblioteca PrimeReact.
import EditActivityFunction from '../../functions/EditActivity'; // Importa a função para editar a atividade.
import FinalizeActivityFunction from '../../functions/FinalizedActivity'; // Importa a função para finalizar a atividade.
import DeletedActivityFunction from '../../functions/DeleteActivity'; // Importa a função para excluir a atividade.
import { ActiveActivityFunction } from "../../functions/CheckDateActivity";

export default function EditActivityComponent(props: {
  visibleEdit: boolean; // Propriedade que controla se o diálogo de edição está visível.
  EditsetVisible: (visibleEdit: boolean) => void; // Função para atualizar a visibilidade do diálogo.
  activityData: {
    taskName: string; // Nome da tarefa.
    deliveryDay: Date | null; // Data de entrega da tarefa.
    description: string; // Descrição da tarefa.
  } | null;

  onSave: (updatedActivityData: {
    taskName: string; // Nome atualizado da tarefa.
    description: string; // Descrição atualizada da tarefa.
    deliveryDay: Date | null; // Data de entrega atualizada da tarefa.
  }) => void; // Função chamada ao salvar a atividade.
  onDelete: () => void; // Função chamada ao excluir a atividade.
  activityIndex: number; // Índice da atividade.
}) {
  const { activityData, visibleEdit, EditsetVisible } = props; // Desestrutura as propriedades do componente.
  const [isEditing, setIsEditing] = useState(false); // Estado para verificar se o componente está em modo de edição.

  const [formData, setFormData] = useState<{
    taskName: string; // Nome da tarefa no formulário.
    description: string; // Descrição da tarefa no formulário.
    deliveryDay: Date | null; // Data de entrega da tarefa no formulário.
  } | null>(null); // Inicialmente, o estado do formulário é null.

  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Estado para mostrar ou esconder o diálogo de confirmação de exclusão.

  useEffect(() => {
    if (activityData) {
      setFormData(activityData); // Atualiza o estado do formulário com os dados da atividade recebida via props.
    }
  }, [activityData]); // O efeito é executado toda vez que activityData muda.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { id, value } = e.target; // Obtém o id e valor do campo de entrada.
      setFormData((prevData) => ({
        ...prevData,
        [id]: value, // Atualiza o estado do formulário com o novo valor do campo.
      }));
    }
  };

  const handleDateChange = (e: { value: Date }) => {
    if (formData) {
      setFormData((prevData) => ({
        ...prevData,
        deliveryDay: e.value, // Atualiza a data de entrega no estado do formulário.
      }));
    }
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do botão.
    if (formData) {
      EditActivityFunction(
        formData,
        props.subjectId,
        props.taskId,
        props.status
      ); // Chama a função para editar a atividade.
      setIsEditing(false); // Desativa o modo de edição.
      EditsetVisible(false); // Fecha o diálogo de edição.
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do botão.
    setIsEditing(false); // Desativa o modo de edição.
    if (activityData) {
      setFormData(activityData); // Reverte o formulário para os dados iniciais da atividade.
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
    e.preventDefault(); // Previne o comportamento padrão do botão.
    setShowConfirmDialog(true); // Mostra o diálogo de confirmação para a exclusão.
  };

  const confirmDelete = () => {
    props.onDelete(); // Chama a função de exclusão fornecida via props.
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação.
    DeletedActivityFunction(props.subjectId, props.taskId); // Chama a função para excluir a atividade.
    EditsetVisible(false); // Fecha o diálogo de edição.
  };


  const cancelDelete = () => {
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação sem excluir.
  };

  if (!visibleEdit) {
    return null; // Se o diálogo não está visível, não renderiza nada.
  }

  return (
    <>
      <Dialog
        header={isEditing ? 'Editar atividade' : 'Visualizar atividade'} // Define o título do diálogo com base no modo de edição.
        visible={visibleEdit} // Define a visibilidade do diálogo.
        style={{ width: '40vw', maxWidth: '600px' }} // Define a largura do diálogo.
        onHide={() => EditsetVisible(false)} // Função chamada ao fechar o diálogo.
      >
        <form
          className="flex flex-column gap-5 p-4" // Define o layout do formulário com espaçamento.
          onSubmit={(e) => e.preventDefault()} // Previne o envio padrão do formulário.
        >
          <FloatLabel className="w-full">
            <InputText
              className="w-full" // Define a largura do campo de entrada como total.
              id="taskName"
              value={formData?.taskName || ''} // Define o valor do campo com base no estado do formulário.
              onChange={handleChange} // Função chamada ao alterar o valor do campo.
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição.
            />
            <label htmlFor="taskName">Nome da Tarefa</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="description"
              value={formData?.description || ''} // Define o valor do campo com base no estado do formulário.
              onChange={handleChange} // Função chamada ao alterar o valor do campo.
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição.
            />
            <label htmlFor="description">Descrição</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <Calendar
              className="w-full"
              id="deliveryDay"
              value={formData?.deliveryDay || null} // Define o valor do campo com base no estado do formulário.
              onChange={handleDateChange} // Função chamada ao alterar a data.
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição.
              showIcon // Exibe um ícone de calendário.
              dateFormat="dd/mm/yy" // Define o formato da data.
            />
            <label htmlFor="deliveryDay">Dia de Entrega</label>
          </FloatLabel>
          <div className="flex justify-content-between gap-2 mt-4">
            {' '}
            {isEditing ? ( // Renderiza botões diferentes dependendo se está em modo de edição ou não.
              <>
                <Button
                  outlined
                  label="Cancelar"
                  style={{
                    borderColor: '#156eccb0', // Define a cor da borda do botão.
                    color: '#156eccb0', // Define a cor do texto do botão.
                  }}
                  onClick={handleCancel} // Função chamada ao clicar no botão de cancelar.
                />
                <Button
                  outlined
                  label="Salvar"
                  style={{
                    borderColor: '#f3d300', // Define a cor da borda do botão.
                    color: '#f3d300', // Define a cor do texto do botão.
                  }}
                  onClick={handleSave} // Função chamada ao clicar no botão de salvar.
                />
              </>
            ) : (
              <>
                {props.status === 'Finalized' && (
                    <Button
                     outlined
                     label="Restaurar"
                    style={{
                    borderColor: '#3e74aeb1', // Define a cor da borda do botão.
                    color: '#3e74aeb1', // Define a cor do texto do botão.
                    }}
                    onClick={handleRestore}
                    />
                    )}

                {(props.status === 'Active' || props.status === 'Late') && (
                    <Button
                     outlined
                     label="Finalizar"
                    style={{
                    borderColor: '#3e74aeb1', // Define a cor da borda do botão.
                    color: '#3e74aeb1', // Define a cor do texto do botão.
                    }}
                    onClick={handleFinalized}
                    />
                    )}
                
                <Button
                  outlined
                  label="Editar"
                  style={{
                    borderColor: '#f3d300', // Define a cor da borda do botão.
                    color: '#f3d300', // Define a cor do texto do botão.
                  }}
                  onClick={() => setIsEditing(true)} // Ativa o modo de edição ao clicar no botão de editar.
                />
                <Button
                  outlined
                  label="Excluir"
                  style={{
                    borderColor: '#ff6060', // Define a cor da borda do botão.
                    color: '#ff6060', // Define a cor do texto do botão.
                  }}
                  onClick={handleDelete} // Função chamada ao clicar no botão de excluir.
                />
              </>
            )}
          </div>
        </form>
      </Dialog>

      <Dialog
        header="Confirmar Exclusão" // Título do diálogo de confirmação.
        visible={showConfirmDialog} // Define a visibilidade do diálogo de confirmação.
        style={{ width: '30vw', maxWidth: '400px' }} // Define a largura do diálogo de confirmação.
        onHide={() => setShowConfirmDialog(false)} // Função chamada ao fechar o diálogo de confirmação.
        footer={
          <div className="flex justify-content-center gap-3 p-0">
            {' '}
            <Button
              label="Cancelar"
              icon="pi pi-times" // Ícone de cancelamento.
              className="p-button-text" // Estilo do botão.
              onClick={cancelDelete} // Função chamada ao clicar no botão de cancelar.
            />
            <Button
              label="Confirmar"
              icon="pi pi-check" // Ícone de confirmação.
              className="p-button-text p-button-danger" // Estilo do botão.
              onClick={confirmDelete} // Função chamada ao clicar no botão de confirmar.
            />
          </div>
        }
      >
        <p>Você tem certeza que deseja excluir este livro?</p>
      </Dialog>
    </>
  );
}
