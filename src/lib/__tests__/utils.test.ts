/**
 * Unit Tests for utils.ts
 * 
 * Testing Strategy:
 * - formatPhoneNumber: 5 independent paths (Cyclomatic Complexity = 5)
 * - getNext5Days: Normal case
 * - getAvailableTimeSlots: Normal case
 * - generateAvatar: Male and Female cases
 */

import {
  formatPhoneNumber,
  getNext5Days,
  getAvailableTimeSlots,
  generateAvatar,
} from '../utils';

describe('formatPhoneNumber', () => {
  // Path 1: Empty string input
  test('TC-01: returns empty string for empty input', () => {
    expect(formatPhoneNumber('')).toBe('');
  });

  // Path 2: 1-3 digits
  test('TC-02: formats 1-3 digit phone number', () => {
    expect(formatPhoneNumber('011')).toBe('(+2) 011');
  });

  test('TC-03: handles single digit', () => {
    expect(formatPhoneNumber('0')).toBe('(+2) 0');
  });

  // Path 3: 4-6 digits
  test('TC-04: formats 4-6 digit phone number', () => {
    expect(formatPhoneNumber('011245')).toBe('(+2) 011 245');
  });

  test('TC-05: formats exactly 4 digits', () => {
    expect(formatPhoneNumber('0112')).toBe('(+2) 011 2');
  });

  // Path 4: 7-9 digits
  test('TC-06: formats 7-9 digit phone number', () => {
    expect(formatPhoneNumber('011245552')).toBe('(+2) 011 245 552');
  });

  test('TC-07: formats exactly 7 digits', () => {
    expect(formatPhoneNumber('0112455')).toBe('(+2) 011 245 5');
  });

  // Path 5: 10-11 digits (full Egyptian phone)
  test('TC-08: formats full 11-digit Egyptian phone number', () => {
    expect(formatPhoneNumber('01124555246')).toBe('(+2) 011 245 552 46');
  });

  // Edge case: strips non-numeric characters
  test('TC-09: strips non-numeric characters', () => {
    expect(formatPhoneNumber('(+2) 011-245-5524')).toBe('(+2) 011 245 552 4');
  });

  // Edge case: handles spaces and special chars
  test('TC-10: handles input with spaces', () => {
    expect(formatPhoneNumber('011 245 552')).toBe('(+2) 011 245 552');
  });
});

describe('getNext5Days', () => {
  test('returns an array of 5 dates', () => {
    const dates = getNext5Days();
    expect(dates).toHaveLength(5);
  });

  test('returns dates in ISO format YYYY-MM-DD', () => {
    const dates = getNext5Days();
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    dates.forEach((date) => {
      expect(date).toMatch(isoDateRegex);
    });
  });

  test('first date is tomorrow', () => {
    const dates = getNext5Days();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const expectedDate = tomorrow.toISOString().split('T')[0];
    expect(dates[0]).toBe(expectedDate);
  });
});

describe('getAvailableTimeSlots', () => {
  test('returns 12 time slots', () => {
    const slots = getAvailableTimeSlots();
    expect(slots).toHaveLength(12);
  });

  test('first slot is 09:00', () => {
    const slots = getAvailableTimeSlots();
    expect(slots[0]).toBe('09:00');
  });

  test('last slot is 16:30', () => {
    const slots = getAvailableTimeSlots();
    expect(slots[slots.length - 1]).toBe('16:30');
  });

  test('all slots are in HH:MM format', () => {
    const slots = getAvailableTimeSlots();
    const timeRegex = /^\d{2}:\d{2}$/;
    slots.forEach((slot) => {
      expect(slot).toMatch(timeRegex);
    });
  });
});

describe('generateAvatar', () => {
  test('generates male avatar URL correctly', () => {
    const url = generateAvatar('John Doe', 'MALE');
    expect(url).toBe('https://avatar.iran.liara.run/public/boy?username=johndoe');
  });

  test('generates female avatar URL correctly', () => {
    const url = generateAvatar('Jane Doe', 'FEMALE');
    expect(url).toBe('https://avatar.iran.liara.run/public/girl?username=janedoe');
  });

  test('handles names with multiple spaces', () => {
    const url = generateAvatar('John  Middle  Doe', 'MALE');
    expect(url).toBe('https://avatar.iran.liara.run/public/boy?username=johnmiddledoe');
  });
});
