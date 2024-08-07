import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import CreateExamFunction from '../../functions/CreateExam';

// Definindo as propriedades que o componente ExamDialogComponent irá receber
interface ExamDialogComponentProps {
  visible: boolean; // Indica se o diálogo está visível ou não
  setVisible: (visible: boolean) => void; // Função para atualizar a visibilidade do diálogo
  subjectId: string; // ID do assunto ao qual a prova será adicionada
  refreshExams: () => void; // Função para atualizar a lista de provas
}

// Definindo o componente funcional React
const ExamDialogComponent: React.FC<ExamDialogComponentProps> = ({
  visible,
  setVisible,
  subjectId,
}) => {
  // Definindo o estado do objeto "exam" que irá armazenar os dados da prova
  const [exam, setExam] = useState({
    code: '', // Código da prova
    score: '', // Nota da prova
    date: Date, // Data da prova
    time: Date, // Horário da prova
    room: '', // Sala onde a prova será realizada
    status: '', // Status da prova
  });

  return (
    // Componente de diálogo (modal) do PrimeReact
    <Dialog
      header="Adicionar Prova" // Cabeçalho do diálogo
      visible={visible} // Define se o diálogo está visível
      onHide={() => setVisible(false)} // Função chamada ao fechar o diálogo
    >
      <div className="p-fluid">
        {/* Campo de entrada para o código da prova */}
        <div className="field">
          <label htmlFor="code">Código</label>
          <InputText
            id="code"
            value={exam.code}
            onChange={(e) => setExam({ ...exam, code: e.target.value })}
          />
        </div>
        {/* Campo de entrada para a nota da prova */}
        <div className="field">
          <label htmlFor="score">Nota</label>
          <InputText
            id="score"
            value={exam.score}
            onChange={(e) => setExam({ ...exam, score: e.target.value })}
          />
        </div>
        {/* Campo de calendário para selecionar a data da prova */}
        <div className="field">
          <label htmlFor="date">Data</label>
          <Calendar
            id="date"
            value={exam.date}
            dateFormat="dd/mm/yy"
            onChange={(e) => setExam({ ...exam, date: e.value as Date | null })}
            showIcon
          />
        </div>
        {/* Campo de calendário para selecionar o horário da prova */}
        <div className="field">
          <label htmlFor="time">Horário</label>
          <Calendar
            id="time"
            value={exam.time}
            onChange={(e) => setExam({ ...exam, time: e.value as Date | null })}
            icon={() => <i className="pi pi-clock" />}
            showIcon
            timeOnly
          />
        </div>
        {/* Campo de entrada para a sala da prova */}
        <div className="field">
          <label htmlFor="room">Sala</label>
          <InputText
            id="room"
            value={exam.room}
            onChange={(e) => setExam({ ...exam, room: e.target.value })}
          />
        </div>
        {/* Campo de entrada para o status da prova */}
        <div className="field">
          <label htmlFor="status">Status</label>
          <InputText
            id="status"
            value={exam.status}
            onChange={(e) => setExam({ ...exam, status: e.target.value })}
          />
        </div>
      </div>
      {/* Botão para adicionar a prova, chama a função CreateExamFunction */}
      <Button
        label="Adicionar"
        icon="pi pi-check"
        onClick={() =>
          CreateExamFunction(subjectId, exam).then(() => setVisible(false))
        }
      />
    </Dialog>
  );
};

export default ExamDialogComponent;
