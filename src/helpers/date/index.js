export const parseLocaleDate = dateString => (dateString
  ? new Date(Date.parse(dateString.replace('maj', 'may').replace('okt', 'oct')))
  : undefined);

export const dateIsOlderThanDays = (date, days) => {
  const checkDate = Date.parse(date);
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);

  return checkDate >= sinceDate;
};
