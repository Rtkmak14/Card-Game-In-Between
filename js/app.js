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
    roundResult: null,
    gameOver: false
}

const cardDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

const rankCards = {
  "A": 1,
  "02": 2, "03": 3, "04": 4, "05": 5, "06": 6, "07": 7,
  "08": 8, "09": 9, "10": 10,
  "J": 11, "Q": 12, "K": 13
}

const buttonStates = {
  initial: {
    dealBtn: true,
    passBtn: false,
    increaseBtn: false,
    decreaseBtn: false,
    submitBtn: false,
    resetBtn: true
  },
  afterDeal: {
    dealBtn: false,
    passBtn: true,
    increaseBtn: true,
    decreaseBtn: true,
    submitBtn: true,
    resetBtn: true
  },
  afterSubmit: {
    dealBtn: true,
    passBtn: false,
    increaseBtn: false,
    decreaseBtn: false,
    submitBtn: false,
    resetBtn: true
  },
   gameOver: {
    dealBtn: false,
    passBtn: false,
    increaseBtn: false,
    decreaseBtn: false,
    submitBtn: false,
    resetBtn: true
  }
}


/*---------- Variables (state) ---------*/

let shuffledDeck = []
let userClick = ""

/*----- Cached Element References  -----*/

const money1El = document.getElementById("money1")
const money2El = document.getElementById("money2")

const gameMessageEl = document.getElementById("gameMessage")

const card1El = document.getElementById("card1")
const card2El = document.getElementById("card2")
const card3El = document.getElementById("card3")

const remainingTurnsEl = document.getElementById("turnsRemaining")
const currentTurnEl = document.getElementById("playerTurn")
const potEl = document.getElementById("currentPot")
const betEl = document.getElementById("currentBet")

const buttons = document.querySelectorAll(".buttons button")

const dealBtn = document.getElementById("dealBtn")
const passBtn = document.getElementById("passBtn")
const increaseBtn = document.getElementById("increaseBtn")
const decreaseBtn = document.getElementById("decreaseBtn")
const submitBtn = document.getElementById("submitBtn")
const resetBtn = document.getElementById("resetBtn")


/*----------- Event Listeners ----------*/

buttons.forEach((button) => {
    button.addEventListener("click",(event)=> {
        let userClick = event.target.id
        handleClick(userClick)
    })
})

/*-------------- Functions -------------*/

function init () {
    players.player1.money = 100
    players.player2.money = 100

    gameState.turnsRemaining = 3
    gameState.playerTurn = "Player 1"
    gameState.currentPot = 0
    gameState.currentBet = 0
    gameState.gameMessage = "Welcome to In-Between! Select Deal Cards to begin playing!"
    gameState.roundResult = null
    gameState.gameOver = false
    
    cards.left = null
    cards.right =  null
    cards.middle =  null

    shuffleCards (cardDeck)
    
    card1El.className = "card back-blue"
    card2El.className = "card back-blue"
    card3El.className = "card back-blue"

    setButtonStates("initial")

    render()
}

function render() {

  money1El.textContent = `$${players.player1.money}`
  money2El.textContent = `$${players.player2.money}`

  remainingTurnsEl.textContent = `Turns Remaining: ${gameState.turnsRemaining}`
  currentTurnEl.textContent = `Current Turn: ${gameState.playerTurn}`
  potEl.textContent = `Pot: $${gameState.currentPot}`
  betEl.textContent = `Current Bet: $${gameState.currentBet}`

  gameMessageEl.textContent = gameState.gameMessage

}

function checkTurnsRemaining () {
  const playerOneMoney = players.player1.money
  const playerTwoMoney = players.player2.money
  const playerOnePotentialWinnings = Math.abs(playerOneMoney - playerTwoMoney)
  const playerTwoPotentialWinnings = Math.abs(playerTwoMoney - playerOneMoney)

  if (gameState.turnsRemaining===1) {
    gameState.gameMessage = gameState.gameMessage + " It's also the last turn!"
    gameState.gameOver = true
  }

  else if (gameState.gameOver === true && gameState.currentPot === 0) {
    gameState.gameMessage = gameState.gameMessage + " Game is also over!"
    setButtonStates("gameOver")
  }

  else if(gameState.gameOver === true && gameState.currentPot != 0) {
    gameState.gameMessage = gameState.gameMessage + " Keep playing until the pot is cleared!"
  }

  else {gameState.gameMessage = gameState.gameMessage}

}

function handleClick (userClick) {
  if (userClick==="dealBtn") {
    dealOuterCards()
  }

  else if(userClick==="passBtn") {
    passBet()
  }

  else if (userClick==="increaseBtn") {
    increaseBet()
  }

  else if (userClick==="decreaseBtn") {
    decreaseBet()
  }

  else if (userClick==="submitBtn") {
    submitBet()
  }

  else if (userClick=== "resetBtn") {
    init()
  }

}

