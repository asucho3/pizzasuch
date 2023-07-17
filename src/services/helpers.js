export const formatDate = function (date) {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formattedDate.format(dateObj);
};
