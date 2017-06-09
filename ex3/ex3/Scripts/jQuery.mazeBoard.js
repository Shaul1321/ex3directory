(function ($) {
    $.fn.drawMaze = function (mazeData, startRow, startCol
        , exitRow, exitCol, playerImage, exitImage, enabled, callBack) {

        this.element = $(this)[0];
        var context = this.element.getContext("2d");
       
        var rows = mazeData.length;
        var cols = mazeData[0].length;
        var cellWidth = this.element.width / cols;
        var cellHeight = this.element.height / rows;
        console.log(cellWidth);
        console.log(cellHeight);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (mazeData[i][j] == 1) {
                    console.log("yay");
                    context.strokeStyle = "#df4b26";
                    context.fillRect(cellWidth * j, cellHeight * i,
                        cellWidth, cellHeight);
                }
            }
        }
        return this;
    }
    })(jQuery);