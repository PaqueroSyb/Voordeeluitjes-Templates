var submitButton = document.querySelector('.sqzly-form-submit');
var inputEmail = document.querySelector('.sqzly-emailfield');
var inputContainer = document.querySelector('.sqzly-fields');
var modal = document.querySelector('.sqzly-fields');

inputEmail.addEventListener('input', function() {
    var showErrorMessage = document.querySelector('.error-message');
    var emailValue = document.querySelector('.sqzly-emailfield').value;
    var pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var emailValid = pattern.test(emailValue);
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

var urlPath = window.location.pathname;
if (urlPath === '/') {
    modal.classList.add('home');
}

submitButton.addEventListener('click', function() {
    var emailValue = document.querySelector('.sqzly-emailfield').value;
    var pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var emailValid = pattern.test(emailValue);
    if (emailValid === false) {
        inputContainer.setAttribute('class', 'sqzly-fields input-invalid');
    } else {
        _sqzl.push({
            "anonymize": "no",
        });
        preferenceHotel = document.getElementById('preference-hotel').checked ? "Ja" : "Nee";
        preferenceVakantiepark = document.getElementById('preference-vakantiepark').checked ? "Ja" : "Nee";
        _sqzl.push({
            "event": "NewsletterPopupConfirm",
            "email": emailValue,
            "custom_email_preference_hotel": preferenceHotel,
            "custom_email_preference_vakantiepark": preferenceVakantiepark,
        });
        _sqzl.push({
            "anonymize": "yes",
        });
    }   
});