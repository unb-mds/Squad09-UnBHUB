import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useState } from 'react';

export default function CreateSubjectComponent(props: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const [value, setValue] = useState('');
  return (
    <div className="card flex justify-content-center gap-6">
      <Dialog
        header="Cadastrar matéria"
        visible={props.visible}
        style={{ width: '30vw' }}
        onHide={() => props.setVisible(false)}
      >
        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Código da matéria"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="username">Código da matéria</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Nome da matéria"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="username">Nome da matéria</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Professor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="username">Professor</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Código da matéria"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="username">Código da matéria</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Dias da semana"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="username">Dias da semana</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Horário"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="username">Horário</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            className="flex mt-5 mb-5 w-full"
            id="Local"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="username">Local</label>
        </FloatLabel>
        <div className="flex justify-content-between flex-wrap">
          <Button label="Cancelar" />

          <Button label="Confirmar" />
        </div>
      </Dialog>
    </div>
  );
}
