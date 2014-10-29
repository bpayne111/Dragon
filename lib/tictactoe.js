/*
Shitty tic tac toe game
http://jsfiddle.net/rtoal/5wKfF/
*/

(function () {

    var squares = [], 
        EMPTY = "\xA0",
        score,
        moves,
        turn = "X",
        oldOnload,
  
    wins = [7, 56, 448, 73, 146, 292, 273, 84],

    startNewGame = function () {
        var i;
        
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        for (i = 0; i < squares.length; i += 1) {
          squares[i].firstChild.nodeValue = EMPTY;			
        }
    },

    win = function (score) {
        var i;
        for (i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    set = function () {
        if (this.firstChild.nodeValue !== EMPTY) {
            return;
        }
        this.firstChild.nodeValue = turn;
        moves += 1;
        score[turn] += this.indicator;
        if (win(score[turn])) {
            alert(turn + " wins!");
            startNewGame();
        } else if (moves === 9) {
            alert("Tie game!");
            startNewGame();
        } else { //change turns
            turn = turn === "X" ? "O" : "X";
			//if turn = O then ai move
			//this.set();
        }
    },
    aiMove = function () {
	  //try random squares until one is empty
	},
	
    play = function () {
        var board = document.createElement("table"),
            indicator = 1,
            i, j,
            row, cell,
            parent;
        board.border = 1;
        for (i = 0; i < 3; i += 1) {
            row = document.createElement("tr");
            board.appendChild(row);
            for (j = 0; j < 3; j += 1) {
                cell = document.createElement("td");
                cell.width = cell.height = 50;
                cell.align = cell.valign = 'center';
                cell.indicator = indicator;
                cell.onclick = set;
                cell.appendChild(document.createTextNode(""));
                row.appendChild(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        parent = document.getElementById("tictactoe") || document.body;
        parent.appendChild(board);
        startNewGame();
    };

    if (typeof window.onload === "function") {
        oldOnLoad = window.onload;
        window.onload = function () {
            oldOnLoad(); 
            play();
        };
    } else {
        window.onload = play;
    }
}()
);




/* 
var EMPTY = "\xA0", //non breaking space
    turn, score, turn, wins, moves,
    wins = [7, 56, 448, 73, 146, 292, 273, 84],
    squares = [];

$('<div/>', { //add div to doc with jquery
  id: 'ttt',
  text: 'Tic Tac Toe'
}).appendTo('html'); 	
	
function startNewGame() {
  var i;
  
  turn = "X";
  score = {"X": 0, "O": 0};  
  moves = 0;  
  //clear squares
  for (i = 0; i < squares.length; i += 1) 
  { squares[i].firstChild.nodeValue = EMPTY;
  }

}

function win(score) {
var i;
for (i = 0; i < wins.length; i += 1) {
  if ((wins[i] & score) === wins[i]) {
    return true;
    }
  }
  return false;
}

function set() {
  if (this.firstChild.nodeValue !== EMPTY) {
    return;
  }		
  this.firstChild.nodeValue = turn;
}

var board = document.createElement("table"),
  row, cell, i, j;
board.border = 1;
for (i = 0; i < 3; i += 1) {   
  row = document.createElement("tr");
  board.appendChild(row);
  for (j = 0; j < 3; j += 1) {
    cell = document.createElement("td");
	cell.width = cell.height = 50;
	cell.align = cell.valign = 'center';
	cell.onclick = set;
	row.appendChild(cell); 
  } //end loop
} //board var
			
$('#ttt').append(board);



 */