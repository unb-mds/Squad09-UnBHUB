import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';

export default function SubjectsComponent(props: {
  setVisible: (visible: boolean) => void;
}) {
  return (
    <div className="flex flex-column mx-3 my-3 w-full">
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-book text-4xl"> </i>
          <h1>Matérias</h1>
        </div>
        <div className="flex align-items-center">
          <a href="http://localhost:5173/Messages">
            <Button
              icon="pi pi-bell p-overlay-badge"
              rounded
              text
              size="large"
              badge="2"
              badgeClassName="p-badge-danger"
              link
            />
          </a>
          <a href="http://localhost:5173/Messages">
            <Button
              icon="pi pi-inbox p-overlay-badge"
              rounded
              text
              size="large"
              link
            />
          </a>
          <Button className="" rounded text>
            <Avatar
              image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
              size="large"
              className="mr-2"
              shape="circle"
            />
          </Button>
        </div>
      </div>

      <div className="flex justify-content-between align-items-center px-6">
        <div>
          <i className="pi pi-forward mx-3" style={{ color: '#3498db' }} />
          Em Andamento
        </div>
        <a>
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            iconPos="left"
            size="small"
            text
            link
            onClick={() => props.setVisible(true)}
          />
        </a>
      </div>
      <Divider className="mb-4"></Divider>

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
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
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
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
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
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
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
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
      </div>

      <div className="flex mt-3 align-items-center px-6">
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
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
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
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
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
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
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
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
