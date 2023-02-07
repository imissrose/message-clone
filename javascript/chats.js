let messageSetArr = [];
let friendSetArr = [];
let deleteCount = 0;

function loadChatList() {
    messageSetArr = [];
    let messagesHTML = "";

    for(let i=0; i<localStorage.length; i++) {
        if(localStorage.getItem(`friendSetArr`) != null) {
            friendSetArr = JSON.parse(localStorage.getItem(`friendSetArr`));
        }

        if(localStorage.key(i).includes("messageSetArr")) {
            user = localStorage.key(i).replace("messageSetArr", "");

            if(localStorage.getItem(`${user}messageSetArr`) != null) {
                messageSetArr = JSON.parse(localStorage.getItem(`${user}messageSetArr`));
            }

            //id = messageSetArr[messageSetArr.length-1].id;
            //user = messageSetArr[messageSetArr.length-1].user;
            time = messageSetArr[messageSetArr.length-1].time;
            message = messageSetArr[messageSetArr.length-1].message;
            console.log(user, time, message);

            //메시지 길면 ... 으로 생략
            /*if(message.length > 25) {
                message = message.substring(0, 25) + "...";
            }*/

            if(getByte(message) > 50) {
                message = substringByte(message, 50) + "...";
            }
    
            // 채팅화면에 메시지 생성
            let messageHTML = getMessageHTML(user, time, message);
    
            messagesHTML = messagesHTML + messageHTML;
            document.getElementsByClassName("main-screen")[0].innerHTML = messagesHTML;
            console.log(messageSetArr)
        }
        
    }
}

function getMessageHTML(user, time, message) {
    let messageHTML = "";
    //let url = escape("chat.html?userName="+user);
    let url = encodeURI("chat.html?userName="+user); //변환해도 브라우저 url은 동일함
    //let url = encodeURIComponent("chat.html?userName="+user);
    //console.log(url);
    let imagePath = "images/avatar.png";
/*
    for(let i=0; i<friendSetArr.length; i++) {console.log(friendSetArr[i].user);
        if(user === friendSetArr[i].user) {
            imagePath = friendSetArr[i].imagePath;
            break;
        }
    }
*/
    messageHTML =
    //`    <a href="chat.html?userName=${user}">`+
    `    <a href="${url}">`+
    `    <div class="user-component chatUser-component" style="cursor:pointer" id="${user}">`+
    `        <div class="user-component__column">`+
    `           <input type="checkbox" name="deleteCheckBox" style="display:none;" value="${user}" onchange="displayDeleteCount(this)"/>`+
    `           <img `+
    `            src="images/avatar.png" `+
    //`            src="${imagePath}" `+
    `            class="user-component__avatar user-component__avatar"`+
    `            alt=""/>`+
    `            <div class="user-component__text">`+
    `               <h5 class="user-component__title">${user}</h5>`+
    `               <h6 class="user-component__subtitle">${message}</h6>`+
    `            </div>`+
    `        </div>`+
    `        <div class="user-component__column">`+
    `            <span class = "user-component__time">${time}</span>`+
    //`            <!--div class="badge">1</div-->`+
    `        </div>`+
    `    </div>`;
    `    </a>`;

    return messageHTML;
}

function substringByte(str, bytes) {
    let resultStr;
    let sumBytes = 0;
    let i;

    for(i=0; i<str.length; i++) {
        sumBytes += (str.charCodeAt(i) > 128) ? 2 : 1;
        if(sumBytes > bytes) {
            break;
        }
    }

    return str.substring(0, i);
}

function getByte(str) {
    let bytes = 0;
    for(let i=0; i<str.length; i++) {
        bytes += (str.charCodeAt(i) > 128) ? 2 : 1;   
    }
    return bytes;
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
    //document.getElementsByClassName('nav')[0].style.display = "none";
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

    //document.getElementsByClassName('nav')[0].style.display = "";
}

function deleteChatHistory() {
    deleteCheckBox = document.getElementsByName('deleteCheckBox');

    for(let i=0; i<deleteCheckBox.length; i++) {
        if(deleteCheckBox[i].checked){
            document.getElementById(`${deleteCheckBox[i].value}`).style.display = "none";
            
            localStorage.removeItem(`${deleteCheckBox[i].value}messageSetArr`);
        }
    }

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
