;(function( FooFighter ){

'use strict';

function Score ( gameState, group ) {
    this.gameState = gameState;
    this.group = group;
    this.text = {};
    this.prefix = 'Score: '
    this.init();
}

var proto = Score.prototype;


proto.init = function(){
    var gs = this.gameState,
        game = this.gameState.game;
    this.text = game.add.text(
        game.world.width - 25, 10,
        this.prefix + gs.score,
        { font: "25px Helvetica", fill: "#ffff00", align: "center" }
    );
    this.text.anchor = {
        x: 1,
        y: 0
    };
    this.group.add(this.text);
    this.bindEvents();
};


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('update', function(){
        this.text.content = this.prefix + this.gameState.score;
    }.bind(this));
};


FooFighter.Score = Score;

})(FooFighter);
