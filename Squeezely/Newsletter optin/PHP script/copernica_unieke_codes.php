<?php
// Get parameters
$campagne = $_GET["campagne"];
$type = $_GET["type"];
$userSubProfileID = $_GET["profiel"];
$codeRetrievedLastTime = new DateTime("2020-08-10");
$today = new DateTime();

$differenceCodeDays = $today->diff($codeRetrievedLastTime)->format("%a");

// Load lock file
$fp = fopen("lock.txt", "r+");

// acquire an exclusive lock
if (flock($fp, LOCK_EX)) 
{  
	// truncate file
	ftruncate($fp, 0);
	      
	// Check if profile has already been called upon
	$usedSubProfiles = json_decode(file_get_contents('codes.json'), true);
	
	if (!array_key_exists($userSubProfileID, $usedSubProfiles)) 
	{
    $code = "SybrenTestCode39";
    $dateToday = date("Y-m-d");

    $testArray = array(
      $code, $dateToday
    );
    
		$usedSubProfiles[$userSubProfileID] = $testArray;
	
		file_put_contents("codes.json",json_encode($usedSubProfiles));
	
	} 
	else 
	{
		$code = $usedSubProfiles[$userSubProfileID][0];
	};
	
	// flush output before releasing the lock
	fflush($fp);            
	// release the lock
	flock($fp, LOCK_UN);    
};

fclose($fp);
$txt1 = "Code";
// Output code so it can be fetched.
echo "Code: " . $code . "<br/>";
echo "Datum: " . $usedSubProfiles[$userSubProfileID][1] . "<br/>";
?>