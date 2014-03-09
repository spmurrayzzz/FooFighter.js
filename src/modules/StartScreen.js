
;(function( FooFighter ){

"use strict";

function StartScreen ( gameState, group ) {
    this.gameState = gameState;
    this.game = gameState.game;
    this.group = group;
    this.styles = {
        title: {
            font: "72px KenPixel",
            fill: "#ffff00",
            align: "center"
        },
        start: {
            font: "32px KenPixel",
            fill: "#ffff00",
            align: "center"
        },
        gameOver: {
            font: "100px KenPixel",
            fill: "#ffff00",
            align: "center"
        }
    };
    this.refs = {};
    this.title = 'FooFighter.js';
    this.gameOver = 'Game Over';
    this.bindEvents();
}

var proto = StartScreen.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;

    // Need to keep a reference for the bound function
    // so we can unbind the handler later
    this.refs.checkStart = this.checkStart.bind(this);
    vent.on('update', this.refs.checkStart);

    vent.on('create', this.create.bind(this));
    vent.on('start', this.hideTitle.bind(this));
    vent.on('game-over', this.showGameOver.bind(this));
    return this;
};


proto.create = function(){
    var vent = this.gameState.vent;

    this.titleText = this.game.add.bitmapText(
        this.game.world.centerX, this.game.world.centerY - 300,
        this.title,
        this.styles.title
    );
    this.titleText.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.group.add(this.titleText);

    this.startText = this.game.add.bitmapText(
        this.game.world.centerX, this.game.world.centerY - 200,
        'Press \'S\' To Start Game',
        this.styles.start
    );
    this.startText.anchor = {
        x: 0.5,
        y: 0.5
    };

    this.group.add(this.startText);
    return this;
};


proto.checkStart = function(){
    var kb = this.gameState.keyboard,
        vent = this.gameState.vent;

    if ( kb.isDown(83) ) {
        vent.emit('start');
        vent.off('update', this.refs.checkStart);
        this.gameState.hasStarted = true;
    }
};


proto.hideTitle = function(){
    this.startText.visible = false;
    this.titleText.visible = false;
};


proto.showGameOver = function(){
    var game = this.game,
        isUndefined = FooFighter.Util.isUndefined;

    if ( isUndefined(this.gameOverText) ) {
        this.gameOverText =this.game.add.bitmapText(
            this.game.world.centerX, this.game.world.centerY,
            this.gameOver,
            this.styles.title
        );
        this.gameOverText.anchor = {
            x: 0.5,
            y: 0.5
        };
    } else {
        this.gameOverText.visible = true;
    }
};


FooFighter.StartScreen = StartScreen;

})(FooFighter);
