import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

interface InputProps {
  label: string;
}

export default function InputComponent(props: InputProps) {
  const [value, setValue] = useState('');

  return (
    <div className="flex justify-content-center my-2">
      <label htmlFor={props.label}>{props.label}</label>
      <InputText
        id={props.label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
