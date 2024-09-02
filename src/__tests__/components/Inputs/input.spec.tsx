import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import InputComponent from '../../../components/Input';

describe('Testes referente ao InputComponent', () => {
  it('Validação de existência do Input', () => {
    const Component = () => {
      const [initialValue, setInitialValue] = useState('');
      return (
        <InputComponent
          label="TestLabel"
          errors=""
          touched
          value={initialValue}
          onChange={(text) => {
            setInitialValue(text.target.value);
          }}
        />
      );
    };
    render(<Component />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('Alteração de valores do Input', () => {
    const Component = () => {
      const [initialValue, setInitialValue] = useState('');
      return (
        <InputComponent
          label="TestLabel"
          errors=""
          touched
          value={initialValue}
          onChange={(text) => {
            setInitialValue(text.target.value);
          }}
        />
      );
    };
    render(<Component />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '123' } });

    expect(input).toHaveValue('123');
  });
});
