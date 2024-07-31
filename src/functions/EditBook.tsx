import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface IEditBook {
  codeBook: string;
  nameBook: string;
  deliveryDay: string;
}
export default async function EditBookFunction(props: IEditBook, id: string) {
  if (!auth.currentUser) return;

  const BookRef = doc(db, 'Users', auth.currentUser.uid);

  // Constrói o objeto com os campos atualizados
  const updatedFields: { [key: string]: any } = {};
  if (props.codeBook) updatedFields[`Book.${id}.codeBook`] = props.codeBook;
  if (props.nameBook) updatedFields[`Book.${id}.nameBook`] = props.nameBook;
  if (props.deliveryDay)
    updatedFields[`Books.${id}.deliveryDay`] = props.deliveryDay;
  // Atualiza os campos no Firestore
  await updateDoc(BookRef, updatedFields);
}
