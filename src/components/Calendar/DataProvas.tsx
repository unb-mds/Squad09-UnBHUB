import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface Exam {
  code: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
  room: string;
  score: string;
  status: string;
  time: {
    seconds: number;
    nanoseconds: number;
  };
}

interface Subject {
  codeSubject: string;
  exams: Map<string, Exam>;
  status: string;
}

interface UserData {
  subjects: Record<
    string,
    { codeSubject: string; exams: Record<string, Exam>; status: string }
  >;
}

export default function DataProvas() {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Map<string, Subject>>(new Map());

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);

        const userDocRef = doc(db, 'Users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data() as UserData;
            if (userData && userData.subjects) {
              const subjectsMap = new Map(
                Object.entries(userData.subjects).map(
                  ([subjectId, subjectData]) => {
                    const examsMap = new Map(Object.entries(subjectData.exams));
                    return [
                      subjectId,
                      {
                        codeSubject: subjectData.codeSubject,
                        exams: examsMap,
                        status: subjectData.status,
                      },
                    ];
                  }
                )
              );
              setSubjects(subjectsMap);
            }
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        setCurrentUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (!currentUserId) {
    return <p>Loading...</p>;
  }

  const renderExams = (exams: Map<string, Exam>) => {
    return Array.from(exams.values())
      .filter((exam) => exam.status !== 'Deleted')
      .map((exam, index) => (
        <li key={index} className="flex align-items-center mb-3">
          <i className="pi pi-angle-right mr-2 text-green-500" />
          {new Date(exam.date.seconds * 1000).toLocaleDateString()} :{' '}
          {exam.code}
        </li>
      ));
  };

  const filteredSubjects = Array.from(subjects.entries())
    .filter(
      ([, subject]) => subject.exams.size > 0 && subject.status !== 'Deleted'
    )
    .filter(([, subject]) =>
      Array.from(subject.exams.values()).some(
        (exam) => exam.status !== 'Deleted'
      )
    );

  return (
    <div className="col-12 lg:col-4">
      <div className="p-3 h-full">
        <div className="shadow-2 p-3 h-full flex flex-column surface-card">
          <div className="text-900 font-medium text-xl mb-2">
            🔴 Datas de Provas
          </div>

          <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
          <div className="flex align-items-center"></div>

          <ul className="list-none p-0 m-0 flex-grow-1">
            {filteredSubjects.map(([subjectId, subject]) => (
              <li key={subjectId} className="flex flex-column mb-3">
                <div className="font-bold mb-2">
                  Código da Matéria: {subject.codeSubject}
                </div>
                <ul>{renderExams(subject.exams)}</ul>
              </li>
            ))}
          </ul>

          <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border mt-auto" />
        </div>
      </div>
    </div>
  );
}
