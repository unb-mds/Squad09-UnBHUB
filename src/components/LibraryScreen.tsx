import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

export default function LibraryScreen1() {
  return (
    <div className="flex flex-column mx-3 my-3 gap-0 w-full">
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-book text-4xl" style={{ color: 'white' }}>
            {' '}
          </i>
          <h1 className="" style={{ color: 'white' }}>
            Biblioteca
          </h1>
        </div>
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-forward mb-2 mx-3" style={{ color: '#3498db' }} />
          Livros sendo lidos:
        </div>
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

      <Divider className="my-0"></Divider>

      <div className="flex flex-row justify-content-between gap-2 my-4">
        <Card
          title="FGA0138 - MDS"
          className="w-12 my-0"
          style={{
            color: 'white',
            border: '2px solid #3498db',
          }}
        >
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Métodos de Desenvolvimento de Software
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Devolução: 08/07/2024
            </p>
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
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Métodos de Desenvolvimento de Software
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Devolução: 08/07/2024
            </p>
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
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Métodos de Desenvolvimento de Software
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Devolução: 08/07/2024
            </p>
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
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Métodos de Desenvolvimento de Software
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Devolução: 08/07/2024
            </p>
          </div>
        </Card>
      </div>

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-clock mb-2 mx-3" style={{ color: 'red' }} />
          Livros atrasados:
        </div>

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

      <Divider className="my-0"></Divider>

      <div className="flex flex-row justify-content-between gap-2 my-4">
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #e41212',
          }}
        >
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Métodos de Desenvolvimento de Software
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Devolução: 08/07/2024
            </p>
          </div>
        </Card>
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #e41212',
          }}
        >
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Métodos de Desenvolvimento de Software
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Devolução: 08/07/2024
            </p>
          </div>
        </Card>
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #e41212',
          }}
        >
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Métodos de Desenvolvimento de Software
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Devolução: 08/07/2024
            </p>
          </div>
        </Card>
        <Card
          title="FGA0138 - MDS"
          className="w-12"
          style={{
            color: 'white',
            border: '2px solid #e41212',
          }}
        >
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Métodos de Desenvolvimento de Software
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Devolução: 08/07/2024
            </p>
          </div>
        </Card>
      </div>

      <div className="flex flex-row justify-content-between gap-2"></div>
    </div>
  );
}
