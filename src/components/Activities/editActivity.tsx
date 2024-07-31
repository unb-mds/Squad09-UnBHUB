// Importa componentes do PrimeReact, uma biblioteca de componentes UI para React.
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

// Define um componente funcional React chamado CreateActivityComponent.
export default function EditActivityComponent(props: {
  visibleEdit: boolean;
  EditsetVisible: (visibleEdit: boolean) => void;
  activityData: {
    codeSubject: string;
    nameActivity: string;
    deliveryDay: string;
  };
}) {
  const { activityData, visibleEdit, EditsetVisible } = props;
  if (!activityData) {
    return null; // Não renderiza nada se os dados do livro não estiverem disponíveis
  }
  return (
    <Dialog
      header="Visualizar Atividade" // Título do diálogo
      visible={visibleEdit}
      style={{ width: '40vw', maxWidth: '600px' }} // Ajusta a largura do diálogo
      onHide={() => EditsetVisible(false)}
    >
      {' '}
      {/* Adiciona um formulário ao diálogo */}
      <form className="flex flex-column gap-5 p-4">
        {' '}
        {/* Ajustado para Flexbox e adicionado padding */}
        <FloatLabel className="w-full">
          <InputText
            className="w-full"
            id="codeSubject"
            value={activityData.codeSubject}
            disabled // Desativa o campo de entrada
          />
          <label htmlFor="codeSubject">Código da matéria</label>
        </FloatLabel>
        <FloatLabel className="w-full">
          <InputText
            className="w-full"
            id="nameActivity"
            value={activityData.nameActivity}
            disabled // Desativa o campo de entrada
          />
          <label htmlFor="nameActivity">Nome da Atividade</label>
        </FloatLabel>
        <FloatLabel className="w-full">
          <InputText
            className="w-full"
            id="deliveryDay"
            value={activityData.deliveryDay}
            disabled // Desativa o campo de entrada
          />
          <label htmlFor="deliveryDay">Dia de entrega</label>
        </FloatLabel>
        <div className="flex justify-content-between gap-2 mt-4">
          {' '}
          {/* Ajustado para Flexbox e adicionado espaçamento */}
          <Button
            outlined
            label="Voltar"
            style={{
              borderColor: '#3e74aeb1',
              color: '#3e74aeb1',
            }}
            onClick={() => EditsetVisible(false)}
          />
          <Button
            outlined
            label="Editar"
            style={{
              borderColor: '#f3d300',
              color: '#f3d300',
            }}
            onClick={() => EditsetVisible(false)}
          />
          <Button
            outlined
            label="Excluir"
            style={{
              borderColor: '#ff6060',
              color: '#ff6060',
            }}
            onClick={() => EditsetVisible(false)}
          />
        </div>
      </form>
    </Dialog>
  );
}
