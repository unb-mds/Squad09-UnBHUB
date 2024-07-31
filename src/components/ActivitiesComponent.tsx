import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import React from 'react';

export default function ActivitiesComponent1(props: {
  CreatesetVisible: (visibleCreate: boolean) => void;
  EditsetVisible: (activityData: {
    codeSubject: string;
    nameActivity: string;
    deliveryDay: string;
  }) => void;
}) {
  const cardButtonStyles: React.CSSProperties = {
    color: 'white',
    border: '2px solid',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    textAlign: 'left', // Alinhamento à esquerda
  };

  // Função para renderizar um card de tarefa
  const renderCard = (
    backgroundColor: string,
    borderColor: string,
    codeSubject: string,
    nameActivity: string,
    deliveryDay: string
  ) => (
    <Button
      className="w-12 my-0"
      style={{
        ...cardButtonStyles,
        borderColor,
        backgroundColor,
        boxShadow: 'none', // Remove box-shadow if needed
      }}
      onClick={() => {
        console.log('Edit button clicked for:', nameActivity);
        const activityData = {
          codeSubject,
          nameActivity,
          deliveryDay,
        };
        props.EditsetVisible(activityData); // Passando os dados do livro
      }}
    >
      <h2 style={{ marginBottom: '1.5rem' }}>{codeSubject}</h2>
      <div className="flex flex-column w-12" style={{ textAlign: 'left' }}>
        <i className="pi pi-book mb-2" style={{ color: 'white' }}>
          {' '}
          Tarefa: {nameActivity}
        </i>
        <p className="pi pi-calendar mb-4" style={{ color: 'white' }}>
          {' '}
          {deliveryDay}
        </p>
      </div>
    </Button>
  );

  return (
    <div className="flex flex-column mx-3 my-3 gap-0 w-full">
      <div className="flex align-items-center justify-content-between border-round-lg">
        <div className="flex h-1rem gap-2 align-items-center px-6 py-5">
          <i className="pi pi-book text-4xl" style={{ color: 'white' }} />
          <h1 style={{ color: 'white' }}>Tarefas</h1>
        </div>
      </div>
      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-forward mb-2 mx-3" style={{ color: '#007bff' }} />
          Em andamento
        </div>
        <Button
          label="Adicionar"
          icon="pi pi-plus"
          iconPos="left"
          size="small"
          text
          link
          onClick={() => {
            console.log('Adicionar button clicked');
            props.CreatesetVisible(true);
          }}
        />
      </div>

      <Divider className="my-0" />

      <div className="flex flex-row justify-content-between gap-2 my-4">
        {renderCard(
          '#2c3e50', // Cor de fundo para Em andamento
          '#007bff', // Cor da borda para Em andamento
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
        {renderCard(
          '#2c3e50',
          '#007bff',
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
        {renderCard(
          '#2c3e50',
          '#007bff',
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
        {renderCard(
          '#2c3e50',
          '#007bff',
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
      </div>

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-clock mb-2 mx-3" style={{ color: '#dc3545' }} />
          Atrasadas
        </div>
      </div>

      <Divider className="my-0" />

      <div className="flex flex-row justify-content-between gap-2 my-4">
        {renderCard(
          '#2c3e50', // Cor de fundo para Atrasadas
          '#dc3545', // Cor da borda para Atrasadas
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
        {renderCard(
          '#2c3e50',
          '#dc3545',
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
        {renderCard(
          '#2c3e50',
          '#dc3545',
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
        {renderCard(
          '#2c3e50',
          '#dc3545',
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
      </div>

      <div
        className="flex h-3rem gap-2 justify-content-between align-items-center px-6 border-round-lg"
        style={{ color: 'white' }}
      >
        <div>
          <i className="pi pi-check mb-2 mx-3" style={{ color: '#28a745' }} />
          Finalizadas
        </div>
      </div>

      <Divider className="my-0" />

      <div className="flex flex-row justify-content-between gap-2 my-4">
        {renderCard(
          '#2c3e50', // Cor de fundo para Finalizadas
          '#28a745', // Cor da borda para Finalizadas
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
        {renderCard(
          '#2c3e50',
          '#28a745',
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
        {renderCard(
          '#2c3e50',
          '#28a745',
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
        {renderCard(
          '#2c3e50',
          '#28a745',
          'FGA0138 - MDS',
          'Protótipo Figma',
          'Quarta-feira'
        )}
      </div>
    </div>
  );
}
