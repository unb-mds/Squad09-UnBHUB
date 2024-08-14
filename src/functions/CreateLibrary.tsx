import { doc, updateDoc } from 'firebase/firestore'; // Importa funções para acessar e atualizar documentos no Firestore
import { auth, db } from '../../config/firebase'; // Importa configuração do Firebase

interface ICreateBook {
  // Define a interface para os dados do livro
  codeSubject: string; // Código da matéria
  bookName: string; // Nome do livro
  deliveryDay: string; // Data de devolução no formato string
}

export default async function CreateLibraryFunction(props: ICreateBook) {
  // Função assíncrona para criar um livro
  if (!auth.currentUser) {
    // Verifica se o usuário está autenticado
    console.error('Usuário não autenticado'); // Exibe um erro se não estiver autenticado
    return; // Encerra a função
  }

  try {
    const bookId = Math.random().toString(36).substring(7); // Gera um ID único para o livro
    await updateDoc(doc(db, 'Users', auth.currentUser.uid), {
      // Atualiza o documento do usuário no Firestore
      [`books.${bookId}`]: {
        // Adiciona o livro ao subdocumento 'books' do usuário
        id: bookId, // ID do livro
        codeSubject: props.codeSubject, // Código da matéria
        bookName: props.bookName, // Nome do livro
        deliveryDay: props.deliveryDay, // Data de devolução
        status: 'Ongoing', // Status inicial do livro
      },
    });
  } catch (error) {
    // Captura erros durante a atualização
    console.error('Erro ao enviar dados:', error); // Exibe um erro se houver problemas
  }
}
