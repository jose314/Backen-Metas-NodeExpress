const moment = require('moment-timezone');

function formatDateTime(dateTime) {
  return moment(dateTime).tz('America/Guatemala').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
}

module.exports = { formatDateTime };