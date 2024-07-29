import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import { useEffect, useState } from 'react';

import { Divider } from 'primereact/divider';

import SubjectDetailsComponent from './SubjectDetailsComponent';
import SubjectSpecificExams from './SubjectSpecificExam';
import SpecificSubjectTasks from './SpecificSubjectTasks';

export default function SpecificSubjectComponents() {
  const [subjects, setSubjects] = useState([]);
  const id = localStorage.getItem('subjectId');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists()) {
            setSubjects(doc.data().subjects);
          }
        });

        return () => unsub();
      }
    });
  }, []);
  return (
    <div className="flex flex-column mx-4 my-3 w-full">
      {Object.values(subjects).map((subject) => {
        if (subject.id === id) {
          return <SubjectDetailsComponent subject={subject} />;
        }
      })}

      <div className="flex flex-column my-3">
        <div className="flex justify-content-between align-items-center">
          <p className="flex w-4 h-1rem gap-2 align-items-center pb-2">
            <i className="pi pi-file"></i>
            Provas
          </p>
        </div>
        <Divider className="mb-1 mt-1"></Divider>
        <div className="pt-3 pb-3">
          {Object.values(subjects).map((subject) => {
            if (subject.id === id) {
              return <SubjectSpecificExams subject={subject} />;
            }
          })}
        </div>
      </div>

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
        {Object.values(subjects).map((subject) => {
          if (subject.id === id) {
            const status = 'Active';
            return (
              <SpecificSubjectTasks
                key={subject.id}
                subject={subject}
                status={status}
              />
            );
          }
        })}
      </div>
      <div>
        <i className="pi pi-clock my-3 mx-3" style={{ color: 'red' }} />
        Atrasadas
      </div>
      <Divider className="my-3 mt-1"></Divider>
      <div className="flex flex-wrap">
        {Object.values(subjects).map((subject) => {
          if (subject.id === id) {
            const status = 'Late';
            return (
              <SpecificSubjectTasks
                key={subject.id}
                subject={subject}
                status={status}
              />
            );
          }
        })}
      </div>

      <div className="flex mt-3 align-items-center">
        <div>
          <i className="pi pi-check mb-2 mx-3" style={{ color: 'green' }} />
          Finalizadas
        </div>
      </div>
      <Divider className="mb-4"></Divider>

      <div className="flex flex-wrap">
        {Object.values(subjects).map((subject) => {
          if (subject.id === id) {
            const status = 'Finalized';
            return (
              <SpecificSubjectTasks
                key={subject.id}
                subject={subject}
                status={status}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
