import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

export default function EditBookComponent(props: {
  visibleEdit1: boolean;
  EditsetVisible1: (visibleEdit1: boolean) => void;
  bookData: { codeBook: string; nameBook: string; deliveryDay: string }; // Certifique-se de que os dados do livro sejam passados
}) {
  const { bookData, visibleEdit1, EditsetVisible1 } = props;

  // Verifica se os dados do livro estão disponíveis
  if (!bookData) {
    return null; // Não renderiza nada se os dados do livro não estiverem disponíveis
  }

  return (
    <Dialog
      header="Visualizar Livro"
      visible={visibleEdit1}
      style={{ width: '40vw', maxWidth: '600px' }} // Ajusta a largura do diálogo
      onHide={() => EditsetVisible1(false)}
    >
      <form className="flex flex-column gap-5 p-4">
        {' '}
        {/* Ajustado para Flexbox e adicionado padding */}
        <FloatLabel className="w-full">
          <InputText
            className="w-full"
            id="codeBook"
            value={bookData.codeBook}
            disabled // Desativa o campo de entrada
          />
          <label htmlFor="codeBook">Código da matéria</label>
        </FloatLabel>
        <FloatLabel className="w-full">
          <InputText
            className="w-full"
            id="nameBook"
            value={bookData.nameBook}
            disabled // Desativa o campo de entrada
          />
          <label htmlFor="nameBook">Nome do livro</label>
        </FloatLabel>
        <FloatLabel className="w-full">
          <InputText
            className="w-full"
            id="deliveryDay"
            value={bookData.deliveryDay}
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
            onClick={() => EditsetVisible1(false)}
          />
          <Button
            outlined
            label="Editar"
            style={{
              borderColor: '#f3d300',
              color: '#f3d300',
            }}
            onClick={() => EditsetVisible1(false)}
          />
          <Button
            outlined
            label="Excluir"
            style={{
              borderColor: '#ff6060',
              color: '#ff6060',
            }}
            onClick={() => EditsetVisible1(false)}
          />
        </div>
      </form>
    </Dialog>
  );
}
