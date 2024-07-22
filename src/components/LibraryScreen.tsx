import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import React from 'react';

export default function LibraryComponent(props: {
  CreatesetVisible1: (visibleCreate1: boolean) => void;
  EditsetVisible1: (visibleEdit1: boolean) => void;
}) {
  const cardButtonStyles: React.CSSProperties = {
    color: 'white',
    border: '2px solid',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinha os itens à esquerda
    width: '100%',
    backgroundColor: '#2c3e50', // Define uma cor de fundo padrão
  };

  const renderCard = (
    borderColor: string,
    title: string,
    returnDate: string
  ) => (
    <Button
      className="w-12 my-0"
      style={{ ...cardButtonStyles, borderColor }}
      onClick={() => props.EditsetVisible1(true)}
    >
      <h2 style={{ color: 'white' }}>{title}</h2>
      <div
        className="flex flex-column w-12"
        style={{ alignItems: 'flex-start' }}
      >
        <i className="pi pi-book mb-2" style={{ color: 'white' }}>
          {' '}
          Métodos de desenvolvimento de Software
        </i>
        <p className="pi pi-calendar mb-3" style={{ color: 'white' }}>
          {' '}
          Devolução: {returnDate}
        </p>
      </div>
    </Button>
  );

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
          Em andamento
        </div>
        <Button
          label="Adicionar"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          text
          link
          onClick={() => props.CreatesetVisible1(true)}
        />
      </div>

      <Divider className="my-0"></Divider>

      <div className="flex flex-row justify-content-between gap-2 my-4">
        {renderCard('#3498db', 'FGA0138 - MDS', '22/07/2025')}
        {renderCard('#3498db', 'FGA0138 - MDS', '22/07/2025')}
        {renderCard('#3498db', 'FGA0138 - MDS', '22/07/2025')}
        {renderCard('#3498db', 'FGA0138 - MDS', '22/07/2025')}
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
        {renderCard('#e41223', 'FGA0138 - MDS', '22/07/2024')}
        {renderCard('#e41223', 'FGA0138 - MDS', '22/07/2024')}
        {renderCard('#e41223', 'FGA0138 - MDS', '22/07/2024')}
        {renderCard('#e41223', 'FGA0138 - MDS', '22/07/2024')}
      </div>
    </div>
  );
}
