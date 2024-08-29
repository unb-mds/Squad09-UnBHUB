import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Timestamp } from 'firebase/firestore';
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

export default function EditBookComponent(props: {
  visibleEdit1: boolean;
  EditsetVisible1: (visibleEdit1: boolean) => void;
  bookData: BookData | null;
  onSave: (updatedBookData: BookData) => void;
  onDelete: () => void;
}) {
  const { bookData, visibleEdit1, EditsetVisible1 } = props;
  const [isEditing, setIsEditing] = useState(false);

  // Estado atualizado para garantir que todos os campos sejam sempre definidos
  const [formData, setFormData] = useState<{
    author: string;
    bookName: string;
    deliveryDay: Date | null;
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
      });
    }
  }, [bookData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { id, value } = e.target;
      setFormData((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            [id]: value || '', // Garante que o valor seja uma string não nula
          };
        }
        return prevData;
      });
    }
  };

  const handleDateChange = (e: { value: Date }) => {
    if (formData) {
      setFormData((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            deliveryDay: e.value, // Atualiza a data de devolução
          };
        }
        return prevData;
      });
    }
  };

  const handleRestore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (bookData?.id) {
      ActiveBookFunction(bookData.id); // Garante que bookData.id é uma string
      EditsetVisible1(false);
    }
  };

  const handleFinalized = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (bookData?.id) {
      FinalizedBookFunction(bookData.id); // Garante que bookData.id é uma string
      EditsetVisible1(false);
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData && bookData?.id) {
      const deliveryDayTimestamp = formData.deliveryDay
        ? Timestamp.fromDate(formData.deliveryDay) // Converte a data para Timestamp
        : null;

      await EditBookFunction({
        id: bookData.id, // ID do livro
        author: formData.author, // Autor do livro
        bookName: formData.bookName, // Nome do livro
        deliveryDay: deliveryDayTimestamp, // Data de devolução
      });
      setIsEditing(false); // Sai do modo de edição
      EditsetVisible1(false); // Fecha o modal de edição
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(false); // Sai do modo de edição
    if (bookData) {
      setFormData({
        author: bookData.author, // Restaura os dados do formulário
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
    setShowConfirmDialog(true); // Exibe o diálogo de confirmação de exclusão
  };

  const confirmDelete = () => {
    if (bookData?.id) {
      DeleteBookFunction(bookData.id); // Garante que bookData.id é uma string
    }
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
    EditsetVisible1(false); // Fecha o modal de edição
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
  };

  if (!visibleEdit1) {
    return null; // Retorna null se o modal não estiver visível
  }

  return (
    <>
      <Dialog
        header={isEditing ? 'Editar Livro' : 'Visualizar Livro'} // Define o título do modal
        visible={visibleEdit1} // Controla a visibilidade do modal
        style={{ width: '40vw', maxWidth: '600px' }} // Define a largura do modal
        onHide={() => EditsetVisible1(false)} // Fecha o modal quando necessário
      >
        <form
          className="flex flex-column gap-5 p-4" // Estilos do formulário
          onSubmit={(e) => e.preventDefault()} // Previne o envio padrão do formulário
        >
          <FloatLabel>
            <InputText
              className="w-full" // Estilos do campo de entrada
              id="bookName" // ID do campo
              value={formData?.bookName || ''} // Valor atual do campo
              onChange={handleChange} // Lida com mudanças no campo
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
            />
            <label htmlFor="bookName">Nome do Livro</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              className="w-full" // Estilos do campo de entrada
              id="author" // ID do campo
              value={formData?.author || ''} // Valor atual do campo
              onChange={handleChange} // Lida com mudanças no campo
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
            />
            <label htmlFor="author">Nome do Autor</label>
          </FloatLabel>
          <FloatLabel>
            <Calendar
              className="w-full" // Estilos do componente Calendar
              id="deliveryDay" // ID do campo
              value={formData?.deliveryDay || null} // Valor atual do campo
              onChange={handleDateChange} // Lida com mudanças na data
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
              showIcon // Exibe um ícone no calendário
              dateFormat="dd/mm/yy" // Formato da data
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
                    borderColor: '#ff6060', // Cor da borda do botão
                    color: 'white', // Cor do texto do botão
                    backgroundColor: '#ff6060',
                  }}
                  onClick={handleCancel} // Lida com o clique no botão cancelar
                />
                <Button
                  label="Salvar"
                  onClick={handleSave} // Lida com o clique no botão salvar
                />
              </>
            ) : (
              <>
                {bookData?.status === 'Finalized' && (
                  <Button
                    label="Restaurar"
                    onClick={handleRestore} // Restaura o livro
                  />
                )}

                {(bookData?.status === 'Ongoing' || bookData?.status === 'Late') && (
                  <Button
                    outlined
                    label="Finalizar"
                    style={{
                      borderColor: 'green', // Define a cor da borda do botão
                      color: 'white', // Define a cor do texto do botão
                      backgroundColor: 'green',
                    }}
                    onClick={handleFinalized} // Finaliza o livro
                  />
                )}

                <Button
                  outlined
                  label="Editar"
                  style={{
                    borderColor: '#f3d300', // Cor da borda do botão
                    color: 'white', // Cor do texto do botão
                    backgroundColor: '#f3d300',
                  }}
                  onClick={() => setIsEditing(true)} // Habilita o modo de edição
                />
                <Button
                  outlined
                  label="Excluir"
                  style={{
                    borderColor: '#ff6060', // Cor da borda do botão
                    color: 'white', // Cor do texto do botão
                    backgroundColor: '#ff6060',
                  }}
                  onClick={handleDelete} // Lida com o clique no botão excluir
                />
              </>
            )}
          </div>
        </form>
      </Dialog>
      <Dialog
        header="Confirmar Exclusão" // Título do diálogo de confirmação
        visible={showConfirmDialog} // Controla a visibilidade do diálogo
        style={{ width: '30vw' }} // Define a largura do diálogo
        onHide={cancelDelete} // Fecha o diálogo ao cancelar
      >
        <div className="flex flex-column align-items-center">
          <p>Tem certeza de que deseja excluir este livro?</p> {/* Mensagem de confirmação */}
          <div className="flex justify-content-between mt-4 gap-2">
            <Button
              label="Confirmar"
              className="p-button-danger" // Estilo do botão de confirmação
              onClick={confirmDelete} // Lida com o clique na confirmação
            />
            <Button
              label="Cancelar"
              className="p-button-text" // Estilo do botão de cancelamento
              onClick={cancelDelete} // Lida com o clique no cancelamento
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
