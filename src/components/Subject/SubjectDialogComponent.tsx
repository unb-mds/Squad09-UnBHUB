import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DeleteSubjectFunction from '../../functions/DeleteSubject';
import FinalizeSubjectFunction from '../../functions/Finalize';

export default function SubjectDialogComponent(props: {
  subject: any;
  visibleSubject: boolean;
  setVisibleSubject: (visibleSubject: boolean) => void;
}) {
  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Escolha uma Ação" // Título do diálogo.
        visible={props.visibleSubject} // Define a visibilidade do diálogo.
        style={{ width: '20vw', height: '23vw' }} // Define a largura do diálogo.
        onHide={() => props.setVisibleSubject(false)} // Função para esconder o diálogo quando for fechado.
      >
        <div className="flex flex-column gap-2">
          <Button
            label="Ver detalhes"
            onClick={() =>
              (window.location.href = 'http://localhost:5173/SpecificSubject')
            }
          />
          <Button label="Editar" />
          <Button
            label="Finalizar"
            onClick={() => {
              FinalizeSubjectFunction(props.subject.id);
              props.setVisibleSubject(false);
            }}
          />
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
