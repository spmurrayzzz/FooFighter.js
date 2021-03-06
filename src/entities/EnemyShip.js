/**
 * EnemyShip.js
 *
 * FooFighter.js — EnemyShip entity
 *
 * This class represents the display entity and data structure for an
 * enemy ship unit. This unit fires towards the player while moving along
 * the Y-axis.
 */

;(function( FooFighter ){

'use strict';

function EnemyShip ( gameState, group ) {
    this.gameState = gameState;
    this.game = gameState.game;
    this.vent = gameState.vent;
    this.group = group;
    this.sprite = null;
    this.velocityRange = {
        min: 50,
        max: 250
    };
    this.laserVelocity = 300;
    this.lastFired = null;
    this.fireTimer = 5000;
    this.refs = {
        update: function(){
            this.checkFireLaser();
            this.adjustAngle();
        }.bind(this),
        gameOver: function(){
            this.vent.off('update', this.refs.update);
        }.bind(this)
    };
    this.sf = new FooFighter.SpriteFactory(gameState);
}

var proto = EnemyShip.prototype;


proto.create = function(){
    var game = this.game,
        vent = this.gameState.vent,
        sf = this.sf,
        minVelocity = this.velocityRange.min,
        maxVelocity = this.velocityRange.max,
        randInRange = FooFighter.Util.randInRange;

    this.sprite = sf.createSprite(
        'sprites', 'enemyShip.png',
        {
            x: game.world.width * Math.random(),
            y: -20,
            anchor: {
                x: 0.5,
                y: 0.5
            },
            group: this.group,
            recycle: true,
            velocity: {
                y: randInRange(minVelocity, maxVelocity)
            },
            events: {
                onKilled: [
                    function(){
                        vent.off('update', this.refs.update);
                    }.bind(this),
                    function(){
                        vent.off('gameover', this.refs.gameOver);
                    }.bind(this)
                ],
                onRevived: [
                    function(){
                        this.game.time.events.add(100, function(){
                            this.sprite.body.velocity.y = randInRange(minVelocity, maxVelocity);
                        }.bind(this));
                    }.bind(this)
                ]
            }
        }
    );
    this.sprite.outOfBoundsKill = true;
    this.bindEvents();
};


proto.bindEvents = function(){
    var vent = this.gameState.vent;

    vent.on('update', this.refs.update);
    vent.on('game-over', this.refs.gameOver);
};


proto.checkFireLaser = function(){
    var currTime = new Date().getTime();

    if ( currTime - this.lastFired >= this.fireTimer ) {
        this.fireLaser();
        this.lastFired = currTime;
    }
};


proto.fireLaser = function(){
    var group = this.gameState.groups.enemyLasers,
        game = this.game,
        player = this.gameState.entities.player.sprite,
        velocity = this.laserVelocity,
        angle,
        pos,
        laser;

    pos = {
        x: this.sprite.body.x + this.sprite.body.width/2,
        y:this.sprite.body.y + this.sprite.height + 20
    };

    laser = this.sf.createSprite(
        'sprites', 'laserRed.png',
        {
            x: pos.x,
            y: pos.y,
            anchor: {
                x: 0.5,
                y: 0.5
            },
            recycle: true,
            group: group
        }
    );

    laser.outOfBoundsKill = true;
    angle = Math.atan2(
        (player.y - laser.y),
        (player.x - laser.x)
    );
    laser.angle = Phaser.Math.radToDeg(angle) + 90;
    game.physics.moveToXY(laser, player.x, player.y, velocity);
};


proto.adjustAngle = function(){
    var player = this.gameState.entities.player.sprite,
        angle;

    angle = Math.atan2(
        (player.y - this.sprite.y),
        (player.x - this.sprite.x)
    );
    angle = 360 - (-(Phaser.Math.radToDeg(angle) - 90 ));
    this.sprite.angle = angle;
};


FooFighter.EnemyShip = EnemyShip;

})(FooFighter);
