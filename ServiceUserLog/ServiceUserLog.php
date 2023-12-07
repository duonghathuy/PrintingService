<?php
@include '../ConnectDB.php';
set_time_limit(500);
//header("Refresh: 7");
$Name = "Sinh viên";
if (isset($_GET['id'])) {
    $userId = $_GET['id'];
    $nameUser = mysqli_query($conn, "SELECT `getName`('$userId') AS `getName`;");
    $getName = $nameUser->fetch_all(MYSQLI_ASSOC);
    $Name = $getName[0]['getName'];
    header('location:ServiceUserLog.php');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dịch vụ sinh viên</title>

    <!-- swiper css link -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
    <!-- font awesome cdn link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">


    <!-- remix icon link -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet">
    <!-- custom css file link -->
    <link rel="stylesheet" type="text/css" href="../ServiceUserLog/logstyle.css">
    <link rel="stylesheet" type="text/css" href="../style.css">
</head>

<body> <!--onload="timer = setTimeout('auto_reload()',7000);">-->
    <!--header section starts -->
    <script>
        var timer = null;
        function auto_reload() {
            window.location = "../ServiceUserLog/ServiceUserLog.php";
        }
    </script>
    <header id="app-header">
        <section class="header">
            <div class="left-side">
                <div class="logo">
                    <a href="#">
                        <img src="../images/logo.png" alt="logo" />
                        <p>ĐẠI HỌC QUỐC GIA TP.HCM<br>TRƯỜNG ĐẠI HỌC BÁCH KHOA</p>
                    </a>
                </div>

                <div class="menu-bar">
                    <div class="first-option"><a href="">trang chủ</a></div>
                    <div class="second-option"><a href="">dịch vụ của tôi</a></div>
                </div>
            </div>

            <div class="right-side">
                <div class="username">
                    <?php echo $Name ?>
                </div>
                <div class="seperator">|</div>
                <div>
                    <a href="#" class="login">Đăng xuất</a>
                </div>
            </div>
        </section>
    </header>

    <!-- header section ends -->


    <!-- ---------------------------------------------------------------------------------------------------------- -->
    <!-- Confirm delete request POP UP -->
    <?php
    if (isset($_GET['delete_id'])) {
        $delete_id = $_GET['delete_id'];
        echo ' <div class="popup" id="DELETE_popup">
            <img src="../images/mess.jpg" width="50px" height="50px">
            <div class="popup_text">
                <h2 style="margin-top:5%; color:var(--main-color)">Message:</h2>
                <h4 style="color:var(--text-color)">Bạn có chắc chắn muốn xóa không?</h4>
            </div>
            <div class="button-group">
                <a onclick="ClosePopup(\'DELETE_popup\')" class="button" type="button">Thoát</a>
                <a class="button" href="../ServiceUserLog/delete_activitylog.php?id=' . $delete_id . '">Xóa</a>
            </div>
        </div>';
    } ?>
    <!-- END Confirm delete request POP UP  -->
    <!-- ---------------------------------------------------------------------------------------------------------- -->

    <!-- body section starts -->
    <?php
    if (isset($_POST['error'])) {
        $result = mysqli_query($conn, "CALL displayLogError('214365')");

    } // call procedure displayLog with parameter: user ID
    else if (isset($_POST['done'])) {
        $result = mysqli_query($conn, "CALL displayLogDone('214365')");
    } else if (isset($_POST['sent'])) {
        $result = mysqli_query($conn, "CALL displayLogSent('214365')");
    } else if (isset($_POST['save'])) {
        $result = mysqli_query($conn, "CALL displayLogSave('214365')");
    } else {
        $result = mysqli_query($conn, "CALL displayLog('214365')");
    }

    $data = $result->fetch_all(MYSQLI_ASSOC);
    /*mysqli_query($conn, " call insertfile());*/
    //}
    ?>

    <div class="body">
        <!--<input type="text" id="find" onkeyup="myFunction()" placeholder="Search for file names.."
            title="Type in a name">-->
        <div class="myBtnContainer" id="wrapfilter">
            <button style="pointer-events:none;" class="btn active">Trạng
                Thái:</button>
            <form action="../ServiceUserLog/ServiceUserLog.php" method="post">
                <input type="submit" class="btn" name="all" value="Xem tất cả">
            </form>
            <form action="../ServiceUserLog/ServiceUserLog.php" method="post">
                <input type="submit" class="btn" name="done" value="Đã hoàn thành">
            </form>
            <form action="../ServiceUserLog/ServiceUserLog.php" method="post">
                <input type="submit" class="btn" name="sent" value="Đã gửi in">
            </form>
            <form action="../ServiceUserLog/ServiceUserLog.php" method="post">
                <input type="submit" class="btn" name="save" value="Đã lưu">
            </form>
            <form action="../ServiceUserLog/ServiceUserLog.php" method="post">
                <input type="submit" class="btn" name="error" value="Lỗi in">
            </form>
        </div>
        <table style="width:100%" border="1" id="user_log_table">
            <colgroup>
                <col span="2" style="width: 240px">
                <col style="width:200px">
                <col span="6" style="width: 100px;">
                <col span="3" style="width: 170px">
            </colgroup>
            <style>
                /*Search file name*/
                #find {
                    background-image: url('/css/searchicon.png');
                    background-position: 10px 10px;
                    background-repeat: no-repeat;
                    width: 100%;
                    font-size: 16px;
                    padding: 12px 20px 12px 40px;
                    border: 1px solid #ddd;
                    margin-bottom: 12px;
                }

                #user_log_table tr.header,
                #user_log_table tr:hover {
                    background-color: #f1f1f1;
                }

                #user_log_table {
                    table - layout: fixed;
                    overflow-y: scroll;
                    height: 500px;
                    display: block;
                }

                #user_log_table,
                #user_log_table th,
                #user_log_table td {
                    border: 1px solid #095195;
                    text-align: center;
                }

                #user_log_table thead th {
                    font-size: 13px;
                    padding: 5px;
                }

                #user_log_table td {
                    font-size: 12px;
                    padding: 5px;
                }

                .link_text {
                    color: red;
                    font-weight: 600;
                    text-decoration: underline;
                }

                #delete {
                    color: black;
                    text-decoration: underline;
                }

                #delete:active {
                    color: black;
                }

                #user_log_table thead tr th {
                    position: sticky;
                    top: 0;
                    background-color: #FFFFFF;
                    z-index: 10;
                    table-layout: fixed;
                    font-size: 14px;
                    color: var(--blue);
                }
            </style>
            <thead>
                <tr>
                    <th>Thời gian bắt đầu in</th>
                    <th>Thời gian kết thúc in</th>
                    <th>Nội dung đăng ký in</th>
                    <th>Tổng số page</th>
                    <th>Số mặt</th>
                    <th>Số bản copy</th>
                    <th>Số trang trên giấy in</th>
                    <th>Khổ giấy</th>
                    <th>Số page bị trừ trong ví</th>
                    <th>Mã máy in</th>
                    <th>Trạng thái</th>
                    <th>Xóa Yêu cầu</th>
                </tr>
            </thead>
            <tbody>
                <?php

                foreach ($data as $row) {
                    echo '
                        <tr>
                            <td>
                                ' . $row["starttime"] . '
                            </td>
                            <td>
                                ' . $row['End_Time'] . '
                            </td>
                            <td>
                            ' . $row['filename'] . '
                        </td>
                            <td>
                                ' . $row['Number_Of_Pages'] . '
                            </td>
                            <td>
                                ' . $row['One/Doubled_Sided'] . '
                            </td>
                            <td>
                                ' . $row['Number_Of_Copies'] . '
                            </td>
                            <td>
                            ' . $row['Pages_Per_Sheet'] . '
                        </td>
                        <td>
                        ' . $row['Page_Size'] . '
                    </td>
                    <td>
                    ' . $row['Total_Sheet'] . '
                </td>
                <td>
                ' . $row['printer_model'] . '
            </td>
                            <td> ';
                    if ($row['state_requestprint'] == '0' || empty($row['state_requestprint'])) {
                        $state = '<a  class="link_text">Đã lưu</a>';
                        $randTime = rand(1, 10);
                        //sleep($randTime);
                        //auto_updateState($conn, $row['requestid'], $row['state_requestprint']);
                    } else if ($row['state_requestprint'] == '1') {
                        $state = 'Đã gửi in';
                        $randTime = rand(1, 10);
                        //sleep($randTime);
                        //auto_updateState($conn, $row['requestid'], $row['state_requestprint']);
                    } else if ($row['state_requestprint'] == '2') {
                        $state = 'Đã hoàn thành';
                    } else {
                        $state = 'Máy in hỏng';
                    }
                    echo $state;
                    echo '
                            </td>
                            <td>
                            ';
                    if ($row['state_requestprint'] != '1')
                        echo '<a id="delete" href="../ServiceUserLog/ServiceUserLog.php?delete_id=' . $row['requestid'] . '">Delete</a>';
                    echo '
                        </td>
                        </tr> 
                 ';
                }

                ?>
            </tbody>
        </table>
    </div>
    <!-- <script>
        function myFunction() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("find");
            filter = input.value.toUpperCase();
            table = document.getElementById("user_log_table");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    </script>-->
    <!-- body section ends -->




    <!-- footer section starts -->
    <footer id="app-footer">
        <div class="footer-container">
            <section class="footer">
                <div class="box-container">
                    <div class="box">
                        <h3>student smart printing service</h3>
                        <img src="../images/logo.png" alt="logo" />
                    </div>

                    <div class="box">
                        <h3>website</h3>
                        <a href="https://hcmut.edu.vn/" class="hcmut">HCMUT</a>
                        <a href="https://mybk.hcmut.edu.vn/my/index.action" class="mybk">MyBK</a>
                        <a href="https://mybk.hcmut.edu.vn/bksi/public/vi/" class="bksi">BKSI</a>
                    </div>

                    <div class="box">
                        <h3>liên hệ</h3>
                        <a href="#">
                            <div class="location-icon"></div>268 Ly Thuong Kiet Street Ward 14, District 10, Ho Chi Minh
                            City, Vietnam
                        </a>
                        <a href="#">
                            <div class="phone-icon"></div>(028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)
                        </a>
                        <a href="mailto:elearning@hcmut.edu.vn" class="email">
                            <div class="email-icon"></div>elearning@hcmut.edu.vn
                        </a>
                    </div>
                </div>
            </section>
            <div class="copyright">
                <p>Copyright 2007-2022 BKEL - Phát triển dựa trên Moodle</p>
            </div>
        </div>
    </footer>
    <!-- footer section ends -->

    <script src="../ServiceUserLog/script.js"></script>





</body>

</html>