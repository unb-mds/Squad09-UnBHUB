export default function formatTime(timestamp) {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
