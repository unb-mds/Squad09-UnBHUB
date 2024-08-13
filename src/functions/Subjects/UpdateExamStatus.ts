import { db } from '../../../config/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';

// Função para atualizar o status das provas
async function UpdateExamStatus() {
  // Referência à coleção de provas
  const examsRef = collection(db, 'exams');

  // Query para obter as provas com status 'em andamento' e data menor ou igual à data atual
  const now = new Date();
  const q = query(
    examsRef,
    where('status', '==', 'em andamento'),
    where('date', '<=', now)
  );

  // Obter os documentos que atendem aos critérios
  const querySnapshot = await getDocs(q);

  // Atualizar o status das provas para 'finalizado'
  for (const docSnapshot of querySnapshot.docs) {
    const examDocRef = doc(db, 'exams', docSnapshot.id);
    await updateDoc(examDocRef, {
      status: 'finalizado',
    });
  }
}

export default UpdateExamStatus;
