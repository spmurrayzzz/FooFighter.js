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
    this.style = {
        font: "25px KenPixel",
        fill: "#ffff00",
        align: "center"
    };
    this.bindEvents();
}

var proto = Score.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('create', this.create.bind(this));
    vent.on('update', function(){
        // On every game loop, change the display
        // value of the current game score
        this.text.setText(this.prefix + this.gameState.score);
    }.bind(this));
    vent.on('start', this.toggleVisibility.bind(this, true));
    return this;
};


proto.create = function(){
    this.text = this.game.add.bitmapText(
        this.game.world.width - 25, 10,
        this.prefix + this.gameState.score,
        this.style
    );
    this.text.anchor = {
        x: 1,
        y: 0
    };
    this.toggleVisibility(false);
    this.group.add(this.text);
    return this;
};


proto.toggleVisibility = function ( show ) {
    this.text.visible = show;
}


FooFighter.Score = Score;

})(FooFighter);
