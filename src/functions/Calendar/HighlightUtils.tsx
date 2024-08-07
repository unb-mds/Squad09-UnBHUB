export const isHighlighted = (
  date: Date,
  highlightedDates: Date[]
): boolean => {
  return highlightedDates.some(
    (highlightedDate) =>
      date.getDate() === highlightedDate.getDate() &&
      date.getMonth() === highlightedDate.getMonth() &&
      date.getFullYear() === highlightedDate.getFullYear()
  );
};

export const getHighlightedMessage = (
  date: Date,
  highlightedMessages: Record<string, string>
): string => {
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`;
  return highlightedMessages[dateKey] || '';
};
