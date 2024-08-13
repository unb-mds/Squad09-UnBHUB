import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface Task {
  deliveryDay: Date;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

interface Subject {
  codeSubject: string;
  tasks: Map<string, Task>;
}

interface UserData {
  subjects: Record<
    string,
    { codeSubject: string; tasks: Record<string, Task> }
  >;
}

export default function DataTarefas() {
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
                    const tasksMap = new Map(Object.entries(subjectData.tasks));
                    return [
                      subjectId,
                      { codeSubject: subjectData.codeSubject, tasks: tasksMap },
                    ];
                  }
                )
              );
              setSubjects(subjectsMap);
            }
          }
        });

        // Cleanup listener on unmount
        return () => unsubscribeSnapshot();
      } else {
        setCurrentUserId(null);
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  if (!currentUserId) {
    return <p>Loading...</p>;
  }

  const renderTasks = (tasks: Map<string, Task>) => {
    return Array.from(tasks.values()).map((task, index) => (
      <li key={index} className="flex align-items-center mb-3">
        <i className="pi pi-angle-right mr-2 text-green-500" />
        {typeof task.deliveryDay === 'string'
          ? new Date(task.deliveryDay).toLocaleDateString()
          : task.deliveryDay.toDate().toLocaleDateString()}
        : {task.description}
      </li>
    ));
  };

  const filteredSubjects = Array.from(subjects.entries()).filter(
    ([, subject]) => subject.tasks.size > 0
  ); // Filtra matérias com tarefas

  return (
    <div className="col-12 lg:col-4">
      <div className="p-3 h-full">
        <div className="shadow-2 p-3 h-full flex flex-column surface-card">
          <div className="text-900 font-medium text-xl mb-2">
            🔵 Datas de Tarefas
          </div>

          <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
          <div className="flex align-items-center"></div>

          <ul className="list-none p-0 m-0 flex-grow-1">
            {filteredSubjects.map(([subjectId, subject]) => (
              <li key={subjectId} className="flex flex-column mb-3">
                <div className="font-bold mb-2">
                  Código da Matéria: {subject.codeSubject}
                </div>
                <ul>{renderTasks(subject.tasks)}</ul>
              </li>
            ))}
          </ul>

          <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border mt-auto" />
        </div>
      </div>
    </div>
  );
}
