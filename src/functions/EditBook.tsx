import { doc, updateDoc } from 'firebase/firestore'; // Importa funções para acessar e atualizar documentos no Firestore
import { auth, db } from '../../config/firebase'; // Importa configuração do Firebase
import { Timestamp } from 'firebase/firestore'; // Importa a classe Timestamp do Firestore

interface IEditBook {
  // Define a interface para os dados do livro a ser editado
  id: string; // ID do livro
  codeSubject: string; // Código da matéria
  bookName: string; // Nome do livro
  deliveryDay: Timestamp; // Data de devolução como Timestamp
}

export default async function EditBookFunction(props: IEditBook) {
  // Função assíncrona para editar um livro
  if (!auth.currentUser) return; // Retorna se o usuário não estiver autenticado

  // Referência ao documento do usuário
  const bookRef = doc(db, 'Users', auth.currentUser.uid);

  // Constrói o objeto com os campos atualizados
  const updatedFields: { [key: string]: any } = {}; // Objeto para armazenar os campos a serem atualizados
  if (props.codeSubject)
    // Se o código da matéria estiver presente
    updatedFields[`books.${props.id}.codeSubject`] = props.codeSubject; // Adiciona o código da matéria aos campos atualizados
  if (props.bookName)
    // Se o nome do livro estiver presente
    updatedFields[`books.${props.id}.bookName`] = props.bookName; // Adiciona o nome do livro aos campos atualizados
  if (props.deliveryDay)
    // Se a data de devolução estiver presente
    updatedFields[`books.${props.id}.deliveryDay`] = props.deliveryDay; // Adiciona a data de devolução aos campos atualizados

  // Atualiza os campos no Firestore
  await updateDoc(bookRef, updatedFields); // Atualiza o documento do usuário com os campos modificados
}
