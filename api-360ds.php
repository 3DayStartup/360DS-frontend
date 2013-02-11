<?

$file_name = "api-360ds.php";
$api_360ds_host = 'http://threesixtyds.herokuapp.com';
header('Content-type: application/json');

$request_uri = $_SERVER['REQUEST_URI'];
//echo $request_uri."\n";
$uri = $_SERVER['PHP_SELF'];


$uri = substr($uri,strlen($file_name."/"));
//echo '$uri: '.$uri."\n";

$url = $api_360ds_host.$uri;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);

// User agent
curl_setopt($ch, CURLOPT_USERAGENT, "MozillaXYZ/1.0");

// Include header in result? (0 = yes, 1 = no)
curl_setopt($ch, CURLOPT_HEADER, 0);

// Should cURL return or print out the data? (true = return, false = print)
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Timeout in seconds
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
//echo '$url: '.$url."\n";

// Download the given URL, and return output
$output = curl_exec($ch);

// Close the cURL resource, and free system resources
curl_close($ch);

echo $output;
?>