import SideBarComponent from '../components/SideBar';
import ExamsComponents from '../components/Exams/ExamsComponent';
import CreateExamDialogComponent from '../components/Exams/CreateExamDialog';

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
      <div className="flex flex-column pr-5 w-full">
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
