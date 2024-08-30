import { Timestamp } from 'firebase/firestore'; // Importe o Timestamp do Firebase

export default function formatDate(timestamp: Timestamp): string {
  // Converta Timestamp para Date
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
