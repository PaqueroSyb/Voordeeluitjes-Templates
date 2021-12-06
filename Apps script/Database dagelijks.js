function getDatabaseStatistics() {
  // Get the target spreadsheet and last row
  var sheet =  SpreadsheetApp.openById("10W0LBWl_oBTdomQ7ufQr0rRTZpIhfbAgRVmVvZXqd2A");
  var ss = sheet.getSheets()[0];
  var lastRow = ss.getLastRow()+1;

  // Get the date and day
  var newDate = new Date();
  var date = newDate.getDate() + "-" + (newDate.getMonth() +1) + "-" + newDate.getFullYear();
  var days = ['Zo','Ma','Di','Wo','Do','Vr','Za'];
  var day = days[ newDate.getDay() ];

  // Set the date and day
  ss.getRange(lastRow,1).setValue(date);
  ss.getRange(lastRow,2).setValue(day);

  // Declare the needed batches as array
  var batches = ['Inschrijvingen','Klanten','Discount tool', 'Clansman Uitmetkorting', 'Extern'];

  function aanmeldingen() {
      // Call the Copernica API with the batches array value
      batches.forEach(function(batch, index) {
        var succesfull = false;
        while(!succesfull) {
            try {
                var response = UrlFetchApp.fetch("https://api.copernica.com/v2/view/3015/profiles?&fields[]=batch%3D%3D" + batch + "&access_token=5399e0f006f149ddf17659bf2fbabbbfdddb7d1a1cc22adb2f252eecdff38cbf7561611c46521a237c59ec82ae520e1c45050cc409e71ea6d5bb9133fbaacd12", {
muteHttpExceptions: true });

                // Parse data to JSON and get total
                var fact = response.getContentText();
                var data = JSON.parse(fact);
                let total = data.total;

                // Get column to add data
                var lastColumn;
               if (index === 0) {var lastColumn = 3;} else if (index === 1) {var lastColumn = 6;} else if (index === 2) {var lastColumn = 14;} else if (index === 3) {var lastColumn = 17;} else {var lastColumn = 20;};

                // Add data
                ss.getRange(lastRow, lastColumn).setValue(total);

                succesfull = true;
            } catch(err) {
                Logger.log("Error ophalen functie1 voor " + batch);
            }
        }
      });
  }

  function uitschrijvingen() {
      // Call the Copernica API with the batches array value
      batches.forEach(function(batch, index) {
        var succesfull = false;
        while(!succesfull) {
            try {
                var response = UrlFetchApp.fetch("https://api.copernica.com/v2/view/3016/profiles?&fields[]=batch%3D%3D" + batch + "&access_token=5399e0f006f149ddf17659bf2fbabbbfdddb7d1a1cc22adb2f252eecdff38cbf7561611c46521a237c59ec82ae520e1c45050cc409e71ea6d5bb9133fbaacd12", {
muteHttpExceptions: true });

              // Parse data to JSON and get total
              var fact = response.getContentText();
              var data = JSON.parse(fact);
             let total = data.total;

             // Get column to add data
              var lastColumn;
              if (index === 0) {var lastColumn = 4;} else if (index === 1) {var lastColumn = 12;} else if (index === 2) {var lastColumn = 15;} else if (index === 3) {var lastColumn = 18;} else {var lastColumn = 21;};

              // Add data
              ss.getRange(lastRow, lastColumn).setValue(total);

              succesfull = true;
            } catch(err) {
                Logger.log("Error ophalen functie2 voor " + batch);
            }
        }
      });
  }

  function inactief() {
      // Call the Copernica API with the batches array value
      batches.forEach(function(batch, index) {
        var succesfull = false;
        while(!succesfull) {
            try {
                var response = UrlFetchApp.fetch("https://api.copernica.com/v2/view/3055/profiles?&fields[]=batch%3D%3D" + batch + "&access_token=5399e0f006f149ddf17659bf2fbabbbfdddb7d1a1cc22adb2f252eecdff38cbf7561611c46521a237c59ec82ae520e1c45050cc409e71ea6d5bb9133fbaacd12", {
muteHttpExceptions: true });

                // Parse data to JSON and get total
                var fact = response.getContentText();
                var data = JSON.parse(fact);
                let total = data.total;

                // Get column to add data
                var lastColumn;
                if (index === 0) {var lastColumn = 5;} else if (index === 1) {var lastColumn = 13;} else if (index === 2) {var lastColumn = 16;} else if (index === 3) {var lastColumn = 19;} else {var lastColumn = 22;};

                // Add data
                ss.getRange(lastRow, lastColumn).setValue(total);

                succesfull = true;
            } catch(err) {
                Logger.log("Error ophalen functie3 voor " + batch);
            }
        }
      });
  }

  function noOptin() {
      var frequentie = "No-Optin";
      var response = UrlFetchApp.fetch("https://api.copernica.com/v2/view/3015/profiles?&fields[]=frequentie%3D%3D" + frequentie + "&access_token=5399e0f006f149ddf17659bf2fbabbbfdddb7d1a1cc22adb2f252eecdff38cbf7561611c46521a237c59ec82ae520e1c45050cc409e71ea6d5bb9133fbaacd12", {
muteHttpExceptions: true });

      // Parse data to JSON and get total
      var fact = response.getContentText();
      var data = JSON.parse(fact);
      let total = data.total;

      // Add data
      ss.getRange(lastRow, 8).setValue(total);
  }

  function bookingTotal() {
      var response = UrlFetchApp.fetch("https://api.copernica.com/v2/miniview/129/subprofiles?access_token=5399e0f006f149ddf17659bf2fbabbbfdddb7d1a1cc22adb2f252eecdff38cbf7561611c46521a237c59ec82ae520e1c45050cc409e71ea6d5bb9133fbaacd12", {
muteHttpExceptions: true });

      // Parse data to JSON and get total
      var fact = response.getContentText();
      var data = JSON.parse(fact);
      let total = data.total;

      // Add data
      ss.getRange(lastRow, 28).setValue(total);
  }

  aanmeldingen();
  uitschrijvingen();
  inactief();
  noOptin();
  bookingTotal();

  // Add total sums
  var inschrijvingenSum =   `=SUM(C${lastRow}+F${lastRow}+N${lastRow}+Q${lastRow}+T${lastRow})`;
  var uitschrijvingenSum =  `=SUM(D${lastRow}+L${lastRow}+Q${lastRow}+R${lastRow}+U${lastRow})`;
  var inactiefSum =         `=SUM(E${lastRow}+M${lastRow}+P${lastRow}+S${lastRow}+V${lastRow})`;
  var inactiefRelativeSum = `=SUM(Y${lastRow}-Y${lastRow-1})`;

  var klantenNieuwPer =     `=SUM(F${lastRow}/AB${lastRow})`;
  var nieuweOptins =        `=SUM(F${lastRow}-H${lastRow})`;
  var nieuweOptinsPer =     `=SUM(I${lastRow}/F${lastRow})`;
  var nieuwTotaalPer =      `=SUM(I${lastRow}/AB${lastRow})`;

  ss.getRange(lastRow, 23).setValue(inschrijvingenSum);
  ss.getRange(lastRow, 24).setValue(uitschrijvingenSum);
  ss.getRange(lastRow, 25).setValue(inactiefSum);
  ss.getRange(lastRow, 26).setValue(inactiefRelativeSum);

  ss.getRange(lastRow, 7).setValue(klantenNieuwPer);
  ss.getRange(lastRow, 9).setValue(nieuweOptins);
  ss.getRange(lastRow, 10).setValue(nieuweOptinsPer);
  ss.getRange(lastRow, 11).setValue(nieuwTotaalPer);

  // Add total database sum
  var databaseSum = `=SUM(W${lastRow}-X${lastRow}-Z${lastRow})`;
  ss.getRange(lastRow, 27).setValue(databaseSum)
}
