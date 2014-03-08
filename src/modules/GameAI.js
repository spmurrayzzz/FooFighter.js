/**
 * GameAI.js
 *
 * FooFighter.js — GameAI module
 *
 * This module controls the generation of enemy entities, collision detection,
 * and overall game engine goodness.
 */

;(function( FooFighter ){

'use strict';

function GameAI ( gameState ){
    var d = new Date();
    this.gameState = gameState;
    this.game = gameState.game;
    this.asteroids = this.gameState.groups.asteroids;
    this.lasers = this.gameState.groups.lasers;
    this.gameInProgress = false;
    this.lastEnemyCreated = d.getTime();
    this.config = {
        enemyThrottleVal: 1000
    };
    this.bindEvents();
}

var proto = GameAI.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('start', this.start.bind(this));
    vent.on('update', this.checkCollisions.bind(this));
    vent.on('update', this.addEnemiesCheck.bind(this));
};


proto.start = function(){
    this.gameInProgress = true;
};


proto.stop = function(){
    this.gameInProgress = false;
};


proto.addEnemiesCheck = function(){
    var throttleVal = this.config.enemyThrottleVal,
        lastTime = this.lastEnemyCreated,
        currTime = new Date().getTime();
    if ( this.gameInProgress === true) {
        if ( currTime - lastTime >= throttleVal ) {
            this.createAsteroid();
            this.lastEnemyCreated = currTime;
        }
    }
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
    this.gameState.score += 10;
};


FooFighter.GameAI = GameAI;

})(FooFighter);
