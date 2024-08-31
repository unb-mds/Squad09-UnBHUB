import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import NavbarComponent2 from '../../../components/Landing/Navbar2';

describe('Teste na Navbar da LandingPage', () => {
  test('Renderiza o botão "Entrar"', () => {
    render(
      <Router>
        <NavbarComponent2 />
      </Router>
    );

    // Verifica se o botão "Entrar" está no documento
    const enterButton = screen.getByRole('button', { name: /Entrar/i });
    expect(enterButton).toBeInTheDocument();
  });

  test('Navega para a página de sign-in quando o botão "Entrar" é clicado', async () => {
    render(
      <Router>
        <NavbarComponent2 />
      </Router>
    );

    // Simula o clique no botão "Entrar"
    const enterButton = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(enterButton);

    // Verifica se o link para a página de sign-in está presente
    const linkElement = screen.getByRole('link', { name: /Entrar/i });
    expect(linkElement).toHaveAttribute('href', '/SignIn');
  });
});
