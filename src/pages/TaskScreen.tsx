import React, { useState } from 'react';
import SideBarComponent from '../components/SideBar';
import CreateActivityComponent from '../components/Activities/createActivity';
import EditActivityComponent from '../components/Activities/editActivity';
import ActivitiesComponent1 from '../components/ActivitiesComponent';

export default function Activities() {
  const [visibleCreate, CreatesetVisible] = useState<boolean>(false);
  const [visibleEdit, EditsetVisible] = useState<boolean>(false);
  const [selectedActivityData, setSelectedActivityData] = useState<{
    codeSubject: string;
    nameActivity: string;
    deliveryDay: string;
  } | null>(null);

  const handleEditClick1 = (activityData: {
    codeSubject: string;
    nameActivity: string;
    deliveryDay: string;
  }) => {
    setSelectedActivityData(activityData);
    EditsetVisible(true);
  };

  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <ActivitiesComponent1
        CreatesetVisible={CreatesetVisible}
        EditsetVisible={handleEditClick1}
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
