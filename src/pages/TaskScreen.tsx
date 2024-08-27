import { useState } from 'react'; // Importa o hook useState do React para gerenciar estados no componente.
import CreateActivityComponent from '../components/Activities/createActivity'; // Importa o componente para criar atividades.
import EditActivityComponent from '../components/Activities/editActivity'; // Importa o componente para editar atividades.
import ActivitiesComponent from '../components/Activities/ActivitiesComponent'; // Importa o componente principal de atividades.
import SideBarComponent from '../components/SideBar'; // Importa o componente de barra lateral.

export default function Activities() {
  // Define e exporta o componente funcional Activities.
  // Cria o estado 'visibleCreate' para controlar a visibilidade do componente de criação e 'CreatesetVisible' para atualizá-lo.
  const [visibleCreate, CreatesetVisible] = useState<boolean>(false);

  // Cria o estado 'visibleEdit' para controlar a visibilidade do componente de edição e 'EditsetVisible' para atualizá-lo.
  const [visibleEdit, EditsetVisible] = useState<boolean>(false);

  // Cria o estado 'task' para armazenar dados da tarefa e 'setTask' para atualizá-lo.
  const [task, setTask] = useState({});

  // Cria o estado 'selectedActivityData' para armazenar os dados da atividade selecionada para edição.
  // Inicialmente é null e tem um tipo específico.
  const [selectedActivityData, setSelectedActivityData] = useState<{
    taskName: string;
    deliveryDay: string;
  } | null>(null);

  // Função para lidar com o clique de edição em uma atividade.
  // Atualiza 'selectedActivityData' com os dados da atividade e torna o componente de edição visível.
  const handleEditClick1 = (activityData: {
    taskName: string;
    deliveryDay: string;
  }) => {
    setSelectedActivityData(activityData); // Define os dados da atividade selecionada.
    EditsetVisible(true); // Torna o componente de edição visível.
  };

  return (
    <div className="flex flex-row">
      {' '}
      {/* Define um contêiner flexível em linha para organizar os componentes horizontalmente. */}
      <SideBarComponent /> {/* Renderiza o componente de barra lateral. */}
      <ActivitiesComponent
        CreatesetVisible={CreatesetVisible} // Passa a função e o estado de visibilidade para o componente de atividades.
        EditsetVisible={handleEditClick1} // Passa a função de manipulação de clique de edição para o componente de atividades.
        task={task} // Passa o estado da tarefa para o componente de atividades.
        setTask={setTask} // Passa a função para atualizar o estado da tarefa para o componente de atividades.
      />
      {visibleCreate && ( // Condicionalmente renderiza o componente de criação se 'visibleCreate' for verdadeiro.
        <CreateActivityComponent
          visibleCreate={visibleCreate} // Passa o estado de visibilidade para o componente de criação.
          CreatesetVisible={CreatesetVisible} // Passa a função para alterar a visibilidade para o componente de criação.
        />
      )}
      {visibleEdit && ( // Condicionalmente renderiza o componente de edição se 'visibleEdit' for verdadeiro.
        <EditActivityComponent
          visibleEdit={visibleEdit} // Passa o estado de visibilidade para o componente de edição.
          EditsetVisible={EditsetVisible} // Passa a função para alterar a visibilidade para o componente de edição.
          activityData={selectedActivityData} // Passa os dados da atividade selecionada para o componente de edição.
        />
      )}
    </div>
  );
}
