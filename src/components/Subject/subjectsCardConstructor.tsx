import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
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

const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength ? `${title.slice(0, maxLength - 3)}...` : title;
};

const CardSubjectComponent = ({ subject, scale }: { subject: Subject; scale: number }) => (
  <div className="flex flex-column" style={{ fontSize: `${scale * 0.8}rem` }}>
    <p className="pi pi-user mt-0 mb-1">{subject.professor}</p>
    <p className="pi pi-calendar mb-1">{subject.weekDays}</p>
    <p className="pi pi-clock mb-1">
      {formatTime(subject.startTime)} - {formatTime(subject.endTime)}
    </p>
    <p className="pi pi-map-marker">{subject.local}</p>
  </div>
);

export default function SubjectCardConstructorComponent(props: {
  setSubject?: (subject: Subject) => void;
  setVisibleSubject?: (visibleSubject: boolean) => void;
  UserSubjects: Subject[];
  status: string;
  size: 'small' | 'medium' | 'large'; // Adiciona o parâmetro size
}) {
  // Define o tamanho do card e a escala do conteúdo com base no valor do parâmetro size
  const getCardSize = () => {
    switch (props.size) {
      case 'small':
        return { width: '250px', height: '250px', scale: 1 };
      case 'medium':
        return { width: '300px', height: '300px', scale: 1.2 };
      case 'large':
        return { width: '350px', height: '350px', scale: 1.5 };
      default:
        return { width: '250px', height: '250px', scale: 1 };
    }
  };

  return (
    <div className="flex align-items-center flex-wrap gap-3">
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
                default:
                  return '2px solid gray'; // Default border color
              }
            })();

            const { width, height, scale } = getCardSize();

            return (
              <a
                className="cursor-pointer"
                style={{ textDecoration: 'none', width: width }}
                onClick={() => {
                  if (props.setSubject) {
                    props.setSubject(subject);
                  }
                  if (props.setVisibleSubject) {
                    props.setVisibleSubject(true);
                  }
                }}
                key={index}
              >
                <Card
                  className="my-1"
                  style={{
                    color: 'white',
                    border: border,
                    width: width,
                    height: height,
                    fontSize: `${scale * 1}rem`,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0.5rem',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      fontSize: `${scale * 1}rem`,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: '0.5rem',
                      marginTop: '-1rem', // Move title up
                    }}
                  >
                    {truncateTitle(subject.codeSubject + ' - ' + subject.nameSubject, 31)}
                  </div>
                  <Divider className='mt-2'/>
                  <CardSubjectComponent subject={subject} scale={scale} />
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
