// Importa componentes do PrimeReact, uma biblioteca de componentes UI para React.
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
// Importa o hook useState do React para gerenciar estados internos.
import { useState } from 'react';

// Define um componente funcional React chamado CreateSubjectComponent.
export default function CreateSubjectComponent(props: {
  visible: boolean; // Propriedade visível que determina se o diálogo está visível ou não.
  setVisible: (visible: boolean) => void; // Função para definir a visibilidade do diálogo.
}) {
  // Declara variáveis de estado para armazenar os valores de entrada do formulário.
  const [cdMateria, setCdMateria] = useState(''); // Estado para armazenar o código da matéria.
  const [nomeMateria, setNomeMateria] = useState(''); // Estado para armazenar o nome da matéria.
  const [professor, setProfessor] = useState(''); // Estado para armazenar o nome do professor.
  const [diasSemana, setDiasSemana] = useState(''); // Estado para armazenar os dias da semana.
  const [horario, setHorario] = useState(''); // Estado para armazenar o horário da matéria.
  const [local, setLocal] = useState(''); // Estado para armazenar o local.

  return (
    <div className="card flex justify-content-center gap-6">
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
            value={cdMateria} // O valor do campo de entrada é vinculado ao estado cdMateria.
            onChange={(e) => setCdMateria(e.target.value)} // Atualiza o estado cdMateria quando o valor do campo muda.
          />
          <label htmlFor="username">Código da matéria</label>{' '}
          {/* Rótulo do campo. */}
        </FloatLabel>

        {/* Campo de entrada para o nome da matéria com um rótulo flutuante. */}
        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Nome da matéria"
            value={nomeMateria}
            onChange={(e) => setNomeMateria(e.target.value)}
          />
          <label htmlFor="username">Nome da matéria</label>
        </FloatLabel>

        {/* Campo de entrada para o nome do professor com um rótulo flutuante. */}
        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          />
          <label htmlFor="username">Professor</label>
        </FloatLabel>

        {/* Campo de entrada para os dias da semana com um rótulo flutuante. */}
        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Dias da semana"
            value={diasSemana}
            onChange={(e) => setDiasSemana(e.target.value)}
          />
          <label htmlFor="username">Dias da semana</label>
        </FloatLabel>

        {/* Campo de entrada para o horário com um rótulo flutuante. */}
        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Horário"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />
          <label htmlFor="username">Horário</label>
        </FloatLabel>

        {/* Campo de entrada para o local com um rótulo flutuante. */}
        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Local"
            value={local} // Este valor deveria ser 'local' ao invés de 'value' para refletir o campo correto.
            onChange={(e) => setLocal(e.target.value)} // Aqui também deveria ser 'setLocal' para atualizar o campo 'local'.
          />
          <label htmlFor="username">Local</label>
        </FloatLabel>

        {/* Botões para cancelar ou confirmar a operação. */}
        <div className="flex justify-content-between flex-wrap">
          <Button label="Cancelar" /> {/* Botão de cancelar. */}
          <Button label="Confirmar" /> {/* Botão de confirmar. */}
        </div>
      </Dialog>
    </div>
  );
}
