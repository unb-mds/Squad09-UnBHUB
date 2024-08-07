import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

// Função assíncrona para alterar o status de uma prova específica para "Deleted"
export default async function DeleteExam(subjectId: string, examId: string) {
  if (!auth.currentUser) return;

  const examRef = doc(db, 'Users', auth.currentUser.uid);

  try {
    // Lê o documento do usuário no Firestore
    const docSnapshot = await getDoc(examRef);
    if (docSnapshot.exists()) {
      // Obtém os subjects do documento
      const subjects = docSnapshot.data().subjects;

      if (subjects) {
        const subject = subjects[subjectId];
        if (subject && subject.exams && Array.isArray(subject.exams)) {
          // Encontra o índice do exame com o ID especificado
          const updatedExams = subject.exams.map((exam: any) =>
            exam.id === examId ? { ...exam, status: 'Deleted' } : exam
          );

          // Atualiza o array de exams no documento
          await updateDoc(examRef, {
            [`subjects.${subjectId}.exams`]: updatedExams,
          });
          console.log('Exame deletado com sucesso');
        }
      }
    }
  } catch (error) {
    console.error('Erro ao deletar o exame: ', error);
  }
}
