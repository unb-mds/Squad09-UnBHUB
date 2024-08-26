import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DeleteSubjectFunction from '../../functions/Subjects/DeleteSubject';
import FinalizeSubjectFunction from '../../functions/Subjects/FinalizeSubject';
import ReturnToActiveSubjectFunction from '../../functions/Subjects/ReturnToActiveSubject';

export default function SubjectDialogComponent(props: {
  subject: object;
  visibleSubject: boolean;
  setVisibleSubject: (visibleSubject: boolean) => void;
  setEditVisible: (editVisible: boolean) => void;
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do evento
    setShowConfirmDialog(true); // Exibe o diálogo de confirmação de exclusão
  };

  const confirmDelete = () => {
    DeleteSubjectFunction(props.subject.id); 
    setShowConfirmDialog(false); 
    props.setVisibleSubject(false); 
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Escolha uma Ação" // Título do diálogo.
        visible={props.visibleSubject} // Define a visibilidade do diálogo.
        onHide={() => props.setVisibleSubject(false)} // Função para esconder o diálogo quando for fechado.
      >
        <div className="flex flex-column gap-2">
          <Button
            label="Ver detalhes"
            onClick={() => {
              localStorage.setItem('subjectId', props.subject.id);
              window.location.href = '/SpecificSubject';
            }}
          />
          <Button
            label="Editar"
            onClick={() => {
              props.setVisibleSubject(false);
              props.setEditVisible(true);
            }}
          />
          {props.subject.status === 'Active' ? (
            <Button
              label="Finalizar"
              onClick={() => {
                FinalizeSubjectFunction(props.subject.id);
                props.setVisibleSubject(false);
              }}
            />
          ) : props.subject.status === 'Finalized' ? (
            <Button
              label="Por em andamento"
              onClick={() => {
                ReturnToActiveSubjectFunction(props.subject.id);
                props.setVisibleSubject(false);
              }}
            />
          ) : null}
          <Button
            label="Excluir"
            style={{
              borderColor: '#ff6060',
              backgroundColor: '#ff6060',
            }}
            onClick={handleDelete}
          />
        </div>
      </Dialog>
      <Dialog
        header="Confirmar Exclusão" 
        visible={showConfirmDialog} // Controla a visibilidade do diálogo de confirmação
        style={{ width: '30vw', maxWidth: '400px' }} // Define a largura do diálogo
        onHide={() => setShowConfirmDialog(false)} // Fecha o diálogo quando necessário
        footer={
          <div className="flex justify-content-center gap-3 p-0">
            {' '}
            {/* Contêiner para os botões de confirmação */}
            <Button
              label="Cancelar" 
              icon="pi pi-times" // Ícone do botão
              className="p-button-text" // Estilos do botão
              onClick={cancelDelete} 
            />
            <Button
              label="Confirmar" 
              icon="pi pi-check" // Ícone do botão
              className="p-button-text p-button-danger" // Estilos do botão
              onClick={confirmDelete} 
            />
          </div>
        }
      >
        <p>Você tem certeza que deseja excluir esta matéria?</p>{' '}
        {/* Mensagem de confirmação */}
      </Dialog>
    </div>
    
  );
}
