import { Button } from 'primereact/button'; // Importa o componente Button da biblioteca PrimeReact
import { Dialog } from 'primereact/dialog'; // Importa o componente Dialog da biblioteca PrimeReact
import { FloatLabel } from 'primereact/floatlabel'; // Importa o componente FloatLabel da biblioteca PrimeReact
import { InputText } from 'primereact/inputtext'; // Importa o componente InputText da biblioteca PrimeReact
import { Calendar } from 'primereact/calendar'; // Importa o componente Calendar da biblioteca PrimeReact
import { Formik } from 'formik'; // Importa o Formik para gerenciamento de formulários
import * as Yup from 'yup'; // Importa Yup para validação de formulários
import CreateLibraryFunction from '../../functions/CreateLibrary'; // Importa a função para criar um livro na biblioteca
import { Timestamp } from 'firebase/firestore'; // Importa o tipo Timestamp do Firestore
import { useEffect } from 'react'; // Importa o useEffect para lidar com efeitos colaterais

export default function CreateLibrary(props: {
  // Componente funcional que recebe propriedades
  visibleCreate1: boolean; // Estado de visibilidade do modal de criação
  CreatesetVisible1: (visibleCreate: boolean) => void; // Função para definir a visibilidade do modal de criação
}) {
  return (
    <Formik
      initialValues={{
        // Valores iniciais do formulário
        author: '', // Código da matéria
        bookName: '', // Nome do livro
        deliveryDay: null, // Data de devolução (inicialmente nula)
      }}
      onSubmit={(values, { resetForm }) => {
        // Função chamada ao enviar o formulário
        const deliveryDayTimestamp = Timestamp.fromDate(values.deliveryDay); // Converte a data de devolução para Timestamp do Firestore

        CreateLibraryFunction({
          author: values.author, // Passa o código da matéria
          bookName: values.bookName, // Passa o nome do livro
          deliveryDay: deliveryDayTimestamp, // Passa a data de devolução
        }).then(() => {
          // Após a criação bem-sucedida
          props.CreatesetVisible1(false); // Fecha o modal de criação
          resetForm(); // Reseta os valores do formulário
        });
      }}
      validationSchema={Yup.object().shape({
        // Define o esquema de validação usando Yup
        author: Yup.string().required(
          'Obrigatório fornecer nome do autor'
        ), // Validação para código da matéria
        bookName: Yup.string().required('Obrigatório fornecer nome do livro'), // Validação para nome do livro
        deliveryDay: Yup.date().required('Obrigatório fornecer data'), // Validação para data de devolução
      })}
    >
      {({
        values, // Valores atuais do formulário
        handleChange, // Função para lidar com mudanças de campo
        handleBlur, // Função para lidar com o desfoque de campo
        setFieldValue, // Função para definir o valor de um campo específico
        handleSubmit, // Função para lidar com o envio do formulário
        errors, // Erros de validação
        touched, // Campos que foram tocados
        resetForm, // Função para resetar o formulário
      }) => {
        // Reseta o formulário sempre que o modal for fechado ou reaberto
        useEffect(() => {
          if (!props.visibleCreate1) {
            resetForm(); // Reseta o formulário quando o modal é fechado
          }
        }, [props.visibleCreate1, resetForm]);

        return (
          <form
            onSubmit={handleSubmit} // Lida com o envio do formulário
            className="card flex justify-content-center gap-6" // Estilos do formulário
          >
            <Dialog
              header="Cadastrar livro" // Título do modal
              visible={props.visibleCreate1} // Controla a visibilidade do modal
              style={{ width: '30vw' }} // Define a largura do modal
              onHide={() => props.CreatesetVisible1(false)} // Fecha o modal quando necessário
            >
              <FloatLabel>
                <InputText
                  className="flex mt-5 mb-5 w-full" // Estilos do campo de entrada
                  id="author" // ID do campo
                  name="author" // Nome do campo
                  value={values.author} // Valor atual do campo
                  onChange={handleChange} // Lida com mudanças no campo
                  onBlur={handleBlur} // Lida com o desfoque do campo
                />
                <label htmlFor="author">Nome do Autor</label>{' '}
                {/* Rótulo para o campo */}
              </FloatLabel>
              {errors.author && touched.author ? ( // Verifica e exibe erros de validação para código da matéria
                <div className="text-red-500">{errors.author}</div>
              ) : null}

              <FloatLabel>
                <InputText
                  className="flex mt-5 mb-5 w-full" // Estilos do campo de entrada
                  id="bookName" // ID do campo
                  name="bookName" // Nome do campo
                  value={values.bookName} // Valor atual do campo
                  onChange={handleChange} // Lida com mudanças no campo
                  onBlur={handleBlur} // Lida com o desfoque do campo
                />
                <label htmlFor="bookName">Nome do livro</label>{' '}
                {/* Rótulo para o campo */}
              </FloatLabel>
              {errors.bookName && touched.bookName ? ( // Verifica e exibe erros de validação para nome do livro
                <div className="text-red-500">{errors.bookName}</div>
              ) : null}

              <FloatLabel>
                <Calendar
                  className="flex mt-5 mb-5 w-full" // Estilos do componente Calendar
                  id="deliveryDay" // ID do campo
                  name="deliveryDay" // Nome do campo
                  value={values.deliveryDay} // Valor atual do campo
                  onChange={(e) => setFieldValue('deliveryDay', e.value)} // Lida com mudanças na data
                  onBlur={handleBlur} // Lida com o desfoque do campo
                  showIcon // Exibe um ícone no calendário
                  dateFormat="dd/mm/yy" // Formato da data
                />
                <label htmlFor="deliveryDay">Data de devolução</label>{' '}
                {/* Rótulo para o campo */}
              </FloatLabel>
              {errors.deliveryDay && touched.deliveryDay ? ( // Verifica e exibe erros de validação para data de devolução
                <div className="text-red-500 my-5">{errors.deliveryDay}</div>
              ) : null}

              <div className="flex justify-content-between flex-wrap">
                {' '}
                {/* Contêiner para os botões */}
                <Button
                  outlined
                  label="Fechar" // Texto do botão
                  style={{
                    borderColor: '#ff6060', // Cor da borda do botão
                    color: '#ff6060', // Cor do texto do botão
                  }}
                  onClick={() => props.CreatesetVisible1(false)} // Fecha o modal ao clicar
                />
                <Button onClick={handleSubmit} label="Confirmar" />{' '}
                {/* Botão para confirmar a criação */}
              </div>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
}
