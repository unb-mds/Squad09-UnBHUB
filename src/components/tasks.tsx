import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function TasksComponent() {
  return (
    <div className="flex flex-column mx-3 my-3">
      <div className="flex justify-content-between">
        <p className="flex w-4 h-1rem gap-2 align-items-center">
          <i className="pi pi-clipboard"></i>
          Tarefas
        </p>
        <a href="http://localhost:5173/Subjects">
          <Button
            label="Ver Tudo"
            icon="pi pi-angle-right"
            iconPos="right"
            size="small"
            text
          />
        </a>
      </div>
      <div className="flex flex-column gap-2">
        <Card title="Tarefa 01">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </Card>
        <Card title="Tarefa 02">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </Card>
        <Card title="Tarefa 03">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </Card>
      </div>
    </div>
  );
}
