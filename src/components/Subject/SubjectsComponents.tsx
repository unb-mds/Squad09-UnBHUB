import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../config/firebase';
import formatTime from '../../functions/FormatTime';

const CardSubjectComponent = ({ subject }) => (
  <div className="flex flex-column w-12">
    <p className="pi pi-user mt-0 mb-2">{subject.professor}</p>
    <p className="pi pi-calendar mb-2">{subject.weekDays}</p>
    <p className="pi pi-clock mb-2">{formatTime(subject.schedule)}</p>
    <p className="pi pi-map-marker">{subject.local}</p>
  </div>
);

export default function SubjectsComponent(props: {
  setSubject: (subject: any) => void;
  setVisible: (visible: boolean) => void;
  setVisibleSubject: (visibleSubject: boolean) => void;
}) {
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists() && doc.data().subjects) {
            setSubjects(doc.data().subjects);
          } else {
            setSubjects([]); // Define como uma lista vazia se não existir
          }
        });

        return () => unsub();
      }
    });
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
        {subjects === null || subjects.length === 0 ? (
          <p>No subjects found</p>
        ) : (
          Object.values(subjects).map((subject, index) => {
            if (subject.status === 'Active') {
              return (
                <a
                  className="w-3 cursor-pointer"
                  style={{ textDecoration: 'none' }}
                  onClick={() => {
                    props.setSubject(subject);
                    props.setVisibleSubject(true);
                  }}
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
              );
            }
          })
        )}
      </div>
      <div className="flex align-items-center px-6">
        <i className="pi pi-check my-3 mx-3" style={{ color: 'green' }} />
        Finalizadas
      </div>
      <Divider className="mb-4"></Divider>
      <div className="flex align-items-center flex-wrap">
        {subjects === null || subjects.length === 0 ? (
          <p>No subjects found</p>
        ) : (
          Object.values(subjects).map((subject, index) => {
            if (subject.status === 'Finalized') {
              return (
                <a
                  className="w-3 cursor-pointer"
                  style={{ textDecoration: 'none' }}
                  onClick={() => {
                    props.setSubject(subject);
                    props.setVisibleSubject(true);
                  }}
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
              );
            }
          })
        )}
      </div>
    </div>
  );
}
