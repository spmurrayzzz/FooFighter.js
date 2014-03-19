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
    this.movementVelocity = 300;
    this.displayStates = {
        neutral: 'player.png',
        left: 'playerLeft.png',
        right: 'playerRight.png'
    };
    this.fireTimer = 250;
    this.canFire = true;
    this.lastFired = new Date().getTime();
    this.group = group;
    this.config.laser = {
        velocity: -500,
        fireTimer: 250
    };
    this.lasers = gameState.groups.lasers;
    this.sf = new FooFighter.SpriteFactory(gameState);
    this.bindEvents();
}

var proto = Player.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;

    vent.on('create', this.create.bind(this));
    vent.on('update', function(){
        this.movementHandler();
        this.weaponHandler();
        this.checkVelocity();
    }.bind(this));
    vent.on('out-of-time', this.kill.bind(this));
    return this;
};


proto.create = function(){
    var game = this.gameState.game,
        sf = this.sf;

    // Build the sprite entitiy
    this.sprite = sf.createSprite(
        'sprites',
        this.displayStates.neutral,
        {
            x: game.world.centerX,
            y: game.world.centerY,
            anchor: {
                x: 0.5,
                y: 0.5
            },
            group: this.group
        }
    );
    this.sprite.events.onKilled.add(this.onKill.bind(this));
    this.sprite.body.setRectangle(83, 25, 8, 30);
    return this;
};


proto.movementHandler = function(){
    var magnitude = this.movementVelocity,
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
    } else if ( cursors.left.isDown ) {
        if ( !this.isCurrentFrame(this.displayStates.left) ) {
            this.sprite.loadTexture('sprites', this.displayStates.left);
        }
        modifier = -1;
        axis = 'x';
    } else if ( cursors.right.isDown ) {
        if ( !this.isCurrentFrame(this.displayStates.right) ) {
            this.sprite.loadTexture('sprites', this.displayStates.right);
        }
        modifier = 1;
        axis = 'x';
    } else {
        if ( !this.isCurrentFrame(this.displayStates.neutral) ) {
            this.sprite.loadTexture('sprites', this.displayStates.neutral);
        }
    }

    // This is just the movement speed + directional modifier
    this.sprite.body.velocity[axis] = (modifier * magnitude);
    return this;
};


proto.weaponHandler = function(){
    var keyboard = this.gameState.keyboard,
        currTime = new Date().getTime(),
        lastFired = this.lastFired,
        throttleVal = this.config.laser.fireTimer;

    // If we're dead, don't fire a got damn laser
    if ( !this.sprite.alive ) {
        return false;
    }

    // If spacebar is pressed in this loop step, create a laser and
    // make sure we can't fire again for N milliseconds
    if ( keyboard.isDown(Phaser.Keyboard.SPACEBAR) ) {
        if ( currTime - lastFired >= throttleVal ) {
            this.createLaser();
            this.gameState.updateScore(-2);
            this.lastFired = currTime;
        }
    }
    return this;
};


proto.createLaser = function(){
    var velocity = this.config.laser.velocity,
        pos,
        laser;

    pos = {
        x: this.sprite.body.x + this.sprite.body.width/2,
        y:this.sprite.body.y - 10
    };

    laser = this.lasers.getFirstExists(false);

    if ( !laser ) {
        // Create our laser sprite entity
        laser = this.lasers.create(
            pos.x,
            pos.y,
            'sprites', 'laserGreen.png'
        );
        // Anchor to the center of the sprite
        laser.anchor = {
            x: 0.5,
            y: 0.5
        };
        // Clean up any lasers that leave the game scence
        laser.outOfBoundsKill = true;
    } else {
        laser.revive();
        laser.x = pos.x;
        laser.y = pos.y;
    }

    laser.body.velocity.y = velocity;

    return this;
};


// This is a super bad hack to deal with a bug I can't fix yet.
// Whenever a laser collides with an asteroid and gets revived
// to be reused, its velocity gets set back to zero before the next
// update tick. This gives us a way to workaround the problem for now
proto.checkVelocity = function(){
    var velocity = this.config.laser.velocity;
    this.lasers.forEach(function( laser ){
        if ( laser.body.velocity.y !== velocity ) {
            laser.body.velocity.y = velocity;
        }
    }, this, true);
};


proto.onKill = function(){
    var vent = this.gameState.vent;
    vent.emit('game-over');
};


proto.kill = function(){
    this.sprite.kill();
};


proto.isCurrentFrame = function ( frameName ) {
    return frameName === this.sprite.currentFrame.name;
};


FooFighter.Player = Player;


})(FooFighter);
