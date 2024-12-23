export default function useDateProcessing() {
  const parseDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) throw new Error("Invalid date");
      return date;
    } catch (error) {
      console.error("Ошибка обработки даты:", error);
      return null;
    }
  };

  const calculateDateDifferenceInDays = (date1, date2) => {
    if (!date1 || !date2) return null;

    const differenceInMilliseconds = Math.abs(date1 - date2);
    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24)); // разница в днях
  };

  return {
    parseDate,
    calculateDateDifferenceInDays,
  };
}
