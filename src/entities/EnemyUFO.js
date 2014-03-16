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

function EnemyUFO ( gameState, group ) {
    this.gameState = gameState;
    this.game = gameState.game;
    this.vent = gameState.vent;
    this.group = group;
    this.sprite = null;
}

var proto = EnemyUFO.prototype;


proto.create = function(){
    var game = this.game,
        player = this.gameState.entities.player.sprite;

    this.sprite = this.group.create(
        game.world.width * Math.random(),
        -20,
        'sprites',
        'enemyUFO.png'
    );
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
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
    this.sprite.events.onKilled.add(function(){
        this.game.time.events.add(
            5000,
            this.sprite.destroy.bind(this.sprite)
        );
    }.bind(this));
};


FooFighter.EnemyUFO = EnemyUFO;

})(FooFighter);
