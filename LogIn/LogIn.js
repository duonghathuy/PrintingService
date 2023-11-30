document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".login-btn").addEventListener('click', function(e) {
        e.preventDefault();

        validateCredentials();
    })
})

function validateCredentials() {
    let usernameInput = document.querySelector("input[name='username']");
    let passwordInput = document.querySelector("input[name='password']");

    let usernameValue = usernameInput.value.trim();
    let passwordValue = passwordInput.value.trim();

    if(usernameValue == "" || passwordValue == "") {
        window.alert("Vui lòng cung cấp đầy đủ thông tin đăng nhập!");
        return false;
    }

    $.ajax({
        type: "POST",
        url: "LogIn.php",
        data: {
            username: usernameValue,
            password: passwordValue
        },
        success: function (response) {
            let data = JSON.parse(response);

            let msg = data['response'];
            let success = data['success'];
            let id = data['id'];
            let name = data["lname"] +' '+ data["fname"];
            
            if(success == 1) {
                window.alert(msg);
                sessionStorage.setItem("ID", id);
                sessionStorage.setItem("Username", name);
                window.location.href = '../StudentServices/StudentServices.html';
            } else {
                window.alert(msg);
                window.location.reload()
            }
        }
    });
}