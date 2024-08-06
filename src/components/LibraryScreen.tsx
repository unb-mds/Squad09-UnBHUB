import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';

interface ICreateBook {
  id: string;
  codeSubject: string;
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

  // Hook de efeito para configurar a escuta de mudanças na autenticação e nos dados do usuário no Firestore
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Escuta as mudanças no documento do usuário no Firestore
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            // Se os dados do usuário existem e contém matérias, atualiza o estado com essas matérias
            if (userData && userData.books) {
              const books: ICreateBook[] = userData.books;
              const today = new Date();
              const ongoing = Object.values(books).filter(
                (bookData) =>
                  bookData.deliveryDay.toDate() >= today &&
                  bookData.status !== 'Deleted'
                // Converter Timestamp para Date
              );
              const overdue = Object.values(books).filter(
                (bookData) => bookData.deliveryDay.toDate() < today // Converter Timestamp para Date
              );
              setOngoingBooks(ongoing);
              setOverdueBooks(overdue);
            }
          }
        });

        // Limpa a escuta quando o componente é desmontado
        return () => unsub();
      }
    });
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
    id: string,
    codeSubject: string,
    bookName: string,
    deliveryDay: Timestamp,
    status: string
  ) => {
    const formattedDate = deliveryDay.toDate().toLocaleDateString(); // Formatar Timestamp para string

    if (status === 'Deleted') return null;
    return (
      <Button
        key={id}
        className="w-12 my-0"
        style={{ ...cardButtonStyles, borderColor }}
        onClick={() => {
          const D = {
            id: id,
            codeSubject: codeSubject,
            bookName: bookName,
            deliveryDay: deliveryDay,
            status: status,
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
            Livro: {bookName}
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
              bookData.id,
              bookData.codeSubject,
              bookData.bookName,
              bookData.deliveryDay,
              bookData.status
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
              bookData.id,
              bookData.codeSubject,
              bookData.bookName,
              bookData.deliveryDay,
              bookData.status
            )
          )
        ) : (
          <p>Nenhum livro atrasado</p>
        )}
      </div>
    </div>
  );
}
