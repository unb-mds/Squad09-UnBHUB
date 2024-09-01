import formatTime from '../../../functions/FormatTime';

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

describe('formatTime', () => {
  test('deve formatar corretamente um Timestamp para uma string de hora', () => {
    // Exemplo de tempo: 06:05 (em segundos desde a Epoch)
    const mockTimestamp = new MockTimestamp(1693559100, 0);

    const formattedTime = formatTime(mockTimestamp as unknown as Timestamp);

    // Espera que o tempo seja formatado corretamente no formato 'hh:mm'
    expect(formattedTime).toBe('06:05');
  });

  test('deve formatar corretamente um Timestamp diferente', () => {
    // Exemplo de tempo: 21:30 (em segundos desde a Epoch)
    const mockTimestamp = new MockTimestamp(1693528200, 0);

    const formattedTime = formatTime(mockTimestamp as unknown as Timestamp);

    // Espera que o tempo seja formatado corretamente no formato 'hh:mm'
    expect(formattedTime).toBe('21:30');
  });

  test('deve formatar corretamente um Timestamp com horas e minutos diferentes', () => {
    // Exemplo de tempo: 16:35 (em segundos desde a Epoch)
    const mockTimestamp = new MockTimestamp(1693596900, 0);

    const formattedTime = formatTime(mockTimestamp as unknown as Timestamp);

    // Espera que o tempo seja formatado corretamente no formato 'hh:mm'
    expect(formattedTime).toBe('16:35');
  });
});
