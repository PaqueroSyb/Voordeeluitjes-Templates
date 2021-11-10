var form = document.getElementById("form-preferences");
var currentFrequentie = document.getElementById("frequentie").value;
var currentFrequentieVP = document.getElementById("frequentie_vp").value;
var pushEvent = false;
var preferenceHotel;
var preferenceVakantiepark;

form.addEventListener('submit', function() {
  if (document.getElementById("uitschrijven").checked === true && currentFrequentie != 'Geen') {
      preferenceHotel = 'Nee';
      pushEvent = true;
  }
  if (document.getElementById("uitschrijvenvp").checked === true && currentFrequentieVP != 'Geen') {
      preferenceVakantiepark = 'Nee';
      pushEvent = true;
  }
  if (document.getElementById("dagelijks").checked === true || document.getElementById("wekelijks").checked === true || document.getElementById("maandelijks").checked === true) {
    if (currentFrequentie == 'Geen') {
      preferenceHotel = 'Ja';
      pushEvent = true;
    }
  }
  if (document.getElementById("dagelijksvp").checked === true || document.getElementById("wekelijksvp").checked === true || document.getElementById("maandelijksvp").checked === true) {
    if (currentFrequentieVP == 'Geen') {
      preferenceVakantiepark = 'Ja';
      pushEvent = true;
    }
  }
  if (pushEvent == true) {
    _sqzl.push({
      "event": "Newsletter Copernica Change",
      "custom_email_preference_hotel": preferenceHotel,
      "custom_email_preference_vakantiepark": preferenceVakantiepark,
    });
  }
});