import formatDate from '../../../functions/FormatDate';

import { Timestamp } from 'firebase/firestore';

// Mock do Timestamp
class MockTimestamp {
  seconds: number;
  nanoseconds: number;

  constructor(seconds: number, nanoseconds: number) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
  }
}

describe('formatDate', () => {
  test('deve formatar corretamente um Timestamp para uma string de data', () => {
    // Exemplo de data: 31 de agosto de 2023 (em segundos desde a Epoch)
    const mockTimestamp = new MockTimestamp(1693531200, 0); // 01/09/2023

    const formattedDate = formatDate(mockTimestamp as unknown as Timestamp);

    // Espera que a data seja formatada corretamente no formato 'dd/mm/yyyy'
    expect(formattedDate).toBe('31/08/2023');
  });

  test('deve formatar corretamente um Timestamp diferente', () => {
    // Exemplo de data: 24 de dezembro de 2022 (em segundos desde a Epoch)
    const mockTimestamp = new MockTimestamp(1671926400, 0); // 24/12/2022

    const formattedDate = formatDate(mockTimestamp as unknown as Timestamp);

    // Espera que a data seja formatada corretamente no formato 'dd/mm/yyyy'
    expect(formattedDate).toBe('24/12/2022');
  });
});
