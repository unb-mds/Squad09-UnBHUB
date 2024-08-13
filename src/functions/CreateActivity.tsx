import { Timestamp } from '@firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface ICreateSubject {
  subject: {
    code: string;
    name: string;
  };
  taskName: string;
  deliveryDay: Timestamp;
  description: string;
  status: string;
}

export default async function CreateActivityFunction(props: ICreateSubject) {
  // Verifica se há um usuário autenticado
  if (!auth.currentUser) return;
  try {
    const taskID = Math.random().toString(36).substring(7);
    // Cria uma referência ao documento do usuário no Firestore
    const taskRef = doc(db, 'Users', auth.currentUser.uid);

    // Atualiza o documento do usuário no Firestore para adicionar a nova prova à lista de provas da matéria
    await updateDoc(taskRef, {
      [`subjects.${props.subject.code}.tasks.${taskID}`]: {
        subjectId: props.subject.code,
        taskId: taskID,
        taskName: props.taskName,
        deliveryDay: props.deliveryDay,
        status: 'Active',
        description: props.description,
      },
    });
  } catch (error) {
    // Captura e exibe erros no console
    console.error('Erro ao adicionar atividade: ', error);
  }
}
