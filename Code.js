function doGet(request) {
  return HtmlService.createTemplateFromFile("index").evaluate()
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}
function saveHtmlAsPDF(data) {
  data = include("CSS") + data
  var blob = Utilities.newBlob(data, "text/html", "text.html")
  var pdf = blob.getAs("application/pdf")
  DriveApp.createFile(pdf).setName("htmlToPDF.pdf")
  //  MailApp.sendEmail("email@labnol.org", "PDF File", "",
  //     {htmlBody: html, attachments: pdf});
  return "Success"
}
function openInDevMode(e) {
  var data = { text: true }
  var ss, html, html2

  ss = SpreadsheetApp.getActiveSpreadsheet()
  html = HtmlService.createTemplateFromFile("index").evaluate().getContent()

  html2 = HtmlService.createTemplate(html + "<script>\n" + "setDevMode( " + JSON.stringify(data) + ");\n</script>")
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setHeight(1000)
    .setWidth(1500)
  ss.show(html2)
}

function jQuery() {
  var ss, html
  ss = SpreadsheetApp.getActiveSpreadsheet()
  html = HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setHeight(2000)
    .setWidth(2500)
  ss.show(html)
}
function checkSave(_date) {
  return // **************************************
  var DataID = "1izT_h7z9z2vHYs7TcRQq4EFWYXYwlm-C9Tcn_Ce-V-c" // Data Spreadsheet ID
  var sheet = SpreadsheetApp.openById(DataID).getSheetByName("TheBoardMeta")
  var saveDateCell = sheet.getRange("A1") // Cell with last save date
  var saveDate = saveDateCell.getValue()
  var ret = false
}
function getLastSave() {
  return // *****************************************
  var ret = ""
  var DataID = "1izT_h7z9z2vHYs7TcRQq4EFWYXYwlm-C9Tcn_Ce-V-c" // Data Spreadsheet ID
  var metaSheet = SpreadsheetApp.openById(DataID).getSheetByName("TheBoardMeta") // second sheet for meta data like the last save time
  var saveDateCell = metaSheet.getRange("A1") // Cell with last save date
  var saveDate = saveDateCell.getValue()
  return saveDate
}
function getState(find) {
  var DataID = "1izT_h7z9z2vHYs7TcRQq4EFWYXYwlm-C9Tcn_Ce-V-c" // Data Spreadsheet ID
  var sheet = SpreadsheetApp.openById(DataID).getSheetByName("state") // worksheet name
  var range = sheet.getRange("A:B")
  var values = range.getValues()
  var outputArr = values
    .map(function (rowData, rowIndex) {
      var colIndex = rowData.indexOf(find)
      if (colIndex > -1) {
        return sheet.getRange(rowIndex + 1, colIndex + 1).getA1Notation() // A1Notation means cell reference; like A1, BC23 etc.
      }
    })
    .filter(function (cellData) {
      // eliminating all null elements from the array returned using `map`
      return cellData != null
    })
  return outputArr
}
function saveState(state) {
  const DataID = "1izT_h7z9z2vHYs7TcRQq4EFWYXYwlm-C9Tcn_Ce-V-c" // Data Spreadsheet ID
  const sheet = SpreadsheetApp.openById(DataID).getSheetByName("state") // worksheet name
  let range = sheet.getRange("A:K")
  let values = range.getValues()
  const numRows = range.getNumRows()
  const numCols = range.getNumColumns()

      const d = new Date()
      let dd = String(d.getDate()).padStart(2, "0")
      let mm = String(d.getMonth() + 1).padStart(2, "0") //January is 0!
      let yyyy = d.getFullYear()
      let date = `${dd}/${mm}/${yyyy}`

  //If a state is passed in, use it's date...
  if (!!state){
    date = state[0]
  }


    for (var i = 0; i < values.length; i++) {
    if (i==0 && !!state) {
      values[0][0] = date
      values[i][1] = JSON.stringify(state)
    }
  }
  range.setValues(values)
  return date
}
function saveBoard(_array) {
  var date = new Date()
  if (!!_array){
    date = _array[0]
  }

  var d = new Date()
  var time = d.getTime()

  var DataID = "1izT_h7z9z2vHYs7TcRQq4EFWYXYwlm-C9Tcn_Ce-V-c" // Data Spreadsheet ID
  var sheet = SpreadsheetApp.openById(DataID).getSheetByName("state")
  var range = sheet.getRange("A:K") // Number of columns needs to match getRange below... last number is the number of rows. // needs to match (below) *********************!!!!!!!!!!
  var values = range.getValues()
  var numRows = range.getNumRows()
  var numCols = range.getNumColumns()


  for (var i = 0; i < values.length; i++) {
    if (i==0) {
      values[0][0] = date
      values[i][1] = JSON.stringify(_array)
    }
  }

  var lastRow = sheet.getLastRow()
  var lastColumn = sheet.getLastColumn()
  //var cell = sheet.getRange(lastRow + 1, 1, 1, 5)



  range.setValues(values)




  return time
}
function getNZdate(d) {
  d = new Date(d)
  var dd = String(d.getDate())
  if (dd.length < 2) {
    dd = "0" + dd
  }
  var mm = String(d.getMonth() + 1)
  if (mm.length < 2) {
    mm = "0" + mm
  }
  var yyyy = d.getFullYear()

  d = dd + "/" + mm + "/" + yyyy
  return d
}

