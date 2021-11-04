let submitButton = document.querySelector('.sqzly-form-submit');
let inputEmail = document.querySelector('.sqzly-emailfield');
let inputContainer = document.querySelector('.sqzly-fields');
let modal = document.querySelector('.sqzly-fields');
let emailValue;
let pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

inputEmail.addEventListener('input', function() {
  let showErrorMessage = document.querySelector('.error-message');
  emailValue = document.querySelector('.sqzly-emailfield').value;
  let emailValid = pattern.test(emailValue);
  if (emailValid === true) {
    showErrorMessage.classList.add('hide');
  } else {
    showErrorMessage.classList.remove('hide');
    showErrorMessage.innerText = 'e-mailadres is niet geldig';
  }
  if (emailValue === '') {
    showErrorMessage.innerText = "dit veld is verplicht";
  }
});

let urlPath = window.location.pathname;
if (urlPath === '/') {
  modal.classList.add('home');
}

submitButton.addEventListener('click', submitForm, false);

inputEmail.addEventListener('keydown', function(key) {
  if (key.keyCode == '13') {
    submitForm('Enter key');
    console.log(`${key.keyCode} ingedrukt`)
  }
});

function submitForm(submitElement) {
  let emailValid = pattern.test(emailValue);
  if (emailValid === false) {
    inputContainer.setAttribute('class', 'sqzly-fields input-invalid');
  } else {
    _sqzl.push({
      "anonymize": "no",
    });
    preferenceHotel = document.getElementById('preference-hotel').checked ? "Ja" : "Nee";
    preferenceVakantiepark = document.getElementById('preference-vakantiepark').checked ? "Ja" : "Nee";
    _sqzl.push({
      "event": "NewsletterFooterConfirm",
      "email": emailValue,
      "custom_email_preference_hotel": preferenceHotel,
      "custom_email_preference_vakantiepark": preferenceVakantiepark,
    });
    _sqzl.push({
      "anonymize": "yes",
    });
    if (submitElement == 'Enter key') {
      _document.querySelector('#sqzl_div-68-68 .szqly-modal-content').classList.add('sqzly-collapse');
      _document.querySelector('#sqzl_div-68-68 .szqly-thankyou').classList.add('sqzly-in');
    }
  }   
}