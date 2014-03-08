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

    // Build the sprite entitiy
    this.sprite = game.add.sprite(
        game.world.centerX, game.world.centerY,
        'sprites', this.displayStates.neutral
    );
    // Anchor in the center of the sprite
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
    // Add it to the correct display group
    this.group.add(this.sprite);
    return this;
};


proto.movementHandler = function(){
    var game = this.gameState.game,
        magnitude = this.movementVelocity,
        modifier = 1,
        axis,
        cursors = this.gameState.cursors;

    // Reset any prior velocity vals
    this.sprite.body.velocity.setTo(0, 0);

    // Detect which cursor keys are pressed and modify the sprite
    // display frame texture for X axis directions
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

    // This is just the movement speed + directional modifier
    this.sprite.body.velocity[axis] = (modifier * magnitude);
    return this;
};


proto.weaponHandler = function(){
    var game = this.gameState.game,
        cursors = this.gameState.cursors,
        keyboard = this.gameState.keyboard,
        laser;

    // If we're throttled or dead, don't fire a got damn laser
    if ( !this.canFire || !this.sprite.alive ) {
        return false;
    }

    // If spacebar is pressed in this loop step, create a laser and
    // make sure we can't fire again for N milliseconds
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

    // Create our laser sprite entity
    laser = game.add.sprite(
        this.sprite.body.x + this.sprite.body.width/2,
        this.sprite.body.y - 10,
        'sprites', 'laserGreen.png'
    );
    // Keep track of all our onscreen lasers (for collision detection)
    this.lasers.add(laser);
    // Anchor to the center of the sprite
    laser.anchor = {
        x: 0.5,
        y: 0.5
    };
    // Set the movement speed
    laser.body.velocity.y = velocity;
    // Clean up any lasers that leave the game scence
    laser.events.onOutOfBounds.add(laser.kill, laser);
    return this;
};


FooFighter.Player = Player;


})(FooFighter);
