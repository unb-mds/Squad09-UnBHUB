import React from 'react';
import { useState } from 'react';
import ActivitiesComponent from '../components/ActivitiesComponent';
import SideBarComponent from '../components/SideBar';
import CreateActivityComponent from '../components/Activities/createActivity';

export default function Activities() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <ActivitiesComponent visible={visible} setVisible={setVisible} />
      <CreateActivityComponent visible={visible} setVisible={setVisible} />
    </div>
  );
}
