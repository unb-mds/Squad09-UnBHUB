import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Calltoaction from '../../../components/Landing/Calltoaction';

describe('Testes no componente Calltoaction', () => {
  test('Verificar se somos redirecionados para a URl do GitHub quando "CRIADO POR SQUAD 9" é clicado', () => {
    render(<Calltoaction />);

    // Obtenha o link usando o texto "CRIADO POR SQUAD 9"
    const linkElement = screen.getByText(/CRIADO POR SQUAD 9/i);

    // Verifique se o link tem o href correto
    expect(linkElement.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/unb-mds/Squad09-UnBHUB'
    );

    // Simule o clique no link
    userEvent.click(linkElement);

    // Verifique se o link foi clicado (isso não abre a URL na verdade, só confirma que o link é funcional)
    expect(linkElement.closest('a')).toBeInTheDocument();
  });
});
