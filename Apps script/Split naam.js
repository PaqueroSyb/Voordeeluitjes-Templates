function voornaamCapital() {
  var sheet =  SpreadsheetApp.openById("1ebMz0yR3RDAnyFDGPw6dWehpL15u43yKZrEeWyRKhWU");
  var ss = sheet.getSheets()[0];
  var rowsData = ss.getRange("A:A").getValues();
  
  for(var i = 1; i < rowsData.length; i++) {
      var name = rowsData[i][0];
      var string = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      console.log(string);
      var row =  parseInt([i])+1;
      ss.getRange(row,2).setValue(string);
  }
}


function splitAchternaam() {
  var sheet =  SpreadsheetApp.openById("1ebMz0yR3RDAnyFDGPw6dWehpL15u43yKZrEeWyRKhWU");
  var ss = sheet.getSheets()[0];
  var rowsData = ss.getRange("C:C").getValues();
  
  for(var i = 1; i < rowsData.length; i++) {
      var name = rowsData[i][0];
      var arr = name.split(" ");

      var last = arr.pop();

      var tussenvoegsel = arr.join(' ');
      var string = last.charAt(0).toUpperCase() + last.slice(1).toLowerCase();


      var row =  parseInt([i])+1;
      ss.getRange(row,4).setValue(tussenvoegsel);
      ss.getRange(row,5).setValue(string);
  }
}