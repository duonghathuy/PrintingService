<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SSPS_DB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>