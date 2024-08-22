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

const truncateTitle = (title: string) => {
  return title.length > 31 ? `${title.slice(0, 28)}...` : title; // Limite de caracteres ajustado para 31
};

const CardSubjectComponent = ({ subject, scale }: { subject: Subject; scale: number }) => (
  <div className="flex flex-column" style={{ fontSize: `${scale * 1}rem` }}>
    <p className="pi pi-user mt-0 mb-1" style={{ fontSize: `${scale * 0.8}rem` }}>{subject.professor}</p>
    <p className="pi pi-calendar mb-1" style={{ fontSize: `${scale * 0.8}rem` }}>{subject.weekDays}</p>
    <p className="pi pi-clock mb-1" style={{ fontSize: `${scale * 0.8}rem` }}>
      {formatTime(subject.startTime)} - {formatTime(subject.endTime)}
    </p>
    <p className="pi pi-map-marker" style={{ fontSize: `${scale * 0.8}rem` }}>{subject.local}</p>
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
        return { width: '250px', height: '250px', scale: 1 }; // Largura ajustada para ser igual à altura
      case 'medium':
        return { width: '300px', height: '300px', scale: 1.2 }; // Largura ajustada para ser igual à altura
      case 'large':
        return { width: '350px', height: '350px', scale: 1.5 }; // Largura ajustada para ser igual à altura
      default:
        return { width: '250px', height: '250px', scale: 1 }; // Tamanho padrão
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
              }
            })();

            const { width, height, scale } = getCardSize(); // Obtenha o tamanho e escala do card

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
                  title={truncateTitle(subject.codeSubject + ' - ' + subject.nameSubject)}
                  className="my-1"
                  style={{
                    color: 'white',
                    border: border,
                    width: width, // Defina a largura do card
                    height: height, // Defina a altura do card
                    fontSize: `${scale * 1}rem` // Ajuste o tamanho do texto do título
                  }}
                >
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
