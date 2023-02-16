let messageSetArr = [];
let friendSetArr = [];
let deleteCount = 0;
let titleUser = "";
let user = "나";
let imagePath = "images/avatar(2).png";

// 모바일 여부
var isMobile = false;
 
// PC 환경
var filter = "win16|win32|win64|mac";
 
if (navigator.platform) {
    isMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
}

function setUser() {
    //s = document.getElementsByClassName('far fa-smile fa-lg')[0];
    sw = document.getElementsByName('sendImage')[0];
    //user = document.getElementById("user");
    console.log(sw);

    if(sw.style.transform === "" || sw.style.transform === "none") {
        sw.style.transform = "rotateY(0.5turn)";
        user = titleUser;
    } else {
        sw.style.transform = "none";
        user = "나";
    }

}

function loadMessage() {
    messageSetArr = [];

    if(document.getElementsByName("userName")[0].value === "") {
        titleUser = new URLSearchParams(window.location.search).get('userName');
        document.getElementsByName("userName")[0].value = titleUser;
    } else {
        titleUser = document.getElementsByName("userName")[0].value;
    }

    if(localStorage.getItem(`friendSetArr`) != null) {
        friendSetArr = JSON.parse(localStorage.getItem(`friendSetArr`));
    }
    
    if(localStorage.getItem(`${titleUser}messageSetArr`) != null) {
        messageSetArr = JSON.parse(localStorage.getItem(`${titleUser}messageSetArr`));
    }

    let messagesHTML = "";
    let messageHTML = "";
    if(titleUser != null && titleUser != "") {
        messageHTML = 
        `<div class="chat__timestamp">`+
        `오늘`+
        //`    2023년 2월 2일 목요일`+
        //`    ${moment().format('LLLL').substr(0, moment().format('LLLL').length-8)}`+
        //`    ${"2023년 1월 3일 금요일 오후 1:00".substr(0, "2023년 1월 3일 금요일 오후 1:00".length-8)}`+
        `</div>`;
    }

    messagesHTML = messagesHTML + messageHTML;

    let user = "";
    let time = "";
    let message = "";
    let id = 0;
/*
    for(let i=0; i<friendSetArr.length; i++) {
        if(titleUser === friendSetArr[i].user) {
            imagePath = friendSetArr[i].imagePath;
            break;
        }
    }
*/
    for(let i=0; i<messageSetArr.length; i++) {
        id = messageSetArr[i].id;
        user = messageSetArr[i].user;
        time = messageSetArr[i].time;
        message = messageSetArr[i].message;
        //console.log(user, time, message);

        // 채팅화면에 메시지 생성
        messageHTML = getMessageHTML(id, user, imagePath, time, message);

        messagesHTML = messagesHTML + messageHTML;
        document.getElementsByClassName("main-screen main-chat")[0].innerHTML = messagesHTML;
    }

    document.getElementsByClassName("main-screen main-chat")[0].innerHTML = messagesHTML;

    // 스크롤 내리기
    window.scrollTo(0, document.body.scrollHeight);
    //console.log(messageSetArr);
}

function sendMessage(message) {
    if(titleUser == null || titleUser ==="") {
        return false;
    }

    //let messageSetArr = [];
    let time = moment(Date()).format('LT');
    //let user = "나";
    let id = Date.now();

    /*if(document.getElementsByClassName('far fa-smile-wink fa-lg')[0].style.display==='none') {
        //user = "엄마";
        user = titleUser;//document.getElementsByName("userName")[0].value;
    }*/

    /*if(localStorage.getItem('messageSetArr') != null) {
        messageSetArr = JSON.parse(localStorage.getItem('messageSetArr'));
    }*/
    //messageSetArr.push([{user:`${user}`}, {time:`${time}`}, {message:`${message}`}]);
    //messageSetArr.push([{user:`${user}`, time:`${time}`, message:`${message}`}]);
    messageSetArr.push({id:`${id}`, user:`${user}`, time:`${time}`, message:`${message}`});
    localStorage.setItem(`${titleUser}messageSetArr`, JSON.stringify(messageSetArr));

    //messageSetArr = JSON.parse(localStorage.getItem('messageSetArr'));
    //console.log(messageSetArr);

    // 채팅화면에 메시지 생성
    let messagesHTML = document.getElementsByClassName("main-screen main-chat")[0].innerHTML;
    let messageHTML = getMessageHTML(id, user, imagePath, time, message);

    messagesHTML = messagesHTML + messageHTML;
    document.getElementsByClassName("main-screen main-chat")[0].innerHTML = messagesHTML;

    // inputBox 지움
    replyForm.replyInputBox.value = "";

    // 스크롤 내리기
    window.scrollTo(0, document.body.scrollHeight);
}

