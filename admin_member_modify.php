<?php
    //http://localhost/oclass/admin_member_modify.php?num=9

    $num = $_GET["num"];
    $level = $_POST["level"];
    $point = $_POST["point"];

    include "./db_con.php";
    $sql = "update members set level='$level', point='$point' where num='$num'";
    mysqli_query($con, $sql);
    mysqli_close($con);

    echo ("
        <script>
            location.href='./admin.php';
        </script>
    ");

?>