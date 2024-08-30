import { Divider } from 'primereact/divider';
import formatTime from '../../functions/FormatTime';
import GeneralHeader from '../Header';
import { Timestamp } from 'firebase/firestore';

interface SubjectDetailsComponentProps {
  subject: {
    codeSubject: string;
    nameSubject: string;
    professor: string;
    weekDays: string;
    local: string;
    startTime: Timestamp;
    endTime: Timestamp;
  };
}

export default function SubjectDetailsComponent({
  subject,
}: SubjectDetailsComponentProps) {
  return (
    <div className="flex flex-column mb-5">
      <GeneralHeader />
      <Divider className="mb-2 mt-1 divider-center"></Divider>
      <div
        className="flex h-1rem gap-3 align-items-center py-5"
        style={{ color: '#4b4b4b' }}
      >
        <i className="pi pi-bookmark text-4xl"> </i>
        <h1>
          {subject.codeSubject} - {subject.nameSubject}
        </h1>
      </div>
      <Divider className="mb-2 mt-2"></Divider>
      <div className="flex align-items-center">
        <div
          className="flex flex-column w-12 gap-4 mt-3"
          style={{ fontSize: '0.9rem', color: '#4b4b4b' }}
        >
          <div>
            <i className="pi pi-user mr-2" />
            Professor(a): {subject.professor}
          </div>
          <div>
            <i className="pi pi-calendar mr-2" />
            Dias da semana: {subject.weekDays}
          </div>
        </div>

        <div
          className="flex flex-column w-12 gap-4 mt-3"
          style={{ fontSize: '0.9rem', color: '#4b4b4b' }}
        >
          <div>
            <i className="pi pi-map-marker mr-2" />
            Sala: {subject.local}
          </div>
          <div>
            <i className="pi pi-clock mr-2" />
            <span>
              Horários: {formatTime(subject.startTime)} -{' '}
              {formatTime(subject.endTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
