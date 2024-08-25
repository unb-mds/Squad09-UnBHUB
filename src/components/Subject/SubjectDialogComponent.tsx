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
            onClick={() => {
              DeleteSubjectFunction(props.subject.id);
              props.setVisibleSubject(false);
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}
