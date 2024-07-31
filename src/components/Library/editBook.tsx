import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

export default function EditBookComponent(props: {
  visibleEdit1: boolean;
  EditsetVisible1: (visibleEdit1: boolean) => void;
  bookData: { codeBook: string; nameBook: string; deliveryDay: string } | null;
  onSave: (updatedBookData: {
    codeBook: string;
    nameBook: string;
    deliveryDay: string;
  }) => void;
  onDelete: () => void; // Função para excluir o livro
}) {
  const { bookData, visibleEdit1, EditsetVisible1, onSave, onDelete } = props;

  // Estado para controlar o modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Estado para os dados do formulário
  const [formData, setFormData] = useState<{
    codeBook: string;
    nameBook: string;
    deliveryDay: string;
  } | null>(null);

  // Estado para o diálogo de confirmação de exclusão
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (bookData) {
      setFormData(bookData); // Atualiza os dados do formulário quando bookData muda
    }
  }, [bookData]);

  useEffect(() => {
    console.log('Current formData:', formData); // Log para verificar o estado atual dos dados do formulário
  }, [formData]);

  // Manipula a mudança nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  // Salva as alterações
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do botão
    if (formData) {
      console.log('Saving data:', formData); // Log para verificar os dados antes de salvar
      onSave(formData);
      setIsEditing(false); // Sai do modo de edição
      EditsetVisible1(false); // Fecha o diálogo após salvar
    }
  };

  // Cancela a edição e reverte os dados
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do botão
    setIsEditing(false);
    if (bookData) {
      setFormData(bookData); // Reverte os dados do formulário para os valores originais
    }
  };

  // Exclui o livro
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do botão
    setShowConfirmDialog(true); // Mostra o diálogo de confirmação
  };

  const confirmDelete = () => {
    onDelete(); // Chama a função passada como prop para excluir o livro
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
    EditsetVisible1(false); // Fecha o diálogo principal
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
  };

  // Se bookData não estiver disponível, não renderiza o componente
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
              id="codeBook"
              value={formData?.codeBook || ''}
              onChange={handleChange}
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
            />
            <label htmlFor="codeBook">Código do Livro</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="nameBook"
              value={formData?.nameBook || ''}
              onChange={handleChange}
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
            />
            <label htmlFor="nameBook">Nome do Livro</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              className="w-full"
              id="deliveryDay"
              value={formData?.deliveryDay || ''}
              onChange={handleChange}
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
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
                  onClick={handleDelete} // Mostra o diálogo de confirmação
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
