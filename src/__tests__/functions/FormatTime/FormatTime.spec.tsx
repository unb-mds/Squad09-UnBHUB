import formatTime from '../../../functions/FormatTime';
import { Timestamp } from 'firebase/firestore';

class MockTimestamp {
  seconds: number;
  nanoseconds: number;

  constructor(seconds: number, nanoseconds: number) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
  }
}

describe('formatTime', () => {
  test('deve formatar corretamente um Timestamp para uma string de horário', () => {
    // 12:30 UTC
    const mockTimestamp = new MockTimestamp(
      Date.UTC(2023, 7, 31, 12, 30, 0) / 1000,
      0
    );

    const formattedTime = formatTime(mockTimestamp as unknown as Timestamp);

    // Esperando o horário convertido para o fuso horário local
    expect(formattedTime).toBe('09:30'); // Adapte para o horário esperado no seu fuso
  });

  test('deve formatar corretamente um Timestamp diferente', () => {
    // 06:45 UTC
    const mockTimestamp = new MockTimestamp(
      Date.UTC(2023, 7, 31, 6, 45, 0) / 1000,
      0
    );

    const formattedTime = formatTime(mockTimestamp as unknown as Timestamp);

    // Esperando o horário convertido para o fuso horário local
    expect(formattedTime).toBe('03:45'); // Adapte para o horário esperado no seu fuso
  });
});
