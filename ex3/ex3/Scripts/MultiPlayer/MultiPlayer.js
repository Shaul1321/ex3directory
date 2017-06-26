

var messagesHub;

//if the user is not logged in, transfer him to the sign in page.
if (!sessionStorage['name']) {
    window.location.href = "../Views/SignIn.html";
}
else{
/**
* register to events in the hub.
**/
(function () {
    messagesHub = $.connection.multiPlayerHub;
    messagesHub.client.oponentMoved = function (direction) {
        $("#oponentCanvas").oponentMoved(direction);
    }
    messagesHub.client.oponentJoined = function (serializedMaze) {
        $('#btnJoin').addClass('disabled');
        $('#btnStart').addClass('disabled');
        $('#btnwaiting').hide();
        initialzieBoards(serializedMaze);
    };
    //messagesHub.disconnect(function () {
    //    alert('Server has disconnected');
    //});
})();

/***
* register to a keydown event in the document
* if it's an arrow key press, move the event to the plugin
***/
$(document).keydown(function (e) {
    var moved = $("#myCanvas").playerMoved(e);
    var direction;
    switch (e.which) {
        case 37: //left
            direction = "0";
            break;
        case 38: //up
            direction = "2";
            break;
        case 39: //right
            direction = "1";
            break;
        case 40: //down
            direction = "3";
            break;
    }
    if (moved) {
        var mazeName = $("#mazeName").val();
        messagesHub.server.notifyPlayerHasMoved(sessionStorage['name'], mazeName, direction).fail(function () {alert("no connection to server." )});;
    }

});


/**
* validation setup
**/
$(document).ready(function () {

    //validation setup
    var rules = {
        mazeName: {
            required: true,
        },
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
    $('#multiplayer_arguments').validate({
        rules: rules
    })


    //style
    $('#btnloading').hide();
    $('#btnSolve').addClass('disabled');
    $('#btnJoin').addClass('disabled');
    $('#btnwaiting').hide();
    $("#menuBar").load("../../Views/UpperMenu.html");

    //ask for a list of available mazes
    var apiuri = "/api/MultiPlayer/list";
    $.get(apiuri).done(function (listJson, status) {
        if (status == "success") {
            listJson = listJson.slice(1, listJson.length - 1);
            var array = listJson.split(',');
            if (array[0] == "") {
                return;
            }


            $('#btnJoin').removeClass('disabled');
            //dyamically add the maze names to the select element
            for (var i = 0; i < array.length; i++) {
                var mazeName = array[i].slice(1, array[i].length - 1);
                $('#gameSelect').append($('<option>', {
                    value: null,
                    text: mazeName
                }));
            }
        }
    }).fail(function () { alert("no connection to server") });

})

/**
 * a callback function that is called by the plugin when the player has won.
 * notify the server about the winning and raise an alert
 */
function hasWon() {
    var apiuri = "/api/Users/updateScore/" + sessionStorage['name'] + "/true";
    $.get(apiuri).done(function (solutionJson) {
        return;
    }).fail(function () { alert("failed sending data to server.") });
    alert("You have won! Press ok to return to the main page.");
    window.location.href = "../Views/index.html";
}

/**
 * a callback function that is called by the plugin when the player has lost.
 * notify the server about the lose and raise an alert
 */
function hasLost() {
    var apiuri = "/api/Users/updateScore/" + sessionStorage['name'] + "/false";
    $.get(apiuri).done(function (solutionJson) {
        return;
    }).fail(function () { alert("failed sending data to server.") });
    alert("You have lost! Press ok to return to the main page.");
    window.location.href = "../Views/index.html";
}

/**
 * sends an ajax request to start a new multiplayer game
 */
function startGame() {
    if ($('#multiplayer_arguments').valid()) {
        //connect to hub
        $.connection.hub.start().done(function () {
            var mazeName = $("#mazeName").val();
            messagesHub.server.connect(sessionStorage['name'], mazeName);
        }).fail(function () {alert("server is down. Could not connect.")});

        //style
        $('#btnStart').addClass('disabled');
        $('#mazeRows').prop('disabled', true);
        $('#mazeCols').prop('disabled', true);
        $('#mazeName').prop('disabled', true);

        //collect arguments
        var rows = $("#mazeRows").val();
        var cols = $("#mazeCols").val();
        var mazeName = $("#mazeName").val();

        //asks for a new multiplayer game
        var apiuri = "/api/MultiPlayer/start/" + mazeName + "/" + rows + "/" + cols;
        $.get(apiuri).done(function (solutionJson, status) {
            return;
        }).fail(function () { alert("no connection to server") });
        $('#btnwaiting').show();
    }
}

/**
 * a callback function that is invoked by the server hub when the oponent has moved
 * invokes oponentMoved() method in the plugin to move the oponent icon

 * @param {int} direction the direction of movement (as specified in the instructions)
 */
function OponentMoved(direction) {
    $("#oponentCanvas").oponentMoved(direction);
}


/**
 * initializes the player board and the oponent board
 * @param {any} mazeJson the json of the maze received from server
 */
function initialzieBoards(mazeJson) {
    //collect arguments
    var mazeString = mazeJson.Maze;
    $('#btnJoin').addClass('disabled');
    $('#btnStart').addClass('disabled');
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
            if (mazeString[i * rows + j] == '0') {
                mazeArray[i][j] = 0;
            }
        }
    }

    //update the boards
    var playerImage = "../Views/images/icon.png";
    var oponentImage = "../Views/images/oponentIcon.png";
    var exitImage = "../Views/images/arrow.png"
    var exitImage2 = "../Views/images/arrow2.png"
    var board = $("#myCanvas").initialize(mazeArray, startRow, startCol, endRow, endCol, playerImage, exitImage2, hasWon);
    var board = $("#myCanvas").drawMaze();
    var board2 = $("#oponentCanvas").initialize(mazeArray, startRow, startCol, endRow, endCol, oponentImage, exitImage, hasLost);
    var board2 = $("#oponentCanvas").drawMaze();
}

/**
 * invoked when the player asked to join an existing game.
 * connects to the hub and sends a join request to the server. After  a maze was received, notifies the oponent via the hub.
 */
function joinGame() {

    $.connection.hub.start().done(function () {
        var mazeToJoin = $("#gameSelect").val();
        messagesHub.server.connect(sessionStorage['name'], mazeToJoin);
        var apiuri = "/api/MultiPlayer/join/" + mazeToJoin;
        $.get(apiuri).done(function (mazeJson, status) {
            if (status != "success") { return; }

            $('#mazeRows').prop('disabled', true);
            $('#mazeCols').prop('disabled', true);
            $('#mazeName').prop('disabled', true);
            initialzieBoards(mazeJson);
            messagesHub.server.notifyGameStarted(sessionStorage['name'], mazeToJoin, mazeJson);
        });
    }).fail(function(){alert("connection error")})
 }
}