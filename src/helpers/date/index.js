export const parseLocaleDate = (dateString) => {
  if (!dateString) {
    return undefined;
  }

  const newDateString = getEnglishDateString(dateString);
  return new Date(Date.parse(newDateString));
};

export const dateIsOlderThanDays = (date, days) => {
  const checkDate = Date.parse(date);
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);

  return checkDate >= sinceDate;
};

const getEnglishDateString = dateString => dateString
  .replace('.', '')
  .replace('marts', 'mar')
  .replace('maj', 'may')
  .replace('juni', 'jun')
  .replace('juli', 'jul')
  .replace('okt', 'oct');
