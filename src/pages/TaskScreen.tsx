import { useState } from 'react';
import CreateActivityComponent from '../components/Activities/createActivity';
import EditActivityComponent from '../components/Activities/editActivity';
import ActivitiesComponent from '../components/Activities/ActivitiesComponent';
import SideBarComponent from '../components/SideBar';
import { Timestamp } from 'firebase/firestore';

export default function Activities() {
  const [visibleCreate, CreatesetVisible] = useState<boolean>(false);
  const [visibleEdit, EditsetVisible] = useState<boolean>(false);
  const [task, setTask] = useState({});
  const [selectedActivityData, setSelectedActivityData] = useState<{
    taskName: string;
    deliveryDay: Timestamp;
    description: string;
  } | null>(null);

  // Função para converter Timestamp em Date
  const convertTimestampToDate = (timestamp: Timestamp) => {
    return timestamp.toDate();
  };

  // Função para lidar com o clique de edição em uma atividade
  const handleEditClick1 = (activityData: {
    taskName: string;
    deliveryDay: Timestamp;
    description: string;
  }) => {
    setSelectedActivityData(activityData);
    EditsetVisible(true);
  };

  // Converter selectedActivityData.deliveryDay para Date antes de passar
  const activityDataForEdit = selectedActivityData
    ? {
        ...selectedActivityData,
        deliveryDay: convertTimestampToDate(selectedActivityData.deliveryDay),
      }
    : null;

  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <ActivitiesComponent
        CreatesetVisible={CreatesetVisible}
        EditsetVisible={handleEditClick1}
        task={task}
        setTask={setTask}
      />
      {visibleCreate && (
        <CreateActivityComponent
          visibleCreate={visibleCreate}
          CreatesetVisible={CreatesetVisible}
        />
      )}
      {visibleEdit && (
        <EditActivityComponent
          visibleEdit={visibleEdit}
          EditsetVisible={EditsetVisible}
          activityData={activityDataForEdit} // Passar o `activityDataForEdit` que já está convertido
          onSave={() => {}}
          onDelete={() => {}}
          subjectId=""
          taskId=""
          status=""
        />
      )}
    </div>
  );
}
