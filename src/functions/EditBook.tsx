import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { Timestamp } from 'firebase/firestore';

interface IEditBook {
  id: string;
  codeSubject: string;
  bookName: string;
  deliveryDay: Timestamp; // Mudado para Timestamp
}

export default async function EditBookFunction(props: IEditBook) {
  if (!auth.currentUser) return;

  // Referência ao documento do usuário
  const bookRef = doc(db, 'Users', auth.currentUser.uid);

  // Constrói o objeto com os campos atualizados
  const updatedFields: { [key: string]: any } = {};
  if (props.codeSubject)
    updatedFields[`books.${props.id}.codeSubject`] = props.codeSubject;
  if (props.bookName)
    updatedFields[`books.${props.id}.bookName`] = props.bookName;
  if (props.deliveryDay)
    updatedFields[`books.${props.id}.deliveryDay`] = props.deliveryDay;

  // Atualiza os campos no Firestore
  await updateDoc(bookRef, updatedFields);
}
