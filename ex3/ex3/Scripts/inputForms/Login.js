
$(document).ready(function () {
    $("#menuBar").load("/Views/UpperMenu.html");
    $("#loginErrorMessage").hide();
    $("#loader").hide();

    var rules = {
        userName: {
            required: true,
        },
        password: {
            required: true,
        }
    };
    $('#loginForm').validate({
        rules: rules
    })
});



function logIn() {
    if ($("#loginForm").valid()) {
        $("#loginErrorMessage").hide();
        var userName = $("#inputName").val();
        var password = $("#inputPassword").val();
        $("#loader").show();
        var apiuri = "/api/Users/Login/" + userName + "/" + password;
        $.get(apiuri).done(function (response, status) {
            sessionStorage.setItem("name", userName);
            window.location.href = "../Views/index.html";
            $("#loader").hide();
        }).fail(function (response, status) {
            $("#loader").hide();
            $("#loginErrorMessage").show();
        });
    }
}