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
        enemyThrottleVal: 1000,
        bigToSmallPercentage: 0.6,
        points: {
            'meteorBig.png': 5,
            'meteorSmall.png': 10
        }
    };
    this.bindEvents();
}

var proto = GameAI.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('start', this.start.bind(this));
    vent.on('update', this.checkCollisions.bind(this));
    vent.on('update', this.addEnemiesCheck.bind(this));
    return this;
};


proto.start = function(){
    this.gameInProgress = true;
    return this;
};


proto.stop = function(){
    this.gameInProgress = false;
    return this;
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
    return this;
};


proto.createAsteroid = function(){
    var asteroids = this.asteroids,
        percent = this.config.bigToSmallPercentage,
        sizeVal = 0,
        newRoid;

    if ( Math.random() >= percent ) {
        sizeVal = 1;
    }

    newRoid = new FooFighter.Asteroid(this.gameState).create(sizeVal);
    asteroids.add(newRoid.sprite);
    return this;
};


proto.checkCollisions = function(){
    this.game.physics.overlap(
        this.asteroids, this.lasers, this.collisionHandler, null, this
    );
    return this;
};


proto.collisionHandler = function( asteroid, laser ) {
    var points = this.config.points;
    asteroid.kill();
    laser.kill();
    this.gameState.score += points[asteroid.currentFrame.name];
    return this;
};


FooFighter.GameAI = GameAI;

})(FooFighter);
