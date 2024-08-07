import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface Book {
  bookName: string;
  codeSubject: string;
  deliveryDay: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
}

export default function DataLivros() {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [booksData, setBooksData] = useState<Book[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);

        const userDocRef = doc(db, 'Users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            console.log('User data:', userData); // Log user data for debugging

            if (userData && userData.books) {
              console.log('Books data:', userData.books); // Log books data for debugging
              const booksArray = Object.values(userData.books) as Book[];
              setBooksData(booksArray);
            } else {
              console.log('No books data found.');
            }
          } else {
            console.log('Document does not exist.');
          }
        });

        // Cleanup listener on unmount
        return () => unsubscribeSnapshot();
      } else {
        setCurrentUserId(null);
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  if (!currentUserId) {
    return <p>Loading...</p>;
  }

  if (!booksData || booksData.length === 0) {
    return <p>No books data available.</p>;
  }

  const renderBooks = (books: Book[]) => {
    return books.map((book, index) => (
      <li key={index} className="flex align-items-center mb-3">
        <i className="pi pi-angle-right mr-2 text-green-500" />
        {new Date(book.deliveryDay.seconds * 1000).toLocaleDateString()}:{' '}
        {book.bookName}
      </li>
    ));
  };

  return (
    <div className="col-12 lg:col-4">
      <div className="p-3 h-full">
        <div className="shadow-2 p-3 h-full flex flex-column surface-card">
          <div className="text-900 font-medium text-xl mb-2">
            🟢 Datas de Entrega de Livros
          </div>

          <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
          <div className="flex align-items-center"></div>

          <ul className="list-none p-0 m-0 flex-grow-1">
            {renderBooks(booksData)}
          </ul>

          <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border mt-auto" />
        </div>
      </div>
    </div>
  );
}