function saveLoadsheet(data) {
  // date,time,pilot,plane,fuel,route,pax,paxWeights,pilotWeight,TOW,CG,numPax

  var DataID = "1izT_h7z9z2vHYs7TcRQq4EFWYXYwlm-C9Tcn_Ce-V-c" // Data Spreadsheet ID
  var sheet = SpreadsheetApp.openById(DataID).getSheetByName("Flight Data")

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
  for (var a in sanity) {
    // Date
    var d = getNZdate(sanity[a][0])
    if (date.toString() == d) {
      Logger.log("Match: " + d)

      // Same Plane
      // different load (EX: last minute pax, crew hops in, etc)
      if (sanity[a][1] == time && sanity[a][3] == plane) {
        // Same time and plane, delete the row (and replace with new row)
        sheet.deleteRow(parseInt(a) + 1)
      } else {
        // Same Pilot, different plane (EX: Pilot Swaps Plane)
        if (sanity[a][1] == time && sanity[a][2] == pilot) {
          // Same time and pilot, delete the row (and replace with new row)
          sheet.deleteRow(parseInt(a) + 1)
        }
      }
    }
  }
  var _row = [
    data.date,
    data.time,
    data.pilot,
    data.reg,
    data.fuel,
    data.routes,
    data.paxNames,
    data.paxWeights,
    data.crewWeight,
    data.TOW,
    data.CG,
    data.numPax,
    data.copilot,
  ]
  sheet.appendRow(_row)
  sheet.getRange(sheet.getLastRow(), 2).setNumberFormat("@") // make the time column a number so google doesn't try to interpret the time
  return date + " Saved"
}

function loadBoard(date) {
  // Testing:
  //date = "28/12/2019"

  var DataID = "1izT_h7z9z2vHYs7TcRQq4EFWYXYwlm-C9Tcn_Ce-V-c" // Data Spreadsheet ID
  var range = SpreadsheetApp.openById(DataID).getSheetByName("TheBoardData").getRange("A:E") // needs to match saveBoard (above) *********************!!!!!!!!!!
  var data = range.getValues()

  var numRows = range.getNumRows()
  var numCols = range.getNumColumns()

  var ret = null
  for (var i = 0; i < numRows; i++) {
    if (data[i][0] == date && data[i][1]) {
      ret = [data[i][1], data[i][2], data[i][3], data[i][4]] // needs to match saveBoard (above) *********************!!!!!!!!!!
    }
  }
  return ret
}
function loadPilots() {
  var DataID = "1OOaO6yrHKXUsN0JHdPo9mDpuuBMVBnvZUxe3OTQPo-s" // Company Data Spreadsheet ID
  var range = SpreadsheetApp.openById(DataID).getSheetByName("Pilots").getRange("A:E")
  var data = range.getValues()
  return data
}
function loadPlanes() {
  var DataID = "1OOaO6yrHKXUsN0JHdPo9mDpuuBMVBnvZUxe3OTQPo-s" // Company Data Spreadsheet ID
  var range = SpreadsheetApp.openById(DataID).getSheetByName("Airplanes").getRange("A:K")
  var data = range.getValues()
  return data
}
function loadPlaneData() {
  var DataID = "1OOaO6yrHKXUsN0JHdPo9mDpuuBMVBnvZUxe3OTQPo-s" // Company Data Spreadsheet ID
  var data = SpreadsheetApp.openById(DataID).getSheetByName("HoursTillCheck").getRange("B:F").getValues()
  return data
}
function loadRoster(date) {
  //https://docs.google.com/spreadsheets/d/1zkA22oiIPbnggme0cosvPnnTkRPCSkkCcc-2mFSclLg/edit#gid=211032400
  const DataID = "1zkA22oiIPbnggme0cosvPnnTkRPCSkkCcc-2mFSclLg" // Company Data Spreadsheet ID
  const workbook = SpreadsheetApp.openById(DataID)
  const sheets = workbook.getSheets()
  const tabs = sheets.map((x) => {
    return x.getName()
  })
  date = new Date(date)
  let match = {}
  const week = tabs.map((s) => {
    const sheet = workbook.getSheetByName(s)
    const rangeValues = sheet.getRange("A2:H2").getValues()
    rangeValues.map((r, ri) => {
      r.map((c, ci) => {
        const cd = new Date(c)
        if (cd.toString() == date.toString()) {
          match.ci = ci
          match.sheet = s
          match.match = true
        }
      })
    })
  })

  if (match.match) {
    const _sheet = workbook.getSheetByName(match.sheet)
    const rng = "A4:H17"
    const rangeValues = _sheet.getRange(rng).getValues()
    const rangeColors = _sheet.getRange(rng).getBackgrounds()
    match.values = rangeValues
    match.colors = rangeColors
    return match
  }
}
