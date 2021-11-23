<?php
include('website/config.php');
// Get parameters
$campagne = $_GET["campagne"];
$type = $_GET["type"];
$userProfileID = $_GET["profiel"];

// Load lock file
$fp = fopen("lock.txt", "r+");

// acquire an exclusive lock
if (flock($fp, LOCK_EX)) 
{  
	// truncate file
	ftruncate($fp, 0);
	      
	// Check if profile has already been called upon
	global $usedProfiles; 
  
  $usedProfiles = json_decode(file_get_contents('codes.json'), true);

  
    // Declare API function to retrieve code
    function retrieveCode($usedProfiles) {
      echo "Hello world!";
      print_r($usedProfiles);
    }
	
	if (!array_key_exists($userProfileID, $usedProfiles)) 
	{
    $code = substr(md5(rand()), 0, 9);

    $dateToday = date("Y-m-d");

    $codeDateArray = array(
      $code, $dateToday
    );
    
		$usedProfiles[$userProfileID] = $codeDateArray;
	
		file_put_contents("codes.json",json_encode($usedProfiles));
	
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
      // Run same code as when array key is unknown to retrieve and put new code
      echo "Laatst aangemeld is langer dan 1 jaar geleden";
      retrieveCode();
    }
    else
    {
      $code = $usedProfiles[$userProfileID][0];

      retrieveCode($usedProfiles);

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
?>