import React, { useState } from 'react';
import SideBarComponent from '../components/SideBar';
import CreateActivityComponent from '../components/Activities/createActivity';
import EditActivityComponent from "../components/Activities/editActivity";
import ActivitiesComponent from "../components/ActivitiesComponent"; // Certifique-se de que este caminho está correto

export default function Activities() {
  const [visibleCreate,CreatesetVisible] = useState<boolean>(false);
  const [visibleEdit,EditsetVisible] = useState<boolean>(false);

  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <ActivitiesComponent CreatesetVisible={CreatesetVisible} EditsetVisible={EditsetVisible} />
      <CreateActivityComponent visibleCreate={visibleCreate} CreatesetVisible={CreatesetVisible} />
      <EditActivityComponent visibleEdit={visibleEdit} EditsetVisible={EditsetVisible} />
    </div>
  );
}
