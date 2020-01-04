/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice, winningScore;

init();

document.querySelector(".btn-win").addEventListener("click", function () {
    winningScore = document.getElementById("winningTotal").value;
    document.querySelector(".btn-win").style.display = "none";
    gamePlaying = true;
})

// ROLL Button
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {

        var dice_1 = Math.floor(Math.random() * 6) + 1;
        var dice_2 = Math.floor(Math.random() * 6) + 1;
        var dice = dice_1 + dice_2;
        var diceDOM_1 = document.querySelector(".dice_1");
        diceDOM_1.style.display = "block";
        diceDOM_1.src = "dice-" + dice_1 + ".png";
        var diceDOM_2 = document.querySelector(".dice_2");
        diceDOM_2.style.display = "block";
        diceDOM_2.src = "dice-" + dice_2 + ".png";
        if (dice_1 !== 1 && dice_2 !== 1) {
            if (dice === 6 && previousDice === 6) {
                // console.log(previousDice);
                // console.log("dice :" + dice + " and " + " previousDice " + previousDice);
                nextPlayer();
            } else {

                roundScore += dice;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
                previousDice = dice;
                // console.log(previousDice);
            }

        } else {
            nextPlayer();
        }

    }


});

//HOLD button
document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        roundScore = 0;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        if (scores[activePlayer] >= winningScore) {
            document.getElementById("name-" + activePlayer).textContent = "Winner";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.querySelector(".dice_1").style.display = "none";
            document.querySelector(".dice_2").style.display = "none";
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

// New Game button
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = false;
    winningScore = 0;
    document.getElementById("winningTotal").textContent = "Set Final Score";
    document.querySelector(".dice_1").style.display = "none";
    document.querySelector(".dice_2").style.display = "none";
    document.querySelector(".btn-win").style.display = "block";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

}

function nextPlayer() {
    roundScore = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
    document.querySelector(".dice_1").style.display = "none";
    document.querySelector(".dice_2").style.display = "none";
}