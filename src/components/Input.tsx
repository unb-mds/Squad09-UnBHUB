import { InputText } from 'primereact/inputtext';
import { ChangeEvent, useState } from 'react';

interface InputProps {
  label: string;
}

export default function InputComponent(props: InputProps) {
  const [value, setValue] = useState('');

  return (
    <div>
      <h2>{props.label}</h2>
      <InputText
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </div>
  );
}
