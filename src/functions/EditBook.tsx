import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface IEditBook {
  codeSubject: string;
  nameBook: string;
  deliveryDay: string;
}

export default async function EditBookFunction(props: IEditBook) {
  if (!auth.currentUser) return;
}
