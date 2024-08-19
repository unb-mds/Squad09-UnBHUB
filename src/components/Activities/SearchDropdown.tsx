'use client'; // Diretiva para usar o modo client-side rendering em Next.js.

import { onAuthStateChanged } from 'firebase/auth'; // Importa a função para monitorar mudanças no estado de autenticação do Firebase.
import { doc, onSnapshot } from 'firebase/firestore'; // Importa funções para obter documentos e escutar alterações no Firestore.
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'; // Importa o componente Dropdown e o evento de mudança da biblioteca PrimeReact.
import { useEffect, useState } from 'react'; // Importa hooks do React para gerenciar efeitos colaterais e estados.
import { auth, db } from '../../../config/firebase'; // Importa as instâncias de autenticação e banco de dados do Firebase.

interface SubjectProps {
  selectedSubject: {
    // Define o objeto de assunto selecionado.
    name: string; // Nome do assunto selecionado.
    code: string; // Código do assunto selecionado.
  };
  setSelectedSubject: (props: { name: string; code: string }) => void; // Função para atualizar o assunto selecionado.
}

export default function SearchDropdownComponent({
  selectedSubject,
  setSelectedSubject,
}: SubjectProps) {
  const [allSearchSubjects, setAllSearchSubjects] = useState([]); // Estado para armazenar todos os assuntos disponíveis.

  useEffect(() => {
    // Monitora mudanças no estado de autenticação do usuário.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se o usuário estiver autenticado.
        // Obtém o documento do usuário do Firestore e escuta suas alterações.
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists() && doc.data().subjects) {
            // Se o documento existir e contiver assuntos.
            setAllSearchSubjects(doc.data().subjects); // Atualiza o estado com os dados dos assuntos.
          } else {
            setAllSearchSubjects([]); // Define o estado como uma lista vazia se não houver dados.
          }
        });

        return () => unsub(); // Limpa a assinatura quando o componente é desmontado.
      }
    });
  }, []); // Executa o efeito apenas uma vez, quando o componente é montado.

  // Mapeia os assuntos disponíveis para um formato adequado para o Dropdown.
  const filteredSubjects = Object.values(allSearchSubjects).map(
    (subject: { nameSubject: string; id: string }) => {
      return {
        name: subject.nameSubject, // Nome do assunto.
        code: subject.id, // Código do assunto.
      };
    }
  );

  return (
    <Dropdown
      value={selectedSubject} // Define o valor selecionado do Dropdown.
      onChange={(e: DropdownChangeEvent) => setSelectedSubject(e.value)} // Atualiza o assunto selecionado quando o valor muda.
      options={filteredSubjects} // Define as opções do Dropdown.
      placeholder="Selecione a matéria" // Texto exibido quando nenhuma opção está selecionada.
      optionLabel="name" // Define o rótulo a ser exibido nas opções.
      className="w-full" // Define a classe de largura para o Dropdown.
    />
  );
}
