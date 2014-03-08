/**
 * Score.js
 *
 * FooFighter.js — Score entity
 *
 * This class represents the data model and display entity for
 * the game score.
 */

;(function( FooFighter ){

'use strict';

function Score ( gameState, group ) {
    this.gameState = gameState;
    this.game = gameState.game;
    this.group = group;
    this.text = {};
    this.prefix = 'Score: '
    this.text = this.game.add.text(
        this.game.world.width - 25, 10,
        this.prefix + gameState.score,
        { font: "25px Helvetica", fill: "#ffff00", align: "center" }
    );
    this.text.anchor = {
        x: 1,
        y: 0
    };
    this.group.add(this.text);
    this.bindEvents();
}

var proto = Score.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('update', function(){
        // On every game loop, change the display
        // value of the current game score
        this.text.content = this.prefix + this.gameState.score;
    }.bind(this));
    return this;
};


FooFighter.Score = Score;

})(FooFighter);
