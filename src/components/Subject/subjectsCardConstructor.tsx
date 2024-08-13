import { Card } from 'primereact/card';
import formatTime from '../../functions/FormatTime';

interface Subject {
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

const CardSubjectComponent = ({ subject }: { subject: Subject }) => (
  <div className="flex flex-column w-12">
    <p className="pi pi-user mt-0 mb-2">{subject.professor}</p>
    <p className="pi pi-calendar mb-2">{subject.weekDays}</p>
    <p className="pi pi-clock mb-2">
      {formatTime(subject.startTime)} - {formatTime(subject.endTime)}
    </p>
    <p className="pi pi-map-marker">{subject.local}</p>
  </div>
);

export default function SubjectCardConstructorComponent(props: {
  setSubject: (subject: Subject) => void;
  setVisibleSubject: (visibleSubject: boolean) => void;
  UserSubjects: Subject[];
  status: string;
}) {
  return (
    <div className="flex align-items-center flex-wrap">
      {props.UserSubjects === null || props.UserSubjects.length === 0 ? (
        <p>No subjects found</p>
      ) : (
        Object.values(props.UserSubjects).map((subject, index) => {
          if (subject.status === props.status) {
            const border = (() => {
              switch (props.status) {
                case 'Active':
                  return '2px solid #3498db';
                case 'Late':
                  return '2px solid #e41223';
                case 'Finalized':
                  return '2px solid #12e42b';
              }
            })();
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
                    border: border,
                  }}
                >
                  <CardSubjectComponent subject={subject} />
                </Card>
              </a>
            );
          }
          return null;
        })
      )}
    </div>
  );
}
