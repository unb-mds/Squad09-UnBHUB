import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Calltoaction2 from '../../../components/Cardapio/Calltoaction2';

describe('Calltoaction2', () => {
  test('renders the component with correct elements', () => {
    render(<Calltoaction2 />);

    // Verifica se o link para o GitHub está presente e tem o texto correto
    const githubLink = screen.getByRole('link', {
      name: /CRIADO POR SQUAD 9/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/unb-mds/Squad09-UnBHUB'
    );

    // Verifica se o link para o RU está presente e tem o texto correto
    const ruLink = screen.getByRole('link', {
      name: /https:\/\/ru\.unb\.br\/index\.php\/cardapio-refeitorio/i,
    });
    expect(ruLink).toBeInTheDocument();
    expect(ruLink).toHaveAttribute(
      'href',
      'https://ru.unb.br/index.php/cardapio-refeitorio'
    );

    // Verifica se os textos adicionais estão presentes
    expect(
      screen.getByText('Informações retiradas de:', { exact: false })
    ).toBeInTheDocument();
  });
});
