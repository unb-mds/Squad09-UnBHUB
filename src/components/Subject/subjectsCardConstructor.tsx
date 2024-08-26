import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import formatTime from '../../functions/FormatTime';

// Define os tons de cores disponíveis
const colors = [
  'green',
  'yellow',
  'cyan',
  'pink',
  'indigo',
  'teal',
  'orange',
  'purple',
  'red',
];

// Função para gerar uma cor fixa baseada no ID do assunto
const getColorForSubject = (subjectId: string) => {
  // Use um hash simples para obter um índice de cor a partir do ID
  const hash = Array.from(subjectId).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return colors[hash % colors.length];
};

// Função para retornar o shade (100 ou 200) com base no status do subject
const getShadeForStatus = (status: string) => {
  return status === 'Active' ? '200' : '100';
};

const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength
    ? `${title.slice(0, maxLength - 3)}...`
    : title;
};

const CardSubjectComponent = ({
  subject,
  scale,
}: {
  subject: ISubject;
  scale: number;
}) => (
  <div className="flex flex-column" style={{ fontSize: `${scale * 1.2}rem` }}>
    <p
      className="pi pi-user mt-0 mb-1"
      style={{ fontSize: `${scale * 0.8}rem` }}
    >
      {subject.professor}
    </p>
    <p
      className="pi pi-calendar mb-1"
      style={{ fontSize: `${scale * 0.8}rem` }}
    >
      {subject.weekDays}
    </p>
    <p className="pi pi-clock mb-1" style={{ fontSize: `${scale * 0.8}rem` }}>
      {formatTime(subject.startTime)} - {formatTime(subject.endTime)}
    </p>
    <p className="pi pi-map-marker" style={{ fontSize: `${scale * 0.8}rem` }}>
      {subject.local}
    </p>
  </div>
);

export default function SubjectCardConstructorComponent(props: {
  setSubject?: (subject: ISubject) => void;
  setVisibleSubject?: (visibleSubject: boolean) => void;
  UserSubjects: ISubject[];
  status: string;
  size: 'small' | 'medium' | 'large';
}) {
  const getCardSize = () => {
    switch (props.size) {
      case 'small':
        return { width: '250px', height: '210px', scale: 1 };
      case 'medium':
        return { width: '300px', height: '250px', scale: 1.2 };
      case 'large':
        return { width: '350px', height: '350px', scale: 1.5 };
      default:
        return { width: '250px', height: '210px', scale: 1 };
    }
  };

  const filteredSubjects = Object.values(props.UserSubjects).filter(
    (UserSubjects) => UserSubjects.status === props.status
  );

  return (
    <div className="flex align-items-center flex-wrap gap-3">
      {filteredSubjects.length === 0 ? (
        <p>Nenhuma matéria encontrada</p>
      ) : (
        filteredSubjects.map((subject, index) => {
          const { width, height, scale } = getCardSize();
          const backgroundColor = getColorForSubject(subject.id); // Obtém a cor fixa
          const shade = getShadeForStatus(subject.status); // Obtém o shade baseado no status

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
                className={`my-1 bg-${backgroundColor}-${shade}`} // Usa a cor e o shade fixos
                style={{
                  color: '#4b4b4b',
                  border: 'none', // Remove a borda
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
                    marginTop: '-1rem',
                  }}
                >
                  {truncateTitle(
                    subject.codeSubject + ' - ' + subject.nameSubject,
                    31
                  )}
                </div>
                <Divider className="mt-2" />
                <CardSubjectComponent subject={subject} scale={scale} />
              </Card>
            </a>
          );
        })
      )}
    </div>
  );
}
