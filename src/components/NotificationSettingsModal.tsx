import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';

interface NotificationSettingsModalProps {
  visible: boolean;
  onHide: () => void;
}

const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ visible, onHide }) => {
  const [tasksLate, setTasksLate] = useState(true);
  const [booksLate, setBooksLate] = useState(true);
  const [upcomingExams, setUpcomingExams] = useState(true);

  return (
    <Dialog header="Configurações de Notificações" visible={visible} onHide={onHide} style={{ width: '20rem' }}>
      <div className="flex flex-column">
        <div className="p-3">
          <div className="flex align-items-center mb-3">
            <span className="mr-2">Tarefas Atrasadas:</span>
            <InputSwitch checked={tasksLate} onChange={(e) => setTasksLate(e.value)} />
          </div>
          <div className="flex align-items-center mb-3">
            <span className="mr-2">Livros Atrasados:</span>
            <InputSwitch checked={booksLate} onChange={(e) => setBooksLate(e.value)} />
          </div>
          <div className="flex align-items-center mb-3">
            <span className="mr-2">Provas se Aproximando:</span>
            <InputSwitch checked={upcomingExams} onChange={(e) => setUpcomingExams(e.value)} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default NotificationSettingsModal;
