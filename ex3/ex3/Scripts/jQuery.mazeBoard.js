
(function ($) {
    // $.fn.drawMaze = function (mazeData, startRow, startCol
    //     , exitRow, exitCol, playerImage, exitImage, enabled, callBack) {
     
    
    var position;
    var canvasElement;
    var canvasContext;
    var mazeArray;

    $(this).keydown(function (e) {
        var newRow = position['row'];
        var newCol = position['col'];

        switch (e.which) {
            case 37: // left
                //position['col'] = position['col'] - 1;
                newCol = position['col'] - 1;
                
                reDraw();
                break;

            case 38: // up
                //position['row'] = position['row'] - 1;
                newRow = position['row'] - 1;
                reDraw();
                break;

            case 39: // right
                //position['col'] = position['col'] + 1;
                newCol = position['col'] + 1;
                reDraw();
                break;

            case 40: // down
                //position['row'] = position['row'] + 1;
                newRow = position['row'] + 1;
                reDraw();
                break;

            default: return; // exit this handler for other keys
        }

        if (mazeArray[newRow][newCol] == 0) {
            position['row'] = newRow;
            position['col'] = newCol;
        }
    });

    function reDraw() {
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);


        var img = new Image();
        img.src = "../Views/icon.png";

        var rows = mazeArray.length;
        var cols = mazeArray[0].length;
        var cellWidth = canvasElement.width / cols;
        var cellHeight = canvasElement.height / rows;
        console.log(cellWidth);
        console.log(cellHeight);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (mazeArray[i][j] == 1) {
                    canvasContext.strokeStyle = "#df4b26";
                    canvasContext.fillRect(cellWidth * j, cellHeight * i,
                        cellWidth, cellHeight);
                }
            }
        }

        img.onload = function () {
            canvasContext.drawImage(img, position['col'] * cellHeight,  position['row'] * cellWidth, cellWidth, cellHeight);
        }
    }

    $.fn.initialize = function (mazeData) {
        position = { 'row': 0, 'col': 0 };
        mazeArray = mazeData;
        this.element = $(this)[0];
        canvasElement = this.element;
        var context = canvasElement.getContext("2d");
        canvasContext = context;
    }

    $.fn.drawMaze = function () {

        var img = new Image();
        img.src = "../Views/icon.png";

        var rows = mazeArray.length;
        var cols = mazeArray[0].length;
        var cellWidth =  canvasElement.width / cols;
        var cellHeight = canvasElement.height / rows;
        console.log(cellWidth);
        console.log(cellHeight);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (mazeArray[i][j] == 1) {
                    canvasContext.strokeStyle = "#df4b26";
                    canvasContext.fillRect(cellWidth * j, cellHeight * i,
                        cellWidth, cellHeight);
                }
            }
        }


        img.onload = function () {;
            canvasContext.drawImage(img, position['col'] * cellHeight,  position['row']*cellWidth, cellWidth, cellHeight);
        }

        return this;
    }
})(jQuery);
