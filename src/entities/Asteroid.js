/**
 * Asteroid.js
 *
 * FooFighter.js — Asteroid entity
 *
 * This class represents an asteroid display entity.
 */

;(function( FooFighter ){

'use strict';

function Asteroid ( gameConfig, group ) {
    this.gameConfig = gameConfig;
    this.vent = gameConfig.vent;
    this.group = group;
    this.sprite = {};
    this.lateralRange = [];
    this.lateralRange = [
        (gameConfig.game.world.width/2)
    ];
    this.id = guid();
    this.bindEvents();
}

var proto = Asteroid.prototype;


proto.bindEvents = function(){
    this.vent.on('create', this.create.bind(this));
};


proto.create = function(){
    var game = this.gameConfig.game;
    this.sprite = game.add.sprite(
        game.world.centerX, -50, 'sprites', 'meteorBig.png'
    );
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.sprite.events.onOutOfBounds.add(this.sprite.kill);
    this.sprite.body.velocity.y = Math.random() * (250-50) + 50;
    this.sprite.events.onKilled.dispatch = function(){
        this.vent.emit('asteroid-expired', this.id);
    }.bind(this);
    return this;
};


FooFighter.Asteroid = Asteroid;

})(FooFighter);
