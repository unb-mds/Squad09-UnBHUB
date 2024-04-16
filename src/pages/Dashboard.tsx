import { Outlet } from 'react-router-dom';
import SideBarComponent from '../components/SideBar';
import Navbar from '../components/Navbar';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import CalendarComponent from '../components/Calendar';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DashboardScreen() {
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <div>
        <Outlet />
      </div>
      <div className="flex flex-column">
        <Navbar></Navbar>
        <div className="flex">
          <h1>👋 Bem-Vindo!</h1>
          <div className="w-3 absolute right-0 pt-4">
            <ProgressBar value={50}></ProgressBar>
          </div>
        </div>
        <div className="flex flex-column w-8">
          <div>
            <h2>
              <b>Envolva-se-Entre em Grupos de Estudos e Monitoria!</b>
            </h2>
            <h3>
              Explore seus interesses e conheça estudantes que pensam como você
              ingressando em um de nossos muitos clubes. Quer você goste de
              esportes, artes ou estudos, há um clube para você. Encontre sua
              comunidade!
            </h3>
            <Button
              label="Saiba Mais!"
              icon="pi pi-arrow-right"
              iconPos="right"
              size="small"
            />
          </div>

          <div className="w-3 absolute right-0">
            <CalendarComponent />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="w-8 flex justify-content-between">
            <p>Matérias</p>
            <Button
              label="Ver Tudo"
              icon="pi pi-angle-right"
              iconPos="right"
              size="small"
              text
            />
          </div>

          <div className="w-4 flex justify-content-between">
            <p>Tarefas</p>
            <Button
              label="Ver Tudo"
              icon="pi pi-angle-right"
              iconPos="right"
              size="small"
              text
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-column w-8">
            <div className="w-8 flex flex-row justify-content-between gap-8">
              <Card title="Matéria 01">
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </Card>
              <Card title="Matéria 02">
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </Card>
              <Card title="Matéria 03">
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </Card>
              <Card title="Matéria 04">
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </Card>
            </div>
            <div className="w-8 flex justify-content-between">
              <p>Provas</p>
              <Button
                label="Ver Tudo"
                icon="pi pi-angle-right"
                iconPos="right"
                size="small"
                text
              />
            </div>
            <DataTable tableStyle={{ minWidth: '50rem' }}>
              <Column field="subjects" header="Matérias"></Column>
              <Column field="course" header="Curso"></Column>
              <Column field="date" header="Data"></Column>
              <Column field="time" header="Horário"></Column>
              <Column field="room" header="Sala"></Column>
              <Column field="status" header="Status"></Column>
            </DataTable>
          </div>

          <div className="pl-3 w-4 flex-column ">
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
      </div>
    </div>
  );
}
