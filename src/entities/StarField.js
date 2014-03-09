/**
 * StarField.js
 *
 * FooFighter.js — StarField entity
 *
 * This class represents the display object that renders the moving
 * starfield background in the game world.
 */

;(function( FooFighter ){

'use strict';

function StarField ( gameState, group ) {
    var d = new Date();

    this.gameState = gameState;
    this.game = gameState.game;
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
        field: {
            lineSpeed: 800,
            starSpeed: 500,
            lineOpacity: 0.08,
            starOpacity: 0.15,
            lineThrottle: 100,
            starThrottle: 10
        }
    };
    this.shouldAddStar = true;
    this.shouldAddSpeedLine = true;
    this.lastCreated = {
        line: d.getTime(),
        star: d.getTime()
    };
    this.bindEvents();
}

var proto = StarField.prototype;


proto.bindEvents = function(){
    var vent = this.gameState.vent;
    vent.on('create', this.create.bind(this));
    vent.on('update', this.moveField.bind(this));
    return this;
};


proto.create = function(){
    var gs = this.gameState,
        game = gs.game,
        stars,
        tile;


    // Add the solid background sprite entity
    // this.gameState.groups.background.add(
    //     game.add.tileSprite(
    //         0, 0, game.world.width, game.world.height, 'background'
    //     )
    // );
    // Commenting this out for now, kind of like the darker game world

    // In another group, use our star tile png to create
    // the starfield background
    stars = this.group;
    for (var x = -8; x < 8; x++) {
        for (var y = -6; y < 6; y++) {
            tile = stars.create(x*254, y*256, 'starBackground');
            tile.alpha = 0.35;
        }
    };

    this.game.time.events.repeat(100, 10, this.addSpeedLine.bind(this), this);
    this.game.time.events.repeat(10, 100, this.addStar.bind(this), this);

    return this;
};


proto.moveField = function(){
    var stars = this.group;

    // This is a bit of a hack, we're just moving the background
    // group along the Y axis and starting over when we go too far
    stars.y = stars.y > 768 ? 0 : stars.y;
    stars.y += 6.0;

    return this;
};


proto.addSpeedLine = function(){
    var field = this.config.field,
        game = this.game,
        line;

    line = this.game.add.sprite(
        game.world.width * Math.random(),
        -100,
        'speedLine'
    );
    line.alpha = field.lineOpacity;
    line.events.onOutOfBounds.add(function(){
        this.y = -100;
        this.x = game.world.width * Math.random();
    }, line);
    line.body.velocity.y = field.lineSpeed;

    return line;
};


proto.addStar = function(){
    var field = this.config.field,
        starType = 'Background/starSmall.png',
        game = this.game,
        star;

    if ( Math.random() >= 0.9 ) {
        starType = 'Background/starBig.png'
    }
    star = this.game.add.sprite(
        game.world.width * Math.random(),
        0,
        'sprites',
        starType
    );
    star.alpha = field.starOpacity;
    star.events.onOutOfBounds.add(function(){
        this.y = 0;
        this.x = game.world.width * Math.random();
    }, star);
    star.body.velocity.y = field.starSpeed;

    return star;
};


FooFighter.StarField = StarField;

})(FooFighter);
