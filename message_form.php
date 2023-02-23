<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OClass - 메시지 작성</title>
    <link rel="stylesheet" href="./css/common.css">
    <link rel="stylesheet" href="./css/message.css">
</head>
<body>
    <header>
        <?php include "./header.php"?>
    </header>
    <!--$userid, $username, $userlevel, $userpoint 값들 존재-->

    <?php include "./message_log_chk.php"?> 


    <section>
        <div class="subpage">
            <div class="frame">
                <div class="banner_title">
                    <h3>100% <span>Online Course</span></h3>
                    <h1>Get Future's Skill Today!</h1>
                </div>
            </div>
        </div>

        <div id="message_box">
            <h2>메시지 보내기</h2>
            <ul class="top_buttons">
                <li><a href="./message_box.php?mode=rv">받은 메시지</a></li>
                <li><a href="./message_box.php?mode=send">보낸 메시지</a></li>
            </ul>
            <form name="message_form" action="./message_insert.php?send_id=<?=$userid?>" method="post">
                <div id="write_msg">
                    <ul>
                        <li>
                            <div class="label_box">
                                <label for="id">보내는 사람</label>
                            </div>
                            <div class="input_box">
                                <p><?=$userid?></p>
                            </div>
                        </li>
                        <li>
                            <div class="label_box">
                                <label for="rv_id1">받는 사람(아이디)</label>
                            </div>
                            <div class="input_box">
<?php
    //http://localhost/oclass/message_form.php?num=6&id=abc
    if(isset($_GET["id"])){
        $id = $_GET["id"];
    }else{
        $id = "";
    }
?>
                                <input type="text" name="rv_id" id="rv_id1" value="<?=$id?>">
                            </div>
                        </li>
                        <li>
                            <div class="label_box">
                                <label for="subject1">제목</label>
                            </div>
                            <div class="input_box">
<?php
    //http://localhost/oclass/message_form.php?num=6&id=abc
    if(isset($_GET["num"])){
        $num = $_GET["num"];
    }else{
        $num = "";
    }

    include "./db_con.php";
    $sql = "select title from products where num='$num'";
    $result = mysqli_query($con, $sql);
    $row = mysqli_fetch_array($result);
    if($row){  //프로그램 상세 페이지 -> 예약문의로 message_form.php로 접근
        $title = $row["title"];
?>
                                <input type="text" name="subject" id="subject1" value="예약 문의 : [<?=$title?>]에 관하여 문의합니다.">
<?php
    }else{  //상단 메뉴인 "메시지 보내기" -> message_form.php로 접근
?>
                                <input type="text" name="subject" id="subject1">
<?php
    }
?>
                            </div>
                        </li>
                        <li>
                            <div class="label_box">
                                <label for="content1">내용</label>
                            </div>
                            <div class="input_box">
                                <textarea name="content" id="content1"></textarea>
                            </div>
                        </li>
                    </ul>
                    <button type="button" class="send_btn" onclick="check_input();">메시지 보내기</button>
                </div>
            </form>
        </div>
    </section>

    <footer>
        <?php include "./footer.php"?>
    </footer>



    <script src="./js/message.js"></script>    
</body>
</html>