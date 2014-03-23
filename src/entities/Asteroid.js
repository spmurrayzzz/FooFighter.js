/**
 * Asteroid.js
 *
 * FooFighter.js — Asteroid entity
 *
 * This class represents an asteroid display entity.
 */

;(function( FooFighter ){

'use strict';

function Asteroid ( gameState, group ) {
    this.gameState = gameState;
    this.game = gameState.game;
    this.vent = gameState.vent;
    this.group = group;
    this.sprite = {};
    this.velocityRange = {
        min: 50,
        max: 250
    };
    this.types = {
        0: 'Big',
        1: 'Small'
    };
    this.sf = new FooFighter.SpriteFactory(gameState);
    this.bindEvents();
}

var proto = Asteroid.prototype;


proto.bindEvents = function(){
    return this;
};


proto.create = function( typeVal, pos ) {
    var game = this.gameState.game,
        targetX = game.world.width * Math.random(),
        player = this.gameState.entities.player,
        minVelocity = this.velocityRange.min,
        maxVelocity = this.velocityRange.max,
        randInRange = FooFighter.Util.randInRange,
        isUndefined = FooFighter.Util.isUndefined,
        targetY = (typeVal === 0) ? -50 : -10,
        size = this.types[typeVal] || 'Big',
        modifier,
        xVelocity;

    // Allow for a predefined point position
    if ( !isUndefined(pos) ) {
        targetX = pos.x;
        targetY = pos.y;
    }

    // Start building the sprite from our atlas
    this.sprite = this.sf.createSprite(
        'sprites', 'meteor' + size + '.png',
        {
            x: targetX,
            y: targetY,
            anchor: {
                x: 0.5,
                y: 0.5
            },
            recycle: true,
            group: this.group,
            events: {
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
    // Make sure we detect when the sprite is outside of the game scene
    this.sprite.outOfBoundsKill = true;
    // Give our asteroid a random Y axis velocity
    this.sprite.body.velocity.y = randInRange(minVelocity, maxVelocity);

    // X axis velocity should be static in magnitude, but intelligent
    // with respect to its direction (towards player)
    xVelocity = 10;
    if ( targetX > player.sprite.x ) {
        modifier = -1;
    } else if ( targetX === player.sprite.x ) {
        modifier = 0;
    } else {
        modifier = 1;
    }
    this.sprite.body.velocity.x = xVelocity * modifier;

    return this;
};


FooFighter.Asteroid = Asteroid;

})(FooFighter);
