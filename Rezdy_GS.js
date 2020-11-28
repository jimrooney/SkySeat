function clearRezdy() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Rezdy")
    .getRange(getProperty("assignmentBoard"))
    .setHorizontalAlignment("left")
    .setBackground("WHITE")
    .setValue("")
}
// =======================================================
//         Add Months to date (utility)
// =======================================================
function add_months(dt, n) {
  dt.setHours(09)
  return new Date(dt.setMonth(dt.getMonth() + n))
}
// =======================================================
//         Load TripCodes
// =======================================================
function loadTripCodes() {
  var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TripCodes").getRange("A:Z").getValues()
  return data
}
// =======================================================
//         Load Rezdy
// =======================================================
//
// Accepts one or two date objects in String format... {date}.toString()
// Returns an object of data values (including the requested dates/etc)
//
function loadRezdy(startDate,endDate) {
  Logger.log("Rezdy_GS.loadRezdy()")
  Logger.log("startDate " + startDate)
  Logger.log("endDate " + endDate)

  // Process date arguments ... default to just today if no endDate
  var date1 = new Date(startDate)
  var date2 = new Date(startDate)
  date2.setDate(date2.getDate() + 1) // next Day
  !!endDate ? date2 = new Date(endDate) : null // if an end date is passed in, use it instead
  date1 = Utilities.formatDate(date1, Session.getScriptTimeZone(), "yyyy-MM-dd") // Google Utilities Object
  date2 = Utilities.formatDate(date2, Session.getScriptTimeZone(), "yyyy-MM-dd")

  var orderLinkPrefix = "https://app.rezdy.com/orders/edit/"

  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName("Rezdy")
  var range = sheet.getRange(getProperty("assignmentBoard"))
  var values = range.getValues()

  range.setValue("")

  // ****************************************
  // Abstract all this away somewhere generic
  // ****************************************
  var rez = "https://api.rezdy.com/v1/bookings"
  var apiKey = "?apiKey=4a02ae91ede241fd80324ec8b2ac57cb"
  var call = "&minTourStartTime=" + date1 + "T02:00:00Z&maxTourStartTime=" + date2 + "T08:00:00Z" 
  // T14:00:00Z Use 2am to avoid Daylight Savings Time issues
  // BoardV1 version https://api.rezdy.com/v1/bookings?apiKey=4a02ae91ede241fd80324ec8b2ac57cb&minTourStartTime=2020-09-06T12:00:00Z&maxTourStartTime=2020-09-08T09:00:00Z

  // Call the Numbers API for random math fact
  var url = rez + apiKey + call
  Logger.log("API Call:")
  Logger.log(rez + apiKey + call) // ========= Useful for debugging ============

  var response = UrlFetchApp.fetch(url)
  //Logger.log(response.getContentText()) // ========= Useful for debugging ============

  // Make request to API and get response before this point.
  var json = response.getContentText()
  //DriveApp.createFile('test.json', json);  // ================= Write JSON to file =============================

  var ret = {}
    ret.startTime = date1
    ret.endTime = date2
    ret.json = json
    ret.url = url
  return ret
}
