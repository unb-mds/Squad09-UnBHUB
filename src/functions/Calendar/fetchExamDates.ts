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
  time: Date;
}

interface UserData {
  subjects: Record<
    string,
    { codeSubject: string; exams: Record<string, Exam>; status: string }
  >;
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

              subjectsMap.forEach((subject) => {
                if (subject.status !== 'Deleted') {
                  subject.exams.forEach((exam) => {
                    if (exam.status !== 'Deleted') {
                      examDates.push({
                        date: new Date(
                          exam.date.seconds * 1000
                        ).toLocaleDateString(),
                        codeSubject: subject.codeSubject,
                      });
                    }
                  });
                }
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
