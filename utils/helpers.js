// module.exports = {
//   format_date: (date) => {
//     let Date = date.toLocaleString([], {dateStyle: 'short'});
//     let Time = date.toLocaleString([], {timeStyle: 'short'});
//     return `${Date} at ${Time}`;
//   },
// };

module.exports = {
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};