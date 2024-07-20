import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function SubjectDialogComponent(props: {
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
        {/* Botões para cancelar ou confirmar a operação. */}
        <div className="flex flex-column gap-2">
          <Button
            label="Ver detalhes"
            onClick={() =>
              (window.location.href = 'http://localhost:5173/SpecificSubject')
            }
          />
          <Button label="Editar" />
          <Button label="Finalizar" />
          <Button
            label="Excluir"
            style={{
              borderColor: '#ff6060',
              backgroundColor: '#ff6060',
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}
