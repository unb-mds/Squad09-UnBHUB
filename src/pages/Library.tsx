import React, { useState } from 'react';
import SideBarComponent from '../components/SideBar';
import CreateBookComponent from '../components/Library/createLibrary';
import EditBookComponent from '../components/Library/editBook';
import LibraryComponent from '../components/LibraryScreen';

export default function Library() {
  const [visibleCreate1, CreatesetVisible1] = useState<boolean>(false);
  const [visibleEdit1, EditsetVisible1] = useState<boolean>(false);
  const [selectedBookData, setSelectedBookData] = useState<{
    codeBook: string;
    nameBook: string;
    deliveryDay: string;
  } | null>(null);

  const handleEditClick = (bookData: {
    codeBook: string;
    nameBook: string;
    deliveryDay: string;
  }) => {
    setSelectedBookData(bookData);
    EditsetVisible1(true);
  };

  return (
    <div className="flex flex-row">
      <SideBarComponent />
      <LibraryComponent
        CreatesetVisible1={CreatesetVisible1}
        EditsetVisible1={handleEditClick}
      />
      <CreateBookComponent
        visibleCreate1={visibleCreate1}
        CreatesetVisible1={CreatesetVisible1}
      />
      <EditBookComponent
        visibleEdit1={visibleEdit1}
        EditsetVisible1={EditsetVisible1}
        bookData={selectedBookData}
      />
    </div>
  );
}
