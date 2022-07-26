const mainTitle = document.querySelector('header>h1');
const startButton = document.querySelector('.start-button');
const main = document.querySelector('main');
const computer = document.querySelector('.computer>p');
const player = document.querySelector('.player>p');
const log = document.querySelector('.messages>h2');
const playButtons = document.querySelectorAll('.play-button');
const logFinalResult = document.querySelector('.log-final-result');

let gameInfo = {
  playerCounter: 0,
  computerCounter: 0,
  evenCounter: 0,
}

startButton.addEventListener('click', () => {
  logFinalResult.textContent = ``;
  logFinalResult.classList.add('hide-it');
  mainTitle.classList.add('hide-it');
  main.classList.remove('hide-it');
  startButton.classList.add('hide-it');
})

playButtons.forEach(item => { 
  item.addEventListener('click', (e) => {
    let roundInfo = playRound(item.value, computerPlay());
    updateGameInfo(roundInfo);
    checkResult();
  })
});

const playRound = (playerSelection, computerSelection) => {
  let roundInfo = {
    playerSelection: playerSelection,
    computerSelection: computerSelection,
    winner: '',
  };
  if (playerSelection == computerSelection) {
    roundInfo.winner = 'Even';
  } else {
    if (playerSelection == 'Rock') {
      if (computerSelection == 'Paper') {
        roundInfo.winner = 'Computer';
      } else if (computerSelection == 'Scissors') {
        roundInfo.winner = 'Player';
      }
    } else if (playerSelection == 'Paper') {
      if (computerSelection == 'Rock') {
        roundInfo.winner = 'Player';
      } else if (computerSelection == 'Scissors') {
        roundInfo.winner = 'Computer';
      }
    } else if (playerSelection == 'Scissors') {
      if (computerSelection == 'Rock') {
        roundInfo.winner = 'Computer';
      } else if (computerSelection == 'Paper') {
        roundInfo.winner = 'Player';
      }
    }
  }
  return roundInfo;
};

function getRandomNumber(min = 0, max = 2) {
  const num = Math.floor(Math.random() * (max - min + 1) + min);
  return num;
};

const computerPlay = () => {
  let randomNumber = getRandomNumber();
  let computerSelection; 
  switch (randomNumber) {
    case 0:
      computerSelection = 'Rock';
      break;
    case 1:
      computerSelection = 'Paper';
      break;
    case 2: 
      computerSelection = 'Scissors';
      break;
  }
  return computerSelection;
};

function updateGameInfo(roundInfo) {
  computer.textContent = roundInfo.computerSelection;
  player.textContent = roundInfo.playerSelection;

  if (roundInfo.winner == 'Even') {
    gameInfo.evenCounter += 1;
    log.textContent = `The round result is ${roundInfo.winner}!`;
  }
  else {
    if (roundInfo.winner == 'Player') {
      gameInfo.playerCounter += 1;
    }
    else {
      gameInfo.computerCounter += 1;
    }
    log.textContent = `${roundInfo.winner} wins the round!`;
  }
};

const checkResult = () => {
  if (gameInfo.computerCounter + gameInfo.playerCounter + gameInfo.evenCounter === 5) {
    logFinalResult.classList.remove('hide-it');
    logFinalResult.textContent = `Final result: computer - ${gameInfo.computerCounter} player ${gameInfo.playerCounter}`;
    main.classList.add('hide-it');
    mainTitle.classList.remove('hide-it');
    startButton.classList.remove('hide-it');
    resetData();
  }
};

function resetData() {
  gameInfo = {
    playerCounter: 0,
    computerCounter: 0,
    evenCounter: 0,
  }
  computer.textContent = '';
  player.textContent = '';
  log.textContent = '';
};
