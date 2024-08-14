import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface Book {
  bookName: string;
  codeSubject: string;
  deliveryDay: any; // Pode ser Timestamp ou Date, dependendo da origem dos dados
  id: string;
  status: string; // Novo campo adicionado
}

export const fetchBookDates = async (): Promise<
  { deliveryDay: Date; bookName: string }[]
> => {
  const auth = getAuth();
  const bookDates: { deliveryDay: Date; bookName: string }[] = [];

  return new Promise((resolve, reject) => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            if (userData && userData.books) {
              const books: Map<string, Book> = new Map(
                Object.entries(userData.books)
              );
              books.forEach((book) => {
                // Verifica o status do book
                if (book.status !== 'Deleted') {
                  bookDates.push({
                    deliveryDay: book.deliveryDay.toDate
                      ? book.deliveryDay.toDate()
                      : new Date(book.deliveryDay),
                    bookName: book.bookName,
                  });
                }
              });
              resolve(bookDates);
            } else {
              resolve(bookDates);
            }
          } else {
            resolve(bookDates);
          }
        });

        // Cleanup listener on unmount
        return () => unsubscribeSnapshot();
      } else {
        resolve(bookDates);
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  });
};
