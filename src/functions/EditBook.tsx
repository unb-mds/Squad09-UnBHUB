import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface IEditBook {
  id: string;
  codeBook: string;
  nameBook: string;
  deliveryDay: string;
}

export default async function EditBookFunction(props: IEditBook) {
  if (!auth.currentUser) return;

  // Referência ao documento do usuário
  const userRef = doc(db, 'Users', auth.currentUser.uid);

  // Constrói o objeto com os campos atualizados
  const updatedFields: { [key: string]: any } = {};
  if (props.codeBook)
    updatedFields[`Books.${props.id}.codeBook`] = props.codeBook;
  if (props.nameBook)
    updatedFields[`Books.${props.id}.nameBook`] = props.nameBook;
  if (props.deliveryDay)
    updatedFields[`Books.${props.id}.deliveryDay`] = props.deliveryDay;

  // Atualiza os campos no Firestore
  await updateDoc(userRef, updatedFields);
}
