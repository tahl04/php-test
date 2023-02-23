document.faq_form.subject.focus();  //브라우저가 열리자마자 제목 입력상자에 초점을 맞춘다.

function check_input(){
    if(!document.faq_form.subject.value){
        alert("FAQ 게시글 제목을 작성하세요");
        document.faq_form.subject.focus();
        return;
    }
    if(!document.faq_form.content.value){
        alert("FAQ 게시글 내용을 작성하세요");
        document.faq_form.content.focus();
        return;
    }
    document.faq_form.submit();
}