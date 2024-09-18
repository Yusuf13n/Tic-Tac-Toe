const displayField = document.querySelector('.display-field');
const cells = document.querySelectorAll('.cell'); 
const btnReset = document.querySelector('.btn-reset');
const scoreDiv = document.querySelector('.score')
const container = document.querySelector('.container')


const btnPlayAgainstComputer = document.createElement('button');
btnPlayAgainstComputer.textContent = 'vs Comp';
btnPlayAgainstComputer.classList = 'btnComputer'


let firstPlayer = 'X';
let secondPlayer = 'O';
let currentPlayer = firstPlayer; 

let gameBoard = ['', '', '', '', '', '', '', '', '']; 

let playerScore = 0;
let computerScore = 0;
let isComputerTurn = false; 

let winningLine = null; // Храним индекс выигрышной линии




// Обновление счета

function updateScore() {
  document.getElementById('player-score').textContent = playerScore;
  document.getElementById('computer-score').textContent = computerScore;
}




// Функция проверки выигрыша

function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];
  
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c] && gameBoard[a] !== '') {
      // Победа!
      winningLine = i; // Сохраняем индекс выигрышной линии
      if (currentPlayer === firstPlayer) {
        playerScore++;
      } else {
        computerScore++;
      }
      updateScore();
      alert(`Победа ${currentPlayer}!`);
      highlightWinningLine(); // Выделяем выигрышную линию
      resetGame();
      return true;
    }
  }
  
  // Ничья
  if (gameBoard.every(cell => cell !== '')) {
    alert('Ничья!');
    resetGame();
    return true;
  }
  
  return false; // Игрa продолжаeтся
}




// Функция сброса игры

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', '']; 
  currentPlayer = firstPlayer; 
  cells.forEach(cell => cell.textContent = ''); 
  removeWinningLineHighlight(); // Удаляем подсветку выигрышной линии
  winningLine = null; // Сбрасываем индекс выигрышной линии
}





// Функция хода компьютера

function computerMove() {
  let availableCells = [];
  for (let i = 0; i < 9; i++) {
    if (gameBoard[i] === '') {
      availableCells.push(i);
    }
  }
  if (availableCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cellIndex = availableCells[randomIndex];
    cells[cellIndex].textContent = secondPlayer;
    gameBoard[cellIndex] = secondPlayer;
    // Добавляем проверку выигрыша после хода компьютера
    checkWin(); 
  }
}





// Обработчик события для ячеек

cells.forEach((cell, index) => { 
  cell.addEventListener('click', () => {
    if (cell.textContent === '' && !checkWin()) {
      cell.textContent = currentPlayer;
      gameBoard[index] = currentPlayer;
      if (!checkWin()) {
        currentPlayer = (currentPlayer === firstPlayer) ? secondPlayer : firstPlayer; 
        // Если ходит компьютер
        if (isComputerTurn && currentPlayer === secondPlayer) { 
          computerMove();
          currentPlayer = firstPlayer; // Возвращаем ход первому игроку
        }
      }
    }
  });
});




// Обработчик события для кнопки сброса

btnReset.addEventListener('click', () => {
  resetGame();
});




// Обработчик события для кнопки "Играть с компьютером"

btnPlayAgainstComputer.addEventListener('click', () => {
  isComputerTurn = !isComputerTurn;
  if (isComputerTurn) {
    btnPlayAgainstComputer.textContent = 'Solo';
  } else {
    btnPlayAgainstComputer.textContent = 'vs Comp';
  }
  resetGame();
});



// Добавляем счетчик на страницу

const scoreContainer = document.createElement('div');
scoreContainer.classList = 'scoreContainer';
scoreContainer.innerHTML = `
<div>
<span>Игрок:</span> <span id="player-score">0</span>
</div>
<div>
<span>Компьютер:</span> <span id="computer-score">0</span>
</div>
`;
container.append(scoreContainer, btnPlayAgainstComputer);



// Обновляем счёт счета
updateScore();