function getMessageHTML(id, user, imagePath, time, message) {
    let messageHTML = "";

    if(user === "나") {
        messageHTML = 
        `<div class="message-row message-row--own" id="${id}">`+
        `    <div class="message-row__content">`+
        `    <div class="message__info">`+
        `        <span class="message__bubble" style="background-color:#5D7FFD;color:white;">${message}</span>`+
        //`        <span class="message__bubble" style="background-color:#5D7FFD;color:white;" onmouseup="copyText=document.execCommand('copy');">${message}</span>`+
        `        <span class="message__time">${time}</span>`+
        `    </div>`+
        `    </div>`+
        `    <input type="checkbox" name="deleteCheckBox" style="display:none;" value="${id}" onChange="displayDeleteCount(this)"/>`+
        `</div>`;

    } else {
        messageHTML = 
        `<div class="message-row" id="${id}">`+
        `    <input type="checkbox" name="deleteCheckBox" style="display:none;" value="${id}" onChange="displayDeleteCount(this)"/>`+
        `    <div style="position: relative;"><img src="images/gray.png" style="z-index:0;"/><div style="position:absolute;top:10.5px;left:9.5px;font-size:20px;color:white;">${titleUser.substring(0, 1)}</div></div>`+
        //`    <button style="width:40px;height:40px;border-radius:50%;background-color:#BFBFBF;border:0;font-size:20px;color:white;resize:none;">${titleUser.substring(0, 1)}</button><div>&nbsp;&nbsp;</div>`+
        //`    <img src="${imagePath}" />`+
        `    <div class="message-row__content">`+
        //`      <span class="message__author">${user}</span>`+
        `      <div class="message__info">`+
        `        <span class="message__bubble">${message}</span>`+
        //`        <span class="message__bubble" onmouseup="copyText=document.execCommand('copy');">${message}</span>`+
        `        <span class="message__time" style="width:130px;">${time}</span>`+
        `      </div>`+
        `    </div>`+
        `</div>`;
    }

    return messageHTML;
}

function showHideDeleteCheck() {
    deleteCheckBox = document.getElementsByName('deleteCheckBox');

    if(deleteCheckBox.length > 0 && deleteCheckBox[0].style.display === "") {
        hideDeleteCheck();
    } else {
        showDeleteCheck();
    }
}

function showDeleteCheck() {
    //deleteCheck = document.getElementsByClassName('delete_check');
    deleteCheckBox = document.getElementsByName('deleteCheckBox');

    for(let i=0; i<deleteCheckBox.length; i++) {
        //deleteCheck[i].style.display = "";
        deleteCheckBox[i].style.display = "";
    }

    document.getElementsByName('deleteForm')[0].style.display = "";
}

function hideDeleteCheck() {
    //deleteCheck = document.getElementsByClassName('delete_check');
    deleteCheckBox = document.getElementsByName('deleteCheckBox');

    for(let i=0; i<deleteCheckBox.length; i++) {
        //deleteCheck[i].style.display = "none";
        deleteCheckBox[i].style.display = "none";
        deleteCheckBox[i].checked = false;
    }

    document.getElementsByName('deleteForm')[0].style.display = "none";
    deleteCount = 0;
    document.getElementsByName('deleteCount')[0].value = "";
}

function deleteComments() {
    deleteCheckBox = document.getElementsByName('deleteCheckBox');

    for(let i=0; i<deleteCheckBox.length; i++) {
        if(deleteCheckBox[i].checked){
            document.getElementById(`${deleteCheckBox[i].value}`).style.display = "none";
            
            for(let j=0; j<messageSetArr.length; j++) {
                if(deleteCheckBox[i].value === messageSetArr[j].id) {
                    console.log(messageSetArr[j]);
                    messageSetArr.splice(j, 1);
                    console.log(messageSetArr);
                    j--;
                }
            }
        }
    }

    localStorage.setItem(`${titleUser}messageSetArr`, JSON.stringify(messageSetArr));
    document.getElementsByName('deleteCount')[0].value = `${deleteCount}건 삭제되었습니다.`
    deleteCount = 0;
}

function displayDeleteCount(obj) {
    if(obj.checked) {
        deleteCount++;
    } else {
        deleteCount--;
    }

    //document.getElementsByClassName('delete__column')[0].innerText = `${deleteCount}건 선택되었습니다.`
    document.getElementsByName('deleteCount')[0].value = `${deleteCount}건 선택되었습니다.`
}

function modifyTitleUser() {
    loadMessage();
}

/*
function copyToClipBoard() {
    var content = document.getElementById('textArea');
    content.select();
    content.setSelectionRange(0, 99999);   // 모바일 브라우저(ios)에서의 동작을 위한 추가코드
    document.execCommand('copy');
    content.setSelectionRange(0, 0);       // 모바일 브라우저(ios)에서의 동작을 위한 추가코드
}*/
