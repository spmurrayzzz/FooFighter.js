/**
 * GameState.js
 *
 * FooFighter.js — GameState management module
 *
 * Purpose of this module is to manage game state at a high level. This object
 * is intended to be shared amongst all entities and models in the game world.
 *
 * Note: this could be an object literal in theory, given that its a singleton, but
 * leaving it as a prototype-based object for now.
 */

;(function( FooFighter ){

'use strict';

function GameState ( game ){
    this.sprites = {};
    this.groups = {};
    this.game = game;
    this.entities = {};
    this.vent = new Shout();
    this.keyMap = {};
    this.score = 0;
    this.cursors = {};
    this.modules = {};
    this.hasStarted = false;
    this.timeLeft = 300;
}

var proto = GameState.prototype;


proto.updateScore = function ( val ) {
    this.score = Math.max(this.score + val, 0);
};


FooFighter.GameState = GameState;

})(FooFighter);
