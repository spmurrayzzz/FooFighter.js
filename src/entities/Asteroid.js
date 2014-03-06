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
    this.lateralRange = [];
    this.lateralRange = [
        (gameState.game.world.width/2)
    ];
    this.id = guid();
    this.bindEvents();
}

var proto = Asteroid.prototype;


proto.bindEvents = function(){
    this.vent.on('update', this.adjustVelocity.bind(this));
};


proto.create = function(){
    var game = this.gameState.game,
        targetX = game.world.width * Math.random(),
        player = this.gameState.entities.player,
        modifier, xVelocity;

    this.sprite = game.add.sprite(
        targetX, -50, 'sprites', 'meteorBig.png'
    );
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.sprite.events.onOutOfBounds.add(this.sprite.kill);
    this.sprite.body.velocity.y = Math.random() * (250 - 50) + 50;

    if ( targetX > player.sprite.x ) {
        modifier = -1;
        xVelocity = this.sprite.body.velocity.y * modifier;
    } else if ( targetX === player.sprite.x ) {
        xVelocity = 0;
    } else {
        modifier = 1;
        xVelocity = this.sprite.body.velocity.y * modifier;
    }

    this.sprite.body.velocity.x = xVelocity;

    this.sprite.events.onKilled.dispatch = function(){
        this.vent.emit('asteroid-expired', this.id);
    }.bind(this);

    return this;
};


proto.adjustVelocity = function(){

};


FooFighter.Asteroid = Asteroid;

})(FooFighter);
