const moment = require('moment');

module.exports = {
  dateToFormat: function (date, format = 'MMMM Do, YYYY') {
    return moment(date).format(format);
  },
  dateToISO: function (date) {
    return moment(date).format();
  },
  sortByTitle: function (values) {
    return values
      .slice()
      .sort((a, b) => a.data.title.localeCompare(b.data.title));
  },
};
