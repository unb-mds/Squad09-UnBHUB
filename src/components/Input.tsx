import { InputText } from 'primereact/inputtext';

interface InputProps {
  label: string;
  value: string;
  errors: string | undefined;
  touched: boolean | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: string; 
}

export default function InputComponent(props: InputProps) {
  return (
    <div className="flex flex-column gap-2 my-2">
      <label htmlFor={props.label}>{props.label}</label>
      <InputText
        id={props.label}
        value={props.value ? props.value : ''}
        onChange={(e) => props.setValue(e.target.value)}
        className="w-full"
        type={props.type || 'text'} 
      />
      {props.errors && props.touched && (
        <div className="text-red-500 text-sm">{props.errors}</div>
      )}
    </div>
  );
}