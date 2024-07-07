import React from 'react';
import ActivitiesComponent from '../components/ActivitiesComponent';
import SideBarComponent from '../components/SideBar';

export default function Activities() {
  return (
    <div className="flex flex-row">
      <SideBarComponent /> <ActivitiesComponent />{' '}
    </div>
  );
}
