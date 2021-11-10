var selecteer_datum = subprofile.Checkin;

var vandaag_datum = new Date();
var checkin_datum = new Date(selecteer_datum + "T16:00:00");
  
var send_mail = checkin_datum.getTime() - vandaag_datum.getTime();

if (send_mail > 54000000) {
	var wait_until = (send_mail - 86400000) / 1000;
} else {
	var wait_until = (send_mail - 28800000) / 1000;
}

if (subprofile.Checkin !== '') {return wait_until}