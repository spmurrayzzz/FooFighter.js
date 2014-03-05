
;(function( FooFighter ){

'use strict';

function GameAI ( gameState ){
    this.gameState = gameState;
    this.game = gameState.game;
    this.gameState.entities.asteroids = [];
    this.bindEvents();
}

var proto = GameAI.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    console.log(this);
    vent.on('start', this.start.bind(this));
    vent.on('update', this.checkCollisions.bind(this));
    vent.on('asteroid-expired', this.cleanupExpiredAsteroid.bind(this));
};


proto.start = function(){
    setInterval(this.createAsteroid.bind(this), 1000);
};


proto.createAsteroid = function(){
    var asteroids = this.gameState.entities.asteroids;
    asteroids.push(
        new FooFighter.Asteroid(this.gameState).create()
    );
};


proto.cleanupExpiredAsteroid = function( id ) {
    var i,
        asteroids = this.gameState.entities.asteroids,
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
    // console.log(this.gameState.entities.asteroids);
};


FooFighter.GameAI = GameAI;

})(FooFighter);
