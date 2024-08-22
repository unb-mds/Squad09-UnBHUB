import { onAuthStateChanged } from 'firebase/auth'; // Importa a função para ouvir mudanças no estado de autenticação
import { doc, onSnapshot, Timestamp } from 'firebase/firestore'; // Importa funções e tipos do Firestore
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase'; // Importa as instâncias do Firebase Authentication e Firestore
import GeneralHeader from './Header';

interface ICreateBook {
  // Define a interface para os dados de um livro
  id: string; // ID do livro
  codeSubject: string; // Código da matéria
  bookName: string; // Nome do livro
  deliveryDay: Timestamp; // Data de devolução como Timestamp do Firestore
  status: string;
}

export default function LibraryComponent(props: {
  // Componente funcional que recebe propriedades
  CreatesetVisible1: (visibleCreate1: boolean) => void; // Função para definir a visibilidade do modal de criação
  EditsetVisible1: (D: ICreateBook) => void; // Função para definir a visibilidade do modal de edição com dados do livro
}) {
  const [ongoingBooks, setOngoingBooks] = useState<ICreateBook[]>([]); // Estado para armazenar livros em andamento
  const [overdueBooks, setOverdueBooks] = useState<ICreateBook[]>([]); // Estado para armazenar livros atrasados
  const [finalizedBooks, setfinalizedBooks] = useState<ICreateBook[]>([]); // Estado para armazenar livros finalizados

  useEffect(() => {
    // Efeito colateral para escutar mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se um usuário está autenticado
        // Escuta mudanças no documento do usuário no Firestore
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists()) {
            // Se o documento do usuário existe
            const userData = doc.data(); // Obtém os dados do documento
            if (userData && userData.books) {
              // Se os dados do usuário contêm livros
              const books: ICreateBook[] = userData.books; // Converte os livros para o tipo ICreateBook
              const today = new Date(); // Obtém a data atual
              // Filtra livros em andamento

              const ongoing = Object.values(books).filter((bookData) => {
                const deliveryDay = bookData.deliveryDay.toDate();
                deliveryDay.setDate(deliveryDay.getDate() + 1);
                return deliveryDay >= today &&
                       !['Deleted', 'Finalized'].includes(bookData.status);
              });
              // Filtra livros atrasados
              const overdue = Object.values(books).filter((bookData) => {
                const deliveryDay = bookData.deliveryDay.toDate();
                deliveryDay.setDate(deliveryDay.getDate() + 1);
                return deliveryDay < today &&
                       !['Deleted', 'Finalized'].includes(bookData.status);
              });
              // Filtra livros finalizados
              const finalized = Object.values(books).filter(
                (bookData) => !['Deleted', 'Ongoing'].includes(bookData.status) // Status não é "Deleted" ou "Ongoing"
              );
              // Atualiza o estado com os livros filtrados
              setOngoingBooks(ongoing);
              setOverdueBooks(overdue);
              setfinalizedBooks(finalized);
            }
          }
        });

        // Limpa a escuta quando o componente é desmontado
        return () => unsub();
      }
    });

    // Limpa a escuta quando o componente é desmontado
    return () => unsubscribe();
  }, []); // Dependências vazias significam que o efeito é executado apenas na montagem e desmontagem

  // Estilo para o botão de livro
  const cardButtonStyles: React.CSSProperties = {
    color: 'white', // Cor do texto
    border: '2px solid', // Estilo da borda
    padding: '1rem', // Espaçamento interno
    display: 'flex', // Usa Flexbox para layout
    flexDirection: 'column', // Direção dos itens no flex container
    alignItems: 'flex-start', // Alinha itens no início do container
    width: '350px', // Largura fixa do botão
    height: '200px', // Altura fixa do botão
    backgroundColor: '#2c3e50', // Cor de fundo
  };

  // Função para renderizar um cartão de livro
  const renderCard = (
    borderColor: string, // Cor da borda do cartão
    id: string, // ID do livro
    codeSubject: string, // Código do assunto
    bookName: string, // Nome do livro
    deliveryDay: Timestamp, // Data de devolução
    status: string // Status do livro
  ) => {
    const formattedDate = deliveryDay.toDate().toLocaleDateString(); // Formata a data de devolução como string

    if (status === 'Deleted') return null; // Não renderiza livros com status "Deleted"
    return (
      <Button
        key={id} // Usa o ID do livro como chave para o componente
        className="my-0" // Remove a margem vertical
        style={{ ...cardButtonStyles, borderColor }} // Aplica os estilos e a cor da borda
        onClick={() => {
          const D = {
            id: id,
            codeSubject: codeSubject,
            bookName: bookName,
            deliveryDay: deliveryDay,
            status: status,
          };
          props.EditsetVisible1(D); // Passa os dados do livro para o método de edição
        }}
      >
        <h3 style={{ color: 'white' }}>{codeSubject}</h3>{' '}
        {/* Exibe o código do assunto */}
        <div
          className="flex flex-column"
          style={{ alignItems: 'flex-start', textAlign: 'left' }} // Alinha texto à esquerda
        >
          <i className="pi pi-book mb-3" style={{ color: 'white' }}>
            Livro: {bookName} {/* Exibe o nome do livro */}
          </i>
          <p
            className="pi pi-calendar mb-3"
            style={{ color: 'white', margin: 0 }} // Remove a margem
          >
            Devolução: {formattedDate} {/* Exibe a data de devolução */}
          </p>
        </div>
      </Button>
    );
  };

  return (
    <div className="flex flex-column mx-3 my-0 gap-0 w-full">
      <GeneralHeader className="mb-1 mt-1" />
      <Divider className="mb-2 mt-0" />
      {' '}
      {/* Contêiner principal do componente */}
      <div className="flex align-items-center justify-content-between border-round-lg">
        {' '}
        {/* Cabeçalho da biblioteca */}
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-book text-4xl" style={{ color: 'white' }} />{' '}
          {/* Ícone de livro */}
          <h1 style={{ color: 'white' }}>Biblioteca</h1> {/* Título */}
        </div>
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }} // Cor do texto
      >
        <div>
          <i className="pi pi-forward mb-2 mx-3" style={{ color: '#3498db' }} />{' '}
          {/* Ícone de andamento */}
          Em andamento {/* Texto para seção de livros em andamento */}
        </div>
        <Button
          label="Adicionar" // Texto do botão
          icon="pi pi-plus" // Ícone do botão
          iconPos="left" // Posiciona o ícone à esquerda do texto
          size="small" // Tamanho do botão
          text // Tipo do botão (aparece como texto)
          link // Estilo de link
          onClick={() => {
            props.CreatesetVisible1(true); // Abre o modal para adicionar um livro
          }}
        />
      </div>
      <Divider className="my-0" /> {/* Divisor entre seções */}
      <div className="flex flex-row flex-wrap gap-2 my-4">
        {' '}
        {/* Contêiner para livros em andamento */}
        {ongoingBooks.length ? (
          ongoingBooks.map((bookData) =>
            renderCard(
              '#3498db', // Cor da borda para livros em andamento
              bookData.id,
              bookData.codeSubject,
              bookData.bookName,
              bookData.deliveryDay,
              bookData.status
            )
          )
        ) : (
          <p>Nenhum livro em andamento</p> // Mensagem quando não há livros em andamento
        )}
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }} // Cor do texto
      >
        <div>
          <i className="pi pi-clock mb-2 mx-3" style={{ color: 'red' }} />{' '}
          {/* Ícone de atraso */}
          Atrasados {/* Texto para seção de livros atrasados */}
        </div>
      </div>
      <Divider className="my-0" /> {/* Divisor entre seções */}
      <div className="flex flex-row flex-wrap gap-2 my-4">
        {' '}
        {/* Contêiner para livros atrasados */}
        {overdueBooks.length ? (
          overdueBooks.map((bookData) =>
            renderCard(
              '#dc0d28', // Cor da borda para livros atrasados
              bookData.id,
              bookData.codeSubject,
              bookData.bookName,
              bookData.deliveryDay,
              bookData.status
            )
          )
        ) : (
          <p>Nenhum livro atrasado</p> // Mensagem quando não há livros atrasados
        )}
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }} // Cor do texto
      >
        <div>
          <i className="pi pi-check mb-2 mx-3" style={{ color: '#25c440' }} />{' '}
          {/* Ícone de finalizado */}
          Finalizados {/* Texto para seção de livros finalizados */}
        </div>
      </div>
      <Divider className="my-0" /> {/* Divisor entre seções */}
      <div className="flex flex-row flex-wrap gap-2 my-4">
        {' '}
        {/* Contêiner para livros finalizados */}
        {finalizedBooks.length ? (
          finalizedBooks.map((bookData) =>
            renderCard(
              'green', // Cor da borda para livros finalizados
              bookData.id,
              bookData.codeSubject,
              bookData.bookName,
              bookData.deliveryDay,
              bookData.status
            )
          )
        ) : (
          <p>Nenhum livro finalizado</p> // Mensagem quando não há livros finalizados
        )}
      </div>
    </div>
  );
}
