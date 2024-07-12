// Importa componentes do PrimeReact, uma biblioteca de componentes UI para React.
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

//Validadores de formulário
import { Formik } from 'formik';
import * as Yup from 'yup';

//Função para criar um novo componente de matéria
import CreateActivityFunction from '../../functions/CreateActivity';

// Define um componente funcional React chamado CreateActivityComponent.
export default function CreateActivityComponent(props: {
  visible: boolean; // Propriedade visível que determina se o diálogo está visível ou não.
  setVisible: (visible: boolean) => void; // Função para definir a visibilidade do diálogo.
}) {
  return (
    <Formik
      initialValues={{
        codeSubject: '',
        nameActivity: '',
        deliveryDay: '',
      }}
      onSubmit={(values) => {
        CreateActivityFunction(values).then(() => {
          props.setVisible(false);
        });
      }}
      validationSchema={Yup.object().shape({
        codeSubject: Yup.string().required('O código da matéria é obrigatório'),
        nameActivity: Yup.string().required(
          'O nome da atividade é obrigatório'
        ),
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
            header="Cadastrar matéria" // Título do diálogo.
            visible={props.visible} // Define a visibilidade do diálogo.
            style={{ width: '30vw' }} // Define a largura do diálogo.
            onHide={() => props.setVisible(false)} // Função para esconder o diálogo quando for fechado.
          >
            {/* Campo de entrada para o código da matéria com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full" // Classe de estilo para o campo de entrada.
                id="Código da matéria" // Identificador do campo.
                value={values.codeSubject} // O valor do campo de entrada é vinculado ao estado codeSubject.
                onChange={handleChange('codeSubject')} // Atualiza o estado codeSubject quando o valor do campo muda.
                onBlur={handleBlur} // Função chamada quando o campo perde o foco.
              />
              <label htmlFor="username">Código da matéria</label>
            </FloatLabel>
            <div>
              {errors.codeSubject && touched.codeSubject ? (
                <div className="text-red-500">{errors.codeSubject}</div>
              ) : null}
            </div>

            {/* Campo de entrada para o nome da matéria com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Nome da matéria"
                value={values.nameActivity}
                onChange={handleChange('nameActivity')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Nome da matéria</label>
            </FloatLabel>
            {errors.nameActivity && touched.nameActivity ? (
              <div className="text-red-500">{errors.nameActivity}</div>
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
