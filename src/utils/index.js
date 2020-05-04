export const timeConverter = (unixTime) => {
  let a = new Date(unixTime * 1000);
  let hour = a.getHours();
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let min = `0` + a.getMinutes();
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let time = date + ` ` + month + ` ` + year + ` ` + hour + `:` + min.substr(-2);
  return time;
};
