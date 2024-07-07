import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Divider } from "primereact/divider";import { Menu } from 'primereact/menu';

export default function ActivitiesComponent() {
  return (
  <div className="" style={{backgroundColor:'white'}}>
    <Splitter style={{ height: '850px' , backgroundColor:'white'}}>
      <SplitterPanel
        size={25}
        minSize={20}
      >
      <div className="flex-column align-itens-center justify-content-center" style={{backgroundColor:'white'}}>
      <h2 className="" style={{color:'black'}}>UTOPIA</h2>
      <Divider></Divider>

      <Button
        className="py-3 px-15 w-full text-white my-3" 
        label="Entrar"
        ></Button></div>
      </SplitterPanel>
      <SplitterPanel
        className="flex align-items-center justify-content-center"
        size={80}
        minSize={75}
             >
        <div className="flex flex-column mx-3 my-3 gap-2 w-full">
          <div className="flex align-items-center justify-content-between surface-50 border-round-lg">
            <div className="flex h-1rem gap-2 align-items-center surface-50 px-6 py-5">
            <i className="pi pi-book text-4xl" style={{color:'black'}}> </i>
            <h1 className="" style={{color:'black'}} >Tarefas</h1>
            </div>
          </div>

          <div className="flex h-3rem gap-2 justify-content-between align-items-center surface-50 px-6 border-round-lg" style={{color:'black'}}>
            Em progresso
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
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #3498db',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #3498db',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #3498db',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #3498db',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
          </div>

          <div className="flex h-3rem gap-2 justify-content-between align-items-center surface-50 px-6 border-round-lg" style={{color:'black'}}>
            Atrasadas           
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
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #e41223',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #e41223',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #e41223',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #e41223',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
          </div>

          <div className="flex h-3rem gap-2 justify-content-between align-items-center surface-50 px-6 border-round-lg" style={{color:'black'}}>
            Finalizadas
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
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #12e42b',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #12e42b',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #12e42b',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
            <Card
              title="FGA0138 - MDS"
              className="w-12"
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '2px solid #12e42b',
              }}
            >
              <div className="flex flex-column w-12">
                <i className="pi pi-book mb-2" style={{ color: 'black' }}>
                  {' '}
                  Tarefa: Protótipo Figma
                </i>
                <p className="pi pi-calendar mb-2" style={{ color: 'black' }}>
                  {' '}
                  Quarta-feira
                </p>
              </div>
            </Card>
          </div>

          <div className="flex flex-row justify-content-between gap-2"></div>
        </div>
        ;
      </SplitterPanel>
    </Splitter>
    </div>
  );
}
