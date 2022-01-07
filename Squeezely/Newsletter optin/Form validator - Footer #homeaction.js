let submitButton = document.querySelector('.sqzly-form-submit');
let inputEmail = document.querySelector('.sqzly-emailfield');
let inputContainer = document.querySelector('.sqzly-fields');
let emailValue;
let pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

let currentPage = window.location.href;
let preferenceCheckboxes = document.querySelectorAll('input[type=checkbox]');
if (currentPage.indexOf('vakantiepark') !== -1) {
  submitButton.classList.add('color-vp')
  preferenceCheckboxes.forEach(function (checkbox) {
    checkbox.classList.add('color-vp');
  })
}

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

submitButton.addEventListener('click', submitForm, false);
inputEmail.addEventListener('keydown', function(key) {
  if (key.keyCode == '13') {
    submitForm('Enter key');
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
    // preferenceHotel = document.getElementById('preference-hotel').checked ? "Ja" : "Nee";
    // preferenceVakantiepark = document.getElementById('preference-vakantiepark').checked ? "Ja" : "Nee"; 
    _sqzl.push({
      "event": "NewsletterSubscribeConfirm",
      "email": emailValue,
      "custom_email_preference_hotel": "Ja",
      // "custom_email_preference_vakantiepark": preferenceVakantiepark,
      "custom_email_batch": "Inschrijvingen",
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