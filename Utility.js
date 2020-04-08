// -------------------------
// 24hr to 12hr
// -------------------------
function time12 (time) {
  time = time.split(':')
  var hour = parseInt(time[0],10)
  var PM = hour>12 ? true : false
  if (PM) {
    hour = hour - 12
  }
  return hour + ':' + time[1]
}