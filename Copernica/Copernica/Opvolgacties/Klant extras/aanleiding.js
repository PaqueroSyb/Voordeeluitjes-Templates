var selecteer_datum = subprofile.Checkin;

var vandaag_datum = new Date();
var checkin_datum = new Date(selecteer_datum + "T16:00:00");
  
var send_mail = checkin_datum.getTime() - vandaag_datum.getTime();

if (send_mail > 397440000) {
	var wait_until = (send_mail - 432000000) / 1000;
} else if (send_mail > 136800000) {
	var wait_until = 46800000 / 1000;
} else {
	var wait_until = 18000000 / 1000;
}

if (subprofile.Checkin !== '') {return wait_until}