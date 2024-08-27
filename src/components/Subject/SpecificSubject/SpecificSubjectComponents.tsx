import { useEffect, useState } from 'react';
import { auth, db } from '../../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import ExamDialogComponent from './ExamDialogComponent';
import SpecificSubjectTasks from './SpecificSubjectTasks';
import SubjectDetailsComponent from '../SubjectDetailsComponent';
import SubjectSpecificExams from './SubjectSpecificExams';

interface ITask {
  deliveryDay: Timestamp;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

// Interface para definir a estrutura de um objeto Exam (prova)
interface IExam {
  code: string;
  score: string;
  date: Timestamp;
  room: string;
  status: string;
  id: string;
  time: Timestamp;
}

// Interface para definir a estrutura de um objeto Subject (matéria)
interface ISubject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  startTime: Date;
  endTime: Date;
  local: string;
  status: string;
  id: string;
  tasks: ITask[]; // Ajuste o tipo conforme necessário para suas tarefas
  exams: IExam[]; // Ajuste o tipo conforme necessário para seus exames
}

// Componente funcional que gerencia e exibe os detalhes de uma matéria específica
export default function SpecificSubjectComponents() {
  // Estado para armazenar as matérias do usuário. Usa um Map para associar IDs de matérias aos dados das matérias
  const [subjects, setSubjects] = useState<Map<string, ISubject>>(new Map());
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
          const updatedSubject = doc.data() as ISubject;
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

  // Defina o tamanho do card aqui (por exemplo, 'small', 'medium', 'large')

  return (
    <div className="flex flex-column mx-3 my-0 w-full">
      {/* Renderiza o componente de detalhes da matéria se a matéria existir no estado */}
      {subjects.has(id) && (
        <SubjectDetailsComponent key={id} subject={subjects.get(id)!} />
      )}

      <div className="flex flex-column my-5">
        <div className="flex justify-content-between align-items-center">
          <p className="flex w-4 h-1rem gap-2 align-items-center pb-2 mb-6">
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
            className="mb-0"
          />
        </div>
        <Divider className="mb-1 mt-0"></Divider>
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

      <div className="flex align-items-center mb-6">
        <i className="pi pi-file mr-2"></i>
        Tarefas
      </div>

      <div style={{ color: '#4b4b4b' }}>
        <i className="pi pi-forward mx-2" style={{ color: '#3498db' }} />
        Em Andamento
      </div>
      <Divider className="mt-2"></Divider>

      <div className="flex flex-row">
        {subjects.has(id) && (
          <SpecificSubjectTasks
            key={id}
            subject={subjects.get(id)!}
            status="Active"
            styleOption="Horizontal"
          />
        )}
      </div>

      <div style={{ color: '#4b4b4b' }}>
        <i className="pi pi-clock mx-2 mt-3" style={{ color: 'red' }} />
        Atrasadas
      </div>
      <Divider className="mt-2"></Divider>
      <div className="flex flex-wrap gap-4">
        {/* Renderiza as tarefas atrasadas da matéria se a matéria existir no estado */}
        {subjects.has(id) && (
          <SpecificSubjectTasks
            key={id}
            subject={subjects.get(id)!}
            status="Late"
            styleOption="Horizontal"
          />
        )}
      </div>

      <div className="flex mt-3 align-items-center">
        <div style={{ color: '#4b4b4b' }}>
          <i className="pi pi-check mx-2" style={{ color: 'green' }} />
          Finalizadas
        </div>
      </div>
      <Divider className="mt-2"></Divider>

      <div className="flex flex-wrap gap-4">
        {/* Renderiza as tarefas finalizadas da matéria se a matéria existir no estado */}
        {subjects.has(id) && (
          <SpecificSubjectTasks
            key={id}
            subject={subjects.get(id)!}
            status="Finalized"
            styleOption="Horizontal"
          />
        )}
      </div>
    </div>
  );
}
