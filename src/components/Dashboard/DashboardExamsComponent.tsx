import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';

interface Exam {
  code: string;
  score: string;
  date: Date;
  time: Date;
  room: string;
  status: string;
}

export default function DashboardExamsComponent() {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (docSnapshot) => {
          if (docSnapshot.exists() && docSnapshot.data().subjects) {
            const subjects = docSnapshot.data().subjects;
            const allExams = Object.values(subjects)
              .flatMap((subject: any) => Object.values(subject.exams || {}))
              .map((exam: any) => ({
                code: exam.code,
                score: exam.score,
                date: exam.date.toDate(), // Convert Firestore Timestamp to Date
                time: exam.time.toDate(), // Convert Firestore Timestamp to Date
                room: exam.room,
                status: exam.status,
              }));

            setExams(allExams);
          } else {
            setExams([]);
          }
        });

        return () => unsub();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-column mx-3 my-3">
      <div className="flex justify-content-between align-items-center">
        <p className="flex w-4 h-1rem gap-2 align-items-center">
          <i className="pi pi-file"></i>
          Provas
        </p>
      </div>
      <DataTable value={exams} tableStyle={{ minWidth: '50rem' }}>
        <Column field="code" header="Nome"></Column>
        <Column field="score" header="Nota"></Column>
        <Column
          field="date"
          header="Data"
          body={(rowData) => rowData.date.toLocaleDateString()}
        />
        <Column
          field="time"
          header="Horário"
          body={(rowData) => rowData.time.toLocaleTimeString()}
        />
        <Column field="room" header="Sala"></Column>
        <Column
          field="status"
          header="Status"
          body={(rowData) => (
            <span>
              {rowData.status === 'Finalized' ? 'Finalizado' : 'Em andamento'}
            </span>
          )}
        />
      </DataTable>
    </div>
  );
}
