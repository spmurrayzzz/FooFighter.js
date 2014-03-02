(function( FooFighter ){

'use strict';

function Player ( gameState, group ) {
    this.gameState = gameState;
    this.sprite = {};
    this.movementVelocity = 200;
    this.displayStates = {
        neutral: 'player.png',
        left: 'playerLeft.png',
        right: 'playerRight.png'
    };
    this.group = group;
    this.init();
}

var proto = Player.prototype;


proto.init = function(){
    this.bindEvents();
};


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('create', this.create.bind(this));
    vent.on('keydown', function( direction ){
        this.movementHandler(direction);
    }.bind(this));
    vent.on('keyup', function( direction ){
        this.sprite.loadTexture('sprites', this.displayStates.neutral);
        this.sprite.body.velocity.setTo(0, 0);
    }.bind(this));
};


proto.create = function(){
    var game = this.gameState.game;
    this.sprite = game.add.sprite(0, 0, 'sprites', this.displayStates.neutral);
};


proto.update = function(){

};


proto.movementHandler = function( direction ){
    var pos = this.sprite.anchor,
        game = this.gameState.game,
        magnitude = this.movementVelocity,
        modifier = 1,
        axis,
        delta;

    switch ( direction ) {
        case 'down':
            modifier = 1;
            axis = 'y';
            break;
        case 'up':
            modifier = -1;
            axis = 'y';
            break;
        case 'left':
            this.sprite.loadTexture('sprites', this.displayStates.left);
            modifier = -1;
            axis = 'x';
            break;
        case 'right':
            this.sprite.loadTexture('sprites', this.displayStates.right);
            modifier = 1;
            axis = 'x';
            break;
    }

    this.sprite.body.velocity[axis] = (modifier * magnitude);
};


FooFighter.Player = Player;

})(FooFighter);
