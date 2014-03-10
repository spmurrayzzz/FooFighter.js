/**
 * GameEngine.js
 *
 * FooFighter.js — GameEngine module
 *
 * This module controls the generation of enemy entities, collision detection,
 * and overall game engine goodness.
 */

;(function( FooFighter ){

'use strict';

function GameEngine ( gameState ){
    var d = new Date();
    this.gameState = gameState;
    this.game = gameState.game;
    this.asteroids = this.gameState.groups.asteroids;
    this.lasers = this.gameState.groups.lasers;
    this.gameInProgress = false;
    this.lastEnemyCreated = d.getTime();
    this.config = {
        enemyThrottleVal: 500,
        bigToSmallPercentage: 0.6,
        points: {
            'meteorBig.png': 5,
            'meteorSmall.png': 10
        },
        explosionVelocites: [
            -200,
            100,
            200
        ],
        numAsteroids: 20
    };
    this.bindEvents();
}

var proto = GameEngine.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;

    vent.on('start', this.start.bind(this));
    vent.on('update', this.checkCollisions.bind(this));
    vent.on('update', this.addEnemiesCheck.bind(this));
    vent.on('asteroid-killed', this.asteroidExplosion.bind(this));
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


proto.createAsteroid = function( pos, sizeVal ){
    var asteroids = this.asteroids,
        percent = this.config.bigToSmallPercentage,
        isUndefined = FooFighter.Util.isUndefined,
        newRoid;

    if ( isUndefined(sizeVal) ) {
        sizeVal = 0;
        if ( Math.random() >= percent ) {
            sizeVal = 1;
        }
    }

    newRoid = new FooFighter.Asteroid(this.gameState).create(sizeVal, pos);
    asteroids.add(newRoid.sprite);
    return newRoid;
};


proto.checkCollisions = function(){
    this.game.physics.collide(
        this.asteroids,
        this.lasers,
        this.collisionHandlerLaser,
        null,
        this
    );
    this.game.physics.collide(
        this.gameState.entities.player.sprite,
        this.asteroids, this.collisionHandlerPlayer,
        null,
        this
    );
    return this;
};


proto.collisionHandlerLaser = function ( asteroid, laser ) {
    var points = this.config.points;

    asteroid.kill();
    laser.kill();
    this.gameState.updateScore(points[asteroid.currentFrame.name]);
};


proto.collisionHandlerPlayer = function ( player, asteroid ) {
    player.kill();
};


proto.asteroidExplosion = function ( asteroid ) {
    var type = asteroid.sprite.currentFrame.name,
        posX = asteroid.sprite.x,
        posY = asteroid.sprite.y,
        randInRange = FooFighter.Util.randInRange,
        seed = 20,
        velocities = this.config.explosionVelocites,
        roid,
        i;

    if ( asteroid.sprite.currentFrame.name === 'meteorBig.png' ) {
        for (i = 0; i < 3; i++) {
            roid = this.createAsteroid({
                x: randInRange(posX - seed, posX + seed),
                y: randInRange(posY - seed, posY + seed),
            },1);
            roid.sprite.body.velocity.x = velocities[i];
        }
    }

    return this;
};


FooFighter.GameEngine = GameEngine;

})(FooFighter);
