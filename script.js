function openSidebar() {
    let asideButtonImg = document.getElementById('menuBImg');
    let aside = document.getElementById("aside");
    aside.style.display = aside.style.display === "flex" ? "none" : "flex";
    if(asideButtonImg.getAttribute('src') === "close.png") {
        asideButtonImg.setAttribute('src', 'menu.png');
    } else {
        asideButtonImg.setAttribute('src', 'close.png');
    }
}

function goToHome() {
    window.location.href = "index.html";
}
function goToManage() {
    window.location.href = "manage.html";
}
function goToAI() {
    window.location.href = "ai.html";
}
function goToSetting() {
    window.location.href = "setting.html";
}
function goToLogin() {
    window.location.href = "login.html"
}

function goToSignUp() {
    window.location.href = "signUp.html"
}
