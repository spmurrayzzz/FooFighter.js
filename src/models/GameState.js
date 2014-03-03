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
    this.cursors = {};
    this.init();
}

var proto = GameState.prototype;


proto.init = function(){

};


FooFighter.GameState = GameState;

})(FooFighter, document);
