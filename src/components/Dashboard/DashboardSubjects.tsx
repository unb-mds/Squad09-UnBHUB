import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Divider } from 'primereact/divider';

import SubjectCardConstructorComponent from '../Subject/subjectsCardConstructor';

import { ISubject } from '../Exams/examInterfaces';

export default function DashboardSubjectsComponent(props: {
  subjects: ISubject[];
}) {
  return (
    <div className="flex flex-column mx-3 my-3">
      <div className="flex justify-content-between">
        <p className="flex w-4 h-1rem gap-2 align-items-center text-sm">
          <i className="pi pi-bookmark"></i>
          Matérias
        </p>
        <a href="/Subjects">
          <Button
            label="Ver Tudo"
            icon="pi pi-angle-right"
            iconPos="right"
            size="small"
            text
            style={{ marginBottom: '-1.4rem' }}
          />
        </a>
      </div>

      <Divider className="mt-0" />

      <ScrollPanel style={{ width: '100%', height: '14rem' }}>
        <div className="flex">
          <SubjectCardConstructorComponent
            UserSubjects={props.subjects}
            status="Active"
            size="small"
          />
        </div>
      </ScrollPanel>
    </div>
  );
}
