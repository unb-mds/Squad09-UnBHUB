// Importa componentes do PrimeReact, uma biblioteca de componentes UI para React.
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

//Validadores de formulário
import { Formik } from 'formik';
import * as Yup from 'yup';

//Função para criar um novo componente de matéria
import CreateSubjectFunction from '../../functions/CreateSubject';

// Define um componente funcional React chamado CreateSubjectComponent.
export default function CreateSubjectComponent(props: {
  visible: boolean; // Propriedade visível que determina se o diálogo está visível ou não.
  setVisible: (visible: boolean) => void; // Função para definir a visibilidade do diálogo.
}) {
  return (
    <Formik
      initialValues={{
        codeSubject: '',
        nameSubject: '',
        professor: '',
        weekDays: '',
        schedule: '',
        local: '',
      }}
      onSubmit={(values) => {
        CreateSubjectFunction(values).then(() => {
          props.setVisible(false);
        });
      }}
      validationSchema={Yup.object().shape({
        codeSubject: Yup.string().required('O código da matéria é obrigatório'),
        nameSubject: Yup.string().required('O nome da matéria é obrigatório'),
        professor: Yup.string().required('O nome do professor é obrigatório'),
        weekDays: Yup.string().required('Os dias da semana são obrigatórios'),
        schedule: Yup.string().required('O horário é obrigatório'),
        local: Yup.string().required('O local é obrigatório'),
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
                value={values.nameSubject}
                onChange={handleChange('nameSubject')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Nome da matéria</label>
            </FloatLabel>
            {errors.nameSubject && touched.nameSubject ? (
              <div className="text-red-500">{errors.nameSubject}</div>
            ) : null}

            {/* Campo de entrada para o nome do professor com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Professor"
                value={values.professor}
                onChange={handleChange('professor')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Professor</label>
            </FloatLabel>
            {errors.professor && touched.professor ? (
              <div className="text-red-500">{errors.professor}</div>
            ) : null}

            {/* Campo de entrada para os dias da semana com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Dias da semana"
                value={values.weekDays}
                onChange={handleChange('weekDays')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Dias da semana</label>
            </FloatLabel>
            {errors.weekDays && touched.weekDays ? (
              <div className="text-red-500">{errors.weekDays}</div>
            ) : null}

            {/* Campo de entrada para o horário com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Horário"
                value={values.schedule}
                onChange={handleChange('schedule')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Horário</label>
            </FloatLabel>
            {errors.schedule && touched.schedule ? (
              <div className="text-red-500">{errors.schedule}</div>
            ) : null}

            {/* Campo de entrada para o local com um rótulo flutuante. */}
            <FloatLabel>
              <InputText
                className="flex mt-5 mb-5 w-full"
                id="Local"
                value={values.local} // Este valor deveria ser 'local' ao invés de 'value' para refletir o campo correto.
                onChange={handleChange('local')}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Local</label>
            </FloatLabel>
            {errors.local && touched.local ? (
              <div className="text-red-500">{errors.local}</div>
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
