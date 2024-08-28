import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase'; 
import { Dialog } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';
import { NotificationControlBookFunction } from "../functions/Notifications/NotificationsFunctions";
import { NotificationControlExamFunction } from "../functions/Notifications/NotificationsFunctions";
import { NotificationControlTaskFunction } from "../functions/Notifications/NotificationsFunctions";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

interface NotificationSettingsModalProps {
  visible: boolean;
  onHide: () => void;
}

const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ visible, onHide }) => {
  const [tasksLate, setTasksLate] = useState(true);
  const [booksLate, setBooksLate] = useState(true);
  const [upcomingExams, setUpcomingExams] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        const unsub = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setBooksLate(userData.notifications.book.state);
            setTasksLate(userData.notifications.task.state);
            setUpcomingExams(userData.notifications.exam.state);
          } 
        });

        // Cleanup subscription on unmount
        return () => unsub();
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  return (
    <Dialog header="Configurações de Notificações" visible={visible} onHide={onHide} style={{ width: '20rem' }}>
      <div className="flex flex-column">
        <div className="p-3">
          <div className="flex align-items-center mb-3">
            <span className="mr-2">Tarefas Atrasadas:</span>
            <InputSwitch 
              checked={tasksLate} 
              onChange={(e) => {
                setTasksLate(e.value);
                NotificationControlTaskFunction(e.value);
              }} 
            />
          </div>
          <div className="flex align-items-center mb-3">
            <span className="mr-2">Livros Atrasados:</span>
            <InputSwitch checked={booksLate}
              onChange={(e) => {
                setBooksLate(e.value);
                NotificationControlBookFunction(e.value);
              }} 
            />
          </div>
          <div className="flex align-items-center mb-3">
            <span className="mr-2">Provas se Aproximando:</span>
            <InputSwitch checked={upcomingExams}
              onChange={(e) => {
                setUpcomingExams(e.value);
                NotificationControlExamFunction(e.value);
              }} 
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default NotificationSettingsModal;
