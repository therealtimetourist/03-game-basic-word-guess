
var divGuessRemaining = document.getElementById("guesses-remaining");
var divLettersGuessed = document.getElementById("letters-guessed");
var divWins = document.getElementById("wins");
var divLosses = document.getElementById("losses");
var divTheWord = document.getElementById("the-word");
var divGameStatus = document.getElementById("game-status");

var words = ["zero", "one", "two", "three", "four"];
var wins = 0;
var losses = 0;
var correctGuesses = 0;
var currentWord;
var guessRemaining = 5;
var lettersGuessed = [];
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

// reset the game
function resetGame(){
	guessRemaining = 5;
	lettersGuessed.length = 0;
	correctGuesses = 0;
	currentWord = words[Math.floor(Math.random() * 5)];
	divGuessRemaining.textContent = guessRemaining;
	divLettersGuessed.innerHTML = "&nbsp;";
	setPlayField();
	console.log(currentWord);
}

// draw the new word blanks
function setPlayField(){
	while (divTheWord.hasChildNodes()){
		divTheWord.removeChild(divTheWord.firstChild);
	}
	
	for(var i = 0; i < currentWord.length; i++){
		var node = document.createElement("div");
		node.setAttribute("id", "theWord" + i);
		node.className = "guess-blanks";
		node.innerHTML = "&nbsp;";
		divTheWord.appendChild(node);
	}
	
	divGameStatus.innerHTML = "";
}

// validate keyboard input are letters
function checkInput(keynum){
	//alert(keynum);
	if (alphabet.indexOf(keynum) > -1){
		//alert("valid");
		return 1;
	} else{
		//alert("not valid");
		return 0;
	}
}

// track all letters guessed and write to page
function updateLetterGuessed(myLetter){
	if(lettersGuessed.indexOf(myLetter) > -1){
		divGameStatus.textContent = "You already guessed " + myLetter;
	} else{
		lettersGuessed.push(myLetter);
		divLettersGuessed.textContent = lettersGuessed;
	}
	
}

function checkWin(){
	if(correctGuesses === currentWord.length){
		wins++;
		divWins.textContent = wins;
		divGameStatus.textContent = "You guessed it! The word was " + currentWord + "!";
	}
}

// end of game
function gameOver(){
	losses++;
	divLosses.textContent = losses;
	
	for(var i = 0; i < currentWord.length; i++){
		var g = document.getElementById("theWord" + i);
		g.innerHTML = currentWord[i];
	}
	
	divGameStatus.textContent = "GAME OVER! The word was " + currentWord;
	//alert(losses);
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
		
		var myLetter = String.fromCharCode(keynum).toLowerCase();
		//alert(String.fromCharCode(keynum).toLowerCase());
		//alert(myLetter);
		var validLetter = checkInput(myLetter);
		//alert(currentWord.indexOf(myLetter));
		if(!validLetter){
			divGameStatus.textContent = "That is not a valid letter guess.  Please try again.";
			
		} else{
			if(lettersGuessed.indexOf(myLetter) > -1){
				divGameStatus.textContent = "You already guessed " + myLetter;
			} else{
				lettersGuessed.push(myLetter);
				divLettersGuessed.textContent = lettersGuessed;
			
				if(currentWord.indexOf(myLetter) > -1){
					//alert("it's in the word!");
					for(var i = 0; i < currentWord.length; i++){
						//alert(i);
						//alert(currentWord[i]);
						if (currentWord[i] === myLetter){
							var g = document.getElementById("theWord" + i);
							g.innerHTML = myLetter;
							correctGuesses++;
						}
					}
					checkWin();
				} else{
					// alert("it's not in the word!");
					guessRemaining--;
					divGuessRemaining.textContent = guessRemaining;
					if(guessRemaining == 0){
						gameOver();
					}
				}
			}
		}
	} else{
		gameOver();
	}
}
// **  THE MAIN EVENT END ** //
// start the game
resetGame();