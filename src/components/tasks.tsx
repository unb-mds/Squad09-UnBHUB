import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function Tasks() {
  return (
    <div className="flex flex-column gap-3">
      <div className="flex justify-content-between">
        <p>Tarefas</p>
        <Button
          label="Ver Tudo"
          icon="pi pi-angle-right"
          iconPos="right"
          size="small"
          text
        />
      </div>
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
  );
}
