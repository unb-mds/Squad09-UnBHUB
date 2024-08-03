import { auth } from '../../config/firebase';

interface IEditSubject {
  codeSubject: string;
  nameActivity: string;
  deliveryDay: string;
}

export default async function EditActivityFunction(props: IEditSubject) {
  if (!auth.currentUser) return;
}
