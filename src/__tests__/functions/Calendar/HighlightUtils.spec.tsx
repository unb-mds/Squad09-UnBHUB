import {
  isHighlighted,
  getHighlightedMessage,
} from '../../../functions/Calendar/HighlightUtils';

describe('isHighlighted', () => {
  test('deve retornar true se a data estiver na lista de datas destacadas', () => {
    const date = new Date(2023, 7, 31); // 31 de agosto de 2023
    const highlightedDates = [new Date(2023, 7, 31), new Date(2023, 8, 1)];

    expect(isHighlighted(date, highlightedDates)).toBe(true);
  });

  test('deve retornar false se a data não estiver na lista de datas destacadas', () => {
    const date = new Date(2023, 7, 31); // 31 de agosto de 2023
    const highlightedDates = [new Date(2023, 8, 1), new Date(2023, 8, 2)];

    expect(isHighlighted(date, highlightedDates)).toBe(false);
  });

  test('deve retornar false se a lista de datas destacadas estiver vazia', () => {
    const date = new Date(2023, 7, 31); // 31 de agosto de 2023
    const highlightedDates: Date[] = [];

    expect(isHighlighted(date, highlightedDates)).toBe(false);
  });
});

describe('getHighlightedMessage', () => {
  test('deve retornar a mensagem correta para uma data destacada', () => {
    const date = new Date(2023, 7, 31); // 31 de agosto de 2023
    const highlightedMessages = {
      '2023-08-31': 'Aniversário',
      '2023-09-01': 'Feriado',
    };

    expect(getHighlightedMessage(date, highlightedMessages)).toBe(
      'Aniversário'
    );
  });

  test('deve retornar uma string vazia se a data não tiver uma mensagem associada', () => {
    const date = new Date(2023, 7, 31); // 31 de agosto de 2023
    const highlightedMessages = {
      '2023-09-01': 'Feriado',
    };

    expect(getHighlightedMessage(date, highlightedMessages)).toBe('');
  });

  test('deve retornar uma string vazia se o objeto de mensagens destacadas estiver vazio', () => {
    const date = new Date(2023, 7, 31); // 31 de agosto de 2023
    const highlightedMessages: Record<string, string> = {};

    expect(getHighlightedMessage(date, highlightedMessages)).toBe('');
  });
});
