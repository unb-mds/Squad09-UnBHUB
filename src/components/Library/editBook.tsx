import { useEffect, useState } from 'react'; // Importa hooks do React para efeitos colaterais e gerenciamento de estado
import { Button } from 'primereact/button'; // Importa o componente Button da biblioteca PrimeReact
import { Dialog } from 'primereact/dialog'; // Importa o componente Dialog da biblioteca PrimeReact
import { FloatLabel } from 'primereact/floatlabel'; // Importa o componente FloatLabel da biblioteca PrimeReact
import { InputText } from 'primereact/inputtext'; // Importa o componente InputText da biblioteca PrimeReact
import { Calendar } from 'primereact/calendar'; // Importa o componente Calendar da biblioteca PrimeReact
import { Timestamp } from 'firebase/firestore'; // Importa o tipo Timestamp do Firestore
import EditBookFunction from '../../functions/EditBook'; // Importa a função para editar um livro
import DeleteBookFunction from '../../functions/DeleteBook'; // Importa a função para excluir um livro
import FinalizeBookFunction from '../../functions/FinalizedBook'; // Importa a função para finalizar um livro

interface BookData {
  // Define a interface para os dados do livro
  id: string; // ID do livro
  codeSubject: string; // Código da matéria
  bookName: string; // Nome do livro
  deliveryDay: Timestamp | null; // Data de devolução (Timestamp ou null)
}

