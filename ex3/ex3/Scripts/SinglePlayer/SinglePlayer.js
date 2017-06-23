
var nameOfMazeGenerated;

/**
 * requests a soltuion from the server, parses the json received and draws it on the board using the plugin.
 */
function solveGame() {
    //collect arguments
    $('#btnSolve').addClass('disabled');
    var algorithm = $("#algorithmSelect").val();
    var algoCode = 0;
    if (algorithm == "DFS") {
        var algoCode = 1;
    }

    //ajax solution request
    var apiuri = "/api/SinglePlayer/" + nameOfMazeGenerated + "/" + algoCode;
    $.get(apiuri).done(function (solutionJson, status) {
        var solutionString = solutionJson.Solution;
        //fill array
        var solutionArray = new Array(solutionString.length);
        for (var i = 0; i < solutionString.length; i++) {
            solutionArray[i] = solutionString[i];
        }
        //animate the solution
        var board = $("#myCanvas").solve(solutionArray);
    }).fail(function () {
        alert("No connection to server.");
    });
}

/**
 * a callback function that is called by the plugin when the player has won.
 */
function hasWon() {
    alert("You have won! Press ok to return to the main page.");
    window.location.href = "../Views/index.html";
}

/**
 * send an ajax request for starting a new game, parses the maze json received
*  and displayes the board
 */

function startGame() {
   if ($('#singlePlayer_arguments').valid()) {
    //collect arguments
    var rows = $("#mazeRows").val();
    var cols = $("#mazeCols").val();
    var mazeName = $("#mazeName").val();

    $('#btnStart').addClass('disabled');
    $('#btnSolve').removeClass('disabled');
    $("#loader").show();
    $("#argumentsError").hide();

    nameOfMazeGenerated = mazeName;
    document.title = nameOfMazeGenerated;

    //ask for a new maze via ajax
    var apiuri = "/api/SinglePlayer/" + mazeName + "/" + rows + "/" + cols;
    $.post(apiuri).done(function (mazeJson, status) {
        if (status !== "success") {
            return;
        }
        $('#mazeRows').prop('disabled', true);
        $('#mazeCols').prop('disabled', true);
        $('#mazeName').prop('disabled', true);
        //when done load the maze propertieis from the json
        var mazeString = mazeJson.Maze;

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
        var playerImage = "../Views/images/icon.png";
        var exitImage = "../Views/images/arrow.png"
        var oponentImage = "../Views/images/oponentIcon.png";
        $("#myCanvas").initialize(mazeArray, startRow, startCol, endRow, endCol, playerImage, exitImage, hasWon);
        $("#myCanvas").drawMaze();

        $("#btnloading").hide();
        $("#loader").hide();
        $("#myCanvas").show();
    }).fail(function () {
        alert("No connection to server.");
        });
   }
}

/**
 * registers to a arrow-key press event. transfers the event to the plugin in order to handle the player movement.
 */
$(document).keydown(function (e) {
    var key = e.which;
    if (key == 37 || key == 38 || key == 39 || key == 40) {
        e.preventDefault();
        $("#myCanvas").playerMoved(e);
    }
});
