$(document).ready(function(){

    //좋아요~~~♡
    $(".fav_icon").click(function(){
        var $rel = $(".pd_fav").attr("rel");  //11(products 테이블의 행 데이터 번호)
        var $dataUserId = $(".pd_fav").attr("data-userid");
        console.log($rel);
        console.log($dataUserId);

        if($dataUserId.length < 1){
            alert("로그인 후 이용 바랍니다.");
            location.href="./login_form.php?spot=productsFav&pdNum="+$rel;
        }else{  //로그인 된 상태
            $.ajax({
                url : './products_fav.php?num='+$rel+'&userid='+$dataUserId,
                dataType : 'json',  //json 파일 형태 {key1:value1, key2:value2, ..}
                type : 'post',
                cache : false,  //캐시 메모리상에 값들을 저장하지 않겠다는 의미(보안 노출 방지역할)
                error : function(){
                    alert("error");
                },
                success : function(data){
                    console.log(data); //["좋아요 선택", 1]; ==>  [좋아요를 선택한 결과를 텍스트로 가져온 값, 실제 여러사람들이 좋아요를 누른 횟수]

                    if(data[0] == "좋아요 선택"){
                        $(".fav_icon img").attr("src", "./img/fav_fill.svg");
                        $(".pd_fav span").text(data[1]);
                    }else if(data[0] == "좋아요 해제"){
                        $(".fav_icon img").attr("src", "./img/fav_empty.svg");
                        $(".pd_fav span").text(data[1]);
                    }
                }
            });
        }
        return false; 
    });



    //리뷰 파트 
    //"리뷰 등록" 버튼 클릭시 작성란 나오도록 구성
    $(".review_open").click(function(){
        $("#review_write").slideDown();
        //$("#review_txt").focus();  //사용자가 별점을 먼저 체크하고 내려오게 끔 진행

    });


    //리뷰 별점 값 가져오기
    $(".review_starChk li").click(function(){
        var $rel = $(this).attr("rel");
        $(".star_rel").text($rel);
        $("[name='star_score']").val($rel);  //php에서 $_POST로 가져갈 값을 미리 넣는다.

        $(".review_starChk li").removeClass("active");
        $(this).addClass("active").prevAll().addClass("active");
    });

    //각 리뷰 리스트 항목마다 개별 별점 결과 부여하기
    $(".review_detail > ul").each(function(){
        var eachStar_rel = $(this).find(".star_final").attr("rel");  //4
        $(this).find(".star_final > li:nth-child("+eachStar_rel+")").addClass("active").prevAll().addClass("active");
    });


    //"카트 담기" 버튼 클릭시
    $("#cart_insert").click(function(){
        var $rel = $(this).attr("rel");
        console.log($rel);  //상품번호
        var $dataUserId = $(this).attr("data-userid");
        console.log($dataUserId);  //로그인 한 사람의 아이디

        var $pd_ea = $(".pd_ea input").val();  //문자형 데이터
        console.log($pd_ea);  //예약시간

        //만약 소수점을 넣었다면 당장 어떻게 처리할 것인가?
        //문자형 데이터로부터 소수점(포인트)의 위치를 찾는다. => indexOf("지정문자") ==> -1이라면 소수점이 없다는 의미 / 0이상의 값이 나왔다는 것은 소수점이 존재한다는 의미
        if($pd_ea.indexOf(".") != -1){
            alert("시간 단위는 정수값으로 입력값으로 입력하세요");
            location.href = "./products_view.php?num="+$rel;
        }else{
            if($pd_ea < 1){ //예약시간 입력박스에서 1미만의 시간으로 작성후, 카트담기를 눌렀을 때
                alert("최소 예약시간은 1시간 입니다.");
                location.href = "./products_view.php?num="+$rel;
            }else{  //최소 예약시간은 1 이상으로 작성후, 카트담기를 눌었을 때
                if(!$dataUserId){  //비로그인 회원이 "카트 담기" 버튼 클릭시
                    alert("로그인 후 이용 바랍니다.");
                    location.href="./login_form.php?spot=productsFav&pdNum=" + $rel;
                }else{  //로그인 회원이 "카트 담기" 버튼 클릭시
                    $.ajax({
                        url : "./cart_insert.php?num="+$rel+"&userid="+$dataUserId+"&pdEA="+$pd_ea,
                        dataType : "json",
                        type : "post",
                        cache : false,  //캐시메모리 상에 저장하지 않음
                        error : function(){
                            alert("에러발생~!!");
                        },
                        success : function(data){
                            console.log(data);  //["카트에 있음(없음)", "수량"]
                            $(".dark").addClass("active");
                            $(".popup").addClass("active");
                            $(".popup > div").removeClass("active");

                            if(data[0] == "카트에 있음"){
                                $(".popup > div.pop_cart1").addClass("active");
                            }else if(data[0] == "카트에 없음"){
                                $(".popup > div.pop_cart2").addClass("active");
                            }
                            $(".cart_num").text(data[1]);
                        }
                    });
                }
            }
        }
    });

    $(".pop_btn button:last-child").click(function(){
        $(".dark").removeClass("active");
        $(".popup").removeClass("active");
        $(".popup > div").removeClass("active");
    });
});


function review_enroll(){
    if(!document.product_review.star_score.value){
        alert("리뷰를 위한 별점을 찍어주세요");
        return;
    }

    if(!document.product_review.content.value){
        alert("리뷰를 위한 내용을 작성해 주세요");
        document.product_review.content.focus();
        return;
    }
    document.product_review.submit();
}