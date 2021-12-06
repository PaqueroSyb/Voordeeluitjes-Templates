<?php
include('website/config.php');

$ipOK = false;
foreach($settings['copernica_ip_whitelist'] as $ipRange){
    if(ip_in_range($_SERVER["REMOTE_ADDR"], $ipRange)){
        $ipOK = true;
        break;
    }
}

if(!$ipOK){
    die('IP not authorized');
}

if (!$dbSlave) {
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
	die("Database connection failed");
}

// Load essentials
require_once('copernica_rest_api.php');

// Set token, create API class and set DatabaseID
$api = new CopernicaRestAPI("dfe388c400ca97405e888a2b53141216d26ccdaeb0d532ace3c81979dae02133bbc186d02ab8939d4d711cf561d55d0610c50e468956eb70a5049ac3130bce10", 2);
$codeDB = 21;

// Get parameters
$campagne = $_GET["campagne"];
$userProfileID = $_GET["profiel"];

// Load lock file
$fp = fopen("lock_sqzly_aanmeld_codes.txt", "r+");

// acquire an exclusive lock
if (flock($fp, LOCK_EX)) 
{  
	// truncate file
	ftruncate($fp, 0);
	      
	// Check if profile has already been called upon
	$usedProfiles = json_decode(file_get_contents('sqzly_aanmeld_codes_used.json'), true);
	
	if (!array_key_exists($userProfileID, $usedProfiles)) 
	{
    // Set parameters to check if code is used and set campagne
		$parameters = array(
			'limit'     =>  1000,
			'fields'    =>  array("Gebruikt==false", "Campagne==".$campagne)
		);
		
		// Get 1000 profiles with unused code and correct campagne
		$profiles = $api->get("database/{$codeDB}/profiles", $parameters);
		$index = array_rand($profiles["data"]);
		$code = $profiles["data"][$index]["fields"]["Codes"];
		$profileID = $profiles["data"][$index]["ID"];
		
		// Set retrieved code to used
		$data = array(
			"fields" => array(
				'Gebruikt' =>  'true'
			),
		);
		
		$api->put("profile/{$profileID}", $data);
		
		// Save retrieved code to profile
		$data = array(
			"fields" => array(
				'Sqzly_aanmeld_kortingscode' =>  $code
			),
		);
	
		$api->put("profile/{$userProfileID}", $data);
	
    // Create array with retrieved code and date of today
    $dateToday = date("Y-m-d");

    $codeDateArray = array(
      $code, $dateToday
    );
    
    // Save array to profile key
		$usedProfiles[$userProfileID] = $codeDateArray;
	
		file_put_contents("sqzly_aanmeld_codes_used.json",json_encode($usedProfiles));
	
	} 
	else 
	{
    // Retrieve last known date that script has been called for this profile, check if difference is more than 548 days
    $lastSubscribeDate = strval($usedProfiles[$userProfileID][1]);

    $lastSubscribeDateTime = new DateTime($lastSubscribeDate);
    $today = new DateTime();

    $lastSubscribeDifferenceDays = $today->diff($lastSubscribeDateTime)->format("%a");

    // If difference is more than 548 retrieve new code from Copernica, if difference is less output currently saved code in codes.json
    if ($lastSubscribeDifferenceDays > 548)
    {
      // Set parameters to check if code is used and set campagne
      $parameters = array(
        'limit'     =>  1000,
        'fields'    =>  array("Gebruikt==false", "Campagne==".$campagne)
      );
      
      // Get 1000 profiles with unused code and correct campagne
      $profiles = $api->get("database/{$codeDB}/profiles", $parameters);
      $index = array_rand($profiles["data"]);
      $code = $profiles["data"][$index]["fields"]["Codes"];
      $profileID = $profiles["data"][$index]["ID"];
      
      // Set retrieved code to used
      $data = array(
        "fields" => array(
          'Gebruikt' =>  'true'
        ),
      );
      
      $api->put("profile/{$profileID}", $data);
      
      // Save retrieved code to profile
      $data = array(
        "fields" => array(
          'Sqzly_aanmeld_kortingscode' =>  $code
        ),
      );
    
      $api->put("profile/{$userProfileID}", $data);
    
      // Create array with retrieved code and date of today
      $dateToday = date("Y-m-d");

      $codeDateArray = array(
        $code, $dateToday
      );
      
      // Save array to profile key
      $usedProfiles[$userProfileID] = $codeDateArray;
    
      file_put_contents("sqzly_aanmeld_codes_used.json",json_encode($usedProfiles));

    }
    else
    {
      $code = $usedProfiles[$userProfileID][0];

    }

	};
	
	// flush output before releasing the lock
	fflush($fp);            
	// release the lock
	flock($fp, LOCK_UN);    
};

fclose($fp);

// Output code so it can be fetched.
echo $code;

function ip_in_range( $ip, $range ) {
	if ( strpos( $range, '/' ) == false ) {
		$range .= '/27';
	}
	// $range is in IP/CIDR format eg 127.0.0.1/24
	list( $range, $netmask ) = explode( '/', $range, 2 );
	$range_decimal = ip2long( $range );
	$ip_decimal = ip2long( $ip );
	$wildcard_decimal = pow( 2, ( 32 - $netmask ) ) - 1;
	$netmask_decimal = ~ $wildcard_decimal;
	return ( ( $ip_decimal & $netmask_decimal ) == ( $range_decimal & $netmask_decimal ) );
}
?>