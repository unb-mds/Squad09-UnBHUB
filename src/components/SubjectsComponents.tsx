import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

export default function SubjectsComponent() {
  return (
    <div className="flex flex-column mx-3 my-3 gap-2 w-full">
      <div className="flex align-items-center justify-content-between surface-50 border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center surface-50 px-6 py-5">
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

      <div className="flex h-3rem gap-2 justify-content-between align-items-center surface-50 px-6 border-round-lg">
        Em Andamento
        <a>
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            iconPos="left"
            size="small"
            text
            link
          />
        </a>
      </div>

      <div className="flex flex-row justify-content-between gap-2">
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
      </div>

      <div className="flex h-3rem align-items-center surface-50 px-6 border-round-lg">
        Finalizadas
      </div>

      <div className="flex flex-row justify-content-between gap-2">
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
      </div>

      <div className="flex flex-row justify-content-between gap-2">
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
        <Card title="FGA0138 - MDS" className="w-12">
          <div className="flex flex-column w-12">
            <p className="pi pi-user mt-0 mb-2">Carla Rocha</p>
            <p className="pi pi-calendar mb-2">Quarta & Sexta</p>
            <p className="pi pi-clock mb-2">10:00 - 11:50</p>
            <p className="pi pi-map-marker">LAB MOCAP</p>
          </div>
        </Card>
        <Card title="FGA0138 - MDS" className="w-12">
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
