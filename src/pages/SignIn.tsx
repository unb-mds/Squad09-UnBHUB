import React from 'react';
import { ChangeEvent, FC, useState } from 'react';
import { InputText } from 'primereact/inputtext';

import './style.css';

export default function SignInScreens() {
  return <div>SignInScreen</div>;
}

export const App: FC = () => {
  const [value, setValue] = useState('');
  return (
    <main>
      <h2>Username</h2>
      <InputText
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <p>{value}</p>
    </main>
  );
};
