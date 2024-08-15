import { Timestamp } from '@firebase/firestore'; // Importa o tipo 'Timestamp' para manipulação de datas e horários.
import { doc, updateDoc } from 'firebase/firestore'; // Importa as funções 'doc' e 'updateDoc' do Firestore para manipulação de documentos.
import { auth, db } from '../../config/firebase'; // Importa as instâncias de autenticação e banco de dados do Firebase.

interface ICreateSubject {
  subject: {
    code: string; // Define o código da matéria.
    name: string; // Define o nome da matéria.
  };
  taskName: string; // Define o nome da tarefa.
  deliveryDay: Timestamp; // Define o dia de entrega como um Timestamp do Firestore.
  description: string; // Define a descrição da tarefa.
  status: string; // Define o status da tarefa.
}

export default async function CreateActivityFunction(props: ICreateSubject) {
  // Verifica se há um usuário autenticado
  if (!auth.currentUser) return; // Se não houver um usuário autenticado, a função termina aqui.

  try {
    // Gera um ID único para a nova tarefa usando uma string aleatória.
    const taskID = Math.random().toString(36).substring(7);

    // Cria uma referência ao documento do usuário no Firestore usando o ID do usuário atual.
    const taskRef = doc(db, 'Users', auth.currentUser.uid);

    // Atualiza o documento do usuário no Firestore para adicionar a nova tarefa à lista de tarefas da matéria.
    await updateDoc(taskRef, {
      [`subjects.${props.subject.code}.tasks.${taskID}`]: {
        // Usa a notação de caminho para atualizar o documento específico da tarefa dentro da matéria.
        subjectId: props.subject.code, // Inclui o código da matéria.
        taskId: taskID, // Inclui o ID da tarefa gerado.
        taskName: props.taskName, // Inclui o nome da tarefa.
        deliveryDay: props.deliveryDay, // Inclui o dia de entrega da tarefa.
        status: 'Active', // Define o status da tarefa como 'Active'.
        description: props.description, // Inclui a descrição da tarefa.
      },
    });
  } catch (error) {
    // Captura e exibe erros que ocorrem durante a adição da nova tarefa.
    console.error('Erro ao adicionar atividade: ', error);
  }
}
