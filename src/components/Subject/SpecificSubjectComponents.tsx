import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../config/firebase';
import ExamDialogComponent from './ExamDialogComponent';
import SpecificSubjectTasks from './SpecificSubjectTasks';
import SubjectDetailsComponent from './SubjectDetailsComponent';
import SubjectSpecificExams from './SubjectSpecificExams';

// Interface para definir a estrutura de um objeto Exam (prova)
interface Exam {
  code: string; // Código da prova
  score: string; // Nota da prova
  date: Date; // Data da prova
  room: string; // Sala onde a prova será realizada
  status: string; // Status da prova (por exemplo, agendada, realizada, etc.)
}

// Interface para definir a estrutura de um objeto Subject (matéria)
interface Subject {
  id: string; // Identificador único da matéria
  exams: Exam[]; // Lista de provas associadas à matéria
}

// Componente funcional que gerencia e exibe os detalhes de uma matéria específica
export default function SpecificSubjectComponents() {
  // Estado para armazenar as matérias do usuário. Usa um Map para associar IDs de matérias aos dados das matérias
  const [subjects, setSubjects] = useState<Map<string, Subject>>(new Map());
  // Estado para controlar a visibilidade do diálogo de adição de prova
  const [dialogVisible, setDialogVisible] = useState(false);
  // Obtém o ID da matéria armazenado no localStorage. Usado para identificar a matéria atual
  const id = localStorage.getItem('subjectId') || '';

  // Hook de efeito para configurar a escuta de mudanças na autenticação e nos dados do usuário no Firestore
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Escuta as mudanças no documento do usuário no Firestore
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            // Se os dados do usuário existem e contém matérias, atualiza o estado com essas matérias
            if (userData && userData.subjects) {
              setSubjects(new Map(Object.entries(userData.subjects)));
            }
          }
        });

        // Limpa a escuta quando o componente é desmontado
        return () => unsub();
      }
    });
  }, []);

  // Função para atualizar as provas de uma matéria específica
  const refreshExams = () => {
    if (id) {
      // Escuta as mudanças no documento da matéria no Firestore
      const unsub = onSnapshot(doc(db, 'Subjects', id), (doc) => {
        if (doc.exists()) {
          const updatedSubject = doc.data() as Subject;
          // Atualiza o estado com a matéria atualizada
          setSubjects((prevSubjects) => {
            const updatedMap = new Map(prevSubjects);
            updatedMap.set(id, updatedSubject);
            return updatedMap;
          });
        }
      });

      // Limpa a escuta quando a função é chamada novamente
      return () => unsub();
    }
  };

  return (
    <div className="flex flex-column mx-4 my-3 w-full">
      {/* Renderiza o componente de detalhes da matéria se a matéria existir no estado */}
      {subjects.has(id) && (
        <SubjectDetailsComponent key={id} subject={subjects.get(id)!} />
      )}

      <div className="flex flex-column my-3">
        <div className="flex justify-content-between align-items-center">
          <p className="flex w-4 h-1rem gap-2 align-items-center pb-2">
            <i className="pi pi-file"></i>
            Provas
          </p>
          {/* Botão para abrir o diálogo de adição de prova */}
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            iconPos="left"
            size="small"
            text
            onClick={() => setDialogVisible(true)}
          />
        </div>
        <Divider className="mb-1 mt-1"></Divider>
        <div className="pt-3 pb-3">
          {/* Renderiza a tabela de provas da matéria se a matéria existir no estado */}
          {subjects.has(id) && (
            <SubjectSpecificExams key={id} subject={subjects.get(id)!} />
          )}
        </div>
      </div>

      {/* Componente de diálogo para adicionar nova prova */}
      <ExamDialogComponent
        visible={dialogVisible}
        setVisible={setDialogVisible}
        subjectId={id}
        refreshExams={refreshExams}
      />

      <div className="flex align-items-center mb-3">
        <i className="pi pi-file mr-2"></i>
        Tarefas
      </div>

      <div>
        <i className="pi pi-forward mb-2 mx-3" style={{ color: '#3498db' }} />
        Em andamento
      </div>
      <Divider className="my-3 mt-1"></Divider>
      <div className="flex flex-wrap">
        {/* Renderiza as tarefas ativas da matéria se a matéria existir no estado */}
        {subjects.has(id) && (
          <SpecificSubjectTasks
            key={id}
            subject={subjects.get(id)!}
            status="Active"
          />
        )}
      </div>
      <div>
        <i className="pi pi-clock my-3 mx-3" style={{ color: 'red' }} />
        Atrasadas
      </div>
      <Divider className="my-3 mt-1"></Divider>
      <div className="flex flex-wrap">
        {/* Renderiza as tarefas atrasadas da matéria se a matéria existir no estado */}
        {subjects.has(id) && (
          <SpecificSubjectTasks
            key={id}
            subject={subjects.get(id)!}
            status="Late"
          />
        )}
      </div>

      <div className="flex mt-3 align-items-center">
        <div>
          <i className="pi pi-check mb-2 mx-3" style={{ color: 'green' }} />
          Finalizadas
        </div>
      </div>
      <Divider className="mb-4"></Divider>

      <div className="flex flex-wrap">
        {/* Renderiza as tarefas finalizadas da matéria se a matéria existir no estado */}
        {subjects.has(id) && (
          <SpecificSubjectTasks
            key={id}
            subject={subjects.get(id)!}
            status="Finalized"
          />
        )}
      </div>
    </div>
  );
}
