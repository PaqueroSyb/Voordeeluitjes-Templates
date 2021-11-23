<?php

// Get parameters
$campagne = $_GET["campagne"];
$userProfileID = $_GET["profiel"];

// Load lock file
$fp = fopen("lock.txt", "r+");

// acquire an exclusive lock
if (flock($fp, LOCK_EX)) 
{  
	// truncate file
	ftruncate($fp, 0);
	      
	// Check if profile has already been called upon
	$usedProfiles = json_decode(file_get_contents('codes.json'), true);
	
	if (!array_key_exists($userProfileID, $usedProfiles)) 
	{
	
    // Create array with retrieved code and date of today
    $dateToday = date("Y-m-d");
    $code = substr(md5(mt_rand()), 0, 7);

    $codeDateArray = array(
      $code, $dateToday
    );
    
    // Save array to profile key
		$usedProfiles[$userProfileID] = $codeDateArray;
	
		file_put_contents("codes.json",json_encode($usedProfiles));
    echo "Array key loop 1 niet gevonden, haal code op met GET request";
	
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
      
      // Create array with retrieved code and date of today
      $dateToday = date("Y-m-d");
      $code = substr(md5(mt_rand()), 0, 7);

      $codeDateArray = array(
        $code, $dateToday
      );
      
      // Save array to profile key
      $usedProfiles[$userProfileID] = $codeDateArray;
    
      file_put_contents("codes.json",json_encode($usedProfiles));
      echo "Array key loop 1 wel gevonden, kortingscode is langer dan 458 dagen geleden, haal code op met GET request";

    }
    else
    {
      $code = $usedProfiles[$userProfileID][0];
      echo "Array key loop 1 wel gevonden, kortingscode is korter dan 458 dagen geleden, toon code bekend uit .json";
    }

	};
	
	// flush output before releasing the lock
	fflush($fp);            
	// release the lock
	flock($fp, LOCK_UN);    
};

fclose($fp);

// Output code so it can be fetched.
echo ."<br>".;
echo $code;
?>