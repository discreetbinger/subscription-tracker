// helper functions that auto-format the date and check if a date is valid.
export const formatDate = (text) => {
  return (
    text.length === 3 && !text.includes("/")
      ? `${text.substring(0, 2)}/${text.substring(2)}`
      : text
  );
}

export const checkDate = (text) => {

  if (text.length == 5 && text.includes('/')) {

    const day = parseInt(text.substring(0, 2));
    const month = parseInt(text.substring(3));
    // months with 31 and 30 days seperated.
    const thirtyone = [1, 3, 5, 7, 8, 10, 12];
    const thirty = [4, 6, 9, 11];

    if (month >= 1 && month <= 12) {

      if (thirtyone.includes(month)) {
        if (day >= 0 && day <= 31) {
          return true;
        }

      } else if (thirty.includes(month)) {
        if (day >= 0 && day <= 30) {
          return true;
        }

      } else { // check for feb.
        if (day >= 0 && day <= 28) {
          return true;
        }
      }
    }
  }
  
  return false;
}