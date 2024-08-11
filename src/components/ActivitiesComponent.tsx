import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import TasksComponent from './Activities/Teste'; // Atualize o caminho conforme necessário

export default function ActivitiesComponent1(props: {
  CreatesetVisible: (visibleCreate: boolean) => void;
  setTask: (task: any) => void;
  EditsetVisible: (activityData: {
    codeSubject: string;
    nameActivity: string;
    deliveryDay: string;
  }) => void;
}) {
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists()) {
            setSubjects(doc.data().subjects);
          }
        });

        return () => unsub();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-column mx-3 my-3 gap-0 w-full">
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-book text-4xl" style={{ color: 'white' }} />
          <h1 style={{ color: 'white' }}>Tarefas</h1>
        </div>
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-forward mb-2 mx-3" style={{ color: '#007bff' }} />
          Em andamento
        </div>
        <Button
          label="Adicionar"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          text
          link
          onClick={() => {
            props.CreatesetVisible(true);
          }}
        />
      </div>
      <div className="">
        {Object.values(subjects).map((subject, index) => {
          if (subject.status === 'Active') {
            return (
              <a
                className="w-3 cursor-pointer"
                style={{ textDecoration: 'none' }}
                key={index}
              >
                <TasksComponent subject={subject} status={'Active'} />
              </a>
            );
          }
          return null;
        })}
      </div>

      <Divider className="my-0" />

      <div className="flex flex-row justify-content-between gap-2 my-4"></div>

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-clock mb-2 mx-3" style={{ color: '#dc3545' }} />
          Atrasadas
        </div>
      </div>
      <div className="">
        {Object.values(subjects).map((subject, index) => {
          if (subject.status === 'Active') {
            return (
              <a
                className="w-3 cursor-pointer"
                style={{ textDecoration: 'none' }}
                key={index}
              >
                <TasksComponent subject={subject} status={'Late'} />
              </a>
            );
          }
          return null;
        })}
      </div>

      <Divider className="my-0" />

      <div className="flex flex-row justify-content-between gap-2 my-4"></div>

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-check mb-2 mx-3" style={{ color: '#28a745' }} />
          Finalizadas
        </div>
      </div>
      <div className="">
        {Object.values(subjects).map((subject, index) => {
          if (subject.status === 'Active') {
            return (
              <a
                className="w-3 cursor-pointer"
                style={{ textDecoration: 'none' }}
                key={index}
              >
                <TasksComponent subject={subject} status={'Finalized'} />
              </a>
            );
          }
          return null;
        })}
      </div>

      <Divider className="my-0" />

      <div className="flex flex-row justify-content-between gap-2 my-4"></div>
    </div>
  );
}
