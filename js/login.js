//login.js
document.login_form.id.focus();


function check_input(){
    if(!document.login_form.id.value){
        alert("아이디를 입력하세요.");
        document.login_form.id.focus();
        return;
    }
    if(!document.login_form.pass.value){
        alert("비밀번호를 입력하세요.");
        document.login_form.pass.focus();
        return;
    }
    document.login_form.submit();
}


//자바스크립트 영역
var passInput = document.querySelector("[name='pass']");
//console.log(passInput);

passInput.addEventListener("keydown", function(evt){
    //console.log(evt.keyCode);
    if(evt.keyCode == 13){
        check_input();
    }
});


//제이쿼리 영역
/*
$(document).ready(function(){
    $("#login_box").keydown(function(e){
        if(e.keyCode == 13){
            if($("[name='id']").val().length < 1 || $("[name='pass']").val().length < 1){
                alert("로그인 정보가 다릅니다. 확인 바랍니다.");
                $("[name='id']").focus();
            }else{
                $("#login_box form").submit();
            }
        }
    });
});

*/







