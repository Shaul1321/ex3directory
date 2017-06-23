(function ($) {
    // $.fn.drawMaze = function (mazeData, startRow, startCol
    //     , exitRow, exitCol, playerImage, exitImage, enabled, callBack) {
     
    
    var canvasElement;
    var canvasContext;
    var mazeArray;
    var movementAllowed; 
    var startRow;
    var startCol;
    var exitRow;
    var exitCol;
    var callbackFunction;
    var animationIndex = 0;
    var solutionArray;
    var ss;
    var timer;
    var playerIcon;
    var exitIcon;
    var oponentIcon;
    var exitIcon2;

    /*
    $(this).keydown(function (e) {
        if (movementAllowed) { 
            canvasElement = this[0];
            var pos = $(canvasElement).data("position");
            var newRow = pos['row'];
            var newCol = pos['col'];
        console.log("A MOVE");
        switch (e.which) {
            case 37: // left
                //position['col'] = position['col'] - 1;
                newCol = pos['col'] - 1;
                break;
            case 38: // up
                //position['row'] = position['row'] - 1;
                newRow = pos['row'] - 1;
                break;
            case 39: // right
                //position['col'] = position['col'] + 1;
                newCol = pos['col'] + 1;
                break;
            case 40: // down
                //position['row'] = position['row'] + 1;
                newRow = pos['row'] + 1;
                break;
            default: return; // exit this handler for other keys
        }
        if (mazeArray[newRow][newCol] == 0) {
            reDraw();
            $(canvasElement).data("position", { row: newRow, col: newCol });           
        }
     }
    });
    */

    function isWithinBoard(row, col) {
        return (row >= 0) && (row <= mazeArray.length - 1) && (col >= 0) && (col <= mazeArray[0].length - 1);
    }

    function handleKeyPress(e) {
        if (movementAllowed) {
            var pos = $(canvasElement).data("position");
            var newRow = pos['row'];
            var newCol = pos['col'];
            switch (e.which) {
                case 37: // left
                    //position['col'] = position['col'] - 1;
                    newCol = pos['col'] - 1;
                    break;

                case 38: // up
                    //position['row'] = position['row'] - 1;
                    newRow = pos['row'] - 1;
                    break;

                case 39: // right
                    //position['col'] = position['col'] + 1;
                    newCol = pos['col'] + 1;
                    break;

                case 40: // down
                    //position['row'] = position['row'] + 1;
                    newRow = pos['row'] + 1;
                    break;

                default: return; // exit this handler for other keys
            }


            if (isWithinBoard(newRow, newCol) && mazeArray[newRow][newCol] == 0) {
                reDraw();
                $(canvasElement).data("position", { row: newRow, col: newCol });
                var pos = $(canvasElement).data("position");
                if (pos['row'] == exitRow && pos['col'] == exitCol) {
                    var callbackFunction = $(canvasElement).data("callback");
                    callbackFunction();
                }
                return true;
            } else {
                return false;
            }
        }
    }

    function cleanPlayerImage() {
        var cellWidth = canvasElement.width / cols;
        var cellHeight = canvasElement.height / rows;
        var ctx = $(canvasElement).data("canvasContext");
        var pos = $(canvasElement).data("position");
        //ctx.clearRect(pos['col'] * cellWidth, pos['row'] * cellHeight, cellWidth, cellHeight);
    }

    function reDraw() {

        //canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        var ctx = $(canvasElement).data("canvasContext");
        var exitimg = new Image();
        exitimg.src = "../Views/arrow.png";;

        var img = new Image();
        img.src = $(canvasElement).data("player_icon");


        var rows = mazeArray.length;
        var cols = mazeArray[0].length;
        var cellWidth = canvasElement.width / cols;
        var cellHeight = canvasElement.height / rows;
        var pos = $(canvasElement).data("position");
        ctx.clearRect(pos['col'] * cellWidth, pos['row'] * cellHeight, cellWidth, cellHeight);

        
        console.log(cellWidth);
        console.log(cellHeight);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (mazeArray[i][j] == 1) {
                  
                    ctx.fillRect(cellWidth * j, cellHeight * i,
                        cellWidth, cellHeight);
                }
            }
        }
        

        exitimg.onload = function () {
            //console.log(exitCol);
            //console.log(exitRow);
            ctx.drawImage(exitimg, exitCol * cellWidth, exitRow * cellHeight, cellWidth, cellHeight);
        }

        img.onload = function () {
            //canvasContext.drawImage(img, position['col'] * cellWidth, position['row'] * cellHeight, cellWidth, cellHeight);
            pos = $(canvasElement).data("position");
            ctx.drawImage(img, pos['col'] * cellWidth, pos['row'] * cellHeight, cellWidth, cellHeight);
        }

        canvasContext.fillStyle = "#0073e6";
        //canvasContext.fillRect(cellWidth * exitCol, cellHeight * exitRow,
        //    cellWidth, cellHeight);
        canvasContext.fillStyle = "#000000";
        return this;
    }

    function h() {
        $(canvasElement).on('keypress', function f() { alert("bye") });
    }

    $.fn.playerMoved = function (e) {
        canvasElement = this[0];
        var moved = handleKeyPress(e);
        return moved;
    }

    $.fn.initialize = function (mazeData, initRow, initCol, finishRow, finishCol, playerImg, exitImg, callback) {

        mazeArray = mazeData;
        element = $(this)[0];
        canvasElement = element;
        var context = canvasElement.getContext("2d");
        canvasContext = context;
        movementAllowed = true;

        startRow = initRow;
        startCol = initCol;
        exitRow = finishRow;
        exitCol = finishCol;
        playerIcon = playerImg;
        //this.playerImage = playerImg;
        $(canvasElement).data("player_icon", playerImg);
        $(canvasElement).data("position", { row: initRow, col: initCol });
        $(canvasElement).data("canvasContext", context);
        $(canvasElement).data("start", { row: initRow, col: initCol });
        $(canvasElement).data("end", { row: exitRow, col: exitCol });
        $(canvasElement).data("callback", callback);
        //oponentIcon = oponentImg;
        exitIcon = exitImg;
        //$(canvasElement).keypress(function (e) { handleKeyPress(e) });
        //$(document).on('keypress', this, function (e) { handleKeyPress(e)});
        return this;
    }
    
    $.fn.solve = function (ss) {
        reDraw();
        movementAllowed = false;
        $(canvasElement).data("position", { row: startRow, col: startCol });

        solutionArray = ss;
        timer = setInterval(animate, 300);
        animationIndex = 0;
    }

    function animate() {

        var direction = solutionArray[animationIndex];
        animationIndex++;
        reDraw();
        var pos = $(canvasElement).data("position");
        switch (direction) {
            case "0": //left
                pos['col'] = pos['col'] - 1;
                break;
            case "1": //right
                pos['col'] = pos['col']  + 1;
                break;
            case "2": //up
                pos['row'] = pos['row'] - 1;
                break;
            case "3": //down
                pos['row'] = pos['row'] + 1;
                break;
        }
        

        if (animationIndex == solutionArray.length) {
            clearInterval(timer)
            movementAllowed = true;
        }
    }

    $.fn.oponentMoved = function (direction) {
        canvasElement = this[0];
        reDraw();
        //cleanPlayerImage();

        var pos = $(canvasElement).data("position");

        switch (direction) {
            case "0": //left
                pos['col'] = pos['col'] - 1;
                break;
            case "1": //right
                pos['col'] = pos['col'] + 1;
                break;
            case "2": //up
                pos['row'] = pos['row'] - 1;
                break;
            case "3": //down
                pos['row'] = pos['row'] + 1;
                break;
        }
        reDraw()
        var pos = $(canvasElement).data("position");
        if (pos['row'] == exitRow && pos['col'] == exitCol) {
            var callbackFunction = $(canvasElement).data("callback");
            callbackFunction();
        }
      
    }

    $.fn.drawMaze = function () {
        var ctx = $(canvasElement).data("canvasContext");
        var img = new Image();
        img.src = $(canvasElement).data("player_icon");
        var exitimg = new Image();
        exitimg.src = "../Views/images/arrow.png";
       
        var rows = mazeArray.length;
        var cols = mazeArray[0].length;
        console.log("there are " + rows + " and " + cols + "columns");
        var cellWidth =  canvasElement.width / cols;
        var cellHeight = canvasElement.height / rows;
        console.log("width is " + cellWidth + " and height is " + cellHeight);
        console.log(cellWidth);
        console.log(cellHeight);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (mazeArray[i][j] == 1) {

                    ctx.fillRect(cellWidth * j, cellHeight * i,
                        cellWidth, cellHeight);
                }
            }
        }


        img.onload = function () {;
            //canvasContext.drawImage(img, position['col'] * cellWidth, position['row'] * cellHeight, cellWidth, cellHeight);
            //console.log("I DRAW AN IMAGE " + img.src + " ON context " + ctx);
            pos = $(canvasElement).data("position"); 
            ctx.drawImage(img, pos['col'] * cellWidth, pos['row'] * cellHeight, cellWidth, cellHeight);
        }
        exitimg.onload = function () {
            ctx.drawImage(exitimg, exitCol * cellWidth, exitRow * cellHeight, cellWidth, cellHeight);
        }

        console.log(playerIcon);
        console.log(exitIcon);
        canvasContext.fillStyle = "#0073e6";
        //canvasContext.fillRect(cellWidth * exitCol, cellHeight * exitRow,
        //   cellWidth, cellHeight);
        canvasContext.fillStyle = "#000000";
        return this;
    }
})(jQuery);
