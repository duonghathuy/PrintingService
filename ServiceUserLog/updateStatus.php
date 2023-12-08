<?php
@include '../ConnectDB.php';
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $del = " CALL updateState('$id'); ";
    mysqli_query($conn, $del);
    header('location:ServiceUserLog.php');
}
?>