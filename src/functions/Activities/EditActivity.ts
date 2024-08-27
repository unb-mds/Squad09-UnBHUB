import { doc, updateDoc } from 'firebase/firestore'; // Importa as funções 'doc' e 'updateDoc' do Firestore para manipulação de documentos.
import { auth, db } from '../../../config/firebase'; // Importa as instâncias de autenticação e banco de dados do Firebase.
import { Timestamp } from 'firebase/firestore'; // Importa o tipo 'Timestamp' do Firestore para lidar com datas e horários.

interface IEditActivity {
  taskName: string; // Define o nome da tarefa.
  description: string; // Define a descrição da tarefa.
  deliveryDay: Timestamp; // Define o dia de entrega como um Timestamp do Firestore.
  taskId: string; // Define o ID da tarefa.
  subjectId: string; // Define o ID do assunto.
  status: string; // Define o status da tarefa.
}

// Função assíncrona para editar uma atividade no banco de dados.
export default async function EditActivityFunction(
  props: IEditActivity,
  subjectId: string,
  taskId: string,
  status: string
) {
  if (!auth.currentUser) return; // Verifica se há um usuário autenticado. Se não houver, a função termina aqui.

  // Cria uma referência ao documento do usuário no Firestore usando o ID do usuário atual.
  const taskRef = doc(db, 'Users', auth.currentUser.uid);

  try {
    // Atualiza o documento do usuário no Firestore com os novos dados da atividade.
    await updateDoc(taskRef, {
      [`subjects.${subjectId}.tasks.${taskId}`]: {
        // Usa a notação de caminho para atualizar o documento específico da tarefa dentro do assunto.
        taskName: props.taskName, // Atualiza o nome da tarefa.
        description: props.description, // Atualiza a descrição da tarefa.
        deliveryDay: props.deliveryDay, // Atualiza o dia de entrega da tarefa.
        subjectId: subjectId, // Inclui o ID do assunto.
        taskId: taskId, // Inclui o ID da tarefa.
        status: status, // Atualiza o status da tarefa.
      },
    });
  } catch (error) {
    // Captura e exibe erros que ocorrem durante a atualização do documento.
    console.error('Error updating document: ', error);
  }
}
