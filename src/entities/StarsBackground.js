/**
 * StarsBackground.js
 *
 * FooFighter.js — StarsBackground entity
 *
 * This class represents the display object that renders the moving
 * starfield background in the game world.
 */

;(function( FooFighter ){

'use strict';

function StarsBackground ( gameState, group ) {
    this.gameState = gameState;
    this.group = group;
    // Background
    this.gameState.game.load.image(
        'background',
        'assets/img/background.png'
    );
    // Star tile
    this.gameState.game.load.image(
        'starBackground',
        'assets/img/starBackground.png'
    );
    this.bindEvents();
}

var proto = StarsBackground.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('create', this.create.bind(this));
    vent.on('update', this.update.bind(this));
    return this;
};


proto.create = function(){
    var gs = this.gameState,
        game = gs.game,
        stars;

    this.group.add(
        game.add.tileSprite(0, 0, 800, 600, 'background')
    );

    stars = this.group;
    for (var x = -4; x < 4; x++) {
        for (var y = -3; y < 3; y++) {
            stars.create(x*254, y*256, 'starBackground');
        }
    };
    return this;
};


proto.update = function(){
    var stars = this.group;
    stars.y = stars.y > 768 ? 0: stars.y;
    stars.y += 4.0;
    return this;
};


FooFighter.StarsBackground = StarsBackground;

})(FooFighter);
