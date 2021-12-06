function generateData() {
  var sheet =  SpreadsheetApp.openById("1zBPfRtYhwyHZ4nwxbZVY9cV4jSZ_4TNpwYy0DhPiP50");
  var ss = sheet.getSheets()[0];
  var rowsData = ss.getRange("A:A").getValues();
  var filtered = rowsData.filter(String);
  
  for(var i = 1; i < filtered.length; i++) {
      var row =  parseInt([i])+1;
      var data = filtered[i][0].split(',');
      
      if (data[0] == 'M') {
        var aanhef = 'Dhr.'
      } else {
        var aanhef = 'Mevr.'
      };

      var firstName = data[1].charAt(0).toUpperCase() + data[1].slice(1).toLowerCase();

      if (data[2].includes('"')) {
        var lName = data[2].replace(/"/g,'');
      } else {
        var lName = data[2];
      }
      if (lName.includes(' ')) {
        var arr = lName.split(' ');
        if (arr.length > 2) {
          var tussenvoegsel = arr[0].toLowerCase() + " " + arr[1].toLowerCase();
          if (typeof arr[3] !== "undefined") {
            var lastName = arr[2] + " " + arr[3];
          } else {
            var lastName = arr[2];
          }
        } else {
          var tussenvoegsel = arr[0].toLowerCase();
          var lastName = arr[1].charAt(0).toUpperCase() + arr[1].slice(1).toLowerCase();
        }
      } else {
        var lastName = lName.charAt(0).toUpperCase() + lName.slice(1).toLowerCase();
      }
      
      var email = data[3].toLowerCase();
      var emailHex;

      function createSHA256(email) {
          var signature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email);

          emailHex = signature
          .map(function(byte) {
              // Convert from 2's compliment
               var v = (byte < 0) ? 256 + byte : byte;

              // Convert byte to hexadecimal
              return ("0" + v.toString(16)).slice(-2);
          })
          .join("");
      }
      createSHA256(email);

      ss.getRange(row,1).setValue(email);
      ss.getRange(row,2).setValue(emailHex);
      ss.getRange(row,3).setValue(aanhef);
      ss.getRange(row,4).setValue(firstName);
      ss.getRange(row,5).setValue(tussenvoegsel);
      ss.getRange(row,6).setValue(lastName);
      ss.getRange(row,7).setValue('Dagelijks');
      ss.getRange(row,8).setValue('Sendt');

      var tussenvoegsel = '';
  } 
}

function clearCells() {
  var sheet =  SpreadsheetApp.getActiveSheet();
  var rowsData = sheet.getRange("A:A").getValues();
  var filtered = rowsData.filter(String);
  
  for(var i = 1; i < filtered.length; i++) {
      let row = parseInt([i])+1;

      sheet.getRange(row,1).setValue("");
      sheet.getRange(row,2).setValue("");
      sheet.getRange(row,3).setValue("");
      sheet.getRange(row,4).setValue("");
      sheet.getRange(row,5).setValue("");
      sheet.getRange(row,6).setValue("");
      sheet.getRange(row,7).setValue("");
      sheet.getRange(row,8).setValue("");
  }
}