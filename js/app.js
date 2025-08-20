/*-------------- Constants -------------*/
const players = {
  player1: { money: 0 },
  player2: { money: 0 },
};

const cards = {
  left: null,
  middle: null,
  right: null,
}

const gameState = {
    turnsRemaining: null,
    playerTurn: null,
    currentPot: 0,
    currentBet: 0,
    gameMessage: null,
    roundResult: null
}

const cardDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

const rankCards = {
  "A": 1,
  "02": 2, "03": 3, "04": 4, "05": 5, "06": 6, "07": 7,
  "08": 8, "09": 9, "10": 10,
  "J": 11, "Q": 12, "K": 13
}

/*---------- Variables (state) ---------*/

let shuffledDeck = []

/*----- Cached Element References  -----*/

const money1El = document.getElementById("money1");
const money2El = document.getElementById("money2");

const gameMessageEl = document.getElementById("gameMessage");

const card1El = document.getElementById("card1");
const card2El = document.getElementById("card2");
const card3El = document.getElementById("card3");

const remainingTurnsEl = document.getElementById("turnsRemaining");
const currentTurnEl = document.getElementById("playerTurn");
const potEl = document.getElementById("currentPot");
const betEl = document.getElementById("currentBet");

const buttons = document.querySelectorAll(".buttons button");

/*----------- Event Listeners ----------*/

buttons.forEach((button) => {
    button.addEventListener("click",(event)=> {
        let userClick = event.target.innerText 
    })
})

/*-------------- Functions -------------*/

function init () {
    players.player1.money = 100
    players.player2.money = 100

    gameState.turnsRemaining = 20
    gameState.playerTurn = "Player 1"
    gameState.currentPot = 0
    gameState.currentBet = 0

    shuffleCards (cardDeck)

    gameState.gameMessage = "Welcome to In-Between! Select Deal Cards to begin playing!"

    render()
}

// init()

function render() {

  money1El.textContent = `$${players.player1.money}`;
  money2El.textContent = `$${players.player2.money}`;

  remainingTurnsEl.textContent = `Turns Remaining: ${gameState.turnsRemaining}`;
  currentTurnEl.textContent = `Current Turn: ${gameState.playerTurn}`;
  potEl.textContent = `Pot: $${gameState.currentPot}`;
  betEl.textContent = `Current Bet: $${gameState.currentBet}`;

  gameMessageEl.textContent = gameState.gameMessage;

}

function shuffleCards(cardDeck) {
 shuffledDeck = cardDeck.sort(() => Math.random() - 0.5);
}

function checkDeckLength1 () {
  if (shuffledDeck.length < 1) {
    shuffledDeck = cardDeck
    shuffleCards (cardDeck)
  }
}
function checkDeckLength2 () {
  if  (shuffledDeck.length < 2) {
        shuffledDeck = cardDeck
        shuffleCards(shuffledDeck)
        }
}

function switchPlayer () {
  if (gameState.playerTurn === "Player 1") {gameState.playerTurn = "Player 2"}

  else {gameState.playerTurn="Player 1"}
}

function getCurrentPlayer() {
  if (gameState.playerTurn === "Player 1") {
    return players.player1
  }

  else {return players.player2}
}

function everyoneAnte () {
  players.player1.money -= 10
  players.player2.money -= 10
  gameState.currentPot += 20
  gameState.gameMessage = "New round! Antes are in! Place bet or pass."
}

function dealOuterCards() {
   
  if (gameState.roundResult === null) {
    //deck was shuffled at initialization. Not shuffling for first hand of the game.
    everyoneAnte()

    const card1 = shuffledDeck.shift()
    const card3 = shuffledDeck.shift()
    cards.left = card1;
    cards.right = card3;
    card1El.className = `card ${card1}`
    card3El.className = `card ${card3}`
    card2El.className = "card back"
  } 
  
  else if (gameState.roundResult === "not win") {
    //check if there's enough cards, otherwise reshuffle.
    checkDeckLength2 ()
    switchPlayer()

    gameState.turnsRemaining -= 1
    gameState.gameMessage = `It's ${gameFlow.playerTurn} turn. `

    const card1 = shuffledDeck.shift()
    const card3 = shuffledDeck.shift()
    cards.left = card1;
    cards.right = card3;
    card1El.className = `card ${card1}`
    card3El.className = `card ${card3}`
    card2El.className = "card back"
  }


  else if (gameState.roundResult === "win") {
    //check if there's enough cards, otherwise reshuffle.
    checkDeckLength2()

    players.player1.money -= 10
    players.player2.money -= 10
    gameState.currentPot += 20
    gameState.gameMessage = "New round! Antes are in! Place bet or pass."

    const card1 = shuffledDeck.shift()
    const card3 = shuffledDeck.shift()
    cards.left = card1;
    cards.right = card3;
    card1El.className = `card ${card1}`
    card3El.className = `card ${card3}`
    card2El.className = "card back"
  }

  render();
}

// init()
// dealOuterCards()

