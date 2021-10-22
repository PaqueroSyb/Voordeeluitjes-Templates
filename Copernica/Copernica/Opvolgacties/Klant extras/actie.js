var profileID = profile.id;
var servicemail = profile.Servicemail;
abtest = false;

if (['1','3','5','7','9'].some(char => profileID.endsWith(char))) {
	var selecteer_datum = subprofile.Checkin;
	var status_boeking = subprofile.Status;
	var type_verblijf = subprofile.Type;
	var locatie = subprofile.Locatie;

	var vandaag_datum = new Date();
	var checkin_datum = new Date(selecteer_datum + "T16:00:00");
  
	var send_mail = checkin_datum.getTime() - vandaag_datum.getTime();
	var wait_until = send_mail / 1000;

	if (wait_until < 36000 && wait_until > 0)  {
		abtest = false;
	} else if (wait_until < 457920 && wait_until > 0 && status_boeking == 'Confirmed' && type_verblijf != 'Vakantiepark' && servicemail != 'Afgemeld' && locatie != 'MayHotel') {
		abtest = true;
	}  else {
		abtest = false;
	}
} else {
  abtest = false;
}

{return abtest}