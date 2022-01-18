var profileID = profile.id;
var emailGmail = profile.Emailadres;
var servicemail = profile.Servicemail;
abtest = false;

if (emailGmail.indexOf('@gmail.com') !== -1) {
  if (['1','3','4','6','8'].some(char => profileID.endsWith(char))) {
    // voer script uit
    abtest = true;
  } else {
    abtest = false;
  }
} else {
  abtest = false;
}

{return abtest}