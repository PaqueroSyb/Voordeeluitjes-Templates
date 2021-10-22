var selecteer_datum = subprofile.Checkin;
var status_boeking = subprofile.Status;
var locatie = subprofile.Locatie;
var servicemail = profile.Servicemail;

var vandaag_datum = new Date();
var checkin_datum = new Date(selecteer_datum + "T16:00:00");
  
var send_mail = checkin_datum.getTime() - vandaag_datum.getTime();
var wait_until = send_mail / 1000;

if (wait_until < 172800 && wait_until > 0 && status_boeking === 'Confirmed' && servicemail !== 'Afgemeld' && locatie !== 'MayHotel') {
return true;
}  else {
return false;
}