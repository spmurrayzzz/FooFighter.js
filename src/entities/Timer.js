
;(function( FooFighter ){

"use strict;"

function Timer ( gameState, group ) {
    this.gameState = gameState;
    this.group = group;
}

var proto = Timer.prototype;


FooFighter.Timer = Timer;

})(FooFighter);
