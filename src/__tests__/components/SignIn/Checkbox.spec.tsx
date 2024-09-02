import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import CheckboxComponent from '../../../components/SignIn/Checkbox';

describe('Testes no CheckboxComponent', () => {
  it('Validação de existência do Checkbox', () => {
    const Component = () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <CheckboxComponent
          checked={isChecked}
          onChange={(e) => setIsChecked(!!e.checked)}
          label="TestLabel"
        />
      );
    };
    render(<Component />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('Alteração de valores do Checkbox', () => {
    const Component = () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <CheckboxComponent
          checked={isChecked}
          onChange={(e) => setIsChecked(!!e.checked)}
          label="TestLabel"
        />
      );
    };
    render(<Component />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('Renderiza a label corretamente', () => {
    const Component = () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <CheckboxComponent
          checked={isChecked}
          onChange={(e) => setIsChecked(!!e.checked)}
          label="TestLabel"
        />
      );
    };
    render(<Component />);

    const label = screen.getByLabelText('TestLabel');
    expect(label).toBeInTheDocument();
  });
});
