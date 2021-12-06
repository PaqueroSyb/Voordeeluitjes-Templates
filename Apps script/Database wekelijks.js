function getDatabaseStatistics() {
  // Get the target spreadsheet and last row
  const sheet = SpreadsheetApp.openById("1MkfYVe0ZBE1FDn7JHORwGZwxizLtEss0tByfo4eFJ94");
  const ss = sheet.getSheets()[0];
  const lastRow = ss.getLastRow() + 1;

  // Set first column with weeknumber and color
  const today = new Date();
  const oneJan = new Date(today.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((((today.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1) / 7);
  const week = "Week " + parseInt(weekNumber - 1);
  ss.getRange(lastRow, 1).setValue(week);
  ss.getRange(lastRow, 1, 1, 26).setBackgroundRGB(236, 0, 140);
  ss.getRange(lastRow, 1).setFontWeight("bold");
  ss.getRange(lastRow, 1).setFontColor("white");

  // Declare the columns for sum and difference totals
  let totalSumColumns = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  // Declare the needed batches as array
  const batches = ['Inschrijvingen', 'Klanten', 'Discount tool', 'Clansman Uitmetkorting', 'Extern', 'Sovendus', 'Sendt'];

  function getBatchTotal(batch, selectionID, lastRowNext, lastColumn, frequentie) {
    let succesfull = false;
      while (!succesfull) {
        try {
          var requestFrequentie = "";
          if (frequentie) {
            var requestFrequentie = "&fields[]=frequentie%3D%3D" + frequentie;
          }
          let response = UrlFetchApp.fetch("https://api.copernica.com/v2/view/" + selectionID + "/profiles?fields[]=batch%3D%3D" + batch + requestFrequentie +
            "&access_token=5399e0f006f149ddf17659bf2fbabbbfdddb7d1a1cc22adb2f252eecdff38cbf7561611c46521a237c59ec82ae520e1c45050cc409e71ea6d5bb9133fbaacd12", {
            muteHttpExceptions: true
          });

          // Parse data to JSON and get total
          let fact = response.getContentText();
          let data = JSON.parse(fact);
          let total = data.total;

          //Add data to sheet
          ss.getRange(lastRowNext, lastColumn).setValue(total);

          succesfull = true;
        } catch (err) {
          Logger.log("Error ophalen (dagelijksNb) voor " + batch + " " + err);
        }
      }
  };

  function dagelijksNb() {
    let lastRowNext = lastRow + 1;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Dagelijkse groep");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 1;
      getBatchTotal(batch, "2778", lastRowNext, countBatch);
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");

    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function wekelijksNb() {
    let lastRowNext = lastRow + 2;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Wekelijkse groep");
    
    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 2;
      getBatchTotal(batch, "2712", lastRowNext, countBatch);
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");
    
    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function maandelijksNb() {
    let lastRowNext = lastRow + 3;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Maandelijkse groep");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 3;
      getBatchTotal(batch, "2713", lastRowNext, countBatch);
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");
    
    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function totaalNb() {
    let lastRowNext = lastRow + 4;
    ss.getRange(lastRowNext, 1).setValue("Totaal actief");
    ss.getRange(lastRowNext, 1).setFontWeight("bold");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-3}+${sum}${lastRowNext-2}+${sum}${lastRowNext-1})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontWeight("bold");
    });
  };

  function verschilNb() {
    let lastRowNext = lastRow + 5;
    ss.getRange(lastRowNext, 1).setValue("Actief verschil v/w");
    ss.getRange(lastRowNext, 1).setFontStyle("italic");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-1}-${sum}${lastRowNext-30})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontStyle("italic");
    });
  };

  function uitschrijvers() {
    let lastRowNext = lastRow + 7;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Uitschrijvers");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 7;
      getBatchTotal(batch, "2565", lastRowNext, countBatch);
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");
  }

  function verschilUitschrijvers() {
    let lastRowNext = lastRow + 8;
    ss.getRange(lastRowNext, 1).setValue("Actief verschil v/w");
    ss.getRange(lastRowNext, 1).setFontStyle("italic");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-1}-${sum}${lastRowNext-30})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontStyle("italic");
    });
  };

  function dagelijksInactief() {
    let lastRowNext = lastRow + 10;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Inactief dagelijkse groep");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 10;
      getBatchTotal(batch, "3091", lastRowNext, countBatch);
    });
    
    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");
    
    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function wekelijksInactief() {
    let lastRowNext = lastRow + 11;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Inactief wekelijkse groep");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 11;
      getBatchTotal(batch, "3112", lastRowNext, countBatch);
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");
    
    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function maandelijksInactief() {
    let lastRowNext = lastRow + 12;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Inactief maandelijkse groep");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 12;
      getBatchTotal(batch, "3114", lastRowNext, countBatch);
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");
    
    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function totaalInactief() {
    let lastRowNext = lastRow + 13;
    ss.getRange(lastRowNext, 1).setValue("Totaal inactief");
    ss.getRange(lastRowNext, 1).setFontWeight("bold");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-3}+${sum}${lastRowNext-2}+${sum}${lastRowNext-1})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontWeight("bold");
    });
  };

  function verschilInactief() {
    let lastRowNext = lastRow + 14;
    ss.getRange(lastRowNext, 1).setValue("Inactief verschil v/w");
    ss.getRange(lastRowNext, 1).setFontStyle("italic");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-1}-${sum}${lastRowNext-30})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontStyle("italic");
    });
  };

  function dagelijksPauze() {
    let lastRowNext = lastRow + 16;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Pauze dagelijkse groep");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 16;
      getBatchTotal(batch, "2926", lastRowNext, countBatch, "Dagelijks");
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");

    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function wekelijksPauze() {
    let lastRowNext = lastRow + 17;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Pauze wekelijkse groep");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 17;
      getBatchTotal(batch, "2926", lastRowNext, countBatch, "Wekelijks");
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");

    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function maandelijksPauze() {
    let lastRowNext = lastRow + 18;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Pauze maandelijkse groep");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 18;
      getBatchTotal(batch, "2926", lastRowNext, countBatch, "Maandelijks");
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");
        
    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function totaalPauze() {
    let lastRowNext = lastRow + 19;
    ss.getRange(lastRowNext, 1).setValue("Totaal pauze");
    ss.getRange(lastRowNext, 1).setFontWeight("bold");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-3}+${sum}${lastRowNext-2}+${sum}${lastRowNext-1})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontWeight("bold");
    });
  };

  function verschilPauze() {
    let lastRowNext = lastRow + 20;
    ss.getRange(lastRowNext, 1).setValue("Pauze verschil v/w");
    ss.getRange(lastRowNext, 1).setFontStyle("italic");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-1}-${sum}${lastRowNext-30})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontStyle("italic");
    });
  };

  function softBounces() {
    let lastRowNext = lastRow + 22;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Softbounces");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 22;
      getBatchTotal(batch, "2557", lastRowNext, countBatch);
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");
        
    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function hardBounces() {
    let lastRowNext = lastRow + 23;
    let countBatch = 1;
    ss.getRange(lastRowNext, 1).setValue("Hardbounces");

    // Call the Copernica API with the batches array value
    batches.forEach(function(batch) {
      countBatch++;
      let lastRowNext = lastRow + 23;
      getBatchTotal(batch, "2558", lastRowNext, countBatch);
    });

    let totalSum = `=SUM(B${lastRowNext}+C${lastRowNext}+D${lastRowNext}+E${lastRowNext}+F${lastRowNext}+G${lastRowNext}+H${lastRowNext})`;
    ss.getRange(lastRowNext, 9).setValue(totalSum);
    ss.getRange(lastRowNext, 9).setFontWeight("bold");
        
    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function totaalBounces() {
    let lastRowNext = lastRow + 24;
    ss.getRange(lastRowNext, 1).setValue("Totaal bounces");
    ss.getRange(lastRowNext, 1).setFontWeight("bold");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-3}+${sum}${lastRowNext-2}+${sum}${lastRowNext-1})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontWeight("bold");
    });
  };

  function verschilBounces() {
    let lastRowNext = lastRow + 25;
    ss.getRange(lastRowNext, 1).setValue("Bounce verschil v/w");
    ss.getRange(lastRowNext, 1).setFontStyle("italic");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-1}-${sum}${lastRowNext-30})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontStyle("italic");
    });
  };

  function totaal() {
    let lastRowNext = lastRow + 27;
    ss.getRange(lastRowNext, 1).setValue("Totaal");
    ss.getRange(lastRowNext, 1).setFontWeight("bold");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-3}+${sum}${lastRowNext-9}+${sum}${lastRowNext-15}+${sum}${lastRowNext-21}+${sum}${lastRowNext-24})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontWeight("bold");
    });
        
    let diffSum = `=SUM(I${lastRowNext}-I${lastRowNext-29})`;
    ss.getRange(lastRowNext, 10).setValue(diffSum);
  };

  function verschilTotaal() {
    let lastRowNext = lastRow + 28;
    ss.getRange(lastRowNext, 1).setValue("Totaal verschil v/w");
    ss.getRange(lastRowNext, 1).setFontStyle("italic");

    let lastColumn = 1;
    totalSumColumns.forEach(function(sum) {
      lastColumn++;
      let totalSum = `=SUM(${sum}${lastRowNext-1}-${sum}${lastRowNext-30})`;
      ss.getRange(lastRowNext, lastColumn).setValue(totalSum);
      ss.getRange(lastRowNext, lastColumn).setFontStyle("italic");
    });
  };

  // Run newsletter active profiles functions
  dagelijksNb();
  wekelijksNb();
  maandelijksNb();
  totaalNb();
  verschilNb();

  uitschrijvers();
  verschilUitschrijvers();

  dagelijksInactief();
  wekelijksInactief();
  maandelijksInactief();
  totaalInactief();
  verschilInactief();

  dagelijksPauze();
  wekelijksPauze();
  maandelijksPauze();
  totaalPauze();
  verschilPauze();

  softBounces();
  hardBounces();
  totaalBounces();
  verschilBounces();

  totaal();
  verschilTotaal();

  // Set alternating row colors
  let maxRows = 27;
  for (let i = 1; i <= maxRows; i += 2) {
    ss.getRange(lastRow + i, 1, 1, 26).setBackgroundRGB(244, 244, 244);
  }
}