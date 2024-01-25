import dayjs, {ConfigType} from 'dayjs';
import {NOT_AVAILABLE} from '../constants';
import 'dayjs/locale/en';
import weekday from 'dayjs/plugin/weekday';
import advancedFormat from 'dayjs/plugin/advancedFormat';

const convertToReadableDate = (
  date: ConfigType,
  template: string = 'DD MMMM YYYY',
) => dayjs(date).format(template);

const convertToReadableTime = (date: ConfigType) =>
  dayjs(date).format('h:mm A');

export function getTodaysDate() {
  return new Date();
}

function calculateAge(birthdate?: string | null): number | string | null {
  if (birthdate === undefined || birthdate === null) {
    return null;
  }
  if (birthdate.includes(' ')) {
    const dateItSelf = birthdate.split(' ')[0];
    return calculateAgeFromJustDate(dateItSelf);
  } else {
    const birthdateDate = new Date(birthdate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthdateDate.getFullYear();
    const finalAge =
      currentDate <
      new Date(
        currentDate.getFullYear(),
        birthdateDate.getMonth(),
        birthdateDate.getDate(),
      )
        ? age - 1
        : age;

    return isNaN(finalAge) ? NOT_AVAILABLE : finalAge;
  }
}

function calculateAgeFromJustDate(birthdate: string): number | string {
  const dateParts = birthdate.split('/');

  if (dateParts.length !== 3) {
    return 'Invalid date format';
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  const birthdateDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  if (isNaN(birthdateDate.getTime())) {
    return 'Invalid date format';
  }

  const age = currentDate.getFullYear() - birthdateDate.getFullYear();

  if (
    currentDate.getMonth() < birthdateDate.getMonth() ||
    (currentDate.getMonth() === birthdateDate.getMonth() &&
      currentDate.getDate() < birthdateDate.getDate())
  ) {
    return age - 1;
  }

  return age;
}

function checkDay(date: ConfigType) {
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  if (dayjs(date).isSame(today, 'day')) {
    return 'Today';
  } else if (dayjs(date).isSame(yesterday, 'day')) {
    return 'Yesterday';
  } else {
    const daysAgo = today.diff(dayjs(date), 'day');
    return `${daysAgo} days ago`;
  }
}

const getFormattedDate = (): string => {
  dayjs.extend(weekday);
  dayjs.extend(advancedFormat);

  return dayjs().locale('en').format('dddd, DD MMMM');
};

export {
  convertToReadableDate,
  convertToReadableTime,
  calculateAge,
  checkDay,
  getFormattedDate,
};
