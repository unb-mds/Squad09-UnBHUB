import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface Task {
  deliveryTime: any; // Pode ser Timestamp ou Date, dependendo da origem dos dados
  description: string;
  name: string;
  status: string;
}

interface Subject {
  codeSubject: string;
  tasks: Task[];
}

export const fetchTaskDates = async (): Promise<
  { deliveryTime: Date; description: string }[]
> => {
  const auth = getAuth();
  const taskDates: { deliveryTime: Date; description: string }[] = [];

  return new Promise((resolve, reject) => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            if (userData && userData.subjects) {
              const subjects: Map<string, Subject> = new Map(
                Object.entries(userData.subjects)
              );
              subjects.forEach((subject) => {
                subject.tasks.forEach((task) => {
                  taskDates.push({
                    deliveryTime: task.deliveryTime.toDate
                      ? task.deliveryTime.toDate()
                      : new Date(task.deliveryTime),
                    description: task.description,
                  });
                });
              });
              resolve(taskDates);
            } else {
              resolve(taskDates);
            }
          } else {
            resolve(taskDates);
          }
        });

        // Cleanup listener on unmount
        return () => unsubscribeSnapshot();
      } else {
        resolve(taskDates);
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  });
};
