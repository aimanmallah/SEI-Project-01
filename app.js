// Creating the 9x9 board //
const width = 11
const squares = []
let score = 0
let lives = 3
let grid
let scoreboard
let livesboard
const alienArrayStart = [1, 3, 4, 5, 6, 7, 9, 12, 14, 15, 16, 17, 18, 20, 23, 25, 26, 27, 28, 29, 31, 34, 36, 37, 38, 39, 40, 42]
let alienArray = alienArrayStart
let playerIndex = 115
let moveIndex
let gameInPlay = false
const moves = [-1, 11, 1, 1, 11, -1]
let alienMovement
let alienShooting


function createAlien() {
  alienArray.forEach(alien => {
    squares[alien].classList.toggle('alien')
  })
}

function init(){
  grid = document.querySelector('.grid')
  scoreboard = document.querySelector('.score')
  livesboard = document.querySelector('.lives')
  createGrid()
  createAlien()
  addEvents()
  collision()

  // CREATE THE PLAYER
  squares[playerIndex].classList.add('player')

}

// CREATE THE GRID
function createGrid(){
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }
}
// FUNCTION FOR MOVING THE ALIENS
function moveAlien(movement) {
  alienArray.forEach(alien => {
    squares[alien].classList.remove('alien')
  })
  alienArray = alienArray.map(alien => alien + movement)
  alienArray.forEach(alien => {
    squares[alien].classList.add('alien')
  })
  if(alienArray.some(index => index > 111)){
    endGame()
    document.querySelector('.para').textContent = 'You lose'
    resetTimers()
  }
  if(aliensArray.some(index => index > 80)){
    endGame()
    document.querySelector('.para').textContent = 'You lose'
  }
}

// FUNCTION FOR MOVING THE PLAYER
function move(amount) {
  squares[playerIndex].classList.remove('player')
  playerIndex = playerIndex+amount
  squares[playerIndex].classList.add('player')
}

// FUNCTION FOR REMOVING WLECOME_SCREEN
function moveScreen() {
  document.querySelector('.welcome_screen').classList.toggle('hide')
}

//MOVING THE PLAYER & SHOOTING (EVENT LISTENERS)
function addEvents(){
  const laserAudio = document.querySelector('.shoot')
  document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
      case 37:
      // left
        if(playerIndex % width > 0 && gameInPlay === true) {
          move(-1)
        }
        break

      case 39:
        // right
        if(playerIndex % width < width - 1 && gameInPlay === true) {
          move(+1)
        }
        break

      case 32:
        //spacebar
        if (gameInPlay) {
          shootLasers(playerIndex, -width, 'laser', 100)
          e.preventDefault()
          laserAudio.src = 'Audio/shoot.wav'
          laserAudio.play()
        }
    }
  })

  //MOVE SCREEN AND START GAME (EVENT LISTENER)
  document
    .querySelector('.startbutton')
    .addEventListener('click', () => {
      moveScreen()
      startGame()
    })
}

//LASER AND BOMB DROP FUNCTION
function shootLasers(shooterIndex, direction, className, speed) {
  let laserIndex = shooterIndex + direction
  let laser = squares[laserIndex]
  const laserInterval = setInterval(() => {
    if (laser) laser.classList.remove(className)

    if (laserIndex + direction < 0 || laserIndex + direction >= width**2) clearInterval(laserInterval)

    else if (laser) {
      laserIndex += direction
      laser = squares[laserIndex]
      squares[laserIndex].classList.add(className)
    }

    if (className === 'laser' && !isNaN(laserIndex) && squares[laserIndex].classList.contains('alien')){
      alienShot(laserIndex, laserInterval)
      score ++
      scoreboard.textContent = score
      squares[laserIndex].classList.add('explode')
      setTimeout(() => {
        squares[laserIndex].classList.remove('explode')
      },400)
    }
  }, speed)
}

// WHEN AN ALIEN IS SHOT DOWN
function alienShot(laserIndex, laserInterval) {
  const aliendeadAudio = document.querySelector('.aliendead')
  aliendeadAudio.src = 'Audio/invaderkilled.wav'
  aliendeadAudio.play()
  squares[laserIndex].classList.remove('laser')
  clearInterval(laserInterval)
  const index = alienArray.indexOf(laserIndex)
  alienArray.splice(index,1)
  squares[laserIndex].classList.remove('alien')
  squares[laserIndex].classList.remove('laser')
  if (alienArray.length === 0) {
    endGame()
    document.querySelector('.para').textContent = 'You win'
  }
}

// ALIEN MOVEMENT
function alienIntervals(){
  alienMovement = setInterval(() => {
    moveIndex= moveIndex === 5 ? 0 : moveIndex + 1
    moveAlien(moves[moveIndex])
  }, 600)

  // ALIEN DROPPING BOMBS
  alienShooting = setInterval(() => {
    const bombIndex =   alienArray[Math.floor(Math.random()*(alienArray.length - 1))]
    shootLasers(bombIndex, width, 'bomb', 200)
  },2000)
}

//Player and Bomb collision
function collision() {
  let collisionInterval = setInterval(() => {
    const currentPlayer = squares[playerIndex]
    if (currentPlayer.classList.contains('bomb')) {
      currentPlayer.classList.remove('bomb')
      currentPlayer.classList.add('explode')
      setTimeout(() => {
        currentPlayer.classList.remove('explode')
      },200)
      if (lives > 0) {
        const defeatAudio = document.querySelector('.defeat')
        defeatAudio.src = 'Audio/Explosion+1.wav'
        defeatAudio.play()
        lives--
        livesboard.textContent = lives
      }
      if (lives === 0) {
        endGame()
        document.querySelector('.para').textContent = 'You lose'
        clearInterval(collisionInterval)
        collisionInterval = null
      }
    }
  }, 100)
}

function resetTimers(){
  clearInterval(alienMovement)
  clearInterval(alienShooting)
}

function endGame(){
  gameInPlay = false
  squares[playerIndex].classList.remove('player')
  resetTimers()
  console.log('finished')
  document.querySelector('.welcome_screen').classList.toggle('hide')
  document.querySelector('.yourscore').textContent = `Your score is ${score}!`
}

function startGame() {
  squares[playerIndex].classList.remove('player')
  alienArray.forEach(alien => {
    squares[alien].classList.remove('alien')
  })
  resetTimers()
  gameInPlay = true
  moveIndex = -1
  score = 0
  scoreboard.textContent = score
  lives = 3
  livesboard.textContent = lives
  alienArray = alienArrayStart
  createAlien()
  alienIntervals()
  playerIndex = 115
  squares[playerIndex].classList.add('player')
  collision()
}

document.addEventListener('DOMContentLoaded', init)
