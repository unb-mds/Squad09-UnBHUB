import { useEffect, useState } from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../config/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

// Interfaces para dados
interface ISubject {
  codeSubject: string;
  tasks: Record<string, Task>;
  status: string;
  exams: Record<string, Exam>;  // Tipagem correta para exams
}

interface ICreateBook {
  id: string;
  author: string;
  bookName: string;
  deliveryDay: Timestamp;
  status: string;
}

interface Task {
  id: string;
  codeSubject: string;
  taskName: string;
  deliveryDay: Timestamp;
  status: string;
  description: string;
}

interface Exam {
  date: Timestamp;
  status: string;
}

export default function Stats() {
  const [subjectsCount, setSubjectsCount] = useState<number>(0);
  const [finishedSubjectsCount, setFinishedSubjectsCount] = useState<number>(0);
  const [ongoingSubjectsCount, setOngoingSubjectsCount] = useState<number>(0);
  const [activeExamsCount, setActiveExamsCount] = useState<number>(0);
  const [finishedExamsCount, setFinishedExamsCount] = useState<number>(0);
  const [tasksCount, setTasksCount] = useState<number>(0);
  const [overdueTasksCount, setOverdueTasksCount] = useState<number>(0);
  const [finishedTasksCount, setFinishedTasksCount] = useState<number>(0);
  const [ongoingTasksCount, setOngoingTasksCount] = useState<number>(0);
  const [booksCount, setReadBooksCount] = useState<number>(0);
  const [overdueBooksCount, setOverdueBooksCount] = useState<number>(0);
  const [readingBooksCount, setReadingBooksCount] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, 'Users', user.uid);
        
        // Recuperar dados do usuário
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          
          // Contar matérias
          const subjectsData = data.subjects ? Object.values(data.subjects) as ISubject[] : [];

          const nonDeletedSubjects = subjectsData.filter(subject => subject.status !== 'Deleted');
          setSubjectsCount(nonDeletedSubjects.length);

          // Contar matérias finalizadas e em andamento
          const finishedSubjects = subjectsData.filter(subject => subject.status === 'Finalized');
          setFinishedSubjectsCount(finishedSubjects.length);

          const ongoingSubjects = subjectsData.filter(subject => subject.status === 'Active');
          setOngoingSubjectsCount(ongoingSubjects.length);

          // Contar provas ativas e finalizadas
          const exams = subjectsData.flatMap(subject => Object.values(subject.exams || {}));
          const today = new Date();
          const activeExams = exams.filter(exam => {
            const examDate = exam.date.toDate();  // Corrige o tipo de exam
            return examDate >= today && exam.status !== 'Deleted';
          });
          setActiveExamsCount(activeExams.length);

          const finishedExams = exams.filter(exam => exam.status === 'Finalized');
          setFinishedExamsCount(finishedExams.length);

          // Contar tarefas
          const tasks = subjectsData.flatMap(subject =>
            Object.values(subject.tasks).filter(task => task.status !== 'Deleted')
          );
          setTasksCount(tasks.length);

          const overdueTasks = tasks.filter(task => {
            const deliveryDate = task.deliveryDay.toDate();
            return deliveryDate < today && task.status !== 'Finalized' && task.status !== 'Deleted';
          });
          setOverdueTasksCount(overdueTasks.length);

          const finishedTasks = tasks.filter(task => task.status === 'Finalized');
          setFinishedTasksCount(finishedTasks.length);

          const ongoingTasks = tasks.filter(task => task.status === 'Active');
          setOngoingTasksCount(ongoingTasks.length);

          // Contar livros
          const books = data.books ? Object.values(data.books) as ICreateBook[] : [];

          const readBooks = books.filter(book => book.status === 'Finalized');
          setReadBooksCount(readBooks.length);

          const overdueBooks = books.filter(book => book.status === 'Late');
          setOverdueBooksCount(overdueBooks.length);

          const readingBooks = books.filter(book => book.status === 'Ongoing');
          setReadingBooksCount(readingBooks.length);
        }
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className="surface-ground px-4 py-5 md:px-6 lg:px-8">
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Matérias Cadastradas</span>
                <div className="text-900 font-medium text-xl">{subjectsCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-bookmark text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Matérias Finalizadas</span>
                <div className="text-900 font-medium text-xl">{finishedSubjectsCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-bookmark text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Continue com os outros cards */}
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Matérias em Andamento</span>
                <div className="text-900 font-medium text-xl">{ongoingSubjectsCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-bookmark text-orange-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Provas Ativas</span>
                <div className="text-900 font-medium text-xl">{activeExamsCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-calendar-times text-purple-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Provas Finalizadas</span>
                <div className="text-900 font-medium text-xl">{finishedExamsCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-calendar-times text-green-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Tarefas Cadastradas</span>
                <div className="text-900 font-medium text-xl">{tasksCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-clipboard text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Tarefas Atrasadas</span>
                <div className="text-900 font-medium text-xl">{overdueTasksCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-red-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-clipboard text-red-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Tarefas Finalizadas</span>
                <div className="text-900 font-medium text-xl">{finishedTasksCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-clipboard text-green-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Tarefas em Andamento</span>
                <div className="text-900 font-medium text-xl">{ongoingTasksCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-clipboard text-orange-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Livros Lidos</span>
                <div className="text-900 font-medium text-xl">{booksCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-book text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Livros Atrasados</span>
                <div className="text-900 font-medium text-xl">{overdueBooksCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-red-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-book text-red-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Livros Sendo Lidos</span>
                <div className="text-900 font-medium text-xl">{readingBooksCount}</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-book text-orange-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
