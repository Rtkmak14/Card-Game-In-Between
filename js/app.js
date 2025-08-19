/*-------------- Constants -------------*/
const players = {
  player1: { money: "" },
  player2: { money: "" },
};

const cards = {
  left: null,
  middle: null,
  right: null
}

const state = {
    turnsRemaining: "",
    playerTurn: "Player 1",
    currentPot: "",
    currentBet: "",
}

const gameFlow = {
  betPlaced: false,
  newRound: true,
  roundResult: "win"
}

const cardDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

const rankCards = {
  "A": 1,
  "02": 2, "03": 3, "04": 4, "05": 5, "06": 6, "07": 7,
  "08": 8, "09": 9, "10": 10,
  "J": 11, "Q": 12, "K": 13
}

/*---------- Variables (state) ---------*/

let userClick = ""
let shuffledDeck = []

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

   // initialize game stats
    state.turnsRemaining = 20
    state.playerTurn = "Player 1"
    state.currentPot = 0
    state.currentBet = 0

    //game flow
    gameFlow.betPlaced = true

    //shuffle deck
    shuffleCards (cardDeck)

   //render 
    render()
}

function render() {

  money1El.textContent = `$${players.player1.money}`;
  money2El.textContent = `$${players.player2.money}`;

  remainingTurnsEl.textContent = `Turns Remaining: ${state.turnsRemaining}`;
  currentTurnEl.textContent = `Current Turn: ${state.playerTurn}`;
  potEl.textContent = `Pot: $${state.currentPot}`;
  betEl.textContent = `Current Bet: $${state.currentBet}`;

  gameMessageEl.textContent = "Welcome to In-Between! Click 'Deal Cards' to begin.";

}

function shuffleCards(cardDeck) {
 shuffledDeck = cardDeck.sort(() => Math.random() - 0.5);
}

function switchPlayer () {
  if (state.playerTurn === "Player 1") {state.playerTurn = "Player 2"}

  else {state.playerTurn="Player 1"}
}

function getCurrentPlayer() {
  if (state.playerTurn === "Player 1") {
    return players.player1
  }

  else {return players.player2}
}

function dealOuterCards() {
   
  if (gameFlow.roundResult === "win") {
    state.currentPot = 0
    players.player1.money -= 10
    players.player2.money -= 10
    state.currentPot += 20
    gameMessageEl.textContent = "New round! Ante paid. Place bet or pass."
  } 
  
  else if (gameFlow.roundResult === "loss") {
    gameMessageEl.textContent = "Next turn! Pot rolls over. Place bet or pass."
  }

  switchPlayer()
  state.turnsRemaining -= 1

  if (shuffledDeck.length < 2) {
    shuffledDeck = [...cardDeck]
    shuffleCards(shuffledDeck)
  }

  const card1 = shuffledDeck.shift()
  const card3 = shuffledDeck.shift()
  cards.left = card1;
  cards.right = card3;
  card1El.className = `card ${card1}`
  card3El.className = `card ${card3}`

  cards.middle = null
  card2El.className = "card back"
  state.currentBet = 0

  gameFlow.roundResult = ""
  gameFlow.newRound = false

  render();
}

function dealMiddleCard () {
  if (shuffledDeck.length < 1) {
    shuffledDeck = cardDeck
    shuffleCards (cardDeck)
  }

  const card2 = shuffledDeck.shift();
  cards.middle = card2
  card2El.className = `card ${card2}`;
}

function passBet () {
  if (shuffledDeck.length < 2) {
    shuffledDeck = cardDeck
    shuffleCards (cardDeck)
  }

  else {const card1 = shuffledDeck.shift();
    const card3 = shuffledDeck.shift();
    card1El.className = `card ${card1}`;
    card3El.className = `card ${card3}`;

    const previousPlayer = state.playerTurn
    state.turnsRemaining -=1
    switchPlayer ()
    gameMessageEl.textContent = `${previousPlayer} has passed. It's now ${state.playerTurn}'s turn.`
    
    render()
  }
}

function increaseBet () {
  const currentPlayer = getCurrentPlayer ()
  const betAmount = 10

  const wageredAmount = state.currentBet + betAmount

  if (wageredAmount > state.currentPot) {
    gameMessageEl.textContent = "Cannot bet more than the pot! You've reached the max bet."
    return
  }

  else {currentPlayer.money -=10
    state.currentBet = wageredAmount
    gameMessageEl.textContent = `Bet increased by $${betAmount}. Current bet is now $${state.currentBet}.`
    render()
  }
}

function decreaseBet () {
  const currentPlayer = getCurrentPlayer ()
  const betAmount = 10

  const newBet = state.currentBet - betAmount

  if (newBet < 0) {
    gameMessageEl.textContent = "Bet amount cannot bet less than zero!"
  }

  else {currentPlayer.money +=10
    state.currentBet -=10
    gameMessageEl.textContent = `Bet has been reduced by $10. Pot is now ${state.currentPot}`
    render()
  }
}

function submitBet () {
 if (cards.middle) {
    gameMessageEl.textContent = "You've already revealed the middle card. Click 'Deal Cards' to continue.";
    return;
  }

  if (state.currentBet === 0) {
    gameMessageEl.textContent = "You must place a bet before submitting.";
    return;
  }
 
  dealMiddleCard()

 const leftRank = rankCards[cards.left.slice(1)]
 const rightRank = rankCards[cards.right.slice(1)]
 const middleRank = rankCards[cards.middle.slice(1)]

 const low = Math.min(leftRank,rightRank)
 const high = Math.max(leftRank,rightRank)

 const currentPlayer = getCurrentPlayer()
 const previousPlayer = state.playerTurn

 if (middleRank>low && middleRank<high) {
    currentPlayer.money += state.currentPot
    gameMessageEl.textContent= `${previousPlayer} wins the pot! ${cards.middle} is between ${cards.left} and ${cards.right}.`
    gameFlow.roundResult ="win"
    gameFlow.newRound=true
 }

 else {
  gameMessageEl.textContent = `${previousPlayer} loses the hand. ${cards.middle} is not between ${cards.left} and ${cards.right}.`
  currentPlayer.money -= state.currentBet
  gameFlow.roundResult ="loss"
 }

 render()

}

/*----------- Event Listeners ----------*/

buttons.forEach((button) => {
    button.addEventListener("click",(event)=> {
        let userClick = event.target.innerText 
    })
})


//Initialize game
init()

//Shuffle Deck

//User clicks deal cards
    //don't run if game hasn't started

// Deal outer cards
dealOuterCards()
increaseBet()
increaseBet()
increaseBet()
decreaseBet()
decreaseBet()
decreaseBet()


// Player turn
  //pass
  
  //bet
  
    //deal middle card
  
  //render result

// Switch players