export default function EditBookComponent(props: {
  // Componente funcional que recebe propriedades
  visibleEdit1: boolean; // Estado de visibilidade do modal de edição
  EditsetVisible1: (visibleEdit1: boolean) => void; // Função para definir a visibilidade do modal de edição
  bookData: BookData | null; // Dados do livro a ser editado
  onSave: (updatedBookData: BookData) => void; // Função chamada ao salvar o livro
  onDelete: () => void; // Função chamada ao excluir o livro
}) {
  const { bookData, visibleEdit1, EditsetVisible1 } = props; // Desestrutura as propriedades
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se está em modo de edição

  const [formData, setFormData] = useState<{
    // Estado para armazenar dados do formulário
    codeSubject: string; // Código da matéria
    bookName: string; // Nome do livro
    deliveryDay: Date | null; // Data de devolução (Date ou null)
  } | null>(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Estado para controlar a exibição do diálogo de confirmação de exclusão

  useEffect(() => {
    // Efeito colateral para atualizar os dados do formulário quando bookData muda
    if (bookData) {
      setFormData({
        codeSubject: bookData.codeSubject, // Define o código da matéria
        bookName: bookData.bookName, // Define o nome do livro
        deliveryDay:
          bookData.deliveryDay instanceof Timestamp
            ? bookData.deliveryDay.toDate() // Converte Timestamp para Date
            : null,
      });
    }
  }, [bookData]); // Dependência: executa quando bookData muda

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lida com mudanças nos campos de entrada
    if (formData) {
      const { id, value } = e.target; // Extrai id e valor do evento
      setFormData((prevData) => ({
        ...prevData,
        [id]: value, // Atualiza o valor do campo
      }));
    }
  };

  const handleDateChange = (e: { value: Date }) => {
    // Lida com mudanças na data
    if (formData) {
      setFormData((prevData) => ({
        ...prevData,
        deliveryDay: e.value, // Atualiza a data de devolução
      }));
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Lida com o clique no botão salvar
    e.preventDefault(); // Previne o comportamento padrão do evento
    if (formData && bookData) {
      const deliveryDayTimestamp = formData.deliveryDay
        ? Timestamp.fromDate(formData.deliveryDay) // Converte a data para Timestamp
        : null;

      await EditBookFunction({
        // Chama a função para editar o livro
        id: bookData.id, // ID do livro
        codeSubject: formData.codeSubject, // Código da matéria
        bookName: formData.bookName, // Nome do livro
        deliveryDay: deliveryDayTimestamp, // Data de devolução
      });
      setIsEditing(false); // Sai do modo de edição
      EditsetVisible1(false); // Fecha o modal de edição
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Lida com o clique no botão cancelar
    e.preventDefault(); // Previne o comportamento padrão do evento
    setIsEditing(false); // Sai do modo de edição
    if (bookData) {
      setFormData({
        codeSubject: bookData.codeSubject, // Restaura os dados do formulário
        bookName: bookData.bookName,
        deliveryDay:
          bookData.deliveryDay instanceof Timestamp
            ? bookData.deliveryDay.toDate()
            : null,
      });
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Lida com o clique no botão excluir
    e.preventDefault(); // Previne o comportamento padrão do evento
    setShowConfirmDialog(true); // Exibe o diálogo de confirmação de exclusão
  };

  const confirmDelete = () => {
    // Confirma a exclusão do livro
    DeleteBookFunction(bookData?.id || ''); // Chama a função para excluir o livro
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
    EditsetVisible1(false); // Fecha o modal de edição
  };

  const cancelDelete = () => {
    // Cancela a exclusão do livro
    setShowConfirmDialog(false); // Fecha o diálogo de confirmação
  };

  if (!visibleEdit1) {
    // Retorna null se o modal não estiver visível
    return null;
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
          <FloatLabel className="w-full">
            <InputText
              className="w-full" // Estilos do campo de entrada
              id="codeSubject" // ID do campo
              value={formData?.codeSubject || ''} // Valor atual do campo
              onChange={handleChange} // Lida com mudanças no campo
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
            />
            <label htmlFor="codeSubject">Código do Livro</label>{' '}
            {/* Rótulo para o campo */}
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              className="w-full" // Estilos do campo de entrada
              id="bookName" // ID do campo
              value={formData?.bookName || ''} // Valor atual do campo
              onChange={handleChange} // Lida com mudanças no campo
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
            />
            <label htmlFor="bookName">Nome do Livro</label>{' '}
            {/* Rótulo para o campo */}
          </FloatLabel>
          <FloatLabel className="w-full">
            <Calendar
              className="w-full" // Estilos do componente Calendar
              id="deliveryDay" // ID do campo
              value={formData?.deliveryDay || null} // Valor atual do campo
              onChange={handleDateChange} // Lida com mudanças na data
              disabled={!isEditing} // Desativa o campo se não estiver em modo de edição
              showIcon // Exibe um ícone no calendário
              dateFormat="dd/mm/yy" // Formato da data
            />
            <label htmlFor="deliveryDay">Dia de Entrega</label>{' '}
            {/* Rótulo para o campo */}
          </FloatLabel>
          <div className="flex justify-content-between gap-2 mt-4">
            {' '}
            {/* Contêiner para os botões */}
            {isEditing ? ( // Exibe os botões de acordo com o estado de edição
              <>
                <Button
                  outlined
                  label="Cancelar" // Texto do botão
                  style={{
                    borderColor: '#156eccb0', // Cor da borda do botão
                    color: '#156eccb0', // Cor do texto do botão
                  }}
                  onClick={handleCancel} // Lida com o clique no botão cancelar
                />
                <Button
                  outlined
                  label="Salvar" // Texto do botão
                  style={{
                    borderColor: '#f3d300', // Cor da borda do botão
                    color: '#f3d300', // Cor do texto do botão
                  }}
                  onClick={handleSave} // Lida com o clique no botão salvar
                />
              </>
            ) : (
              <>
                <Button
                  outlined
                  label="Finalizar" // Texto do botão
                  style={{
                    borderColor: '#3e74aeb1', // Cor da borda do botão
                    color: '#3e74aeb1', // Cor do texto do botão
                  }}
                  onClick={() =>
                    FinalizeBookFunction(bookData?.id) && EditsetVisible1(false)
                  } // Finaliza o livro e fecha o modal
                />
                <Button
                  outlined
                  label="Editar" // Texto do botão
                  style={{
                    borderColor: '#f3d300', // Cor da borda do botão
                    color: '#f3d300', // Cor do texto do botão
                  }}
                  onClick={() => setIsEditing(true)} // Habilita o modo de edição
                />
                <Button
                  outlined
                  label="Excluir" // Texto do botão
                  style={{
                    borderColor: '#ff6060', // Cor da borda do botão
                    color: '#ff6060', // Cor do texto do botão
                  }}
                  onClick={handleDelete} // Exclui o livro após confirmação
                />
              </>
            )}
          </div>
        </form>
      </Dialog>

      <Dialog
        header="Confirmar Exclusão" // Título do diálogo de confirmação
        visible={showConfirmDialog} // Controla a visibilidade do diálogo de confirmação
        style={{ width: '30vw', maxWidth: '400px' }} // Define a largura do diálogo
        onHide={() => setShowConfirmDialog(false)} // Fecha o diálogo quando necessário
        footer={
          <div className="flex justify-content-center gap-3 p-0">
            {' '}
            {/* Contêiner para os botões de confirmação */}
            <Button
              label="Cancelar" // Texto do botão
              icon="pi pi-times" // Ícone do botão
              className="p-button-text" // Estilos do botão
              onClick={cancelDelete} // Cancela a exclusão
            />
            <Button
              label="Confirmar" // Texto do botão
              icon="pi pi-check" // Ícone do botão
              className="p-button-text p-button-danger" // Estilos do botão
              onClick={confirmDelete} // Confirma a exclusão
            />
          </div>
        }
      >
        <p>Você tem certeza que deseja excluir este livro?</p>{' '}
        {/* Mensagem de confirmação */}
      </Dialog>
    </>
  );
}
