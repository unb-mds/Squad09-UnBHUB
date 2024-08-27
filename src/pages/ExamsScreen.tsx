import SideBarComponent from '../components/SideBar';
import GeneralHeader from '../components/Header';
import ExamsComponents from '../components/Exams/ExamsComponent';
import CreateExamDialogComponent from '../components/Exams/CreateExamDialog';
import { Divider } from 'primereact/divider';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ExamsScreen() {
  const [subjects, setSubjects] = useState([]);
  const [visibleCreateExam, setVisibleCreateExam] = useState<boolean>(false);

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
    <div className="flex flex-row">
      <SideBarComponent />
      <div className="flex flex-column pl-1 gap-1 w-full">
        <GeneralHeader />
        <Divider className="mb-2 mt-0" />
        <ExamsComponents
          UserSubjects={subjects}
          setVisibleCreateExam={setVisibleCreateExam}
        />
        <CreateExamDialogComponent
          visibleCreateExam={visibleCreateExam}
          setVisibleCreateExam={setVisibleCreateExam}
          userSubjects={subjects}
        />
      </div>
    </div>
  );
}
