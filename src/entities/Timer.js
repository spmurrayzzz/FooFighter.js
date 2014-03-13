
;(function( FooFighter ){

'use strict';

function Timer ( gameState, group ) {
    this.gameState = gameState;
    this.game = gameState.game;
    this.group = group;
    this.text = {};
    this.prefix = 'Time Left: '
    this.style = {
        font: "25px KenPixel",
        fill: "#ffff00",
        align: "center"
    };
    this.timer = {};
    this.bindEvents();
}

var proto = Timer.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('create', this.create.bind(this));
    vent.on('update', this.updateTime.bind(this));
    vent.on('start', this.startTimer.bind(this));
    vent.on('game-over', this.stopTimer.bind(this));
    return this;
};


proto.create = function(){
    this.text = this.game.add.bitmapText(
        this.game.world.centerX, 10,
        this.prefix + this.gameState.timeLeft,
        this.style
    );
    this.text.anchor = {
        x: 0.5,
        y: 0
    };
    this.group.add(this.text);
    return this;
};


proto.updateTime = function(){
    this.text.setText(this.prefix + this.gameState.timeLeft);
    return this;
};


proto.startTimer = function(){
    this.timer = this.game.time.events.loop(1000, function(){
        this.gameState.timeLeft = Math.max(0, this.gameState.timeLeft - 1);
        if ( this.gameState.timeLeft === 0 ) {
            this.gameState.vent.emit('game-over out-of-time');
        }
    }.bind(this));
    return this;
};


proto.stopTimer = function(){
    this.timer.pendingDelete = true;
};


FooFighter.Timer = Timer;

})(FooFighter);
