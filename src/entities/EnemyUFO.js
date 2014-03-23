/**
 * EnemyUFO.js
 *
 * FooFighter.js — EnemyUFO entity
 *
 * This class represents the display entity and data structure for an
 * enemy UFO unit. The UFO will accelerate towards the player in a
 * kamikaze-esque move.
 */

;(function( FooFighter ){

'use strict';

function EnemyUFO ( gameState, group ) {
    this.gameState = gameState;
    this.game = gameState.game;
    this.vent = gameState.vent;
    this.group = group;
    this.sf = new FooFighter.SpriteFactory(gameState);
    this.sprite = null;
}

var proto = EnemyUFO.prototype;


proto.create = function(){
    var game = this.game,
        player = this.gameState.entities.player.sprite;

    this.sprite = this.sf.createSprite(
        'sprites',
        'enemyUFO.png',
        {
            x: game.world.width * Math.random(),
            y: -20,
            anchor: {
                x: 0.5,
                y: 0.5
            },
            recycle: true,
            group: this.group
        }
    );
    this.sprite.outOfBoundsKill = true;
    this.game.physics.accelerateToXY(
        this.sprite,
        player.x,
        player.y,
        300,
        600
    );
    this.bindEvents();
};


proto.bindEvents = function(){

};


FooFighter.EnemyUFO = EnemyUFO;

})(FooFighter);
