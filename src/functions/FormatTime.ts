import { Timestamp } from 'firebase/firestore'; // Importe o Timestamp do Firebase

export default function formatTime(timestamp: Timestamp): string {
  // Converta Timestamp para Date
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
