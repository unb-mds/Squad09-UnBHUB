import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import React from 'react';

export default function ActivitiesComponent(props: {
  CreatesetVisible: (visibleCreate: boolean) => void;
  EditsetVisible: (visibleEdit: boolean) => void;
}) {
  const cardButtonStyles: React.CSSProperties = {
    color: 'white',
    border: '2px solid',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  };

  return (
    <div className="flex flex-column mx-3 my-3 gap-0 w-full">
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-book text-4xl" style={{ color: 'white' }}>
            {' '}
          </i>
          <h1 className="" style={{ color: 'white' }}>
            Tarefas
          </h1>
        </div>
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-forward mb-2 mx-3" style={{ color: '#3498db' }} />
          Em andamento
        </div>
        <Button
          label="Adicionar"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          text
          link
          onClick={() => props.CreatesetVisible(true)}
        />
      </div>

      <Divider className="my-0"></Divider>

      <div className="flex flex-row justify-content-between gap-2 my-4">
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#3498db' }}
          onClick={() => props.EditsetVisible(true)}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#3498db' }}
          onClick={() => props.EditsetVisible(true)}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#3498db' }}
          onClick={() => props.EditsetVisible(true)}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#3498db' }}
          onClick={() => props.EditsetVisible(true)}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
      </div>

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-clock mb-2 mx-3" style={{ color: 'red' }} />
          Atrasadas
        </div>
      </div>

      <Divider className="my-0"></Divider>

      <div className="flex flex-row justify-content-between gap-2 my-4">
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#e41223' }}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#e41223' }}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#e41223' }}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#e41223' }}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
      </div>

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-check mb-2 mx-3" style={{ color: 'green' }} />
          Finalizadas
        </div>
      </div>

      <Divider className="my-0"></Divider>

      <div className="flex flex-row justify-content-between gap-2 my-4">
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#12e42b' }}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#12e42b' }}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#12e42b' }}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
        <Button
          className="w-12 my-0"
          style={{ ...cardButtonStyles, borderColor: '#12e42b' }}
        >
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
            FGA0138 - MDS
          </h3>
          <div className="flex flex-column w-12">
            <i className="pi pi-book mb-2" style={{ color: 'white' }}>
              {' '}
              Tarefa: Protótipo Figma
            </i>
            <p className="pi pi-calendar mb-2" style={{ color: 'white' }}>
              {' '}
              Quarta-feira
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}
