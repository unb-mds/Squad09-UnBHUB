import { useState } from 'react';
import CreateBookComponent from '../components/Library/createLibrary';
import EditBookComponent from '../components/Library/editBook';
import LibraryComponent from '../components/LibraryScreen';
import SideBarComponent from '../components/SideBar';

export default function Library() {
  const [visibleCreate1, CreatesetVisible1] = useState<boolean>(false);
  const [visibleEdit1, EditsetVisible1] = useState<boolean>(false);
  const [selectedBookData, setSelectedBookData] = useState<{
    id: string;
    codeSubject: string;
    bookName: string;
    deliveryDay: string;
  } | null>(null);

  const handleEditClick = (bookData: {
    id: string;
    codeSubject: string;
    bookName: string;
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
