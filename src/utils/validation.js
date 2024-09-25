export const checkConsecutiveShifts = (person) => {
  for (let i = 0; i < person.shifts.length - 1; i++) {
    if (person.shifts[i] + 1 === person.shifts[i + 1]) {
      return true;
    }
  }

  return false;
};
