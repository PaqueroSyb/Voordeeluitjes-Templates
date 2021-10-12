var pauzeDivs = document.querySelectorAll('.div-pauze');
var closePauzeDivs = document.querySelectorAll('.close');
var openPauzeDivs = document.querySelectorAll('.open');
var pauzeDivUitschrijven = document.querySelectorAll('.div-pauze-uitschrijven');
var hidePauzeDivUitschrijvenWarning = document.querySelectorAll('.div-pauze .form-group.row .col-sm-12.background-pauze .list-unstyled li input');
var pauzeDivUitschrijfWarning = document.querySelectorAll('.div-pauze-uitschrijven-warning');

Array.prototype.forEach.call(openPauzeDivs, function (openPauzeDiv, index) {
  openPauzeDiv.addEventListener('click', function () {
    pauzeDivs[index].setAttribute("class", "div-pauze active");
  })
});

Array.prototype.forEach.call(closePauzeDivs, function (closePauzeDiv, index) {
  closePauzeDiv.addEventListener('click', function () {
    var setIndex = index;
    getIndex;
    if (setIndex == 0 || setIndex == 1 || setIndex == 2) {
      var getIndex = 0;
    } else {
      var getIndex = 1;
    }
    pauzeDivs[getIndex].setAttribute("class", "div-pauze");
    pauzeDivUitschrijfWarning[getIndex].setAttribute("class", "div-pauze-uitschrijven-warning");
    var pauzeInputs = pauzeDivs[getIndex].querySelectorAll('input');
    Array.prototype.forEach.call(pauzeInputs, function (pauzeInput) {
      pauzeInput.checked = false;
    })
  })
});

Array.prototype.forEach.call(hidePauzeDivUitschrijvenWarning, function (hidePauzeDivUitschrijfWarning, index) {
  hidePauzeDivUitschrijfWarning.addEventListener('click', function () {
    var setIndex = index;
    getIndex;
    if (setIndex == 0 || setIndex == 1 || setIndex == 2) {
      var getIndex = 0;
    } else {
      var getIndex = 1;
    }
    pauzeDivUitschrijfWarning[getIndex].setAttribute("class", "div-pauze-uitschrijven-warning");
  })
});

Array.prototype.forEach.call(pauzeDivUitschrijven, function (pauzeDivUitschrijf, index) {
  pauzeDivUitschrijf.addEventListener('click', function () {
    pauzeDivUitschrijfWarning[index].setAttribute("class", "div-pauze-uitschrijven-warning active");
  })
});

