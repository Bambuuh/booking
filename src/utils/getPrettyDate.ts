export const getPrettyDate = (date?: Date) => {
  const toPrettify = date ?? new Date();

  const year = toPrettify.getFullYear();
  const month =
    toPrettify.getMonth() + 1 > 9
      ? toPrettify.getMonth() + 1
      : `0${toPrettify.getMonth() + 1}`;

  const day =
    toPrettify.getDate() > 9
      ? toPrettify.getDate()
      : `0${toPrettify.getDate()}`;

  return `${year}-${month}-${day}`;
};

export const getPrettyTime = (date: Date) => {
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes =
    date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;

  return `${hours}:${minutes}`;
};

export const getPrettyDateWithTime = (date: Date) => {
  const prettyDate = getPrettyDate(date);
  const prettyTime = getPrettyTime(date);

  return `${prettyDate} ${prettyTime}`;
};
