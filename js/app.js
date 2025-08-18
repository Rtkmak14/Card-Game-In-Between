/*-------------- Constants -------------*/
const players = {
  player1: { money: "" },
  player2: { money: "" },
};

const state = {
    turnsRemaining: "",
    playerTurn: "",
    currentPot: "",
    currentBet: "",
}

const cardDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]


/*---------- Variables (state) ---------*/

let userClick = ""

/*----- Cached Element References  -----*/

// Player Money
const money1El = document.getElementById("money1");
const money2El = document.getElementById("money2");

// Game Message
const gameMessageEl = document.getElementById("gameMessage");

// Cards
const card1El = document.getElementById("card1");
const card2El = document.getElementById("card2");
const card3El = document.getElementById("card3");

// Game State
const remainingTurnsEl = document.getElementById("turnsRemaining");
const currentTurnEl = document.getElementById("playerTurn");
const potEl = document.getElementById("currentPot");
const betEl = document.getElementById("currentBet");

// Buttons
const buttons = document.querySelectorAll(".buttons button");



/*-------------- Functions -------------*/

function init () {
   //initialize player money
    players.player1.money = 100
    players.player2.money = 100

   // initialize game state 
    state.turnsRemaining = 20
    state.playerTurn = "Player 1"
    state.currentPot = 0
    state.currentBet = 0
    
   //render 
    render()
}

function render() {
  // Player Money
  money1El.textContent = `$${players.player1.money}`;
  money2El.textContent = `$${players.player2.money}`;

  // Game State
  remainingTurnsEl.textContent = `Turns Remaining: ${state.turnsRemaining}`;
  currentTurnEl.textContent = `Current Turn: ${state.playerTurn}`;
  potEl.textContent = `Pot: $${state.currentPot}`;
  betEl.textContent = `Current Bet: $${state.currentBet}`;

  // Game Message
  gameMessageEl.textContent = "Welcome to In-Between! Click 'Deal Cards' to begin.";

}

/*----------- Event Listeners ----------*/

buttons.forEach((button) => {
    button.addEventListener("click",(event)=> {
        let userClick = event.target.innerText 
    })
})

//1. Initialize game
init()