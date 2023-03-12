// ====================
// Global Vars
// ====================
var testVar = "Hi, I'm a testVar"
var ssId = "1HXimCuJVYXizVfEe4ZQfAKWHxX-PFf0HFZhiQkdRw9g" // Data Spreadsheet
var apiKey = "4a02ae91ede241fd80324ec8b2ac57cb"
var ss = SpreadsheetApp.openById(ssId);
var REZDY_URL = "https://api.rezdy.com/v1/bookings"
var API_KEY = "?apiKey=" + apiKey

var PILOT_SHEET_NAME = "Pilots"
var PILOT_RANGE = "A:E"
var AIRCRAFT_SHEET_NAME = "Aircraft"
var AIRCRAFT_RANGE = "A:N"
var AIRCRAFT_DATA_RANGE = "B:F"
var THE_BOARD_SHEET_NAME = "TheBoardData"
var THE_BOARD_DATA_RANGE = "A:E" 

var TRIPCODES = "TripCodes"
var TRIPCODES_RANGE = "A:Z"

// *** lots of -> // needs to match (
  // search for it in Code.js *** 

// -------------------------------------------------------
// Global properties can be set in the server
// Run these functions in the browser editor and it'll set the variables
// -------------------------------------------------------
function setSettings(){
  
    // Set Global Variables
    setProperty("dateCell","A1")
    //setProperty("codeDelay","3000")
  //  setProperty("pilotRange","B2:F2")
  //  setProperty("productColumn","N:N")
  //  setProperty("paxColumn","L:L")
    setProperty("assignmentBoard","A3:I")
    
  //  setProperty("assignmentBoardKey","L3")
  //  setProperty("assignmentBoardRange","I:Z")
  //  setProperty("checkboxRange","I:I")
  //  setProperty("dataRange","Z:Z")
  //  setProperty("highlightColor","#59f442")
  }
function clearProperties(){
  var properties = PropertiesService.getDocumentProperties();
  properties.deleteAllProperties()
}
function getProperty(string){
  var thing = PropertiesService.getDocumentProperties().getProperty(string)
  if(thing){
      return thing
  } else {
    return null
  }
}
function setProperty(string,value){
  PropertiesService.getDocumentProperties().setProperty(string, value)
}