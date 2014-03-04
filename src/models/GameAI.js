
;(function( FooFighter ){

'use strict';

function GameAI ( gameState ){
    this.gameState = gameState;
    this.game = gameState.game;
    this.init();
}

var proto = GameAI.prototype;


proto.init = function(){
    this.bindEvents();
};


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    console.log(this);
    vent.on('start', this.start.bind(this));
    vent.on('update', this.checkCollisions.bind(this));
};


proto.start = function(){
    setInterval(this.createAsteroid.bind(this), 1000);
};


proto.createAsteroid = function(){
    var foo = new FooFighter.Asteroid(this.gameState).create();
};


proto.checkCollisions = function(){

};


FooFighter.GameAI = GameAI;

})(FooFighter);
