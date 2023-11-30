document.addEventListener("DOMContentLoaded", function() {
    let username = sessionStorage.getItem("Username");
    let usernameHeader = document.querySelector(".username-header");

    usernameHeader.innerHTML = username;

    usernameHeader.addEventListener("click", function(){
        window.location.href = '../Profile/Profile.html';
    })

})

