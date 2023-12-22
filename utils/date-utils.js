function convertStringToDate(inputString) {
  // Check if the input string matches the ISO format
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(inputString)) {
    return new Date(inputString);
  }

  // Check if the input string matches the "DD-MM-YYYY HH:mm" format
  const match1 = inputString.match(
    /^(\d{2})-(\d{2})-(\d{4}) (\d{1,2}):(\d{2})$/
  );
  if (match1) {
    const [, day, month, year, hours, minutes] = match1.map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

  // Check if the input string matches the "DD-MM-YYYY hh:mm AM/PM" format
  const match2 = inputString.match(
    /^(\d{2})-(\d{2})-(\d{4}) (\d{1,2}):(\d{2}) (AM|PM)$/
  );
  if (match2) {
    const [, day, month, year, hours, minutes, ampm] = match2;
    const adjustedHours = ampm === "PM" ? Number(hours) + 12 : Number(hours);
    return new Date(year, month - 1, day, adjustedHours, Number(minutes));
  }

  // Check if the input string matches the "DD-MM-YYYY hh:mmAM/PM" format
  const match3 = inputString.match(
    /^(\d{2})-(\d{2})-(\d{4}) (\d{1,2}):(\d{2})(AM|PM)$/
  );
  if (match3) {
    const [, day, month, year, hours, minutes, ampm] = match3;
    const adjustedHours = ampm === "PM" ? Number(hours) + 12 : Number(hours);
    return new Date(year, month - 1, day, adjustedHours, Number(minutes));
  }

  // If none of the formats match, return null or handle accordingly
  return null;
}
module.exports = convertStringToDate;
