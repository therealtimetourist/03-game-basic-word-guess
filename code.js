// define DOM elements
var divGuessRemaining = document.getElementById("guesses-remaining");
var divLettersGuessed = document.getElementById("letters-guessed");
var divWins = document.getElementById("wins");
var divLosses = document.getElementById("losses");
var divTheWord = document.getElementById("the-word");
var divTheHint = document.getElementById("the-hint");
var divGameStatus = document.getElementById("game-status");

// define global variables
var words = ["zero", "one", "two", "three", "four"];
var hints = ["My Hero", "The Loneliest Number", "Tea for", "You and Me and The Baby", "Golf Yell"];
var myLetter;
var validLetter;
var currentWord;
var currentHint;
var wins = 0;
var losses = 0;
var correctGuesses = 0;
var guessRemaining = 5;
var lettersGuessed = [];

// reset game
function resetGame(){
	guessRemaining = 5;
	lettersGuessed.length = 0;
	correctGuesses = 0;
	rand = Math.floor(Math.random() * 5);
	currentWord = words[rand];
	currentHint = hints[rand];
	divGuessRemaining.textContent = guessRemaining;
	divLettersGuessed.innerHTML = "&nbsp;";
	setPlayField();
	//console.log(currentWord);
}

// draw the new word blanks
function setPlayField(){
	// clear previous word from page
	while (divTheWord.hasChildNodes()){
		divTheWord.removeChild(divTheWord.firstChild);
	}
	
	// set new word to guess on page
	// loop to new word length
	for(var i = 0; i < currentWord.length; i++){
		
		// create a DOM node for each new letter
		var node = document.createElement("div");
		
		// set the new div id
		node.setAttribute("id", "theWord" + i);
		
		// set the new div class
		node.className = "guess-blanks";
		
		// set a blank space within the new div
		node.innerHTML = "&nbsp;";
		
		// append the new div to the 'divTheWord' div
		divTheWord.appendChild(node);
	}
	// set hint field
	divTheHint.innerHTML = "<strong>HINT:</string>" + currentHint;
	// clear the message field
	divGameStatus.innerHTML = "";
}

// check for win
function checkWin(){
	if(correctGuesses === currentWord.length){
		wins++;
		divWins.textContent = wins;
		divGameStatus.textContent = "You guessed it! The word was " + currentWord + "!";
	}
}

// game over
function gameOver(){
	losses++;
	divLosses.textContent = losses;
	
	for(var i = 0; i < currentWord.length; i++){
		var g = document.getElementById("theWord" + i);
		g.innerHTML = currentWord[i];
	}
	
	divGameStatus.textContent = "GAME OVER! The word was " + currentWord;
}

// ** THE MAIN EVENT BEGIN ** //
document.onkeyup = function(e){
	if(guessRemaining){
		var keynum;
		if(window.event){ // IE
			keynum = e.keyCode;
		} else if(e.which){ // Netscape/Firefox/Opera
			keynum = e.which;
		}
		// check for valid key entry code
		if(keynum >= 65 || keynum <= 90){
			
			// define the letter using the keycode/set to lower case
			myLetter = String.fromCharCode(keynum).toLowerCase();
			
			// if letter has already been guessed
			if(lettersGuessed.indexOf(myLetter) > -1){
				divGameStatus.textContent = "You already guessed " + myLetter;
				
			// else letter has not already been guessed
			} else{
				// add letter to letters guessed array
				lettersGuessed.push(myLetter);
				
				// display the lettersGuessed array on page
				divLettersGuessed.textContent = lettersGuessed;
				
				// if my letter is in current word
				if(currentWord.indexOf(myLetter) > -1){
					// loop to the current word length
					for(var i = 0; i < currentWord.length; i++){
						
						// if the current letter matches the letter entered
						if (currentWord[i] === myLetter){
							
							// target the element
							var g = document.getElementById("theWord" + i);
							
							// write the letter to the page
							g.innerHTML = myLetter;
							
							// increment correctGuesses
							correctGuesses++;
						}
					}
					
					// check for win
					checkWin();
					
				// else my letter is not in the current word
				} else{
					
					// decrement guessRemaining
					guessRemaining--;
					
					// display guessRemaining on page
					divGuessRemaining.textContent = guessRemaining;
					
					// if there are no guesses remaining the game is over
					if(guessRemaining == 0){
						gameOver();
					}
				}
			}
			
		// invalid key entry
		} else{
			divGameStatus.textContent = "That is not a valid letter guess.  Please try again.";
		}
		
	// else no guesses remaining
	} else{
		gameOver();
	}
}
// **  THE MAIN EVENT END ** //
// start the game
resetGame();
