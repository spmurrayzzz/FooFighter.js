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
    this.enemyShips = this.gameState.groups.enemyShips;
    this.enemyLasers = this.gameState.groups.enemyLasers;
    this.lasers = this.gameState.groups.lasers;
    this.gameInProgress = false;
    this.lastEnemyCreated = d.getTime();
    this.config = {
        enemyThrottleVal: 1000,
        bigToSmallPercentage: 0.6,
        points: {
            'meteorBig.png': 5,
            'meteorSmall.png': 10,
            'enemyShip.png': 13
        },
        explosionVelocites: [
            -200,
            100,
            200
        ],
        numAsteroids: 20
    };
    this.refs = {
        onUpdate: null
    };
    this.bindEvents();
}

var proto = GameEngine.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;

    vent.on('start', this.start.bind(this));
    vent.on('asteroid-killed', this.asteroidExplosion.bind(this));
    vent.on('game-over', function(){
        this.killAll();
        this.stop();
    }.bind(this));
    return this;
};


proto.start = function(){
    this.gameInProgress = true;
    this.refs.onUpdate = function(){
        this.checkCollisions();
        this.addEnemiesCheck();
        this.cleanup();
    }.bind(this);
    this.gameState.vent.on('update', this.refs.onUpdate);
    return this;
};


proto.stop = function(){
    this.gameInProgress = false;
    this.gameState.vent.off('update', this.refs.onUpdate);
    return this;
};


proto.addEnemiesCheck = function(){
    var throttleVal = this.config.enemyThrottleVal,
        lastTime = this.lastEnemyCreated,
        currTime = new Date().getTime();

    if ( this.gameInProgress === true) {
        if ( currTime - lastTime >= throttleVal ) {
            this.createEnemy();
            this.lastEnemyCreated = currTime;
        }
    }
    return this;
};


proto.createEnemy = function(){
    var options,
        val,
        randInRange = FooFighter.Util.randInRange;

    options = [
        this.createAsteroid,
        this.createEnemyShip,
        this.createUFO
    ];

    val = parseInt(randInRange(0, options.length));
    return options[val].call(this);
};


proto.createEnemyShip = function(){
    var group = this.gameState.groups.enemyShips;

    return new FooFighter.EnemyShip(
        this.gameState, group
    ).create();
};


proto.createUFO = function(){
    console.log('ufo');
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
    // Asteroids / player lasers
    this.game.physics.collide(
        this.asteroids,
        this.lasers,
        this.collisionHandlerLaser,
        null,
        this
    );
    // Player / asteroids
    this.game.physics.collide(
        this.gameState.entities.player.sprite,
        this.asteroids, this.collisionHandlerPlayer,
        null,
        this
    );
    // Player / enemy ships
    this.game.physics.collide(
        this.gameState.entities.player.sprite,
        this.enemyShips, this.collisionHandlerPlayer,
        null,
        this
    );
    // Player / enemy lasers
    this.game.physics.collide(
        this.gameState.entities.player.sprite,
        this.enemyLasers, this.collisionHandlerPlayer,
        null,
        this
    );
    // Enemy ships / player lasers
    this.game.physics.collide(
        this.enemyShips,
        this.lasers, this.collisionHandlerLaser,
        null,
        this
    );
    return this;
};


proto.collisionHandlerLaser = function ( enemyObj, laser ) {
    var points = this.config.points;

    enemyObj.kill();
    laser.kill();
    if ( enemyObj.currentFrame.name === 'meteorBig.png' ) {
        this.gameState.vent.emit('asteroid-killed', enemyObj);
    }
    this.gameState.updateScore(points[enemyObj.currentFrame.name]);
};


proto.collisionHandlerPlayer = function ( player ) {
    player.kill();
};


proto.asteroidExplosion = function ( asteroid ) {
    var posX = asteroid.x,
        posY = asteroid.y,
        randInRange = FooFighter.Util.randInRange,
        seed = 20,
        velocities = this.config.explosionVelocites,
        roid,
        i;

    if ( asteroid.currentFrame.name === 'meteorBig.png' ) {
        for (i = 0; i < 3; i++) {
            roid = this.createAsteroid({
                x: randInRange(posX - seed, posX + seed),
                y: randInRange(posY - seed, posY + seed)
            }, 1);
            roid.sprite.body.velocity.x = velocities[i];
        }
    }

    return this;
};


proto.cleanup = function(){
    var roid;

    while ( roid = this.asteroids.getFirstExists(false) ) {
        roid.destroy();
    }
};


proto.killAll = function(){
    this.asteroids.removeAll();
    this.enemyShips.removeAll();
    this.enemyLasers.removeAll();
};


FooFighter.GameEngine = GameEngine;

})(FooFighter);
