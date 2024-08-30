import { InputText } from 'primereact/inputtext';

interface InputProps {
  label: string;
  value: string;
  errors: string | undefined;
  touched: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Mudança aqui
  type?: string; 
}

export default function InputComponent(props: InputProps) {
  return (
    <div className="flex flex-column gap-2 my-2">
      <label htmlFor={props.label}>{props.label}</label>
      <InputText
        id={props.label}
        value={props.value ? props.value : ''}
        onChange={props.onChange}  // Passando diretamente o onChange
        className="w-full"
        type={props.type || 'text'} 
      />
      {props.errors && props.touched && (
        <div className="text-red-500 text-sm">{props.errors}</div>
      )}
    </div>
  );
}
