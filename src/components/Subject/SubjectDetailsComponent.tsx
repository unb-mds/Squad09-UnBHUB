import { Divider } from 'primereact/divider';
import formatTime from '../../functions/FormatTime';

export default function SubjectDetailsComponent(props) {
  const { subject } = props;
  return (
    <div className="flex flex-column">
      <Divider className="mb-2 divider-center"></Divider>
      <div className="flex h-1rem gap-2 align-items-center py-5">
        <i className="pi pi-book text-4xl"> </i>
        <h1>{subject.nameSubject}</h1>
      </div>
      <Divider className="mb-1 mt-1"></Divider>
      <div className="flex align-items-center">
        <div className="flex flex-column w-12 gap-3 mt-3">
          <div>
            <i className="pi pi-user mr-2" />
            {subject.professor}
          </div>
          <div>
            <i className="pi pi-calendar mr-2" />
            {subject.weekDays}
          </div>
        </div>

        <div className="flex flex-column w-12 gap-3 mt-3">
          <div>
            <i className="pi pi-map-marker mr-2" />
            {subject.local}
          </div>
          <div>
            <i className="pi pi-clock mr-2" />
            {formatTime(subject.schedule)}
          </div>
        </div>
      </div>
      <Divider className="mb-2 divider-center"></Divider>
    </div>
  );
}
