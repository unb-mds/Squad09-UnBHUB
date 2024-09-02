import '@testing-library/jest-dom';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import SignInCardComponent from '../../../components/SignIn/SignInCard';
import SignInFunction from '../../../functions/SignIn/SignIn';

// Mock da função SignInFunction
jest.mock('../../../functions/SignIn/SignIn', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({}),
}));

describe('SignInCardComponent', () => {
  test('renderiza o formulário e todos os elementos', async () => {
    await act(async () => {
      render(
        <Router>
          <SignInCardComponent />
        </Router>
      );
    });

    expect(screen.getByLabelText(/Endereço de E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/Ainda não tem uma conta?/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Cadastrar-se/i })
    ).toBeInTheDocument();
  });

  test('atualiza os valores dos inputs ao alterar', async () => {
    await act(async () => {
      render(
        <Router>
          <SignInCardComponent />
        </Router>
      );
    });

    const emailInput = screen.getByLabelText(/Endereço de E-mail/i);
    const passwordInput = screen.getByLabelText(/Senha/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('exibe erros de validação quando o formulário é enviado com campos vazios', async () => {
    await act(async () => {
      render(
        <Router>
          <SignInCardComponent />
        </Router>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Por favor, forneça um email/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Por favor, forneça uma senha/i)
      ).toBeInTheDocument();
    });
  });

  test('chama SignInFunction e navega ao enviar o formulário', async () => {
    await act(async () => {
      render(
        <Router>
          <SignInCardComponent />
        </Router>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Endereço de E-mail/i), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/Senha/i), {
        target: { value: 'password123' },
      });
      fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    });

    await waitFor(() => {
      expect(SignInFunction).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
      // Aqui você pode verificar se a navegação foi feita, se necessário
    });
  });
});
