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
  visibleCreate1: boolean; // Propriedade visível que determina se o diálogo está visível ou não.
  CreatesetVisible1: (visibleCreate: boolean) => void; // Função para definir a visibilidade do diálogo.
}) {
  return (
    <Formik
      initialValues={{
        codeSubject: '',
        nameBook: '',
        deliveryDay: '',
      }}
      onSubmit={(values) => {
        CreateLibraryFunction(values).then(() => {
          props.CreatesetVisible1(false);
        });
      }}
      validationSchema={Yup.object().shape({
        codeSubject: Yup.string().required(
          'Obrigatório fornecer nome da matéria'
        ),
        nameBook: Yup.string().required('Obrigatório fornecer nome do livro'),
        deliveryDay: Yup.string().required('Obrigatório fornecer data'),
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
            visible={props.visibleCreate1} // Define a visibilidade do diálogo.
            style={{ width: '30vw' }} // Define a largura do diálogo.
            onHide={() => props.CreatesetVisible1(false)} // Função para esconder o diálogo quando for fechado.
          >
            {/* Campo de entrada para o código da matéria com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full" // Classe de estilo para o campo de entrada.
                id="Nome da matéria" // Identificador do campo.
                value={values.codeSubject} // O valor do campo de entrada é vinculado ao estado codeSubject.
                onChange={handleChange('codeSubject')} // Atualiza o estado codeSubject quando o valor do campo muda.
                onBlur={handleBlur} // Função chamada quando o campo perde o foco.
              />
              <label htmlFor="username">Nome da matéria</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full" // Classe de estilo para o campo de entrada.
                id="Nome do livro" // Identificador do campo.
                value={values.nameBook} // O valor do campo de entrada é vinculado ao estado codeSubject.
                onChange={handleChange('nameBook')} // Atualiza o estado codeSubject quando o valor do campo muda.
                onBlur={handleBlur} // Função chamada quando o campo perde o foco.
              />
              <label htmlFor="username">Nome do livro</label>
            </FloatLabel>
            <div>
              {errors.nameBook && touched.nameBook ? (
                <div className="text-red-500">{errors.nameBook}</div>
              ) : null}
            </div>

            {/* Campo de entrada para o nome da matéria com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="data de devolução"
                value={values.deliveryDay}
                onChange={handleChange('deliveryDay')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Data</label>
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
                onClick={() => props.CreatesetVisible1(false)}
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
