
(function ($) {
    // $.fn.drawMaze = function (mazeData, startRow, startCol
    //     , exitRow, exitCol, playerImage, exitImage, enabled, callBack) {
     
    
    var position;
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
    var isOponent;

    $(this).keydown(function (e) {
       if (movementAllowed){ 
        var newRow = position['row'];
        var newCol = position['col'];
        console.log("A MOVE");
        switch (e.which) {
            case 37: // left
                //position['col'] = position['col'] - 1;
                newCol = position['col'] - 1;
                break;

            case 38: // up
                //position['row'] = position['row'] - 1;
                newRow = position['row'] - 1;
                break;

            case 39: // right
                //position['col'] = position['col'] + 1;
                newCol = position['col'] + 1;
                break;

            case 40: // down
                //position['row'] = position['row'] + 1;
                newRow = position['row'] + 1;
                break;

            default: return; // exit this handler for other keys
        }

        if (mazeArray[newRow][newCol] == 0) {
            reDraw();
            position['row'] = newRow;
            position['col'] = newCol;
        }
     }
    });


    function reDraw() {
        //canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

        var exitimg = new Image();
        exitimg.src = "../Views/arrow.png";;

        var img = new Image();
        img.src = playerIcon;

        

        var rows = mazeArray.length;
        var cols = mazeArray[0].length;
        var cellWidth = canvasElement.width / cols;
        var cellHeight = canvasElement.height / rows;
        canvasContext.clearRect(position['col'] * cellHeight, position['row'] * cellWidth, cellWidth, cellHeight);

        
        console.log(cellWidth);
        console.log(cellHeight);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (mazeArray[i][j] == 1) {
                  
                    canvasContext.fillRect(cellWidth * j, cellHeight * i,
                        cellWidth, cellHeight);
                }
            }
        }
        

        exitimg.onload = function () {
            //console.log(exitCol);
            //console.log(exitRow);
            canvasContext.drawImage(exitimg, exitCol * cellWidth, exitRow * cellHeight, cellWidth, cellHeight);
        }

        img.onload = function () {
            canvasContext.drawImage(img, position['col'] * cellWidth, position['row'] * cellHeight, cellWidth, cellHeight);
        }

        canvasContext.fillStyle = "#0073e6";
        //canvasContext.fillRect(cellWidth * exitCol, cellHeight * exitRow,
        //    cellWidth, cellHeight);
        canvasContext.fillStyle = "#000000";

    }

    function h() {
        $(canvasElement).on('keypress', function f() { alert("bye") });
    }

    $.fn.initialize = function (mazeData, initRow, initCol, finishRow, finishCol, playerImg, exitImg, callback) {
        console.log("mazeData is " + mazeData);
        console.log("exit is row:" + finishRow + " col:" + finishCol);
        console.log("start is row:" + initRow + " col:" + initCol);
        position = { 'row': 0, 'col': 0 };
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
        //oponentIcon = oponentImg;
        exitIcon = exitImg;
        position['row'] = initRow;
        position['col'] = initCol;
        //reDraw();
        //this.callbackFunction = callBack;
        console.log("CANVAS CONTEXT IS " + canvasContext + "AND ELEMENT IS " + canvasElement.id);
    }

    $.fn.solve = function (ss) {
        reDraw();
        movementAllowed = false;
        position['row'] = startRow;
        position['col'] = startCol;
        
        console.log("solution is " + ss);
        console.log("exitRow is " + exitRow + "and exitcol is " + exitCol);
        solutionArray = ss;
        timer = setInterval(animate, 300);
        animationIndex = 0;
    }

    function animate() {

        var direction = solutionArray[animationIndex];
        animationIndex++;
        reDraw();
        switch (direction) {
            case "0": //left
                position['col'] = position['col'] - 1;
                break;
            case "1": //right
                position['col'] = position['col']  + 1;
                break;
            case "2": //up
                position['row'] = position['row'] - 1;
                break;
            case "3": //down
                position['row'] = position['row'] + 1;
                break;
        }
        

        if (animationIndex == solutionArray.length) {
            clearInterval(timer)
            movementAllowed = true;
        }
    }

    $.fn.drawMaze = function () {

        var img = new Image();
        img.src = playerIcon;
        var exitimg = new Image();
        exitimg.src = "../Views/arrow.png";

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

                    canvasContext.fillRect(cellWidth * j, cellHeight * i,
                        cellWidth, cellHeight);
                }
            }
        }


        img.onload = function () {;
            canvasContext.drawImage(img, exitCol * cellWidth, exitRow * cellHeight, cellWidth, cellHeight);
        }
        exitimg.onload = function () {
            //canvasContext.drawImage(exitimg, exitCol * cellHeight, exitRow * cellWidth, cellWidth, cellHeight);
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
