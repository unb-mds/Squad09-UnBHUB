import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Hero from '../../../components/Landing/Hero';

describe('Teste no componente Hero', () => {
  test('Renderiza o botão "Saiba Mais"', () => {
    render(<Hero />);

    // Verifica se o botão "Saiba Mais" está no documento
    const saibaMaisButton = screen.getByRole('button', { name: /Saiba Mais/i });
    expect(saibaMaisButton).toBeInTheDocument();
  });

  test('O botão "Saiba Mais" redireciona para a URL correta quando clicado', () => {
    render(<Hero />);

    // Simula o clique no botão "Saiba Mais"
    const saibaMaisButton = screen.getByRole('button', { name: /Saiba Mais/i });
    userEvent.click(saibaMaisButton);
  });
});
