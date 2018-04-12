/*
 * Create a list that holds all of your cards
 */
 // declaring cards
 var card = document.getElementsByClassName("card");
 var cards = [...card]

//declar deck of cards
var deck = document.getElementById("card-deck");
// declaring number of moves
var numberOfMoves = 0;
var counter = document.querySelector(".numberOfMoves");
//declaring opened cards
var openedCards = [];
//declaring matched cards
var matchedCard = document.getElementsByClassName("match");
//declaring number of stars
var numberOfStars = document.querySelectorAll(".fa-star");
//declaring stars list 
var starsList = document.querySelectorAll(".stars li");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currIndex = array.length, tempValue, rndmIndex;

	while (currIndex !== 0) {
		rndmIndex = Math.floor(Math.random() * currIndex);
		currIndex -= 1;
		tempValue = array[currIndex];
		array[currIndex] = array[rndmIndex];
		array[rndmIndex] = tempValue;
	}

	return array;
}

//run restart function once this page is being loaded or opened or refreshed
document.body.onload = restart();

//restart function to reset game settings
function restart(){
    //to shuffle deck of cards
    cards = shuffle(cards);
    //remove attributes from all cards
    for (var i = 0; i < cards.length; i++){
    	deck.innerHTML = "";
    	[].forEach.call(cards, function(item) {
    		deck.appendChild(item);
    	});
    	//hide all cards
    	cards[i].classList.remove("show");
    	cards[i].classList.remove("open");
    	cards[i].classList.remove("match");
    }
    //reset number Of moves
    numberOfMoves = 0;
    //display number of moves on screen
    counter.innerHTML = numberOfMoves;
    //resetting number of stars
    for (var i= 0; i < numberOfStars.length; i++){
    	numberOfStars[i].style.color = "Gold";
    	//display stars by making it visible on screen
    	numberOfStars[i].style.visibility = "visible";
    }
    //resetting timer variables
    second = 0, minute = 0; hour = 0;
    var timer = document.querySelector(".timer");
    //display time on screen
    timer.innerHTML = "0 min(s), 0 sec(s)";
    //clear previous interval time
    clearInterval(interval);
}

//setting game timer
//declaring timer variables
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
//startTimer function to set game timer and display it on screen
function startTimer(){
	interval = setInterval(function(){
		//display time on screen
		timer.innerHTML = minute+" min(s), "+second+" sec(s)";
		second++;
		//more than 60 seconds then it's a minute.
		if(second == 60){
			minute++;
			second=0;
		}
		//more than 60 minutes then it's an hour
		if(minute == 60){
			hour++;
			minute = 0;
		}
	},1000);
}


//declaring variable which contiain function to open and show cards on screen after being matched
var showCard = function (){	
	this.classList.toggle("open");
	this.classList.toggle("show");
    this.classList.toggle("disabled");
};


//cardOpened function to add current opened card into list and check if matched
function cardOpened() {
	var length = openedCards.length;
	//add current card into openedCards list
	openedCards.push(this);
	//if number of selected cards are two
	if(length === 1){
		//call function to increase number of moves
		increaseCounter();
		//if two cards matched
		if(openedCards[0].type === openedCards[1].type){
			//call function to add cards into matched list
			matchedCards();
		} else {
			//call function to hide unmatched cards
			unmatchedCards();
		}
	}
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 */
 for (var i = 0; i < cards.length; i++){
 	card = cards[i];
 	card.addEventListener("click", showCard);
 	card.addEventListener("click", cardOpened);
 	card.addEventListener("click",congratulations);
 };
 /*
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position 
 *		(put this functionality in another function that you call from this one)
 */
//matchedCards function for matched cards to display them on screen
function matchedCards(){
	for(var i= 0; i < 2; i++){
	openedCards[i].classList.add("match");
	openedCards[i].classList.add("disabled");
	openedCards[i].classList.remove("open");
	openedCards[i].classList.remove("show");
}
	//clear current opened cards list
	openedCards = [];
}

 /*
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol 
 *		(put this functionality in another function that you call from this one)
 */
//unmatchedCards function for unmatched cards to hide them on screen
function unmatchedCards(){
	//interval to show opened cards
	setTimeout(function(){
		//to hide unmatch cards
		for(var i= 0; i < 2; i++){
		openedCards[i].classList.remove("open");
		openedCards[i].classList.remove("show");
	}
	Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
		//clear current opened cards list
		openedCards = [];
	},600);
}

 /*
 *    + increment the move counter and display it on the page 
 *		(put this functionality in another function that you call from this one)
 */
//increaseCounter function to increase number of moves
function increaseCounter(){
	numberOfMoves++;
	//display current number of moves
	counter.innerHTML = numberOfMoves;

     //start timer once the first card if clicked aka number of moves is 1
     if(numberOfMoves == 1){
     	second = 0;
     	minute = 0; 
     	hour = 0;
		startTimer();
     }
    //setting start based on number of moves
    //if number of moves between 10 and 15 then 2 stars
    if (numberOfMoves > 10 && numberOfMoves < 15){
    	//loop to go through 3 stars
    	for(var i= 0; i < 3; i++){
    		if(i > 1){
    			//drop a star
    			numberOfStars[i].style.visibility = "collapse";
    		}
    	}
    }
    //if number of moves greater than 20 then 1 star
    else if (numberOfMoves > 20){
    	//loop to go through 3 stars
    	for(var i= 0; i < 3; i++){
    		if(i > 0){
    			//drop a star
    			numberOfStars[i].style.visibility = "collapse";
    		}
    	}
    }
}

 /*
 *    + if all cards have matched, display a message with the final score 
 *		(put this functionality in another function that you call from this one)
 */
//declaring modal aka overlayPopup
var overlayPopup = document.getElementById("overlayPopup")
 //declaring close button in overlayPopup
 var closeButton = document.querySelector(".close");

//congratulations function to display modal aka overlayPopup with number of moves, stars and time when all 16 cards are opened and matched
function congratulations(){
	//if all cards are opened and matched
	if (matchedCard.length == 16){
		//clear previous interval time
		clearInterval(interval);
		//getting time
		consumedTime = timer.innerHTML;
        // show congratulations modal aka overlayPopup
        overlayPopup.classList.add("show");
		//getting number of starts
		var numberOfStars = document.querySelector(".stars").innerHTML;
        //showing number of moves
        document.getElementById("numberOfMoves").innerHTML = numberOfMoves;
        //showing number of starts
        document.getElementById("numberOfStars").innerHTML = numberOfStars;
        //showing consumed time
        document.getElementById("consumedTime").innerHTML = consumedTime;
        //close button on overlayPopup
        closeOverlayPopup();
    };
}

//playAgain function to hide modal aka overlayPopup and reset game settings
function replay(){
	//hide all cards
	overlayPopup.classList.remove("show");
	//call restart function to reset all game settings
	restart();
}

//closeOverlayPopup function for overlayPopup
function closeOverlayPopup(){
	closeButton.addEventListener("click", function(e){
		//hide modal aka overlayPopup
		overlayPopup.classList.remove("show");
		//call restart function to reset all game settings
		restart();
	});
}