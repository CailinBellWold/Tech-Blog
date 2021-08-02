module.exports = {
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};

// FUTURE DEV: Display time in current time-zone and with locale-specific formatting.
// module.exports = {
//   format_date: (date) => {
//     let Date = date.toLocaleString([], {dateStyle: 'short'});
//     let Time = date.toLocaleString([], {timeStyle: 'short'});
//     return `${Date} at ${Time}`;
//   },
// };