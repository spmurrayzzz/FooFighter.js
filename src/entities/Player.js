/**
 * Player.js
 *
 * Foofighter.js — Player entity
 *
 * This class represents the data model and display entity for a
 * Player's startship in the game environment.
 */

;(function( FooFighter ){

'use strict';

function Player ( gameState, group ) {
    this.gameState = gameState;
    this.sprite = {};
    this.movementVelocity = 250;
    this.displayStates = {
        neutral: 'player.png',
        left: 'playerLeft.png',
        right: 'playerRight.png'
    };
    this.fireTimer = 250;
    this.shouldFire = true;
    this.group = group;
    this.init();
}

var proto = Player.prototype;


proto.init = function(){
    this.bindEvents();
};


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('create', this.create.bind(this));
    vent.on('update', function(){
        this.movementHandler();
        this.weaponHandler();
    }.bind(this));
};


proto.create = function(){
    var game = this.gameState.game;
    this.sprite = game.add.sprite(
        game.world.centerX, game.world.centerY,
        'sprites', this.displayStates.neutral
    );
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.group.add(this.sprite);
};


proto.movementHandler = function(){
    var game = this.gameState.game,
        magnitude = this.movementVelocity,
        modifier = 1,
        axis,
        cursors = this.gameState.cursors;

    this.sprite.body.velocity.setTo(0, 0);

    if ( cursors.up.isDown ) {
        modifier = -1;
        axis = 'y';
    } else if ( cursors.down.isDown ) {
        modifier = 1;
        axis = 'y';
    } else if (cursors.left.isDown) {
        this.sprite.loadTexture('sprites', this.displayStates.left);
        modifier = -1;
        axis = 'x';
    } else if (cursors.right.isDown) {
        this.sprite.loadTexture('sprites', this.displayStates.right);
        modifier = 1;
        axis = 'x';
    } else {
        this.sprite.loadTexture('sprites', this.displayStates.neutral);
    }

    this.sprite.body.velocity[axis] = (modifier * magnitude);
};


proto.weaponHandler = function(){
    var game = this.gameState.game,
        cursors = this.gameState.cursors,
        keyboard = this.gameState.keyboard,
        laser;

    if ( !this.shouldFire ) {
        return false;
    }

    if ( keyboard.isDown(Phaser.Keyboard.SPACEBAR) ) {
        this.createLaser();
        this.gameState.score += 10;
        this.shouldFire = false;
        setTimeout(function(){
            this.shouldFire = true;
        }.bind(this), this.fireTimer);
    }
};

proto.createLaser = function(){
    var game = this.gameState.game,
        laser;
    laser = game.add.sprite(
        this.sprite.body.x + this.sprite.body.width/2,
        this.sprite.body.y,
        'sprites', 'laserGreen.png'
    );
    laser.anchor = {
        x: 0.5,
        y: 0.5
    };
    laser.body.velocity.y = -500;
    laser.lifespan = 1500;
};


FooFighter.Player = Player;

})(FooFighter);
