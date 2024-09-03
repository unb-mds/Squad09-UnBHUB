import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import SignUpCardComponent from '../../../components/SignUp/SignUpCard';
import SignUpFunction from '../../../functions/SignUp/SignUp';

// Mock da função SignUpFunction
jest.mock('../../../functions/SignUp/SignUp', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({}),
}));

describe('SignUpCardComponent', () => {
  test('renderiza o formulário e todos os elementos', async () => {
    await act(async () => {
      render(
        <Router>
          <SignUpCardComponent />
        </Router>
      );
    });

    expect(screen.getByLabelText(/Endereço de E-mail/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText('Senha', { selector: 'input' })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Senha novamente', { selector: 'input' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Cadastre-se/i })
    ).toBeInTheDocument();
  });

  test('atualiza os valores dos inputs ao alterar', async () => {
    await act(async () => {
      render(
        <Router>
          <SignUpCardComponent />
        </Router>
      );
    });

    const emailInput = screen.getByLabelText(/Endereço de E-mail/i);
    const passwordInput = screen.getByLabelText('Senha', { selector: 'input' });
    const confirmPasswordInput = screen.getByLabelText('Senha novamente', {
      selector: 'input',
    });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'password123' },
      });
    });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  test('exibe erros de validação quando o formulário é enviado com campos vazios', async () => {
    await act(async () => {
      render(
        <Router>
          <SignUpCardComponent />
        </Router>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Cadastre-se/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText(/O campo de e-mail é obrigatório/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/O campo de senha é obrigatório/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/O campo de confirmação de senha é obrigatório/i)
      ).toBeInTheDocument();
    });
  });

  test('exibe erro de validação quando as senhas não coincidem', async () => {
    await act(async () => {
      render(
        <Router>
          <SignUpCardComponent />
        </Router>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Senha', { selector: 'input' }), {
        target: { value: 'password123' },
      });
      fireEvent.change(
        screen.getByLabelText('Senha novamente', { selector: 'input' }),
        {
          target: { value: 'password321' },
        }
      );
      fireEvent.click(screen.getByRole('button', { name: /Cadastre-se/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText(/As senhas devem ser iguais/i)
      ).toBeInTheDocument();
    });
  });

  test('chama SignUpFunction e navega ao enviar o formulário com dados válidos', async () => {
    await act(async () => {
      render(
        <Router>
          <SignUpCardComponent />
        </Router>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Endereço de E-mail/i), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Senha', { selector: 'input' }), {
        target: { value: 'password123' },
      });
      fireEvent.change(
        screen.getByLabelText('Senha novamente', { selector: 'input' }),
        {
          target: { value: 'password123' },
        }
      );
      fireEvent.click(screen.getByRole('button', { name: /Cadastre-se/i }));
    });

    await waitFor(() => {
      expect(SignUpFunction).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      // Aqui você pode verificar se a navegação foi feita, se necessário
    });
  });
});
