
var nameOfMazeGenerated;
//var mazeBoard;

function solveGame() {
    $('#btnSolve').addClass('disabled');
    var algorithm = $("#algorithmSelect").val();
    var algoCode = 0;
    if (algorithm == "DFS") {
        var algoCode = 1;
    }
    var apiuri = "/api/SinglePlayer/" + nameOfMazeGenerated + "/" + algoCode;
    $.get(apiuri).done(function (solutionJson, status) {
        var solutionString = solutionJson.Solution;
        var solutionArray = new Array(solutionString.length);
        for (var i = 0; i < solutionString.length; i++) {
            solutionArray[i] = solutionString[i];
        }
        var board = $("#myCanvas").solve(solutionArray);
    }).fail(function () {
        alert("No connection to server.");
    });
}


function startGame() {

    var rows = $("#mazeRows").val();
    var cols = $("#mazeCols").val();
    var mazeName = $("#mazeName").val();

    if (rows < 2 || cols < 2 || rows > 100 || cols > 100) {
        $("#argumentsError").show();
        return;
    }

    $('#btnStart').addClass('disabled');
    $('#btnSolve').removeClass('disabled');
    $("#loader").show();
    $("#argumentsError").hide();
    nameOfMazeGenerated = mazeName;
    document.title = nameOfMazeGenerated;
    var apiuri = "/api/SinglePlayer/" + mazeName + "/" + rows + "/" + cols;
    $.post(apiuri).done(function (mazeJson) {

        //when done load the maze propertieis from the json
        var mazeString = mazeJson.Maze;

        //console.log("json: " + mazeString);
        var startRow = mazeJson.Start.Row;
        var startCol = mazeJson.Start.Col;
        var endRow = mazeJson.End.Row;
        var endCol = mazeJson.End.Col;

        var rows = mazeJson.Rows;
        var cols = mazeJson.Cols;
        var mazeArray = new Array(rows);
        for (var i = 0; i < rows; i++) {
            mazeArray[i] = new Array(cols);
        }

        //fill maze board array
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                mazeArray[i][j] = 1;
                if (mazeString[i * cols + j] === "0") {
                    mazeArray[i][j] = 0;
                }
            }
        }

        //update the board
        var playerImage = "../Views/icon.png";
        var exitImage = "../Views/arrow.png"
        var oponentImage = "../Views/oponentIcon.png";
        $("#myCanvas").initialize(mazeArray, startRow, startCol, endRow, endCol, playerImage, exitImage);
        $("#myCanvas").drawMaze();

        $("#btnloading").hide();
        $("#loader").hide();
        $("#myCanvas").show();
    }).fail(function () {
        alert("No connection to server.");
    });
}

$(document).keydown(function (e) {
    var key = e.which;
    if (key == 37 || key == 38 || key == 39 || key == 40) {
        e.preventDefault();
        $("#myCanvas").playerMoved(e);
    }
    // prevent the default action (scroll / move caret)
});



function myFunction(event) {
    var x = event.which || event.keyCode;
    //alert(x);
}
