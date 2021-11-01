var kortingscodeDateValue = profile.Sqzly_aanmeld_kortingscode_datum;

var today = new Date();
today.setHours(0, 0, 0);
var kortingscodeDate = new Date(kortingscodeDateValue);
kortingscodeDate.setHours(0, 0, 0);
  
var sendKortingscode = today.getTime() - kortingscodeDate.getTime();

if (sendKortingscode > 31536000000) {
	return true;
} else {
  return false;
}
