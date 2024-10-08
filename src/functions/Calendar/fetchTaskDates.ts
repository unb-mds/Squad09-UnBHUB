import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface Task {
  deliveryDay: {
    seconds: number;
    nanoseconds: number;
  };
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

interface UserData {
  subjects: Record<
    string,
    { codeSubject: string; tasks: Record<string, Task>; status: string }
  >;
}

export const fetchTaskDates = async (): Promise<
  { deliveryDay: Date; description: string }[]
> => {
  const auth = getAuth();
  const taskDates: { deliveryDay: Date; description: string }[] = [];

  return new Promise((resolve, reject) => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);
        const unsubscribeSnapshot = onSnapshot(
          userDocRef,
          (doc) => {
            if (doc.exists()) {
              const userData = doc.data() as UserData;
              if (userData && userData.subjects) {
                Object.entries(userData.subjects).forEach(([, subject]) => {
                  if (subject.status !== 'Deleted') {
                    Object.values(subject.tasks).forEach((task) => {
                      if (task.status !== 'Deleted') {
                        const deliveryDay = new Date(
                          task.deliveryDay.seconds * 1000
                        );
                        taskDates.push({
                          deliveryDay: deliveryDay,
                          description: task.description,
                        });
                      }
                    });
                  }
                });
                resolve(taskDates);
              } else {
                resolve(taskDates);
              }
            } else {
              resolve(taskDates);
            }
          },
          (error) => {
            reject(error);
          }
        );

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
