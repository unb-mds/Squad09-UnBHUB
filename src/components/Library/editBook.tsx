// Importa componentes do PrimeReact, uma biblioteca de componentes UI para React.
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

//Validadores de formulário
import { Formik } from 'formik';
import * as Yup from 'yup';

//Função para criar um novo componente de matéria
import EditBookFunction from '../../functions/EditBook.tsx';

// Define um componente funcional React chamado CreateBookComponent.
export default function EditBookComponent(props: {
  visibleEdit1: boolean; // Propriedade visível que determina se o diálogo está visível ou não.
  EditsetVisible1: (visibleEdit1: boolean) => void; // Função para definir a visibilidade do diálogo.
}) {
  return (
    <Formik
      initialValues={{
        codeBook: '',
        nameBook: '',
        deliveryDay: '',
      }}
      onSubmit={(values) => {
        EditBookFunction(values).then(() => {
          props.EditsetVisible1(false);
        });
      }}
      validationSchema={Yup.object().shape({
        codeBook: Yup.string().required('O código da matéria é obrigatório'),
        nameBook: Yup.string().required('O nome do livro é obrigatório'),
        deliveryDay: Yup.string().required('O dia de entrega é obrigatório'),
      })}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="card flex justify-content-center gap-6"
        >
          {/* Componente de diálogo que é exibido ou não com base no valor de props.visible. */}
          <Dialog
            header="Cadastrar Livro" // Título do diálogo.
            visible={props.visibleEdit1} // Define a visibilidade do diálogo.
            style={{ width: '30vw' }} // Define a largura do diálogo.
            onHide={() => props.EditsetVisible1(false)} // Função para esconder o diálogo quando for fechado.
          >
            {/* Campo de entrada para o código do livro com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full" // Classe de estilo para o campo de entrada.
                id="Código da matéria" // Identificador do campo.
                value={values.codeBook} // O valor do campo de entrada é vinculado ao estado codeBook.
                onChange={handleChange('codeBook')} // Atualiza o estado codeBook quando o valor do campo muda.
                onBlur={handleBlur} // Função chamada quando o campo perde o foco.
              />
              <label htmlFor="username">Código da matéria</label>
            </FloatLabel>
            <div>
              {errors.codeBook && touched.codeBook ? (
                <div className="text-red-500">{errors.codeBook}</div>
              ) : null}
            </div>

            {/* Campo de entrada para o nome do livro com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Nome do livro"
                value={values.nameBook}
                onChange={handleChange('nameBook')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Nome do livro</label>
            </FloatLabel>
            {errors.nameBook && touched.nameBook ? (
              <div className="text-red-500">{errors.nameBook}</div>
            ) : null}

            {/* Capo de entrada para o dia de entrega com um rótulo flutuante. */}

            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Dia de entrega"
                value={values.deliveryDay}
                onChange={handleChange('deliveryDay')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Dia de entrega</label>
            </FloatLabel>

            {errors.deliveryDay && touched.deliveryDay ? (
              <div className="text-red-500 my-5">{errors.deliveryDay}</div>
            ) : null}

            {/* Botões para cancelar ou confirmar a operação. */}
            <div className="flex justify-content-between flex-wrap">
              <Button
                outlined
                label="Fechar"
                style={{
                  borderColor: '#ff6060',
                  color: '#ff6060',
                }}
                onClick={() => props.EditsetVisible1(false)}
              />
              <Button
                outlined
                label="Editar"
                style={{
                  borderColor: '#ff6060',
                  color: '#ff6060',
                }}
                onClick={() => props.EditsetVisible1(false)}
              />
              <Button
                outlined
                label="Excluir"
                style={{
                  borderColor: '#ff6060',
                  color: '#ff6060',
                }}
                onClick={() => props.EditsetVisible1(false)}
              />
              {/* Botão de cancelar. */}
              <Button onClick={handleSubmit} label="Confirmar" />
              {/* Botão de confirmar. */}
            </div>
          </Dialog>
        </form>
      )}
    </Formik>
  );
}
