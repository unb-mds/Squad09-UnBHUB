import { Checkbox } from 'primereact/checkbox';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export default function CheckboxComponent({ checked, onChange, label }: CheckboxProps) {
  return (
    <div className="card flex justify-content-center mx-1 my-2">
      <Checkbox
        inputId="checkbox"
        name="checkbox"
        value="Lembre-se"
        onChange={onChange}
        checked={checked}
      />
      <div className="mx-1">
        <label htmlFor="checkbox">{label}</label>
      </div>
    </div>
  );
}
