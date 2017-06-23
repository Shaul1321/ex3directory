$(document).ready(function () {

    //style 
    $('#btnSolve').addClass('disabled');
    $("#menuBar").load("/Views/UpperMenu.html");
    $("#myCanvas").hide();
    $("#btnloading").hide();
    $("#loader").hide();
    $("#argumentsError").hide();

    var rows = sessionStorage.getItem("rows");
    var cols = sessionStorage.getItem("cols");
    var algo = sessionStorage.getItem("algo");
    if (rows !== null && cols !== null) {
        $("#mazeRows").val(rows);
        $("#mazeCols").val(cols);
        $('#algorithmSelect').val(algo);
    }

    //validation setup
    var rules = {
        mazeName: {
            required: true,
        },
        mazeRows: {
            required: true,
            number: true,
            digits: true,
            range: [2,100]
        },
        mazeCols: {
            required: true,
            number: true,
            digits: true,
            range: [2, 100]
        }
    };
    $('#singlePlayer_arguments').validate({
        rules: rules
    })

})