function passBet () {
  
  checkDeckLength2 ()

  const card1 = shuffledDeck.shift();
  const card3 = shuffledDeck.shift();
  card1El.className = `card ${card1}`;
  card3El.className = `card ${card3}`;

  const previousPlayer = gameState.playerTurn

  switchPlayer ()
  
  gameState.turnsRemaining -=1
  
  gameState.gameMessage = `${previousPlayer} has passed. It's now ${gameState.playerTurn}'s turn.`

  render()
}

// init()
// dealOuterCards()
// passBet()

function increaseBet () {
  const currentPlayer = getCurrentPlayer ()
  const betAmount = 10

  const totalWageredAmount = gameState.currentBet + betAmount

  if (totalWageredAmount > gameState.currentPot) {
    gameState.gameMessage = "Cannot bet more than the pot! You've reached the max bet."
    render()
    return
  }

  else {currentPlayer.money -=10
    gameState.currentBet = totalWageredAmount
    gameState.gameMessage = `Bet increased by $${betAmount}. Current bet is now $${gameState.currentBet}.`
    render()
  }
}

// init()
// dealOuterCards()
// increaseBet()
// increaseBet()
// increaseBet()

function decreaseBet () {
  const currentPlayer = getCurrentPlayer ()
  const betAmount = 10

  const newBet = gameState.currentBet - betAmount

  if (newBet < 0) {
    gameState.gameMessage = "Bet amount cannot bet less than zero!"
    render()
  }

  else {currentPlayer.money +=10
    gameState.currentBet -=10
    gameState.gameMessage = `Bet has been reduced by $10. Pot is now $${gameState.currentPot}`
    render()
  }
}

// init()
// dealOuterCards()
// decreaseBet()
// increaseBet()
// increaseBet()
// decreaseBet()
// passBet()

function dealMiddleCard () {
  checkDeckLength1 ()

  const card2 = shuffledDeck.shift();
  cards.middle = card2
  card2El.className = `card ${card2}`;
}

// init()
// dealOuterCards()
// increaseBet()
// dealMiddleCard()

function submitBet () {
  const previousPlayer = gameState.playerTurn

  getCurrentPlayer()

  dealMiddleCard()
  
  const leftRank = rankCards[cards.left.slice(1)]
  const rightRank = rankCards[cards.right.slice(1)]
  const middleRank = rankCards[cards.middle.slice(1)]
  
  const low = Math.min(leftRank,rightRank)
  const high = Math.max(leftRank,rightRank)

  
  if (gameState.currentBet === 0) {
    gameState.gameMessage = "You need to place a bet before submitting or pass!"
    render()
  }

  else if ((gameState.currentBet < gameState.currentPot) && (middleRank>low && middleRank<high)) {//winning state, pot not cleared
      currentPlayer.money += state.currentPot
      gameState.currentPot -= gameState.currentBet
      gameState.currentBet = 0
      gameState.gameMessage = `${previousPlayer} wins the pot! ${cards.middle} is between ${cards.left} and ${cards.right}.`
      gameState.roundResult ="win"  
      switchPlayer()
      render()
    }

  else if ((gameState.currentBet===gameState.currentpot) && (middleRank>low && middleRank<high)) {//winning state, pot cleared
      currentPlayer.money += state.currentPot
      gameState.currentPot -= gameState.currentBet
      gameState.currentBet = 0
      gameState.gameMessage= `${previousPlayer} clears the pot! ${cards.middle} is between ${cards.left} and ${cards.right}.`
      gameState.roundResult ="pot cleared"
      switchPlayer()
      render()
    }
  }


init()
dealOuterCards()
increaseBet()
// submitBet()




// function submitBet () {
//  if (cards.middle) {
//     gameMessageEl.textContent = "You've already revealed the middle card. Click 'Deal Cards' to continue.";
//     return;
//   }

//   if (state.currentBet === 0) {
//     gameMessageEl.textContent = "You must place a bet before submitting.";
//     return;
//   }
 
//   dealMiddleCard()

//  const leftRank = rankCards[cards.left.slice(1)]
//  const rightRank = rankCards[cards.right.slice(1)]
//  const middleRank = rankCards[cards.middle.slice(1)]

//  const low = Math.min(leftRank,rightRank)
//  const high = Math.max(leftRank,rightRank)

//  const currentPlayer = getCurrentPlayer()
//  const previousPlayer = state.playerTurn

//  if (middleRank>low && middleRank<high) {
//     currentPlayer.money += state.currentPot
//     gameMessageEl.textContent= `${previousPlayer} wins the pot! ${cards.middle} is between ${cards.left} and ${cards.right}.`
//     gameFlow.roundResult ="win"
//     gameFlow.newRound=true
//  }

//  else {
//   gameMessageEl.textContent = `${previousPlayer} loses the hand. ${cards.middle} is not between ${cards.left} and ${cards.right}.`
//   currentPlayer.money -= state.currentBet
//   gameFlow.roundResult ="loss"
//  }

//  render()

// }





