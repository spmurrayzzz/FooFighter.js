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
    this.gameState.game.load.image(
        'speedLine',
        'assets/img/speedLine.png'
    );
    // Star tile
    this.gameState.game.load.image(
        'starBackground',
        'assets/img/starBackground.png'
    );
    this.config = {
        starThrottle: {
            time: 250
        },
        field: {
            speed: 800,
            opacity: 0.11
        }
    };
    this.shouldAddStar = true;
    this.bindEvents();
}

var proto = StarsBackground.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('create', this.create.bind(this));
    vent.on('update', this.moveField.bind(this));
    vent.on('update', this.addBackgroundStar.bind(this));
    return this;
};


proto.create = function(){
    var gs = this.gameState,
        game = gs.game,
        stars;

    // Add the solid background sprite entity
    this.group.add(
        game.add.tileSprite(0, 0, 800, 600, 'background')
    );

    // In the same group, use our star tile png to create
    // the starfield background
    stars = this.group;
    for (var x = -4; x < 4; x++) {
        for (var y = -3; y < 3; y++) {
            stars.create(x*254, y*256, 'starBackground');
        }
    };
    return this;
};


proto.moveField = function(){
    var stars = this.group;

    // This is a bit of a hack, we're just moving the background
    // group along the Y axis and starting over when we go too far
    stars.y = stars.y > 768 ? 0 : stars.y;
    stars.y += 4.0;

    return this;
};


proto.addBackgroundStar = function(){
    var throttleVal = this.config.starThrottle.time,
        field = this.config.field,
        game = this.gameState.game,
        gameState = this.gameState,
        star;

    if ( this.shouldAddStar ) {
        star = game.add.sprite(
            game.world.width * Math.random(),
            -100,
            'speedLine'
        );
        star.alpha = field.opacity;
        star.events.onOutOfBounds.add(star.kill, star);
        star.body.velocity.y = field.speed;
        this.shouldAddStar = false;
        setTimeout(function(){
            this.shouldAddStar = true;
        }.bind(this), throttleVal);
    }

    return star;
};


FooFighter.StarsBackground = StarsBackground;

})(FooFighter);
