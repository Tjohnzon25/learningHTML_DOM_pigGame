/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*eslint-env browser*/

var scores, roundScore, activePlayer, gamePlaying;

init();


//when clicking the ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click', function(){
    //anonymous function 
    
    if(gamePlaying){
        //1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice')

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'; // changes  


        //3. Update the round score IF the rolled number was NOT a 1
        if(dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;  //selects the element and changes the text on the page 
        }else{
            //Next player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
        
        //Add currentScore to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game

        if(scores[activePlayer] >= 100){

            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // accessing the winner class in CSS to change the UI
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

        }else{
            //Next player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', init); // pressing new game resets the game



function nextPlayer(){
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //means: if activePlayer === 0, then (?) activePlayer = 1, else (:) activePlayer = 1
    roundScore = 0;

    //changes the score at the bottom to 0 if you roll a 1
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    // TOGGLE means if the class has 'active' then it will remove it, if it doesnt have 'active' then add it
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //changes the active player EXAMPLES:
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none'; //changing the dice pic to hidden
}


function init(){
    
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none'; // .dice is a class, #dice is an ID


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}



/* -----------------------NOTES----------------------------------


document.querySelector('#current-' + activePlayer).innerHTML = '<em>' +  dice + '<em>'; //HTML stuff always has to be a string

var x = document.querySelector('#score-0').textContent;


*/