<?php
    @include_once("../ConnectDB.php");

    $id = $_POST["id"];

    // Get addresses
    $sql = "SELECT *
            FROM `user_addresses`
            WHERE User_ID = $id";
    $result = $conn->query($sql);
    
    $addresses = Array();

    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $address = Array(
                "province" => $row["Province"],
                "district"=> $row["District"],
                "commune"=> $row["Commune"],
                "street"=> $row["Street"]
            );
            array_push($addresses, $address);
        }
    }

    $sql = "SELECT *
            FROM `user`
            WHERE ID = $id";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    
    $response = Array(
        "id"=> $row["ID"],
        "fname"=> $row["Fname"],
        "lname"=> $row["Lname"],
        "birthday"=> $row["Year_of_Birth"],
        "sex"=> $row["Sex"],
        "role"=> $row["Role"],
        "username"=> $row["Username"],
        "email"=> $row["Email"],
        "addresses"=> $addresses,
    );
    
    echo json_encode($response);
?>