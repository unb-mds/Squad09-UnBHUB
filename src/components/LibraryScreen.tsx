import { onAuthStateChanged } from 'firebase/auth'; // Importa a função para ouvir mudanças no estado de autenticação
import { doc, onSnapshot, Timestamp } from 'firebase/firestore'; // Importa funções e tipos do Firestore
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase'; // Importa as instâncias do Firebase Authentication e Firestore
import GeneralHeader from './Header';
import { ActiveBookFunction } from "../functions/DeleteBook";
import { LateBookFunction } from "../functions/DeleteBook";

interface ICreateBook {
  id: string;
  author: string;
  bookName: string;
  deliveryDay: Timestamp;
  status: string;
}

export default function LibraryComponent(props: {
  CreatesetVisible1: (visibleCreate1: boolean) => void;
  EditsetVisible1: (D: ICreateBook) => void;
}) {
  const [ongoingBooks, setOngoingBooks] = useState<ICreateBook[]>([]);
  const [overdueBooks, setOverdueBooks] = useState<ICreateBook[]>([]);
  const [finalizedBooks, setfinalizedBooks] = useState<ICreateBook[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            if (userData && userData.books) {
              const books: ICreateBook[] = userData.books;
              const today = new Date();

              const ongoing = Object.values(books).filter((bookData) => {
                const deliveryDay = bookData.deliveryDay.toDate();
                deliveryDay.setDate(deliveryDay.getDate() + 1);
                if (deliveryDay >= today && !['Deleted', 'Finalized'].includes(bookData.status)) {
                  ActiveBookFunction(bookData.id);
                  return true
                }
                
              });

              const overdue = Object.values(books).filter((bookData) => {
                const deliveryDay = bookData.deliveryDay.toDate();
                deliveryDay.setDate(deliveryDay.getDate() + 1);
                if (deliveryDay < today && !['Deleted', 'Finalized','Ongoing'].includes(bookData.status)) {
                  LateBookFunction(bookData.id);
                  return true
                }
              });

              const finalized = Object.values(books).filter(
                (bookData) => !['Deleted', 'Ongoing','Late'].includes(bookData.status)
              );

              setOngoingBooks(ongoing);
              setOverdueBooks(overdue);
              setfinalizedBooks(finalized);
            }
          }
        });

        return () => unsub();
      }
    });

    return () => unsubscribe();
  }, []);

  const cardButtonStyles: React.CSSProperties = {
    color: 'white',
    border: '2px solid',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '350px',
    height: '200px',
    backgroundColor: '#2c3e50',
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  };

  const renderCard = (
    borderColor: string,
    id: string,
    author: string,
    bookName: string,
    deliveryDay: Timestamp,
    status: string
  ) => {
    const formattedDate = deliveryDay.toDate().toLocaleDateString();

    if (status === 'Deleted') return null;

    return (
      <Button
        key={id}
        className="my-0"
        style={{ ...cardButtonStyles, borderColor }}
        onClick={() => {
          const D = {
            id: id,
            author: author,
            bookName: bookName,
            deliveryDay: deliveryDay,
            status: status,
          };
          props.EditsetVisible1(D);
        }}
      >
        <h3
          style={{
            color: 'white',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            marginBottom: '0.5rem',
          }}
        >
          {truncateText(bookName, 31)}
        </h3>
        <div
          className="flex flex-column mt-4"
          style={{ alignItems: 'flex-start', textAlign: 'left', width: '100%' }}
        >
          <i
            className="pi pi-user mb-4"
            style={{
              color: 'white',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
            }}
          >
            Autor: {truncateText(author, 31)}
          </i>
          <p
            className="pi pi-calendar mb-3"
            style={{ color: 'white', margin: 0 }}
          >
            Devolução: {formattedDate}
          </p>
        </div>
      </Button>
    );
  };

  return (
    <div className="flex flex-column mx-3 my-0 gap-0 w-full">
      <GeneralHeader className="mb-1 mt-1" />
      <Divider className="mb-2 mt-0" />
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5 mb-6">
          <i className="pi pi-book text-4xl" style={{ color: 'white' }} />
          <h1 style={{ color: 'white' }}>Biblioteca</h1>
        </div>
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-forward mx-3" style={{ color: '#3498db' }} />
          Lendo
        </div>
        <Button
          label="Adicionar"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          text
          link
          onClick={() => {
            props.CreatesetVisible1(true);
          }}
        />
      </div>
      <Divider className="mb-2 mt-1" />
      <div className="flex flex-row flex-wrap gap-3 my-4">
        {ongoingBooks.length ? (
          ongoingBooks.map((bookData) =>
            renderCard(
              '#3498db',
              bookData.id,
              bookData.author,
              bookData.bookName,
              bookData.deliveryDay,
              bookData.status
            )
          )
        ) : (
          <p>Nenhum livro sendo lido</p>
        )}
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-clock mx-3" style={{ color: 'red' }} />
          Atrasados
        </div>
      </div>
      <Divider className="mb-2 mt-1" />
      <div className="flex flex-row flex-wrap gap-2 my-4">
        {overdueBooks.length ? (
          overdueBooks.map((bookData) =>
            renderCard(
              '#dc0d28',
              bookData.id,
              bookData.author,
              bookData.bookName,
              bookData.deliveryDay,
              bookData.status
            )
          )
        ) : (
          <p>Nenhum livro atrasado</p>
        )}
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-check mx-3" style={{ color: '#25c440' }} />
          Já Lidos
        </div>
      </div>
      <Divider className="mb-2 mt-1" />
      <div className="flex flex-row flex-wrap gap-2 my-4">
        {finalizedBooks.length ? (
          finalizedBooks.map((bookData) =>
            renderCard(
              'green',
              bookData.id,
              bookData.author,
              bookData.bookName,
              bookData.deliveryDay,
              bookData.status
            )
          )
        ) : (
          <p>Nenhum livro lido</p>
        )}
      </div>
    </div>
  );
}
