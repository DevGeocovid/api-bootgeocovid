const { format, parseISO } = require("date-fns");

module.exports = {
  formatDate(value) {
    if (value) {
      const formated = format(parseISO(value), "ddMMyyyy");
      return formated;
    }
  },
};
