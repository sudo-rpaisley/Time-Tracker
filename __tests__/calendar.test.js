/**
 * Tests for calendar/date utilities
 */

const calendar = {
  getDaysInYear: (settings) =>
    settings.daysPerMonth.reduce((sum, days) => sum + days, 0),
  
  toTotalSeconds: (dateParts, settings) => {
    const daysInYear = settings.daysPerMonth.reduce((sum, days) => sum + days, 0);
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
  },

  fromTotalSeconds: (seconds, settings) => {
    const totalSecondsSafe = Math.max(0, Math.floor(seconds));
    const secondsPerHour = 60 * 60;
    const secondsPerDay = settings.hoursPerDay * secondsPerHour;
    const daysInYear = settings.daysPerMonth.reduce((sum, days) => sum + days, 0);
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
      if (dayIndex < daysInMonth) break;
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
  }
};

describe('Calendar Functions', () => {
  const defaultSettings = {
    monthsInYear: 12,
    daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    hoursPerDay: 24,
    dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  };

  describe('getDaysInYear', () => {
    test('should return 365 for standard calendar', () => {
      const days = calendar.getDaysInYear(defaultSettings);
      expect(days).toBe(365);
    });
  });

  describe('toTotalSeconds and fromTotalSeconds', () => {
    test('should convert year 1, month 1, day 1 to 0 seconds', () => {
      const seconds = calendar.toTotalSeconds(
        { year: 1, month: 1, day: 1, hour: 0, minute: 0, second: 0 },
        defaultSettings
      );
      expect(seconds).toBe(0);
    });

    test('should round-trip conversion', () => {
      const original = { year: 2, month: 6, day: 15, hour: 12, minute: 30, second: 45 };
      const seconds = calendar.toTotalSeconds(original, defaultSettings);
      const result = calendar.fromTotalSeconds(seconds, defaultSettings);
      
      expect(result.year).toBe(original.year);
      expect(result.month).toBe(original.month);
      expect(result.day).toBe(original.day);
      expect(result.hour).toBe(original.hour);
      expect(result.minute).toBe(original.minute);
      expect(result.second).toBe(original.second);
    });

    test('should advance one day correctly', () => {
      const day1 = calendar.toTotalSeconds(
        { year: 1, month: 1, day: 1, hour: 0, minute: 0, second: 0 },
        defaultSettings
      );
      const day2 = calendar.toTotalSeconds(
        { year: 1, month: 1, day: 2, hour: 0, minute: 0, second: 0 },
        defaultSettings
      );
      expect(day2 - day1).toBe(24 * 60 * 60); // 1 day
    });
  });
});

// Export for Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { describe, test, expect };
}
