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

interface Exam {
  code: string;
  score: string;
  date: Date;
  room: string;
  status: string;
}

interface Subject {
  id: string;
  exams: Exam[];
  // outros campos relevantes
}

export default function SpecificSubjectComponents() {
  const [subjects, setSubjects] = useState<Map<string, Subject>>(new Map());
  const [dialogVisible, setDialogVisible] = useState(false);
  const id = localStorage.getItem('subjectId') || '';

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            if (userData && userData.subjects) {
              setSubjects(new Map(Object.entries(userData.subjects)));
            }
          }
        });

        return () => unsub();
      }
    });
  }, []);

  const refreshExams = () => {
    if (id) {
      const unsub = onSnapshot(doc(db, 'Subjects', id), (doc) => {
        if (doc.exists()) {
          const updatedSubject = doc.data() as Subject;
          setSubjects((prevSubjects) => {
            const updatedMap = new Map(prevSubjects);
            updatedMap.set(id, updatedSubject);
            return updatedMap;
          });
        }
      });

      return () => unsub();
    }
  };

  return (
    <div className="flex flex-column mx-4 my-3 w-full">
      {subjects.has(id) && (
        <SubjectDetailsComponent key={id} subject={subjects.get(id)!} />
      )}

      <div className="flex flex-column my-3">
        <div className="flex justify-content-between align-items-center">
          <p className="flex w-4 h-1rem gap-2 align-items-center pb-2">
            <i className="pi pi-file"></i>
            Provas
          </p>
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
          {subjects.has(id) && (
            <SubjectSpecificExams key={id} subject={subjects.get(id)!} />
          )}
        </div>
      </div>

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
