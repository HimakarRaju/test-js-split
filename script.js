function logSubmissions() {
	//Grab emails from forms-receipts-noreply@google.com pertaining to new submissions
	//var threads = GmailApp.search("newer_than:1d AND in:inbox AND from:forms-receipts-noreply@google.com AND subject:AR/VR Responses 2.0",0,100);

	var threads = GmailApp.search(
		"in:inbox AND from:forms-receipts-noreply@google.com AND subject:AR/VR Responses 2.0",
		0,
		100
	);

	//Collect messages from across threads
	var arrToConvert = [];
	for (var i = threads.length - 1; i >= 0; i--) {
		arrToConvert.push(threads[i].getMessages());
	}
	var messages = [];
	for (var i = 0; i < arrToConvert.length; i++) {
		messages = messages.concat(arrToConvert[i]);
	}
	Logger.log(threads.length);
	Logger.log(messages.length);

	//var msgsLength=messages.length
	//Open the spreadsheet
	var spreadsheet = SpreadsheetApp.openByUrl(
		"https://docs.google.com/spreadsheets/d/1xi0toHlhCKyugFROxkhiIaNMkWFDFOazwUcCq3limFs/edit#gid=0"
	);

	//For each email in the threads, parse the important bits
	for (var m = 0; m < messages.length; m++) {
		var text = messages[m].getPlainBody();
		var date = messages[m].getDate();

		Logger.log(text);

		var formData = text.split("\n");

		//// Assuming there is a FormData object called 'myFormData'
		//var formDataArray = formDataToArray(myFormData);
		//console.log(formDataArray); // Outputs: [["key1", "value1"], ["key2", "value2"], ...]
		//prevLength = messages.length
		formData.unshift(date);

		//function formDataToArray(formData) {
		//var formDataArray = [];
		//for (var key of formData.keys()) {
		//formDataArray.push([key, formData.get(key)]);
		//}
		//return formDataArray;
		//}

		spreadsheet.appendRow(formData);
	}
}
