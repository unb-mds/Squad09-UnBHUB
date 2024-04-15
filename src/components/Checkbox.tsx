import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';

export default function CheckboxComponent() {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className="card flex justify-content-center mx-1 my-2">
      <Checkbox
        inputId="checkbox"
        name="checkbox1"
        value="Lembre-se"
        onChange={(e) => setChecked(e?.checked ?? false)}
        checked={checked}
      ></Checkbox>
      <div className="mx-1">
        <label htmlFor="rememberme">Lembre-se</label>
      </div>
    </div>
  );
}