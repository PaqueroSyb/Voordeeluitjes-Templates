var kortingscodeDateValue = profile.Sqzly_aanmeld_kortingscode_datum;

var today = new Date();
today.setHours(0, 0, 0);
var kortingscodeDate = new Date(kortingscodeDateValue);
kortingscodeDate.setHours(0, 0, 0);
  
var sendKortingscode = today.getTime() - kortingscodeDate.getTime();

if (sendKortingscode > 47347200000 || kortingscodeDateValue == '') {
	return true;
} else {
  return false;
}