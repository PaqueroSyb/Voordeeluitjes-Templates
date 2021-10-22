var selecteer_datum = subprofile.Checkout;
var status_boeking = subprofile.Status;

var vandaag_datum = new Date();
var checkout_datum = new Date(selecteer_datum + "T00:00:00");

var send_mail = vandaag_datum.getTime() - checkout_datum.getTime();
var wait_until = send_mail /1000;

if (wait_until < 172800 && wait_until > 0 && status_boeking === 'Confirmed') {
	return true;
}  else {
	return false;
}