import { useState } from 'react'; // Importa o hook useState do React para gerenciar o estado
import CreateBookComponent from '../components/Library/createLibrary'; // Importa o componente para criar livros
import EditBookComponent from '../components/Library/editBook'; // Importa o componente para editar livros
import LibraryComponent from '../components/LibraryScreen'; // Importa o componente para exibir a biblioteca
import SideBarComponent from '../components/SideBar'; // Importa o componente de barra lateral

export default function Library() {
  // Define o componente funcional Library
  const [visibleCreate1, CreatesetVisible1] = useState<boolean>(false); // Estado para controlar a visibilidade do modal de criação de livros
  const [visibleEdit1, EditsetVisible1] = useState<boolean>(false); // Estado para controlar a visibilidade do modal de edição de livros
  const [selectedBookData, setSelectedBookData] = useState<{
    // Estado para armazenar os dados do livro selecionado para edição
    id: string; // ID do livro
    author: string; // Código da matéria
    bookName: string; // Nome do livro
    deliveryDay: string; // Data de devolução
  } | null>(null); // Inicialmente, é null se nenhum livro for selecionado

  const handleEditClick = (bookData: {
    // Função para lidar com o clique no botão de editar livro
    id: string; // ID do livro
    author: string; // Código da matéria
    bookName: string; // Nome do livro
    deliveryDay: string; // Data de devolução
  }) => {
    setSelectedBookData(bookData); // Define os dados do livro selecionado no estado
    EditsetVisible1(true); // Torna visível o modal de edição
  };

  return (
    <div className="flex flex-row">
      {' '}
      {/* Define um contêiner flexível com orientação horizontal */}
      <SideBarComponent /> {/* Renderiza o componente de barra lateral */}
      <LibraryComponent
        CreatesetVisible1={CreatesetVisible1} // Passa a função para controlar a visibilidade do modal de criação
        EditsetVisible1={handleEditClick} // Passa a função para controlar a edição de livros
      />
      <CreateBookComponent
        visibleCreate1={visibleCreate1} // Controla a visibilidade do modal de criação de livros
        CreatesetVisible1={CreatesetVisible1} // Passa a função para atualizar a visibilidade do modal de criação
      />
      <EditBookComponent
        visibleEdit1={visibleEdit1} // Controla a visibilidade do modal de edição de livros
        EditsetVisible1={EditsetVisible1} // Passa a função para atualizar a visibilidade do modal de edição
        bookData={selectedBookData} // Passa os dados do livro selecionado para o componente de edição
      />
    </div>
  );
}
