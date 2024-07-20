import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const CardSubjectComponent = ({ subject }) => (
  <div className="flex flex-column w-12">
    <p className="pi pi-user mt-0 mb-2">{subject.professor}</p>
    <p className="pi pi-calendar mb-2">{subject.weekDays}</p>
    <p className="pi pi-clock mb-2">{subject.schedule}</p>
    <p className="pi pi-map-marker">{subject.local}</p>
  </div>
);

export default function SubjectsComponent(props: {
  setVisible: (visible: boolean) => void;
  setVisibleSubject: (visibleSubject: boolean) => void;
}) {
  const [subjects, setSubjects] = useState([]);
  const [completedSubject, setCompletedSubject] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      const userDataArray = querySnapshot.docs.map((doc) => doc.data());
      if (userDataArray.length > 0 && userDataArray[0].subjects) {
        setSubjects(userDataArray[0].subjects);
      }
      if (userDataArray.length > 0 && userDataArray[0].completedSubject) {
        setCompletedSubject(userDataArray[0].completedSubject);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-column mx-3 my-3 w-full">
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-book text-4xl"> </i>
          <h1>Matérias</h1>
        </div>
        <div className="flex align-items-center">
          <a href="http://localhost:5173/Messages">
            <Button
              icon="pi pi-bell p-overlay-badge"
              rounded
              text
              size="large"
              badge="2"
              badgeClassName="p-badge-danger"
              link
            />
          </a>
          <a href="http://localhost:5173/Messages">
            <Button
              icon="pi pi-inbox p-overlay-badge"
              rounded
              text
              size="large"
              link
            />
          </a>
          <Button className="" rounded text>
            <Avatar
              image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
              size="large"
              className="mr-2"
              shape="circle"
            />
          </Button>
        </div>
      </div>

      <div className="flex justify-content-between align-items-center px-6">
        <div>
          <i className="pi pi-forward mx-3" style={{ color: '#3498db' }} />
          Em Andamento
        </div>
        <a>
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            iconPos="left"
            size="small"
            text
            link
            onClick={() => props.setVisible(true)}
          />
        </a>
      </div>
      <Divider className="mb-4"></Divider>

      <div className="flex align-items-center flex-wrap">
        {subjects.map((subject, index) => (
          <a
            onClick={() => props.setVisibleSubject(true)}
            className="w-3"
            style={{ textDecoration: 'none' }}
            key={index}
          >
            <Card
              title={subject.codeSubject + ' - ' + subject.nameSubject}
              className="h-20rem my-1"
              style={{
                color: 'white',
                border: '2px solid #3498db',
              }}
            >
              <CardSubjectComponent subject={subject} />
            </Card>
          </a>
        ))}
      </div>
      <div className="flex justify-content-between align-items-center px-6">
        <div>
          <i className="pi pi-check my-3 mx-3" style={{ color: 'green' }} />
          Finalizadas
        </div>
        <a>
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            iconPos="left"
            size="small"
            text
            link
            onClick={() => props.setVisible(true)}
          />
        </a>
      </div>
      <Divider className="mb-4"></Divider>

      <div className="flex align-items-center flex-wrap">
        {completedSubject.map((subject, index) => (
          <a
            onClick={() => props.setVisibleSubject(true)}
            className="w-3"
            style={{ textDecoration: 'none' }}
            key={index}
          >
            <Card
              title={subject.codeSubject + ' - ' + subject.nameSubject}
              className="h-20rem my-1"
              style={{
                color: 'white',
                border: '2px solid #3498db',
              }}
            >
              <CardSubjectComponent subject={subject} />
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
