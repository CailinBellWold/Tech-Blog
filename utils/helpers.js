module.exports = {
  format_date: (date) => {
    let Date = date.toLocaleString([], {dateStyle: 'short'});
    let Time = date.toLocaleString([], {timeStyle: 'short'});
    return `${Date} at ${Time}`;
    // return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} at ${new Date(date).getHours()}:${new Date(date).getMinutes()} ${new Date(date).getMinutes()}`;
  },
};

// toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

// {timeStyle: 'short'}
// return date.toLocaleString([], { hour12: true});