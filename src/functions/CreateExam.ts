import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

// Interface para definir a estrutura de um objeto Exam (prova)
interface Exam {
  code: string; // Código da prova
  score: string; // Nota da prova
  date: Date; // Data da prova
  time: Date; // Hora da prova
  room: string; // Sala onde a prova será realizada
  status: string; // Status da prova (por exemplo, agendada, realizada, etc.)
}

// Função assíncrona para criar uma nova prova e adicioná-la a uma matéria específica no Firestore
const CreateExamFunction = async (subjectId: string, exam: Exam) => {
  // Verifica se há um usuário autenticado
  if (!auth.currentUser) return;
  try {
    const examID = Math.random().toString(36).substring(7);

    // Cria uma referência ao documento do usuário no Firestore
    const examRef = doc(db, 'Users', auth.currentUser.uid);

    console.log(examRef);

    await updateDoc(examRef, {
      [`subjects.${subjectId}.exams.${examID}`]: {
        id: examID,
        // Atribui os valores da prova recebidos como argumento
        code: exam.code,
        date: exam.date,
        time: exam.time,
        room: exam.room,
        score: 'A definir',
        status: 'Active',
      },
    });
  } catch (error) {
    // Captura e exibe erros no console
    console.error('Erro ao adicionar prova: ', error);
  }
};

// Exporta a função para ser usada em outros componentes
export default CreateExamFunction;
