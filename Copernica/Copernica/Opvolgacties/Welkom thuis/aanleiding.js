var selecteer_datum = subprofile.Checkout;

var vandaag_datum = new Date();
var checkout_datum = new Date(selecteer_datum + "T15:00:00");
  
var send_mail = checkout_datum.getTime() - vandaag_datum.getTime();
var wait_until = send_mail / 1000;

if (subprofile.Checkin !== '') {return wait_until}