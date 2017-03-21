/*

Phu-Lam Pham
CSE 154 AO

Javascript handling moving and apperance functionalities for Fifteen Puzzle Game.

Extra feature: Multiple backgrounds.

*/

(function() {

    "use strict";

    var nSquares = 4; // number of squares per row and per col in the game
    var dimension = 100; // size of each square
    var shuffles = 1000; // number of times per shuffle
    var currentX = 4; // x position of the blank square
    var currentY = 4; // y position of the blank square

    // Event Handler for onload
    window.onload = function() {
        document.getElementById("shufflebutton").onclick = shuffle;
        createSquares();
        setProperties();
        addBackgroundOptions();
    };
    
    // Extra option to change backgrounds
	function addBackgroundOptions() {
		var controls = document.getElementById("controls");
		
        // Create a dropdown list
		var select = document.createElement("select");
		var images = ["background","Seattle","Suzzalo Library","Doge", "Grumpy Cat"];
		for (var i=0; i < images.length; i++) {
			var option = document.createElement("option");
			option.value = images[i];
            if ( i!= 0) {
                option.innerHTML = images[i];
            } else {
                option.innerHTML = "Default";
            }
			select.appendChild(option);
		}
        
		select.id = "select";
		controls.appendChild(select);
		select.onchange = changeBackground;
	}
    
    // Change background of the puzzle
	function changeBackground() {
		var select = document.getElementById("select");
		var squares = document.getElementsByClassName("squares");
		for (var i=0; i < squares.length; i++) {
			squares[i].style.backgroundImage = "url(\'" +
			 select.value + ".jpg\')";
		}
	}	

    // Create Fifteen Squares to be played
    function createSquares() {
        // Set Properties for puzzle area
        var puzzleArea = document.getElementById("puzzlearea");
        puzzleArea.style.backgroundSize = nSquares * dimension + "px " + nSquares * dimension + "px";
        puzzleArea.style.height = nSquares * dimension + "px";
        puzzleArea.style.width = nSquares * dimension + "px";

        // Create 15 squares 
        for (var i = 1; i < nSquares * nSquares; i++) {
            var square = document.createElement("div");
            square.className = "squares";
            square.innerHTML = "" + i;
            puzzleArea.appendChild(square);

            square.onmouseover = hover;
            square.onmouseout = out;
            square.onclick = nextMove;
        }
    }
    
    // Set styles for puzzle squares
    function setProperties() {
        var squares = document.querySelectorAll("#puzzlearea .squares");

        for (var i = 0; i < squares.length; i++) {
            squares[i].style.width = (dimension - 10) + "px";
            squares[i].style.height = (dimension - 10) + "px";

            var row = Math.floor(i / nSquares);
            var col = i % nSquares;

            squares[i].style.position = "absolute";
            squares[i].style.left = col * dimension + "px";
            squares[i].style.top = row * dimension + "px";
            squares[i].style.backgroundPosition = -(col*dimension) + "px " + -(row*dimension) + "px";

            // Give squares id's. E.g: square_1_1   square_1_2    square_1_3   square_1_4
            //                         square_2_1   square_2_2    square_2_3   square_2_4
            squares[i].id = "square_" + (row + 1) + "_" + (col + 1); // can't have square_0_0 for example
        }
    }

    // Shuffle the puzzle
    function shuffle() {
        for (var i = 0; i < shuffles; i++) {
            var randomNum = Math.floor(Math.random() * 4);
            move(randomNum);
        }
    }

    // Move a square in the game
    function move(move) {
        var row = currentX;
        var col = currentY;

        // 1 = move up
        // 2 = move down
        // 3 = move left
        // 4 = move right
        if ((move == 1) && (currentX > 1)) {
            row--;
        } else if ((move == 2) && (currentX < nSquares)) {
            row++;
        } else if ((move == 3) && (currentY > 1)) {
            col--;
        } else if (currentY < nSquares) {
            col++;
        }

        var id = "square_" + row + "_" + col;

        var square = document.getElementById(id);

        // switch blank square and an existing square
        if (square) {
            square.id = "square_" + currentX + "_" + currentY;
            square.style.left = (currentY - 1) * dimension + "px";
            square.style.top = (currentX - 1) * dimension + "px";


            // new current position of blank square
            currentX = row;
            currentY = col;
        }
    }

    // Change apperance when mouse is hovered on a square
    function hover() {
        if (canBeMoved(this) !== null) {
            this.style.borderColor = "red";
            this.style.cursor = "pointer";
        }
    }

    // Change appearance when mouse is out of a square
    function out() {
        if (canBeMoved(this) !== null) {
            this.style.borderColor = "black";
            this.style.cursor = "default";
        }
    }

    // Check if a square is moveable
    function canBeMoved(square) {
        var row = parseInt(square.style.top)/dimension + 1;
        var col = parseInt(square.style.left)/dimension + 1;

        // 1 = move up
        // 2 = move down
        // 3 = move left
        // 4 = move right
        if ((col == currentY) && (row < currentX)) {
            return 1;
        } else if ((col == currentY) && (row > currentX)) {
            return 2;
        } else if ((row == currentX) && (col < currentY)) {
            return 3;
        } else if ((row == currentX) && (col > currentY)) {
            return 4;
        }
        return null;
    }

    // Decide a square's next move
    function nextMove() {
        move(canBeMoved(this));
    }
    
})();