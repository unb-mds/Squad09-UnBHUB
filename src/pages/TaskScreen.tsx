import { useState } from 'react';
import CreateActivityComponent from '../components/Activities/createActivity';
import EditActivityComponent from '../components/Activities/editActivity';
import ActivitiesComponent from '../components/ActivitiesComponent';
import SideBarComponent from '../components/SideBar';

export default function Activities() {
  const [visibleCreate, CreatesetVisible] = useState<boolean>(false);
  const [visibleEdit, EditsetVisible] = useState<boolean>(false);
  const [task, setTask] = useState({});
  const [selectedActivityData, setSelectedActivityData] = useState<{
    taskName: string;
    deliveryDay: string;
  } | null>(null);

  const handleEditClick1 = (activityData: {
    taskName: string;
    deliveryDay: string;
  }) => {
    setSelectedActivityData(activityData);
    EditsetVisible(true);
  };

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
          activityData={selectedActivityData}
        />
      )}
    </div>
  );
}
