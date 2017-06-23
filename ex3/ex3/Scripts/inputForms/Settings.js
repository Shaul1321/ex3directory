$(document).ready(function () {
    $("#menuBar").load("../../Views/UpperMenu.html");

    //load previously entered values if there are such
    var rows = sessionStorage.getItem("rows");
    var cols = sessionStorage.getItem("cols");
    var algo = sessionStorage.getItem("algo");
    if (rows !== null && cols !== null) {
        $("#mazeRows").val(rows);
        $("#mazeCols").val(cols);
        $('#algorithmSelect').val(algo);
    }

    //set validation
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
        sessionStorage.setItem("cols", cols);
        sessionStorage.setItem("algo", algo);   
        return true;
    } 
    return false;
}