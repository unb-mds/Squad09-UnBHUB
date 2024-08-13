// Importa componentes do PrimeReact, uma biblioteca de componentes UI para React.
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar'; // Importa o componente Calendar

// Validadores de formulário
import { Formik } from 'formik';
import * as Yup from 'yup';

// Função para criar um novo componente de matéria
import CreateActivityFunction from '../../functions/CreateActivity';
import SearchDropdownComponent from './SearchDropdown';

// Define um componente funcional React chamado CreateActivityComponent.
export default function CreateActivityComponent(props: {
  visibleCreate: boolean; // Propriedade visível que determina se o diálogo está visível ou não.
  CreatesetVisible: (visibleCreate: boolean) => void; // Função para definir a visibilidade do diálogo.
}) {
  return (
    <Formik
      initialValues={{
        subject: {
          name: '',
          code: '',
        },
        taskName: '',
        deliveryDay: null, // Ajuste para inicializar com null
        description:'',
      }}
      onSubmit={(values) => {
        CreateActivityFunction(values).then(() => {
          props.CreatesetVisible(false);
        });
      }}
      validationSchema={Yup.object().shape({
        subject: Yup.object().shape({
          name: Yup.string().required('A matéria é obrigatória'),
          code: Yup.string().required('O código da matéria é obrigatório'),
        }),
        taskName: Yup.string().required('O nome da atividade é obrigatório'),
        deliveryDay: Yup.date()
          .nullable()
          .required('O dia de entrega é obrigatório'), // Ajuste para validação de data
      })}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        errors,
        touched,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="card flex justify-content-center gap-6"
        >
          {/* Componente de diálogo que é exibido ou não com base no valor de props.visible. */}
          <Dialog
            header="Cadastrar atividade" // Título do diálogo.
            visible={props.visibleCreate} // Define a visibilidade do diálogo.
            style={{ width: '30vw' }} // Define a largura do diálogo.
            onHide={() => props.CreatesetVisible(false)} // Função para esconder o diálogo quando for fechado.
          >
            {/* Campo de seleção de matéria */}
            <div className="my-4">
            <SearchDropdownComponent
              selectedSubject={values.subject}
              setSelectedSubject={(props) =>
                setFieldValue('subject', {
                  name: props.name,
                  code: props.code,
                })
              }
            />
            </div>
            
            <div>
              {errors.subject && touched.subject ? (
                <div className="text-red-500">{errors.subject.name}</div>
              ) : null}
            </div>

            {/* Campo de entrada para o nome da atividade com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="taskName"
                value={values.taskName}
                onChange={handleChange('taskName')}
                onBlur={handleBlur}
              />
              <label htmlFor="taskName">Nome da atividade</label>
            </FloatLabel>
            {errors.taskName && touched.taskName ? (
              <div className="text-red-500">{errors.taskName}</div>
            ) : null}

            {/* Seletor de data para o dia de entrega */}
            <FloatLabel>
              <Calendar
                id="deliveryDay"
                value={values.deliveryDay}
                onChange={(e) => setFieldValue('deliveryDay', e.value)}
                onBlur={handleBlur}
                className="flex mt-5 mb-5 w-full"
                dateFormat="dd/mm/yy"
                showIcon
              />
              <label htmlFor="deliveryDay">Dia de entrega</label>
            </FloatLabel>
            {errors.deliveryDay && touched.deliveryDay ? (
              <div className="text-red-500 my-5">{errors.deliveryDay}</div>
            ) : null}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="description"
                value={values.description}
                onChange={handleChange('description')}
                onBlur={handleBlur}
              />
              <label htmlFor="description">Descrição (Opcional)</label>
            </FloatLabel>

            {/* Botões para cancelar ou confirmar a operação. */}
            <div className="flex justify-content-between flex-wrap">
              <Button
                outlined
                label="Fechar"
                style={{
                  borderColor: '#ff6060',
                  color: '#ff6060',
                }}
                onClick={() => props.CreatesetVisible(false)}
              />
              {/* Botão de confirmar. */}
              <Button onClick={() => handleSubmit()} label="Confirmar" />
            </div>
          </Dialog>
        </form>
      )}
    </Formik>
  );
}
