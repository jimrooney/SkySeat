function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
function saveHtmlAsPDF(data){
  data = include("CSS") + data
  var blob = Utilities.newBlob(data, "text/html", "text.html");
  var pdf = blob.getAs("application/pdf");
  DriveApp.createFile(pdf).setName("htmlToPDF.pdf");
  //  MailApp.sendEmail("email@labnol.org", "PDF File", "",
  //     {htmlBody: html, attachments: pdf});
  return "Success";
}
function openInDevMode(e) {
  var data  = {text:true}
  var ss,
      html,
      html2
      
  ss = SpreadsheetApp.getActiveSpreadsheet();
  html = HtmlService.createTemplateFromFile('index')
  .evaluate()
  .getContent()

  html2 = HtmlService
  .createTemplate(html +    
                  "<script>\n" + 
                  "setDevMode( " +
                  JSON.stringify(data) +
    ");\n</script>")
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setHeight(1000)
    .setWidth(1500)
    ss.show(html2)        
}

function jQuery() {
  var ss,
      html;
  ss = SpreadsheetApp.getActiveSpreadsheet();
  html = HtmlService.createTemplateFromFile('index').evaluate()
  .setSandboxMode(HtmlService.SandboxMode.IFRAME)
  .setHeight(2000)
  .setWidth(2500)
  ss.show(html);
}
function checkSave(_date){
  var DataID = "11a6Q0-qa9MlKAQ3N9sfyOExlHTatlKSvd1IJRe8pBJQ" // Data Spreadsheet ID
  var sheet = SpreadsheetApp.openById(DataID).getSheetByName('TheBoardMeta')
  var saveDateCell = sheet.getRange("A1") // Cell with last save date
  var saveDate = saveDateCell.getValue()
  var ret = false
  
}
function getLastSave(){
  var ret = ""
  var DataID = "11a6Q0-qa9MlKAQ3N9sfyOExlHTatlKSvd1IJRe8pBJQ" // Data Spreadsheet ID
  var metaSheet = SpreadsheetApp.openById(DataID).getSheetByName('TheBoardMeta') // second sheet for meta data like the last save time
  var saveDateCell = metaSheet.getRange("A1") // Cell with last save date
  var saveDate = saveDateCell.getValue()
  return saveDate
}
  
function saveBoard(_array){
  var date = _array[0]
  
  var d = new Date()
  var time = d.getTime()
    
  var DataID = "11a6Q0-qa9MlKAQ3N9sfyOExlHTatlKSvd1IJRe8pBJQ" // Data Spreadsheet ID
  var sheet = SpreadsheetApp.openById(DataID).getSheetByName('TheBoardData')
  var metaSheet = SpreadsheetApp.openById(DataID).getSheetByName('TheBoardMeta') // second sheet for meta data like the last save time
  var range = sheet.getRange("A:E") // Number of columns needs to match getRange below... last number is the number of rows. // needs to match (below) *********************!!!!!!!!!!
  var data = range.getValues() 
  var numRows = range.getNumRows()
  var numCols = range.getNumColumns()

  var values = [
        _array
     ]

  for (var i = 0; i<data.length; i++){
    if (data[i][0] == date){
      sheet.getRange(i+1,1,1,numCols).clearContent()
      delete data[i]
    }
  }
      
   var lastRow = sheet.getLastRow();
   var lastColumn = sheet.getLastColumn();
   var cell = sheet.getRange(lastRow+1,1,1,5)
   
   cell.setValues(values)
   metaSheet.getRange("A1").setValue(time)
   return time
}
function getNZdate(d){

            d = new Date(d)
            var dd = String(d.getDate())
            if (dd.length<2){
              dd = "0" + dd
            }
            var mm = String(d.getMonth() + 1)
            if (mm.length<2){
              mm = "0" + mm
            }
            var yyyy = d.getFullYear()

            d = dd + '/' + mm + '/' + yyyy;
            return d
        }
        
        
