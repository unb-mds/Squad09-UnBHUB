import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface Exam {
  code: string;
  date: Date;
  id: string;
  room: string;
  score: string;
  status: string;
  time: Date;
}

interface Subject {
  codeSubject: string;
  exams: Exam[];
}

export const fetchExamDates = async (): Promise<
  { date: string; codeSubject: string }[]
> => {
  const auth = getAuth();
  const examDates: { date: string; codeSubject: string }[] = [];

  return new Promise((resolve) => {
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
                subject.exams.forEach((exam) => {
                  examDates.push({
                    date: exam.date.toDate().toLocaleDateString(),
                    codeSubject: subject.codeSubject,
                  });
                });
              });
              resolve(examDates);
            } else {
              resolve(examDates);
            }
          } else {
            resolve(examDates);
          }
        });

        // Cleanup listener on unmount
        return () => unsubscribeSnapshot();
      } else {
        resolve(examDates);
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  });
};
