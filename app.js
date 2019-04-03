document.addEventListener('DOMContentLoaded', () => {

  // Creating the 9x9 board //
  const grid = document.querySelector('.grid')
  const width = 11
  const squares = []
  let player = 0
  let score = 0
  let lives = 3
  const scoreboard = document.querySelector('.score')
  const livesboard = document.querySelector('.lives')


  // CREATE THE GRID
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  // CREATE THE PLAYER
  let playerIndex = 115
  squares[playerIndex].classList.add('player')

  // FUNCTION FOR MOVING THE PLAYER
  function move(amount) {
    squares[playerIndex].classList.remove('player')
    playerIndex = playerIndex+amount
    squares[playerIndex].classList.add('player')
  }
  //EVENT LISTENER FOR MOVING THE PLAYER
  document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
      case 37:
        // left
        if(playerIndex % width > 0) {
          move(-1)
        }
        break

      case 39:
        // right
        if(playerIndex % width < width - 1) {
          move(+1)
        }
        break

      case 32:
      //spacebar
        shootLasers(playerIndex, -width, 'laser', 100)
    }
  })

  // WHEN AN ALIEN IS SHOT DOWN
  function alienShot(laserIndex, laserInterval) {
    squares[laserIndex].classList.remove('laser')
    clearInterval(laserInterval)
    const index = alienArray.indexOf(laserIndex)
    alienArray.splice(index,1)
    squares[laserIndex].classList.remove('alien')
    squares[laserIndex].classList.remove('laser')
  }

  //Laser stuff


  function shootLasers(shooterIndex, direction, className, speed) {
    // Get the index of the square above the player
    let laserIndex = shooterIndex + direction
    // Get the DOM element of the square above the player
    let laser = squares[laserIndex]
    // Move missiles up
    const laserInterval = setInterval(() => {
      // Remove missiles class from the current square
      if (laser) laser.classList.remove(className)

      if (laserIndex + direction < 0 || laserIndex + direction >= width**2) clearInterval(laserInterval)


      else if (laser) {
        // Set the new index for the missiles square
        laserIndex += direction
        // Get the new DOM element of the next square
        laser = squares[laserIndex]
        // Add missiles class to the next square up
        squares[laserIndex].classList.add(className)
      }

      if (className === 'laser' && !isNaN(laserIndex) && squares[laserIndex].classList.contains('alien')){
        alienShot(laserIndex, laserInterval)
        score ++
        scoreboard.textContent = score

      }
      //...repeat every 100ms
    }, speed)
  }


  // Alien Stuff//

  let alienArray = [1, 3, 4, 5, 6, 7, 9, 12, 14, 15, 16, 17, 18, 20, 23, 25, 26, 27, 28,29, 31]

  function createAlien() {
    alienArray.forEach(alien => {
      squares[alien].classList.add('alien')
    })
  }

  createAlien()
  let moveIndex=-1
  let moves=[-1, 11, 1, 1, -11, -1]

  function moveAlien(movement) {
    alienArray.forEach(alien => {
      squares[alien].classList.remove('alien')
    })
    alienArray = alienArray.map(alien => alien + movement)
    alienArray.forEach(alien => {
      squares[alien].classList.add('alien')
    })
  }


  setInterval(() => {
    moveIndex= moveIndex === 5 ? 0 : moveIndex + 1
    moveAlien(moves[moveIndex])
  }, 500)

  // Alien Bomb

  setInterval(() => {
    const bombIndex = alienArray[Math.floor(Math.random()*(alienArray.length - 1))]
    shootLasers(bombIndex, width, 'bomb', 300)

  },2000)

  //Player and Bomb collision
  function collision() {
    const collisionInterval = setInterval(() => {
      const currentPlayer = squares[playerIndex]
      if (currentPlayer.classList.contains('bomb')) {
        currentPlayer.classList.remove('bomb')
        if (lives > 0) {
          lives--
          livesboard.textContent = lives
        }
        if (lives === 0) {
          console.log('finished')
          clearInterval(collisionInterval)
          // stop EVERYTHING...
          currentPlayer.classList.remove('player')
        }
      }
    }, 100)
  }


//function for game over
  collision()





})
