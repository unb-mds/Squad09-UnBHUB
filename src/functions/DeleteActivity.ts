import { doc, updateDoc } from 'firebase/firestore'; // Importa as funções 'doc' e 'updateDoc' do Firestore para manipulação de documentos.
import { auth, db } from '../../config/firebase'; // Importa as instâncias de autenticação e banco de dados do Firebase.

export default async function DeletedActivityFunction(
  id: string,
  taskId: string
) {
  if (!auth.currentUser) return; // Verifica se há um usuário autenticado. Se não houver, a função termina aqui.

  // Cria uma referência ao documento do usuário no Firestore usando o ID do usuário atual.
  const subjectRef = doc(db, 'Users', auth.currentUser.uid);

  // Atualiza o documento do usuário no Firestore para definir o status da tarefa como 'Deleted'.
  await updateDoc(subjectRef, {
    [`subjects.${id}.tasks.${taskId}.status`]: 'Deleted', // Define o status da tarefa específica como 'Deleted'.
  });
}
