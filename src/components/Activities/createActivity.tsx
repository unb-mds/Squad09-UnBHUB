import { Button } from 'primereact/button'; // Importa o componente Button da biblioteca PrimeReact.
import { Dialog } from 'primereact/dialog'; // Importa o componente Dialog da biblioteca PrimeReact.
import { FloatLabel } from 'primereact/floatlabel'; // Importa o componente FloatLabel da biblioteca PrimeReact.
import { InputText } from 'primereact/inputtext'; // Importa o componente InputText da biblioteca PrimeReact.
import { Calendar } from 'primereact/calendar'; // Importa o componente Calendar da biblioteca PrimeReact.

import { Formik } from 'formik'; // Importa o Formik para gerenciamento de formulários.
import * as Yup from 'yup'; // Importa o Yup para validação de esquema de formulários.

import CreateActivityFunction from '../../functions/CreateActivity'; // Importa a função para criar uma nova atividade.
import SearchDropdownComponent from './SearchDropdown'; // Importa um componente de dropdown para seleção de matéria.
import { Timestamp } from 'firebase/firestore';

export default function CreateActivityComponent(props: {
  visibleCreate: boolean; // Propriedade que controla se o diálogo de criação está visível.
  CreatesetVisible: (visibleCreate: boolean) => void; // Função para atualizar a visibilidade do diálogo.
}) {
  return (
    <Formik
      initialValues={{
        subject: {
          name: '', // Nome da matéria.
          code: '', // Código da matéria.
        },
        taskName: '', // Nome da atividade.
        deliveryDay: null, // Data de entrega da atividade (inicialmente null).
        description: '', // Descrição da atividade.
        status: 'pending', // Adicione o status aqui (exemplo: 'pending').
      }}
      onSubmit={(values) => {
        if (values.deliveryDay === null) {
          alert('Por favor, selecione uma data de entrega.');
          return;
        }

        const convertedValues = {
          ...values,
          deliveryDay: Timestamp.fromDate(values.deliveryDay),
        };

        CreateActivityFunction(convertedValues).then(() => {
          props.CreatesetVisible(false); // Fecha o diálogo após a criação da atividade.
        });
      }}
      validationSchema={Yup.object().shape({
        subject: Yup.object().shape({
          name: Yup.string().required('A matéria é obrigatória'), // Valida que o nome da matéria é obrigatório.
          code: Yup.string().required('O código da matéria é obrigatório'), // Valida que o código da matéria é obrigatório.
        }),
        taskName: Yup.string().required('O nome da atividade é obrigatório'), // Valida que o nome da atividade é obrigatório.
        deliveryDay: Yup.date()
          .nullable()
          .required('O dia de entrega é obrigatório'), // Valida que a data de entrega é obrigatória.
        description: Yup.string().required('A descrição é obrigatória'), // Valida que a descrição é obrigatória.
        status: Yup.string().required('O status é obrigatório'), // Valida que o status é obrigatório.
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
          onSubmit={handleSubmit} // Envia o formulário quando a função handleSubmit é chamada.
          className="card flex justify-content-center gap-6" // Define o layout do formulário com espaçamento.
        >
          <Dialog
            header="Cadastrar atividade" // Título do diálogo de criação.
            visible={props.visibleCreate} // Define a visibilidade do diálogo.
            style={{ width: '30vw' }} // Define a largura do diálogo.
            onHide={() => props.CreatesetVisible(false)} // Função chamada ao fechar o diálogo.
          >
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
                <div className="text-red-500">{errors.subject.name}</div> // Exibe erros de validação para o campo de matéria.
              ) : null}
            </div>

            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full" // Define o layout do campo de entrada com margem e largura total.
                id="taskName"
                value={values.taskName} // Define o valor do campo com base no estado do formulário.
                onChange={handleChange('taskName')} // Função chamada ao alterar o valor do campo.
                onBlur={handleBlur} // Função chamada ao sair do campo.
              />
              <label htmlFor="taskName">Nome da atividade</label>
            </FloatLabel>
            {errors.taskName && touched.taskName ? (
              <div className="text-red-500">{errors.taskName}</div> // Exibe erros de validação para o campo de nome da atividade.
            ) : null}

            <FloatLabel>
              <Calendar
                id="deliveryDay"
                value={values.deliveryDay} // Define o valor do campo com base no estado do formulário.
                onChange={(e) => setFieldValue('deliveryDay', e.value)} // Função chamada ao alterar a data.
                onBlur={handleBlur} // Função chamada ao sair do campo.
                className="flex mt-5 mb-5 w-full" // Define o layout do campo de calendário com margem e largura total.
                dateFormat="dd/mm/yy" // Define o formato da data.
                showIcon // Exibe um ícone de calendário.
              />
              <label htmlFor="deliveryDay">Dia de entrega</label>
            </FloatLabel>
            {errors.deliveryDay && touched.deliveryDay ? (
              <div className="text-red-500 my-5">{errors.deliveryDay}</div> // Exibe erros de validação para o campo de data de entrega.
            ) : null}

            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full" // Define o layout do campo de entrada com margem e largura total.
                id="description"
                value={values.description} // Define o valor do campo com base no estado do formulário.
                onChange={handleChange('description')} // Função chamada ao alterar o valor do campo.
                onBlur={handleBlur} // Função chamada ao sair do campo.
              />
              <label htmlFor="description">Descrição</label>
            </FloatLabel>
            {errors.description && touched.description ? (
              <div className="text-red-500">{errors.description}</div> // Exibe erros de validação para o campo de descrição.
            ) : null}

            <div className="flex justify-content-between flex-wrap mt-5">
              <Button
                outlined
                label="Cancelar"
                style={{
                  borderColor: '#ff6060', // Define a cor da borda do botão.
                  backgroundColor: '#ff6060', // Define a cor do texto do botão.
                  color: 'white',
                }}
                onClick={() => props.CreatesetVisible(false)} // Função chamada ao clicar no botão de fechar.
              />
              <Button onClick={() => handleSubmit()} label="Confirmar" />{' '}
              {/* Botão para confirmar a criação da atividade. */}
            </div>
          </Dialog>
        </form>
      )}
    </Formik>
  );
}
