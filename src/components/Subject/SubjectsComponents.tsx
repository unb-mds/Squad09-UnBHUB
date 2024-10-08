import { useEffect, useState } from 'react';
import { auth, db } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

import GeneralHeader from '../Header';

import SubjectCardConstructorComponent from './subjectsCardConstructor';

import { ISubject } from '../Exams/examInterfaces';

export default function SubjectsComponent(props: {
  setSubject: (subject: ISubject) => void;
  setVisible: (visible: boolean) => void;
  setVisibleSubject: (visibleSubject: boolean) => void;
}) {
  const [subjects, setSubjects] = useState<ISubject[]>([]);

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
    <div className="flex flex-column mx-3 my-1 w-full">
      <GeneralHeader />
      <Divider className="mb-2 mt-0" style={{ color: '#4b4b4b' }} />
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div
          className="flex h-1rem gap-2 align-items-center px-6 py-5 mb-6"
          style={{ color: '#4b4b4b' }}
        >
          <i className="pi pi-bookmark text-4xl"> </i>
          <h1>Matérias</h1>
        </div>
      </div>

      <div className="flex justify-content-between align-items-center px-2">
        <div style={{ color: '#4b4b4b' }}>
          <i className="pi pi-forward mx-2" style={{ color: '#3498db' }} />
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

      <SubjectCardConstructorComponent
        setSubject={props.setSubject}
        setVisibleSubject={props.setVisibleSubject}
        status="Active"
        UserSubjects={subjects}
        size="medium"
      />

      <div
        className="flex align-items-center px-2"
        style={{ color: '#4b4b4b' }}
      >
        <i className="pi pi-check my-3 mx-2" style={{ color: 'green' }} />
        Finalizadas
      </div>
      <Divider className="mb-4 mt-1"></Divider>

      <SubjectCardConstructorComponent
        setSubject={props.setSubject}
        setVisibleSubject={props.setVisibleSubject}
        status="Finalized"
        UserSubjects={subjects}
        size="medium" // Defina o tamanho dos cards como 'small', 'medium' ou 'large'
      />
    </div>
  );
}
