<?php
    @include_once("../ConnectDB.php");

    $username = $_POST['username'];
    $id = $_POST['id'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "CALL `insertUser`('$id', '$username', '$password', '$email', @response);";
    $result = $conn->query($sql);

    $sql = "SELECT @response AS `response`;";
    $result = $conn->query($sql);

    $row = $result->fetch_assoc();

    echo json_encode($row["response"]);
?>