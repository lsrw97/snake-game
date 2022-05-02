const grid = document.querySelector(".grid")
const startBtn = document.getElementById("start-btn")
const statusTitle = document.querySelector(".game-status")
const width = 50
let snake = [0,1,2]
let squares = []
let direction = 1
let tail
let intervalId
let statuss = false
let score = 0
let hscore = 0
let speed = 1000

startBtn.addEventListener('click', startGame)

function startGame() {
  statusTitle.textContent = "Let's Go!"
  direction = 1
  speed = 1000
  score = 0
  snake = [0,1,2]
  clearInterval(intervalId)
  grid.innerHTML = ''
  squares = []
  createGrid()
  showSnake()
  generateApple()
  intervalId = setInterval(move, speed)
}

function lostGame() {
  console.log('lost')
  statusTitle.textContent = 'Game Over!'
  if(hscore < score)
    hscore = score
  document.querySelector('.highscore').textContent = `Highscore: ${hscore}`
}

function newGame() {
  statusTitle.textContent = "Let's go!"
  score = 0
}

// creates the grid on which the snake will move
function createGrid()
{
  for (let i = 0; i < 100; i++)
    {
      let square = document.createElement("div")
      square.classList.add('square')
      grid.appendChild(square)
      squares.push(square)
    }
}

//the first appearance of the snake in the game
function showSnake()
{
  snake.forEach(index => squares[index].classList.add('snake'))
  console.log(squares)
}




function move() {
  if(snake[snake.length - 1] % 10 === 9 && direction === 1)
    {lostGame()
    clearInterval(intervalId)}
  else if(snake[snake.length - 1] + direction < 0 && direction === -10)
    {clearInterval(intervalId)
    lostGame()}
  else if(snake[snake.length - 1] + direction >= 100 && direction === 10)
      {clearInterval(intervalId)
      lostGame()}
  else if(squares[snake[snake.length - 1] + direction].classList.contains('snake'))
    {clearInterval(intervalId)
    lostGame()}
  else if(snake[snake.length - 1] % 10 === 0 && direction === -1)
    {clearInterval(intervalId)
    lostGame()}

  else
    {
      if(!squares[snake[snake.length - 1] + direction].classList.contains('apple'))
      {
        tail = snake.shift()
        squares[tail].classList.remove('snake')
      }
      else {
        squares[snake[snake.length - 1] + direction].classList.remove('apple')
        generateApple()
        document.getElementById("score").textContent = ++score
        clearInterval(intervalId)
        speed *= 0.9
        intervalId = setInterval(move, speed)
      }
      snake.push(snake[snake.length - 1] + direction)
      console.log(snake + ' ' + direction + ' ' + intervalId)
      squares[snake[snake.length - 1]].classList.add('snake')
  }
}

function generateApple() {
  let number = Math.floor(Math.random() * 100)
  while(squares[number].classList.contains('snake'))
  {
    number = Math.floor(Math.random() * 100)
  }
  squares[number].classList.add('apple')
}

function control(e){
    if(event.keyCode === 39)
      direction = 1
    else if(event.keyCode === 37)
      direction = -1
    else if(event.keyCode === 40)
      direction = 10
    else if(event.keyCode === 38)
      direction = -10
  console.log(direction)
}
document.addEventListener('keyup', control)
//createGrid()
//showSnake()
//generateApple()
//intervalId = setInterval(move, 400)
