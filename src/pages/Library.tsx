import { useState } from 'react';
import CreateBookComponent from '../components/Library/createLibrary';
import EditBookComponent from '../components/Library/editBook';
import LibraryComponent from '../components/Library/LibraryScreen';
import SideBarComponent from '../components/SideBar';
import { Timestamp } from 'firebase/firestore';

interface BookData {
  id: string;
  author: string;
  bookName: string;
  deliveryDay: Timestamp | null; // Pode ser null se não for obrigatório
  status: string; // Adicione esta propriedade
}

export default function Library() {
  const [visibleCreate1, CreatesetVisible1] = useState<boolean>(false);
  const [visibleEdit1, EditsetVisible1] = useState<boolean>(false);
  const [selectedBookData, setSelectedBookData] = useState<BookData | null>(
    null
  );

  const handleEditClick = (bookData: BookData) => {
    setSelectedBookData(bookData);
    EditsetVisible1(true);
  };

  const handleSave = (updatedBookData: BookData) => {
    // Lógica para salvar as alterações do livro
    console.log('Livro salvo:', updatedBookData);
    // Adicione a lógica para atualizar o livro, se necessário
  };

  const handleDelete = () => {
    // Lógica para excluir o livro
    console.log('Livro excluído:', selectedBookData);
    // Adicione a lógica para excluir o livro, se necessário
  };

  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <LibraryComponent
        CreatesetVisible1={CreatesetVisible1}
        EditsetVisible1={handleEditClick} // Passa a função para controlar a edição de livros
      />
      <CreateBookComponent
        visibleCreate1={visibleCreate1}
        CreatesetVisible1={CreatesetVisible1}
      />
      <EditBookComponent
        visibleEdit1={visibleEdit1}
        EditsetVisible1={EditsetVisible1}
        bookData={selectedBookData} // Passa os dados do livro selecionado para o componente de edição
        onSave={handleSave} // Passa a função de salvar
        onDelete={handleDelete} // Passa a função de excluir
      />
    </div>
  );
}
