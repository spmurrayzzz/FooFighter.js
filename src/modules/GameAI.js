
;(function( FooFighter ){

'use strict';

function GameAI ( gameState ){
    this.gameState = gameState;
    this.game = gameState.game;
    this.gameState.groups.asteroids = this.game.add.group();
    this.gameState.groups.lasers = this.game.add.group();
    this.asteroids = this.gameState.groups.asteroids;
    this.lasers = this.gameState.groups.lasers;
    this.bindEvents();
}

var proto = GameAI.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('start', this.start.bind(this));
    vent.on('update', this.checkCollisions.bind(this));
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


proto.checkCollisions = function(){
    this.game.physics.overlap(
        this.asteroids, this.lasers, this.collisionHandler, null, this
    );
};


proto.collisionHandler = function( asteroid, laser ) {
    asteroid.kill();
    laser.kill();
};


FooFighter.GameAI = GameAI;

})(FooFighter);