function saveLoadsheet(data){
  // date,time,pilot,plane,fuel,route,pax,paxWeights,pilotWeight,TOW,CG,numPax
  
  var DataID = "11a6Q0-qa9MlKAQ3N9sfyOExlHTatlKSvd1IJRe8pBJQ" // Data Spreadsheet ID
  var sheet = SpreadsheetApp.openById(DataID).getSheetByName('Flight Data')
  
  // ================
  // Remove old rows
  // ================
  var date = data.date
  var time = data.time
  var pilot = data.pilot
  var plane = data.reg
  
  Logger.log("Date:" + date.toString())
  //
  // "Sanity" ->  Date / Time / Pilot / Plane (A:D)
  //
  var sanity = sheet.getRange("A:E").getValues() // also needs to match saveBoard() above *********************!!!!!!!!!!!!!!
  for (var a in sanity){
    // Date
    var d = getNZdate(sanity[a][0])
    if (date.toString() == d){

          Logger.log("Match: " + d )
    
      // Same Plane
      // different load (EX: last minute pax, crew hops in, etc)
      if ((sanity[a][1] == time)&&(sanity[a][3] == plane)){
        // Same time and plane, delete the row (and replace with new row)
        sheet.deleteRow(parseInt(a)+1)
      } else {
        // Same Pilot, different plane (EX: Pilot Swaps Plane)
        if ((sanity[a][1] == time)&&(sanity[a][2] == pilot)){
          // Same time and pilot, delete the row (and replace with new row)
          sheet.deleteRow(parseInt(a)+1)
        }
      }
    }
  }
   var _row = [data.date,data.time,data.pilot,data.reg,data.fuel,data.routes,data.paxNames,data.paxWeights,data.crewWeight,data.TOW,data.CG,data.numPax,data.copilot]
   sheet.appendRow(_row)
   sheet.getRange(sheet.getLastRow(), 2).setNumberFormat("@") // make the time column a number so google doesn't try to interpret the time
   return date + " Saved"
}

function loadBoard(date){
// Testing:
//date = "28/12/2019"

  var DataID = "11a6Q0-qa9MlKAQ3N9sfyOExlHTatlKSvd1IJRe8pBJQ" // Data Spreadsheet ID
  var range = SpreadsheetApp.openById(DataID).getSheetByName('TheBoardData').getRange("A:E") // needs to match saveBoard (above) *********************!!!!!!!!!!
  var data = range.getValues() 

  var numRows = range.getNumRows();
  var numCols = range.getNumColumns();
  
  var ret = null
  for (var i = 0; i < numRows; i++) {    
    if (data[i][0] == date && data[i][1]){
      ret = [ data[i][1] , data[i][2] , data[i][3], data[i][4] ] // needs to match saveBoard (above) *********************!!!!!!!!!!
    }
  }
    return ret
}
function loadPilots(){
  var DataID = "1OOaO6yrHKXUsN0JHdPo9mDpuuBMVBnvZUxe3OTQPo-s" // Company Data Spreadsheet ID
  var range = SpreadsheetApp.openById(DataID).getSheetByName('Pilots').getRange("A2:E")
  var data = range.getValues()
  return data
}
function loadPlanes(){
  var DataID = "1OOaO6yrHKXUsN0JHdPo9mDpuuBMVBnvZUxe3OTQPo-s" // Company Data Spreadsheet ID
  var range = SpreadsheetApp.openById(DataID).getSheetByName('Airplanes').getRange("A:J")
  var data = range.getValues()
  return data
}
function loadPlaneData(){
  var DataID = "1OOaO6yrHKXUsN0JHdPo9mDpuuBMVBnvZUxe3OTQPo-s" // Company Data Spreadsheet ID
  var data = SpreadsheetApp.openById(DataID).getSheetByName('HoursTillCheck').getRange("B:F").getValues()
  return data
}