const grid = document.querySelector(".grid")
const startButton = document.getElementById("start-btn")
const scoreBoard = document.getElementById("score")
const message = document.querySelector(".message")

let gridArr = []
let snake = [0, 1, 2]
let direction = 1
const width = 10
let appleIndex = 0
let interval = 500
let timerId = 0
let game = false
let score = 0

startButton.addEventListener('click', startGame)

for(let i = 0; i < 100; i++) {
  const element = document.createElement("div")
  element.classList.add("square")
  gridArr.push(element)
  grid.appendChild(element)
}

function displaySnake() {
  snake.forEach(index => gridArr[index].classList.add("snake"))
}

function move() {
  if( (snake[snake.length - 1] % width === width - 1 && direction === 1) ||
      (snake[snake.length - 1] % width === 0 && direction === -1) ||
      (snake[snake.length - 1] + width >= width * width && direction === width) ||
      (snake[snake.length - 1] - width < 0 && direction === -width) ||
      (gridArr[snake[snake.length - 1] + direction].classList.contains("snake")))
      {
        message.textContent = "YOU LOSE!"
        message.style.display = "block"
        return clearInterval(timerId)
      }

  if(gridArr[snake[snake.length - 1] + direction].classList.contains("apple"))
  {
    gridArr[snake[snake.length - 1] + direction].classList.remove("apple")
    gridArr[snake[snake.length - 1] + direction].classList.add("snake")
    snake.push(snake[snake.length - 1] + direction)
    score++
    scoreBoard.textContent = score
    generateApple()
    interval *= 0.9
    clearInterval(timerId)
    timerId = setInterval(move, interval)
  }
  else
  {
    snake.push(snake[snake.length - 1] + direction)
    gridArr[snake[snake.length - 1]].classList.add("snake")
    gridArr[snake[0]].classList.remove("snake")
    snake.shift()
}
  console.log(snake)
}

function control(e) {
  if(e.keyCode === 40) direction = 10
  else if(e.keyCode ===39) direction = 1
  else if(e.keyCode === 38) direction = -10
  else if(e.keyCode === 37) direction = -1
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * gridArr.length)
  } while (gridArr[appleIndex].classList.contains("snake"));
  gridArr[appleIndex].classList.add("apple")
}

function startGame() {
  if(!game)
  {
    timerId = setInterval(move, interval)
    move()
    displaySnake()
    generateApple()
    game = !game
  }
  else if(game)
  {
    clearInterval(timerId)
    gridArr.forEach(index => index.classList.remove("snake"))
    gridArr.forEach(index => index.classList.remove("apple"))
    message.classList.add("message")
    score = 0
    snake = [0, 1, 2]
    direction = 1
    appleIndex = 0
    interval = 500
    timerId = 0
    game = !game
    scoreBoard.textContent = score
    message.style.display = "none"

  }
  console.log(game)
}



document.addEventListener("keyup", control)
