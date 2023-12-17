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

	var spreadsheetURL =
		"https://docs.google.com/spreadsheets/d/1xi0toxkhiIaNMkWFDFOazwUcCq3limFs/edit#gid=0";
	var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetURL);

	// Variables from console logs
	var arrIndices = [30, 35, 38, 43, 47, 52, 56, 61, 64, 69, 74, 77, 96, 98];
	var arrValues = arrIndices.map(function (index) {
		return arr[index];
	});

	// Create or get the sheet
	var sheetName = "RetrievedInfo";
	var sheet = spreadsheet.getSheetByName(sheetName);
	if (!sheet) {
		sheet = spreadsheet.insertSheet(sheetName);
		sheet.appendRow(["Index", "Value"]); // Add headers if creating a new sheet
	}

	var existingData = sheet
		.getRange(2, 1, sheet.getLastRow() - 1, 2)
		.getValues();
	var newData = arrIndices.map(function (index) {
		return [index, arr[index]];
	});

	var newDataToAppend = newData.filter(function (data) {
		return !existingData.some(function (row) {
			return row[0] === data[0] && row[1] === data[1];
		});
	});

	if (newDataToAppend.length > 0) {
		newDataToAppend.forEach(function (data) {
			sheet.appendRow(data);
		});
	}
}
