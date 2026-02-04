/**
 * Calendar, date formatting, and timeline utilities
 */

/**
 * Get days in year based on calendar settings
 */
const getDaysInYear = (settings) =>
  settings.daysPerMonth.reduce((sum, days) => sum + days, 0);

/**
 * Convert date parts to total seconds
 */
const toTotalSeconds = (dateParts, settings) => {
  const daysInYear = getDaysInYear(settings);
  const year = Math.max(1, Math.floor(dateParts.year || 1));
  const month = Math.max(1, Math.floor(dateParts.month || 1));
  const safeMonth = Math.min(month, settings.monthsInYear);
  const daysInMonth = settings.daysPerMonth[safeMonth - 1] || 30;
  const day = Math.min(
    Math.max(1, Math.floor(dateParts.day || 1)),
    daysInMonth
  );
  const hour = Math.min(
    Math.max(0, Math.floor(dateParts.hour || 0)),
    settings.hoursPerDay - 1
  );
  const minute = Math.min(Math.max(0, Math.floor(dateParts.minute || 0)), 59);
  const second = Math.min(Math.max(0, Math.floor(dateParts.second || 0)), 59);

  const daysBeforeYear = (year - 1) * daysInYear;
  const daysBeforeMonth = settings.daysPerMonth
    .slice(0, safeMonth - 1)
    .reduce((sum, value) => sum + value, 0);
  const totalDays = daysBeforeYear + daysBeforeMonth + (day - 1);
  return (
    ((totalDays * settings.hoursPerDay + hour) * 60 + minute) * 60 + second
  );
};

/**
 * Convert total seconds to date parts
 */
const fromTotalSeconds = (seconds, settings) => {
  const totalSecondsSafe = Math.max(0, Math.floor(seconds));
  const secondsPerHour = 60 * 60;
  const secondsPerDay = settings.hoursPerDay * secondsPerHour;
  const daysInYear = getDaysInYear(settings);
  const secondsPerYear = daysInYear * secondsPerDay;

  let remainingSeconds = totalSecondsSafe;
  const year = Math.floor(remainingSeconds / secondsPerYear) + 1;
  remainingSeconds %= secondsPerYear;

  const dayOfYear = Math.floor(remainingSeconds / secondsPerDay);
  remainingSeconds %= secondsPerDay;

  let monthIndex = 0;
  let dayIndex = dayOfYear;
  while (monthIndex < settings.monthsInYear) {
    const daysInMonth = settings.daysPerMonth[monthIndex] || 30;
    if (dayIndex < daysInMonth) {break;}
    dayIndex -= daysInMonth;
    monthIndex += 1;
  }

  const hour = Math.floor(remainingSeconds / secondsPerHour);
  remainingSeconds %= secondsPerHour;
  const minute = Math.floor(remainingSeconds / 60);
  const second = remainingSeconds % 60;

  const dayOfWeekIndex =
    settings.dayNames.length > 0 ? dayOfYear % settings.dayNames.length : null;

  return {
    year,
    month: monthIndex + 1,
    day: dayIndex + 1,
    hour,
    minute,
    second,
    dayOfWeekIndex
  };
};

/**
 * Format date parts to readable string
 */
const formatDate = (dateParts, settings) => {
  const name =
    settings.monthNames[dateParts.month - 1] || `Month ${dateParts.month}`;
  const dayName =
    dateParts.dayOfWeekIndex !== null && settings.dayNames.length > 0
      ? settings.dayNames[dateParts.dayOfWeekIndex]
      : '';
  const dayPrefix = dayName ? `${dayName}, ` : '';
  return `${dayPrefix}${name} ${dateParts.day}, Year ${dateParts.year}`;
};

/**
 * Format time parts to HH:MM:SS
 */
const formatTime = (dateParts) =>
  `${String(dateParts.hour).padStart(2, '0')}:${String(dateParts.minute).padStart(2, '0')}:${String(dateParts.second).padStart(2, '0')}`;

/**
 * Normalize calendar settings
 */
const normalizeCalendarSettings = (settings) => {
  const monthsInYear = Math.max(1, Math.floor(settings.monthsInYear || 12));
  const hoursPerDay = Math.max(1, Math.floor(settings.hoursPerDay || 24));
  const parsedDays = Array.isArray(settings.daysPerMonth) ? settings.daysPerMonth : [];
  const daysPerMonth = [];
  for (let i = 0; i < monthsInYear; i += 1) {
    const value = Number(parsedDays[i]);
    daysPerMonth.push(Number.isNaN(value) || value < 1 ? 30 : value);
  }
  const parsedMonthNames = Array.isArray(settings.monthNames) ? settings.monthNames : [];
  const monthNames = [];
  for (let i = 0; i < monthsInYear; i += 1) {
    const name = String(parsedMonthNames[i] || '').trim();
    monthNames.push(name || `Month ${i + 1}`);
  }
  const parsedDayNames = Array.isArray(settings.dayNames) ? settings.dayNames : [];
  const dayNames = parsedDayNames
    .map((value) => String(value).trim())
    .filter((value) => value.length > 0);
  return {
    monthsInYear,
    daysPerMonth,
    hoursPerDay,
    monthNames,
    dayNames
  };
};

/**
 * Normalize time config
 */
const normalizeTimeConfig = (config) => ({
  turnSeconds: Math.max(1, Math.floor(config.turnSeconds || 6)),
  shortRestHours: Math.max(1, Math.floor(config.shortRestHours || 1)),
  longRestHours: Math.max(1, Math.floor(config.longRestHours || 8)),
  clockSpeed: Math.max(1, Math.floor(config.clockSpeed || 1))
});

/**
 * Get event date key for sorting
 */
const getEventDateKey = (event) =>
  `${event.year.toString().padStart(4, '0')}-${event.month
    .toString()
    .padStart(2, '0')}-${event.day.toString().padStart(2, '0')}`;

// Export calendar functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getDaysInYear,
    toTotalSeconds,
    fromTotalSeconds,
    formatDate,
    formatTime,
    normalizeCalendarSettings,
    normalizeTimeConfig,
    getEventDateKey
  };
}
