export default function formatDate(timestamp) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }