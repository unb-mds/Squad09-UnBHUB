import SpecificSubjectTasks from '../Subject/SpecificSubjectTasks';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../config/firebase';
import { ScrollPanel } from 'primereact/scrollpanel';

interface ITask {
  deliveryDay: Date;
  description: string;
  status: string;
  subjectId: string;
  taskId: string;
  taskName: string;
}

interface ISubject {
  codeSubject: string;
  nameSubject: string;
  professor: string;
  weekDays: string;
  startTime: Date;
  endTime: Date;
  local: string;
  status: string;
  id: string;
  tasks: [];
  exams: [];
}

export default function DashboardTasksComponent(props: {
  subjects: ISubject[];
}) {
  const [currentSemester, setCurrentSemester] = useState<number>(0);
  const [endSemester, setEndSemester] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserSemesterInfo = async () => {
      if (auth.currentUser) {
        const userDoc = doc(db, 'Users', auth.currentUser.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const data = userSnapshot.data().UserInfo;
          setCurrentSemester(data.currentSemester);
          setEndSemester(data.endSemester);
        }
      }
      setLoading(false);
    };

    fetchUserSemesterInfo();
  }, []);

  if (loading || !props.subjects) {
    return null;
  }

  const progress = ((currentSemester / endSemester) * 100).toFixed(2);

  const activeSubjects = Object.values(props.subjects).filter(
    (subject) =>
      subject.status === 'Active' &&
      Object.values(subject.tasks).some(
        (task: ITask) => task.status === 'Active'
      )
  );

  return (
    <div className="flex flex-column mx-3 my-3">
      <div className="flex flex-column my-3 px-3">
        <p className="text-lg">
          Semestre {currentSemester} de {endSemester}
        </p>
        <ProgressBar value={parseInt(progress)}></ProgressBar>
      </div>
      <div className="flex justify-content-between">
        <p className="flex w-4 h-1rem gap-2 align-items-center">
          <i className="pi pi-clipboard" />
          Tarefas
        </p>
        <a href="http://localhost:5173/Tasks">
          <Button
            label="Ver Tudo"
            icon="pi pi-angle-right"
            iconPos="right"
            size="small"
            text
          />
        </a>
      </div>
      <ScrollPanel style={{ width: '100%', height: '45rem' }}>
        <div className="flex flex-column gap-2">
          {activeSubjects.map((subject) => (
            <SpecificSubjectTasks
              key={subject.id}
              subject={subject}
              status="Active"
              styleOption="Vertical"
            />
          ))}
        </div>
      </ScrollPanel>
    </div>
  );
}