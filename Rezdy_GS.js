function clearRezdy(){ 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Rezdy")
  .getRange(getProperty("assignmentBoard"))
  .setHorizontalAlignment("left")
  .setBackground("WHITE")
  .setValue("")
}
// =======================================================
//         Load TripCodes
// =======================================================
function loadTripCodes(){
  var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TripCodes").getRange("A:H").getValues()
  return data
}
// =======================================================
//         Load Rezdy
// =======================================================
function loadRezdy(myDate) {

  if (!!myDate){
    Logger.log("Loading from Rezdy... Date passed in: " + myDate)
    var md=myDate.split("/")
    myDate = md[1] + '/' + md[0] + '/' + md[2]
  }
  var orderLinkPrefix = "https://app.rezdy.com/orders/edit/"
  
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName("Rezdy")   
  var range = sheet.getRange(getProperty("assignmentBoard"))
  var values = range.getValues()
  
  range.setValue("")
  
  // ********************* Change to just today ***********************
  // minTourStartTime=2019-06-08T12:00:00Z
  // maxTourStartTime=2019-06-09T12:00:00Z
  //var date1 = sheet.getRange(getProperty("dateCell")).getValue()
  
  var date1 = myDate
  var d = new Date(date1)
  
  //date1 = new Date(d.getTime()-1000*60*60*24)
  date1 = new Date(d.getTime()-1000*60*60*48)  
  var date2 = new Date(d.getTime())
  date1 = Utilities.formatDate(date1, Session.getScriptTimeZone(), "yyyy-MM-dd")
  date2 = Utilities.formatDate(date2, Session.getScriptTimeZone(), "yyyy-MM-dd")

  Logger.log (date1)
  Logger.log (date2)
  
  // ****************************************
  // Abstract all this away somewhere generic
  // ****************************************
  var rez = "https://api.rezdy.com/v1/bookings"
  var apiKey = "?apiKey=4a02ae91ede241fd80324ec8b2ac57cb"
  var call = "&minTourStartTime="+date1+"T12:00:00Z&maxTourStartTime="+date2+"T09:00:00Z"
    
  Logger.log(rez+apiKey+call) // ========= Useful for debugging ============

  // Call the Numbers API for random math fact
  var response = UrlFetchApp.fetch(rez+apiKey+call);
  //Logger.log(response.getContentText()) // ========= Useful for debugging ============

  // Make request to API and get response before this point.
  var json = response.getContentText();
  //DriveApp.createFile('test.json', json);  // ================= Write JSON to file =============================

  return json
 
}