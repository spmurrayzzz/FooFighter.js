
;(function( FooFighter ){

'use strict';

function Asteroid ( gameConfig, group ) {
    this.gameConfig = gameConfig;
    this.vent = gameConfig.vent;
    this.group = group;
    this.init();
}

var proto = Asteroid.prototype;


proto.init = function(){
    this.bindEvents();
};


proto.bindEvents = function(){

};


FooFighter.Asteroid = Asteroid;

})(FooFighter);
