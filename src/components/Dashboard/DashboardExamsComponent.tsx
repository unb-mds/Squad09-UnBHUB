import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

import ExamsDataTableConstructorComponent from '../Exams/ExamsDataTableConstructor';
import { ISubject } from '../Exams/examInterfaces';


export default function DashboardExamsComponent(props: {
  subjects: ISubject[];
}) {
  return (
    <div className="flex flex-column mx-3">
      <div className="flex justify-content-between">
        <p className="flex w-4 h-1rem gap-2 align-items-center text-sm">
          <i className="pi pi-file" />
          Provas
        </p>
        <a href="/Exams">
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
      <ExamsDataTableConstructorComponent
        Usersubjects={props.subjects}
        status="Active"
      />
    </div>
  );
}
