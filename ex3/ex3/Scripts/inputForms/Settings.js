$(document).ready(function () {
    $("#menuBar").load("/Views/UpperMenu.html");

    var rules = {
        mazeRows: {
            required: true,
            number: true,
            digits: true,
            range: [2, 100]
        },
        mazeCols: {
            required: true,
            number: true,
            digits: true,
            range: [2, 100]
        }
    };
    $('#mainForm').validate({
        rules: rules
    })
});



function saveSettings() {

    if ($("#mainForm").valid()) {
        var rows = $("#mazeRows").val();
        var cols = $("#mazeCols").val();
        var algo = $("#algorithmSelect").val();
        sessionStorage.setItem("rows", rows);
        sessionStorage.setItem("cols", rows);
        sessionStorage.setItem("algo", algo);      
    } 
}