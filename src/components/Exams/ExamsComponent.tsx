import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import ExamsDataTableConstructorComponent from './ExamsDataTableConstructor';
import { ISubject } from './examInterfaces';
import GeneralHeader from '../Header';


export default function ExamsComponents(props: {
  UserSubjects: ISubject[];
  setVisibleCreateExam: (visibleCreateExam: boolean) => void;
}) {
  return (
    <div className="flex flex-column mx-3 my-1 w-full">
      <GeneralHeader />
      <Divider className="mb-2 mt-0" />
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5 mb-6">
          <i className="pi pi-file text-4xl" style={{ color: '#4b4b4b' }} />
          <h1 style={{ color: '#4b4b4b' }}>Provas</h1>
        </div>
      </div>
      <div 
        className="flex justify-content-between align-items-center px-2 border-round-lg" 
        style={{ color: '#4b4b4b' }}
      >
        <div>
          <i className="pi pi-forward mx-2" style={{ color: '#007bff' }} />
          Em Andamento
        </div>
        <Button
          label="Adicionar"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          text
          link
          onClick={() => props.setVisibleCreateExam(true)}
        />
      </div>

      <Divider className="mb-2 mt-1"></Divider>

      <ExamsDataTableConstructorComponent
        Usersubjects={props.UserSubjects}
        status={'Active'}
      />
      
      <div className="flex align-items-center px-2 mt-5" style={{ color: '#4b4b4b' }}>
        <i className="pi pi-check my-3 mx-2" style={{ color: 'green' }} />
        Finalizadas
      </div>
      <Divider className="mb-2 mt-1"></Divider>
      <ExamsDataTableConstructorComponent
        Usersubjects={props.UserSubjects}
        status={'Finalized'}
      />
    </div>
  );
}
