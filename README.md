# FooFighter.js

An experiment in making a really crappy starfighter game.

Demo: [foofighterjs.com](http://foofighterjs.com/)

## How to play

While the gameplay itself is still under development, it can be said that the game is about
survival and efficiency. You have 5 minutes to amass the best score you can without perishing.

Use the cursor keys to move your player and space bar to fire lasers. Each laser you fire deducts
2 points from your total score (won't go below 0 points). Each enemy unit behaves differently and are
worth different point values:

- Asteroid (5 and 10 pts): slow, deliberate movement on the X and Y axis. Large asteroids explode into smaller asteroids
on collisions.
- Enemy Ship (15 points): Moves along the Y-axis and fires lasers .
- Enemy UFO (18 points): Kamikaze unit that accelerates towards the player along X and Y axis.

## To install

```bash
# Install global grunt module
sudo npm install -g grunt

# Install package dependencies and build
npm install
```

## To start app

```bash
# Start a server @ localhost:3000
npm start
```

## To build the game source

```bash
grunt
# or to auto-build on save
grunt watch
```


*Game art provided by: [http://kenney.nl/post/space-shooter-art](http://kenney.nl/post/space-shooter-art)*
