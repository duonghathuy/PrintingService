document.addEventListener("DOMContentLoaded", function () {
    let usernameInput = document.querySelector("input[name='username']");
    let emailInput = document.querySelector("input[name='email']");
    let passwordInput = document.querySelector("input[name='password']");
    let confirmPasswordInput = document.querySelector("input[name='confirm-password']");
    let signUpForm = document.querySelector("form");

    signUpForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let usernameValue = usernameInput.value;
        let idValue = '2';
        let emailValue = emailInput.value;
        let passwordValue = passwordInput.value;
        let confirmPasswordValue = confirmPasswordInput.value;

        if(passwordValue !== confirmPasswordValue) {
            window.alert('Mật khẩu xác nhận không khớp. Vui lòng thử lại!')
            passwordInput.value = "";
            confirmPasswordInput.value = "";
            
            return false;
        };

        $.ajax({
            type: "POST",
            url: "SignUp.php",
            data: {
                'username': usernameValue,
                'id': idValue,
                'email': emailValue,
                'password': passwordValue
            },
            success: function (response) {
                let data = JSON.parse(response);
                window.alert(data);
            },
            fail: function() {
                console.log('fail');
            }
        });
    });
});