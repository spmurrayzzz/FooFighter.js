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
    this.bindEvents();
}

var proto = Asteroid.prototype;


proto.bindEvents = function(){
    this.vent.on('update', this.adjustVelocity.bind(this));
    return this;
};


proto.create = function( typeVal ) {
    var game = this.gameState.game,
        targetX = game.world.width * Math.random(),
        player = this.gameState.entities.player,
        minVelocity = this.velocityRange.min,
        maxVelocity = this.velocityRange.max,
        randInRange = FooFighter.Util.randInRange,
        size = this.types[typeVal] || 'Big',
        modifier,
        xVelocity;

    this.sprite = game.add.sprite(
        targetX, -50, 'sprites', 'meteor' + size + '.png'
    );
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.sprite.events.onOutOfBounds.add(this.sprite.kill);
    this.sprite.body.velocity.y = randInRange(minVelocity, maxVelocity);

    xVelocity = 10;
    if ( targetX > player.sprite.x ) {
        modifier = -1;
    } else if ( targetX === player.sprite.x ) {
        modifier = 0;
    } else {
        modifier = 1;
    }
    this.sprite.body.velocity.x = xVelocity * modifier;

    this.sprite.events.onKilled.dispatch = function(){
        this.vent.emit('asteroid-killed', this);
    }.bind(this);

    return this;
};


proto.adjustVelocity = function(){
    return this;
};


FooFighter.Asteroid = Asteroid;

})(FooFighter);
