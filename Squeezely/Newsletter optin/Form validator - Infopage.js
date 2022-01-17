let submitButton = document.querySelector('.sqzly-form-submit');
let inputEmail = document.querySelector('.sqzly-emailfield');
let inputContainer = document.querySelector('.sqzly-fields');
let emailValue;
let pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

let currentPage = window.location.href;
let newsletterCheckbox = document.querySelector('input[type=checkbox]');
if (currentPage.indexOf('vakantieparken') !== -1) {
  newsletterCheckbox.classList.add('color-vp');
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
    showErrorMessage.innerText = 'dit veld is verplicht';
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
    _sqzl.push({
      "event": "NewsletterSubscribeConfirm",
      "email": emailValue,
      "custom_email_preference_hotel": "Ja",
      "custom_email_batch": "Extern",
      "custom_email_newsletterSource": "Plustotaal"
    });
    _sqzl.push({
      "anonymize": "yes",
    });
    if (submitElement == 'Enter key') {
      _document.querySelector('.sqzly-modal-content').setAttribute('class', 'sqzly-modal-content sqzly-collapse');
      _document.querySelector('.sqzly-thankyou').setAttribute('class', 'szqly-thankyou sqzly-in');
    }
  }   
}