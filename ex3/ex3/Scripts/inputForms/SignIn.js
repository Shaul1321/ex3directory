
$(document).ready(function () {
    $("#menuBar").load("/Views/UpperMenu.html");
    $("#passwordsMisMatch").hide();
    $("#userAlreadyExist").hide();
    $("#loader").hide();

    var rules = {
        userName: {
            required: true,
        },
        password: {
            required: true,
        },
        repeat_password: {
            required: true,
            equalTo: '#inputPassword',
        },
        email: {
            required: true,
            email: true,
        }
    };
    $('#signForm').validate({
        rules: rules,
        messages: {
            repeat_password: {
                equalTo: "Please repeat the password accurately."
            }
        }
    })
});



function signIn() {

    if ($('#signForm').valid()) {
        var userName = $("#inputName").val();
        var password = $("#inputPassword").val();
        if (userName == "" || password == "") {
            alert("Please enter userName and password.");
            return;
        }
        var reenteredPassword = $("#inputPassword2").val();
        if (reenteredPassword != password) {
            $("#passwordsMisMatch").show();
            return;
        }
        $("#loader").show();
        var apiuri = "/api/Users/addUser/" + userName + "/" + password;
        $.get(apiuri).done(function (response, status) {

            sessionStorage.setItem("name", userName);
            window.location.href = "../Views/index.html";
            $("#loader").hide();
        }).fail(function (response, status) {
            $("#loader").hide();
            $("#userAlreadyExist").show();
        });
    }
}
