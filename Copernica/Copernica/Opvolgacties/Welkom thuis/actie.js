var profileID = profile.id;
abtest = false;

if (['0','2','4','6','8'].some(char => profileID.endsWith(char))) {
	var selecteer_datum = subprofile.Checkout;
	var status_boeking = subprofile.Status;
	var servicemail = profile.Servicemail;
	var locatie = subprofile.Locatie;

	var vandaag_datum = new Date();
	var checkout_datum = new Date(selecteer_datum + "T00:00:00");
  
	var send_mail = vandaag_datum.getTime() - checkout_datum.getTime();
	var wait_until = send_mail /1000;

	if (wait_until < 172800 && wait_until > 0 && status_boeking === 'Confirmed' && servicemail !== 'Afgemeld' && locatie !== 'MayHotel') {
		abtest = true;
	}  else {
		abtest = false;
	}
} else {
  abtest = false;
}

{return abtest}