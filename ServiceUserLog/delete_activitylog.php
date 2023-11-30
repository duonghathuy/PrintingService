<?php
@include '../ConnectDB.php';
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $del = " DELETE FROM print_request WHERE id = '$id'; ";
    mysqli_query($conn, $del);
    header('location:ServiceUserLog.php');
}
?>