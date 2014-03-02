/**
 * GameState.js
 *
 * FooFighter.js — GameState management module
 *
 * Purpose of this module is to manage game state at a high level. This object
 * is intended to be shared amongst all entities and models in the game world.
 */

;(function( FooFighter, document ){

'use strict';

function GameState ( game ){
    this.sprites = {};
    this.groups = {};
    this.game = game;
    this.entities = {};
    this.vent = new Shout();
    this.keyMap = {};
    this.score = 0;
    this.init();
}

var proto = GameState.prototype;


proto.init = function(){
    this.keyMap = {
        38: "up",
        40: "down",
        37: "left",
        39: "right"
    };
    this.bindEvents();
};


proto.bindEvents = function(){
    // Trigger keydown events
    document.addEventListener('keydown', function( ev ){
        this.vent.emit('keydown', this.keyMap[ev.keyCode]);
        this.vent.emit('keydown-' + this.keyMap[ev.keyCode]);
    }.bind(this), true);

    document.addEventListener('keyup', function( ev ){
        this.vent.emit('keyup', this.keyMap[ev.keyCode]);
    }.bind(this), true);
};


FooFighter.GameState = GameState;

})(FooFighter, document);
