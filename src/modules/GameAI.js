
;(function( FooFighter ){

'use strict';

function GameAI ( gameState ){
    this.gameState = gameState;
    this.game = gameState.game;
    this.gameState.groups.asteroids = this.game.add.group();
    this.asteroids = this.gameState.groups.asteroids;
    this.bindEvents();
}

var proto = GameAI.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('start', this.start.bind(this));
    vent.on('update', this.checkCollisions.bind(this));
    vent.on('asteroid-expired', this.cleanupExpiredAsteroid.bind(this));
};


proto.start = function(){
    setInterval(this.createAsteroid.bind(this), 1000);
};


proto.createAsteroid = function(){
    var asteroids = this.asteroids,
        newRoid;

    newRoid = new FooFighter.Asteroid(this.gameState).create();
    asteroids.add(newRoid.sprite);
};


proto.cleanupExpiredAsteroid = function( id ) {
    var i,
        asteroids = this.asteroids,
        asteroid;

    for (i = 0; i < asteroids.length; i++) {
        asteroid = asteroids[i];
        if ( asteroid.id === id ) {
            asteroids = asteroids.splice(i, 1);
            return true;
        }
    }
};


proto.checkCollisions = function(){
    // console.log(this.asteroids);
};


FooFighter.GameAI = GameAI;

})(FooFighter);
