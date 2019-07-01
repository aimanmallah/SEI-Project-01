# GA-SEI-PROJECT-01

### Timeframe
5 days

## Technologies used

* JavaScript (ES6)
* HTML5 + HTML5 Audio
* CSS
* GitHub

## Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## Space Invaders :space_invader:
![Space Invaders](https://user-images.githubusercontent.com/47919053/55615254-d4447080-5786-11e9-8fcd-d9299f428832.png)
You can find a hosted version [here](https://aimanmallah.github.io/SEI-Project-01/)

### Game overview
Space Invaders is a 1978 arcade game created by Tomohiro Nishikado. Within the shooter genre, Space Invaders is one of the earliest shoot 'em ups and the first fixed shooter. The goal is to defeat wave after wave of descending aliens with a horizontally moving laser to earn as many points as possible.

### Controls
- Spaceship movements: ← → keys
- Spaceship laser shooter: {Space Bar}

### Game Instructions
1. The game begins with a welcome screen  The game is started by clicking on the "Start" button.

![Screenshot 2019-06-09 at 21 47 15](https://user-images.githubusercontent.com/47919053/59164134-fb118100-8b00-11e9-9abc-b48ddf4bff05.png)


2. After the start button has been clicked the game shows on the screen. The user starts on 3 lives and a score of zero.

![screenshot - Game Play](https://user-images.githubusercontent.com/47919053/55617796-cbef3400-578c-11e9-9ba7-554797140a2a.png)

3. The score increases each time an alien invader is shot down. Moreover, the lives decrease by one each time the spaceship is shot.

![screenshot - Score](https://user-images.githubusercontent.com/47919053/55618357-2f2d9600-578e-11e9-8a44-f66fd7ad7676.png)

4. The player wins if they successfully shoots all the alien invaders before they reach the bottom of the screen. The score is logged on the game over screen.

  However, if the spaceship is hit three times, or the aliens reach the bottom of the screen, the player loses. Their score is still displayed on the game over screen.

![screenshot - Game Over - Win](https://user-images.githubusercontent.com/47919053/55618518-9ea38580-578e-11e9-8340-4df2a6033e77.png)

## Process

The starting point for this game was to create an 11x11 grid on which to build the rest of the game.

The spaceship's movement is on a keydown event listener and has conditions to prevent this movement outside of the grid.

The aliens are made using an array. They drop bombs every 0.4 seconds.

The shooting function and the bombs dropped by the aliens use the same functions with different inputs.  

### Challenges

The biggest challenge for this project making sure the spaceship moved in the correct manner. Once this was solved, other functions were built using similar logic.

![image](https://user-images.githubusercontent.com/47919053/60401759-e7948b80-9b7d-11e9-9414-4d59135a71f3.png)

### Wins

A big win for me was practicing time functions such as setIntervals. An example of using this in the game was adding the explosion image to a div when a collision happens.

## Future features

In the future, I would like to create a scoreboard. I would also like to add in harder levels and more randomly generating alien invaders.
