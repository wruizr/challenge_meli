export const handleCurrencyFormat = (num: number) => {
  return new Intl.NumberFormat("es-AR").format(num);
}

export const handleCondition = (condition: string) => {
  switch (condition) {
    case "new":
      return "Nuevo";
    case "used":
      return "Usado";
    case "refurbished":
      return "Reacondicionado";
    default:
      return "";
  }
}

export const handleTitleClearance = (text: string): boolean => {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g;
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|co|io|es|ar|uk|info|biz)\b)/gi;
  return phoneRegex.test(text) || urlRegex.test(text);
};

export const handleIsActiveButtons = ({ title, newTitle, hasError }: { title: string, newTitle: string, hasError: boolean }): boolean => {
  if (title !== newTitle && !hasError) return true
  return false
}