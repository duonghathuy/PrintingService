<?php
    @include_once("../ConnectDB.php");

    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "CALL `validateCredentials`('$username', '$password', @response, @success, @returnID, @returnFname, @returnLname)";
    $result = $conn->query($sql);

    $sql = "SELECT @response AS `response`, @success AS `success`, @returnID AS `ID`, @returnFname AS `Fname`, @returnLname AS `Lname`;";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    
    $data = Array(
        'response' => $row['response'],
        'success' => $row['success'],
        'id' => $row['ID'],
        'fname' => $row['Fname'],
        'lname' => $row['Lname']
    );
    
    echo json_encode($data);
?>