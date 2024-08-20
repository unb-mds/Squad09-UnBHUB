import { doc, updateDoc } from 'firebase/firestore'; // Importa funções para acessar e atualizar documentos no Firestore
import { auth, db } from '../../config/firebase'; // Importa configuração do Firebase

export async function FinalizedBookFunction(id: string) {
  // Função assíncrona para marcar um livro como finalizado
  if (!auth.currentUser) return; // Retorna se o usuário não estiver autenticado

  const subjectRef = doc(db, 'Users', auth.currentUser.uid); // Referência ao documento do usuário no Firestore
  await updateDoc(subjectRef, {
    // Atualiza o documento do usuário
    [`books.${id}.status`]: 'Finalized', // Define o status do livro como 'Finalized'
  });
}

export async function ActiveBookFunction(id: string) {
  // Função assíncrona para marcar um livro como finalizado
  if (!auth.currentUser) return; // Retorna se o usuário não estiver autenticado

  const subjectRef = doc(db, 'Users', auth.currentUser.uid); // Referência ao documento do usuário no Firestore
  await updateDoc(subjectRef, {
    // Atualiza o documento do usuário
    [`books.${id}.status`]: 'Ongoing', // Define o status do livro como 'Finalized'
  });
}