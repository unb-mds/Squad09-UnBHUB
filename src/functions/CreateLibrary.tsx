import { arrayUnion, doc, setDoc } from 'firebase/firestore';
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
    console.log('Enviando dados para o Firestore:', props);

    await setDoc(
      doc(db, 'Users', auth.currentUser.uid),
      {
        books: arrayUnion({
          codeSubject: props.codeSubject,
          bookName: props.bookName,
          deliveryDay: props.deliveryDay,
        }),
      },
      { merge: true }
    );

    console.log('Dados enviados com sucesso');
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
}

