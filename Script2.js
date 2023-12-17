function logSubmissions() 
{

  var threads = GmailApp.search("in:inbox AND from:forms-receipts-noreply@ail.com AND subject:AR/VR Rens 2.0",0,100);

  

  //Collect messages from across threads
  var arrToConvert=[];
  for(var i = threads.length - 1; i >=0; i--) {
    arrToConvert.push(threads[i].getMessages());   
  }
  var messages = [];
  for(var i = 0; i < arrToConvert.length; i++) {
    messages = messages.concat(arrToConvert[i]);
  }
  Logger.log(threads.length);
  Logger.log(messages.length);

  //var msgsLength=messages.length
  //Open the spreadsheet
  var spreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1xi0toHlhCKykWFDFOazwUcCq3limFs/edit#gid=0");

  //For each email in the threads, parse the important bits
  for(var m=0;m<messages.length;m++)
  {
    var text = messages[m].getPlainBody();
    var date = messages[m].getDate();
    
    Logger.log(text)


    var formData = text.split("\n")
    //prevLength = messages.length
    formData.unshift(date);
    
    var formDataIndices = [30, 35, 38, 43, 47, 52, 56, 61, 64, 69, 74, 77, 96, 98];
	//   var formValues = formDataIndices.map(function (index) {
	// 	return formData[index];
	// });
    function dara(){
      for(formData;formDataIndices.length<=0;formDataIndices--){
      return formData[formDataIndices];
    }
    }
    spreadsheet.appendRow(dara());
  }
}
