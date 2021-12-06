function generateHash() {
  var sheet =  SpreadsheetApp.getActiveSheet();
  var rowsData = sheet.getRange("A:A").getValues();
  var filtered = rowsData.filter(String);
  
  for(var i = 1; i < filtered.length; i++) {
      var email = filtered[i][0].toLowerCase();
      let row = parseInt([i])+1;
      function createSHA256(email) {
          var signature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email);

          var hexString = signature
          .map(function(byte) {
              // Convert from 2's compliment
               var v = (byte < 0) ? 256 + byte : byte;

              // Convert byte to hexadecimal
              return ("0" + v.toString(16)).slice(-2);
          })
          .join("");
          sheet.getRange(row,2).setValue(hexString);
          sheet.getRange(row,1).setValue(email);
      }
      createSHA256(email);
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
  }
}
