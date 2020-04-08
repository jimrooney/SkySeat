
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
















// -------------------------------------------------------
// Handle global variables (properties) ------------------
// -------------------------------------------------------
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