function setButtonStates (phase) {
  const config = buttonStates[phase]

  for (let id in config) {
    document.getElementById(id).disabled = !config[id]
  }
}

function shuffleCards(cardDeck) {
 shuffledDeck = [...cardDeck].sort(() => Math.random() - 0.5)
}

function checkDeckLength1 () {
  if (shuffledDeck.length < 1) {
      shuffleCards([...cardDeck])
  }
}

function checkDeckLength2 () {
  if  (shuffledDeck.length < 2) {
        shuffleCards([...cardDeck])
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
  
  else if (gameState.roundResult === "not cleared") {
    //check if there's enough cards, otherwise reshuffle.
    checkDeckLength2 ()

    gameState.gameMessage = `It's ${gameState.playerTurn} turn. `

    const card1 = shuffledDeck.shift()
    const card3 = shuffledDeck.shift()
    cards.left = card1
    cards.right = card3
    card1El.className = `card ${card1}`
    card3El.className = `card ${card3}`
    card2El.className = "card back"
    
  }


  else if (gameState.roundResult === "cleared") {
    //check if there's enough cards, otherwise reshuffle.
    checkDeckLength2()

    players.player1.money -= 10
    players.player2.money -= 10
    gameState.currentPot += 20
    gameState.gameMessage = "New round! Antes are in! Place bet or pass."

    const card1 = shuffledDeck.shift()
    const card3 = shuffledDeck.shift()
    cards.left = card1
    cards.right = card3
    card1El.className = `card ${card1}`
    card3El.className = `card ${card3}`
    card2El.className = "card back"
  }
  setButtonStates("afterDeal")
  render();
}

function passBet () {
  
  checkDeckLength2 ()

  const card1 = shuffledDeck.shift()
  const card3 = shuffledDeck.shift()
  cards.left = card1
  cards.right =card3

  card1El.className = `card ${card1}`
  card3El.className = `card ${card3}`

  const previousPlayer = gameState.playerTurn

  switchPlayer ()
  
  gameState.gameMessage = `${previousPlayer} has passed. It's now ${gameState.playerTurn}'s turn.`
   
  
  gameState.turnsRemaining -=1

  checkTurnsRemaining()

  render()

}


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
    gameState.gameMessage = `Bet has been reduced by $10. Bet is now $${gameState.currentBet}`
    render()
  }
}


function dealMiddleCard () {
  checkDeckLength1 ()

  const card2 = shuffledDeck.shift()
  cards.middle = card2
  card2El.className = `card ${card2}`
}


function submitBet () {
  if (gameState.currentBet === 0) {
    gameState.gameMessage = "You need to place a bet before submitting or pass!"
    render()
    return
  }
  
  const previousPlayer = gameState.playerTurn

  const currentPlayer = getCurrentPlayer()

  dealMiddleCard()
  
  const leftRank = rankCards[cards.left.slice(1)]
  const rightRank = rankCards[cards.right.slice(1)]
  const middleRank = rankCards[cards.middle.slice(1)]

  
  const low = Math.min(leftRank,rightRank)
  const high = Math.max(leftRank,rightRank)

  if ((gameState.currentBet < gameState.currentPot) && (middleRank>low && middleRank<high)) {//winning state, pot not cleared
      currentPlayer.money += gameState.currentBet //return bet
      currentPlayer.money += gameState.currentBet //take portion of pot won
      gameState.currentPot -= gameState.currentBet
      gameState.currentBet = 0
      switchPlayer()
      gameState.gameMessage = `The middle card is in between! ${previousPlayer} wins the bet and collects their winnings. It's now ${gameState.playerTurn}'s turn - select Deal Cards to continue.`
      gameState.roundResult = "not cleared"
      gameState.turnsRemaining -=1 
    }

  else if ((gameState.currentBet===gameState.currentPot) && (middleRank>low && middleRank<high)) {//winning state, pot cleared
      currentPlayer.money += gameState.currentPot
      currentPlayer.money += gameState.currentBet
      gameState.currentPot -= gameState.currentBet
      gameState.currentBet = 0
      switchPlayer()
      gameState.gameMessage= `The middle card is in between - ${previousPlayer} clears the pot! ${gameState.playerTurn}, it's your turn. Select Deal Cards to begin next round.`
      gameState.roundResult ="cleared"
      gameState.turnsRemaining -=1
    }

  else {
    gameState.currentPot += gameState.currentBet
    gameState.currentBet = 0
    gameState.roundResult ="not cleared"
    switchPlayer()
    gameState.gameMessage= `The middle card is not between - ${previousPlayer} losses the bet! It's now ${gameState.playerTurn}'s turn. Select Deal Cards to continue.`
    gameState.turnsRemaining -=1
  }
  
  setButtonStates("afterSubmit")
  checkTurnsRemaining()
  render()
  }

init()






