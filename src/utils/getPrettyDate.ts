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
