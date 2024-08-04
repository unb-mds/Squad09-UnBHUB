import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface ICreateBook {
  codeSubject: string;
  bookName: string;
  deliveryDay: string;
}

export default async function CreateLibraryFunction(props: ICreateBook) {
  if (!auth.currentUser) {
    console.error('Usuário não autenticado');
    return;
  }

  try {
    const bookId = Math.random().toString(36).substring(7);
    await updateDoc(doc(db, 'Users', auth.currentUser.uid), {
      [`books.${bookId}`]: {
        id: bookId,
        codeSubject: props.codeSubject,
        bookName: props.bookName,
        deliveryDay: props.deliveryDay,
      },
    });
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
}
