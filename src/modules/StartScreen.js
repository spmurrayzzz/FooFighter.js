
;(function( FooFighter ){

'use strict';

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
        },
        restart: {
            font: "32px KenPixel",
            fill: "#ffff00",
            align: "center"
        }
    };
    this.refs = {};
    this.textStrings = {
        start: 'Press \'S\' To Start Game',
        restart: 'Press \'P\' to Play Again',
        title: 'FooFighter.js',
        gameOver: 'Game Over'
    };
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
    vent.on('start', this.toggleTitle.bind(this, false));
    vent.on('game-over', this.showGameOver.bind(this));
    return this;
};


proto.create = function(){
    var vent = this.gameState.vent;

    this.titleText = this.game.add.bitmapText(
        this.game.world.centerX, this.game.world.centerY - 300,
        this.textStrings.title,
        this.styles.title
    );
    this.titleText.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.group.add(this.titleText);

    this.startText = this.game.add.bitmapText(
        this.game.world.centerX, this.game.world.centerY - 200,
        this.textStrings.start,
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


proto.toggleTitle = function ( val ) {
    this.startText.visible = val;
    this.titleText.visible = val;
};


proto.toggleGameOver = function ( val ) {
    this.gameOverText.visible = val;
    this.restartText.visible = val;
};


proto.showGameOver = function(){
    var game = this.game,
        vent = this.gameState.vent,
        isUndefined = FooFighter.Util.isUndefined;

    if ( isUndefined(this.gameOverText) ) {
        this.gameOverText = this.game.add.bitmapText(
            this.game.world.centerX, this.game.world.centerY - 100,
            this.textStrings.gameOver,
            this.styles.gameOver
        );
        this.gameOverText.anchor = {
            x: 0.5,
            y: 0.5
        };
        this.restartText = this.game.add.bitmapText(
            this.game.world.centerX, this.game.world.centerY,
            this.textStrings.restart,
            this.styles.restart
        );
        this.restartText.anchor = {
            x: 0.5,
            y: 0.5
        };
    } else {
        this.toggleGameOver(true);
    }

    this.refs.checkRestart = this.checkRestart.bind(this);
    vent.on('update', this.refs.checkRestart);
};


proto.checkRestart = function(){
    var kb = this.gameState.keyboard,
        vent = this.gameState.vent;

    if ( kb.isDown(80) ) {
        vent.off('update', this.refs.checkRestart);
        window.location.reload(false);
    }
};


FooFighter.StartScreen = StartScreen;

})(FooFighter);
