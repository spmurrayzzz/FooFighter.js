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
    this.config = {};
    this.sprite = {};
    this.movementVelocity = 250;
    this.displayStates = {
        neutral: 'player.png',
        left: 'playerLeft.png',
        right: 'playerRight.png'
    };
    this.fireTimer = 250;
    this.canFire = true;
    this.group = group;
    this.config.laser = {
        velocity: -500,
        fireTimer: 250
    };
    this.lasers = gameState.groups.lasers;
    this.bindEvents();
}

var proto = Player.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;

    vent.on('create', this.create.bind(this));
    vent.on('update', function(){
        this.movementHandler();
        this.weaponHandler();
    }.bind(this));
    return this;
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
    return this;
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
    return this;
};


proto.weaponHandler = function(){
    var game = this.gameState.game,
        cursors = this.gameState.cursors,
        keyboard = this.gameState.keyboard,
        laser;

    if ( !this.canFire ) {
        return false;
    }

    if ( keyboard.isDown(Phaser.Keyboard.SPACEBAR) ) {
        this.createLaser();
        this.canFire = false;
        setTimeout(function(){
            this.canFire = true;
        }.bind(this), this.config.laser.fireTimer);
    }
    return this;
};


proto.createLaser = function(){
    var game = this.gameState.game,
        velocity = this.config.laser.velocity,
        laser;

    laser = game.add.sprite(
        this.sprite.body.x + this.sprite.body.width/2,
        this.sprite.body.y - 10,
        'sprites', 'laserGreen.png'
    );
    this.lasers.add(laser);
    laser.anchor = {
        x: 0.5,
        y: 0.5
    };
    laser.body.velocity.y = velocity;
    laser.events.onOutOfBounds.add(laser.kill, laser);
    return this;
};


FooFighter.Player = Player;


})(FooFighter);
