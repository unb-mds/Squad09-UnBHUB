import { useEffect, useState } from 'react';
import { auth, db } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { ScrollPanel } from 'primereact/scrollpanel';

import GeneralHeader from '../Header';

import SubjectCardConstructorComponent from './subjectsCardConstructor';

interface Subject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  startTime: Date;
  endTime: Date;
  local: string;
  status: string;
  id: string;
  tasks: [];
  exams: [];
}

export default function SubjectsComponent(props: {
  setSubject: (subject: Subject) => void;
  setVisible: (visible: boolean) => void;
  setVisibleSubject: (visibleSubject: boolean) => void;
}) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists() && doc.data().subjects) {
            setSubjects(doc.data().subjects);
          } else {
            setSubjects([]);
          }
        });

        return () => unsub();
      }
    });
  }, []);

  return (
    <div className="flex flex-column mx-3 my-0 w-full">
      <GeneralHeader className="mb-1 mt-1" />
      <Divider className="mb-2 mt-0" />
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5 mb-6">
          <i className="pi pi-bookmark text-4xl"> </i>
          <h1>Matérias</h1>
        </div>
      </div>

      <div className="flex justify-content-between align-items-center px-6">
        <div>
          <i className="pi pi-forward mx-3" style={{ color: '#3498db' }} />
          Em Andamento
        </div>
        <a>
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            iconPos="left"
            size="small"
            text
            link
            onClick={() => props.setVisible(true)}
          />
        </a>
      </div>
      <Divider className="mb-4 mt-1"></Divider>

      <ScrollPanel style={{ width: '100%', height: '22rem' }}>
        <SubjectCardConstructorComponent
          setSubject={props.setSubject}
          setVisibleSubject={props.setVisibleSubject}
          status="Active"
          UserSubjects={subjects}
          size="medium" // Defina o tamanho dos cards como 'small', 'medium' ou 'large'
        />
      </ScrollPanel>

      <div className="flex align-items-center px-6">
        <i className="pi pi-check my-3 mx-3" style={{ color: 'green' }} />
        Finalizadas
      </div>
      <Divider className="mb-4 mt-1"></Divider>
      <ScrollPanel style={{ width: '100%', height: '22rem' }}>
        <SubjectCardConstructorComponent
          setSubject={props.setSubject}
          setVisibleSubject={props.setVisibleSubject}
          status="Finalized"
          UserSubjects={subjects}
          size="medium" // Defina o tamanho dos cards como 'small', 'medium' ou 'large'
        />
      </ScrollPanel>
    </div>
  );
}
