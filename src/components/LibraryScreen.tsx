import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface ICreateBook {
  codeSubject: string;
  bookName: string;
  deliveryDay: Timestamp;
}

export default function LibraryComponent(props: {
  CreatesetVisible1: (visibleCreate1: boolean) => void;
  EditsetVisible1: (D: ICreateBook) => void;
}) {
  const [ongoingBooks, setOngoingBooks] = useState<ICreateBook[]>([]);
  const [overdueBooks, setOverdueBooks] = useState<ICreateBook[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchBooks = async () => {
          try {
            const userDocRef = doc(db, 'Users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              const books: ICreateBook[] = userData.books || [];

              const today = new Date();
              const ongoing = books.filter(
                (bookData) =>
                  bookData.deliveryDay.toDate() >= today // Converter Timestamp para Date
              );
              const overdue = books.filter(
                (bookData) =>
                  bookData.deliveryDay.toDate() < today // Converter Timestamp para Date
              );

              setOngoingBooks(ongoing);
              setOverdueBooks(overdue);
            }
          } catch (error) {
            console.error('Erro ao buscar livros:', error);
          }
        };

        fetchBooks(); // Certifique-se de chamar a função fetchBooks dentro do if(user)
      } else {
        console.error('Usuário não autenticado');
      }
    });

    return () => unsubscribe(); // Limpeza do listener quando o componente desmonta
  }, []);

  const cardButtonStyles: React.CSSProperties = {
    color: 'white',
    border: '2px solid',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: '#2c3e50',
  };

  const renderCard = (
    borderColor: string,
    codeSubject: string,
    nameBook: string,
    deliveryDay: Timestamp
  ) => {
    const formattedDate = deliveryDay.toDate().toLocaleDateString(); // Formatar Timestamp para string

    return (
      <Button
        className="w-12 my-0"
        style={{ ...cardButtonStyles, borderColor }}
        onClick={() => {
          console.log('Edit button clicked for:', nameBook);
          const D = {
            codeSubject: codeSubject,
            bookName: nameBook,
            deliveryDay: deliveryDay,
          };
          props.EditsetVisible1(D); // Passando os dados do livro
        }}
      >
        <h2 style={{ color: 'white' }}>{codeSubject}</h2>
        <div
          className="flex flex-column w-12"
          style={{ alignItems: 'flex-start', textAlign: 'left' }}
        >
          <i className="pi pi-book mb-3" style={{ color: 'white' }}>
            {' '}
            Livro: {nameBook}
          </i>
          <p
            className="pi pi-calendar mb-3"
            style={{ color: 'white', margin: 0 }}
          >
            {' '}
            Devolução: {formattedDate}
          </p>
        </div>
      </Button>
    );
  };

  return (
    <div className="flex flex-column mx-3 my-3 gap-0 w-full">
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-book text-4xl" style={{ color: 'white' }} />
          <h1 style={{ color: 'white' }}>Biblioteca</h1>
        </div>
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-forward mb-2 mx-3" style={{ color: '#3498db' }} />
          Em andamento
        </div>
        <Button
          label="Adicionar"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          text
          link
          onClick={() => {
            console.log('Adicionar button clicked');
            props.CreatesetVisible1(true);
          }}
        />
      </div>

      <Divider className="my-0" />

      <div className="flex flex-row justify-content-between gap-2 my-4">
        {ongoingBooks.length ? (
          ongoingBooks.map((bookData) =>
            renderCard(
              '#3498db',
              bookData.codeSubject,
              bookData.bookName,
              bookData.deliveryDay
            )
          )
        ) : (
          <p>Nenhum livro em andamento</p>
        )}
      </div>

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-clock mb-2 mx-3" style={{ color: 'red' }} />
          Atrasadas
        </div>
      </div>

      <Divider className="my-0" />

      <div className="flex flex-row justify-content-between gap-2 my-4">
        {overdueBooks.length ? (
          overdueBooks.map((bookData) =>
            renderCard(
              'red',
              bookData.codeSubject,
              bookData.bookName,
              bookData.deliveryDay
            )
          )
        ) : (
          <p>Nenhum livro atrasado</p>
        )}
      </div>
    </div>
  );
}
