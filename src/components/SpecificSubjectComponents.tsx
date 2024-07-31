import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function SpecificSubjectComponents(props: {
  setVisible: (examVisible: boolean) => void;
}) {
  return (
    <div className="flex flex-column mx-4 my-3 w-full">
      <Divider className="mb-2 divider-center"></Divider>
      <div className="flex h-1rem gap-2 align-items-center py-5">
        <i className="pi pi-book text-4xl"> </i>
        <h1>Nome matéria</h1>{' '}
      </div>
      <Divider className="mb-1 mt-1"></Divider>

      <div
        className="flex align-items-center gap-8"
        style={{ color: '#57d9dc' }}
      >
        <div className="flex flex-column pr-8">
          <p className="pi pi-user mb-2 text-xl"> Carla Rocha</p>
          <p className="pi pi-calendar mb-2 text-xl"> Quarta & Sexta</p>
        </div>

        <div className="flex flex-column pl-6">
          <p className="pi pi-clock mb-2 text-xl"> 10:00 - 11:50</p>
          <p className="pi pi-map-marker text-xl"> LAB MOCAP</p>
        </div>
      </div>

      <div className="flex flex-column my-3">
        <div className="flex justify-content-between align-items-center">
          <p className="flex w-4 h-1rem gap-2 align-items-center pb-2">
            <i className="pi pi-file"></i>
            Provas
          </p>

          <Button
            label="Adicionar"
            icon="pi pi-plus"
            iconPos="left"
            size="small"
            text
            link
            onClick={() => props.setVisible(true)}
          />
        </div>
        <Divider className="mb-1 mt-1"></Divider>
        <div className="block pt-3 pb-3">
          <DataTable tableStyle={{ minWidth: '50rem' }}>
            <Column field="subjects" header="Matérias"></Column>
            <Column field="course" header="Curso"></Column>
            <Column field="date" header="Data"></Column>
            <Column field="time" header="Horário"></Column>
            <Column field="room" header="Sala"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </div>
      </div>

      <div className="flex flex-column my-3">
        <div className="flex justify-content-between align-items-center">
          <p className="flex mb-2">
            <i className="pi pi-file mr-2"></i>
            Tarefas
          </p>
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            iconPos="left"
            size="small"
            text
            link
            onClick={() => props.setVisible(true)}
          />
        </div>
        <Divider className="mb-1 mt-1"></Divider>
      </div>

      <div className="flex flex-row justify-content-between gap-2">
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #3498db',
          }}
        >
          <div className="flex flex-column w-12">
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Tarefas</p>
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Data de Entrega</p>
          </div>
        </Card>
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #3498db',
          }}
        >
          <div className="flex flex-column w-12">
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Tarefas</p>
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Data de Entrega</p>
          </div>
        </Card>
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #3498db',
          }}
        >
          <div className="flex flex-column w-12">
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Tarefas</p>
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Data de Entrega</p>
          </div>
        </Card>
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #3498db',
          }}
        >
          <div className="flex flex-column w-12">
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Tarefas</p>
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Data de Entrega</p>
          </div>
        </Card>
      </div>

      <div className="flex mt-3 align-items-center px-6 ml-2">
        <div>
          <i className="pi pi-check mb-2 mx-3" style={{ color: 'green' }} />
          Finalizadas
        </div>
      </div>
      <Divider className="mb-4"></Divider>

      <div className="flex flex-row justify-content-between gap-2">
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #12e42b',
          }}
        >
          <div className="flex flex-column w-12">
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Tarefas</p>
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Data de Entrega</p>
          </div>
        </Card>
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #12e42b',
          }}
        >
          <div className="flex flex-column w-12">
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Tarefas</p>
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Data de Entrega</p>
          </div>
        </Card>
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #12e42b',
          }}
        >
          <div className="flex flex-column w-12">
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Tarefas</p>
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Data de Entrega</p>
          </div>
        </Card>
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #12e42b',
          }}
        >
          <div className="flex flex-column w-12">
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Tarefas</p>
            <p className="pi pi-arrow-right mt-0 mb-2 pb-2"> Data de Entrega</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
