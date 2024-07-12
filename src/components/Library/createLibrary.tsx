// Importa componentes do PrimeReact, uma biblioteca de componentes UI para React.
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

//Validadores de formulário
import { Formik } from 'formik';
import * as Yup from 'yup';

//Função para criar um novo componente de matéria
import CreateLibraryFunction from '../../functions/CreateLibrary';

// Define um componente funcional React chamado CreateSubjectComponent.
export default function createLibrary(props: {
  visible: boolean; // Propriedade visível que determina se o diálogo está visível ou não.
  setVisible: (visible: boolean) => void; // Função para definir a visibilidade do diálogo.
}) {
  return (
    <Formik
      initialValues={{
        bookName: '',
        schedule: '',
      }}
      onSubmit={(values) => {
        CreateLibraryFunction(values).then(() => {
          props.setVisible(false);
        });
      }}
      validationSchema={Yup.object().shape({
        bookName: Yup.string().required('Obrigatório fornecer nome do livro'),
        schedule: Yup.string().required('Obrigatório fornecer data'),
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
            header="Cadastrar livro" // Título do diálogo.
            visible={props.visible} // Define a visibilidade do diálogo.
            style={{ width: '30vw' }} // Define a largura do diálogo.
            onHide={() => props.setVisible(false)} // Função para esconder o diálogo quando for fechado.
          >
            {/* Campo de entrada para o código da matéria com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full" // Classe de estilo para o campo de entrada.
                id="Nome do livro" // Identificador do campo.
                value={values.bookName} // O valor do campo de entrada é vinculado ao estado codeSubject.
                onChange={handleChange('bookName')} // Atualiza o estado codeSubject quando o valor do campo muda.
                onBlur={handleBlur} // Função chamada quando o campo perde o foco.
              />
              <label htmlFor="username">Nome do livro</label>
            </FloatLabel>
            <div>
              {errors.bookName && touched.bookName ? (
                <div className="text-red-500">{errors.bookName}</div>
              ) : null}
            </div>

            {/* Campo de entrada para o nome da matéria com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="data de devolução"
                value={values.schedule}
                onChange={handleChange('schedule')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Data</label>
            </FloatLabel>
            {errors.schedule && touched.schedule ? (
              <div className="text-red-500 my-5">{errors.schedule}</div>
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
                onClick={() => props.setVisible(false)}
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
