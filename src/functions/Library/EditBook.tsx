import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import { Timestamp } from 'firebase/firestore';

interface IEditBook {
  id: string;
  author: string;
  bookName: string;
  deliveryDay: Timestamp | null; // Torna deliveryDay opcional
  status: string; // Adiciona status como obrigatório
}

export default async function EditBookFunction(props: IEditBook) {
  if (!auth.currentUser) return;

  const bookRef = doc(db, 'Users', auth.currentUser.uid);

  const updatedFields: { [key: string]: any } = {};
  if (props.author) updatedFields[`books.${props.id}.author`] = props.author;
  if (props.bookName)
    updatedFields[`books.${props.id}.bookName`] = props.bookName;
  if (props.deliveryDay)
    updatedFields[`books.${props.id}.deliveryDay`] = props.deliveryDay;
  if (props.status) updatedFields[`books.${props.id}.status`] = props.status; // Adiciona status aos campos atualizados

  await updateDoc(bookRef, updatedFields);
}
