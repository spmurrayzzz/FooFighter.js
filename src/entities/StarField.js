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
            starSpeed: 200,
            lineOpacity: 0.2,
            starOpacity: 0.25,
            lineThrottle: 0,
            starThrottle: 0,
            numLines: 6,
            numStars: 150,
            velocityVariance: 0.5
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
    var config = this.config,
        stars,
        tile;

    // In another group, use our star tile png to create
    // the starfield background
    stars = this.group;
    for (var x = -8; x < 8; x++) {
        for (var y = -6; y < 6; y++) {
            tile = stars.create(x*254, y*256, 'starBackground');
            tile.alpha = 0.19;
        }
    }

    for (var i = config.field.numLines - 1; i >= 0; i--) {
        this.addSpeedLine.call(this);
    }
    for (i = config.field.numStars - 1; i >= 0; i--) {
        this.addStar.call(this);
    }

    return this;
};


proto.moveField = function(){
    var stars = this.group;

    // This is a bit of a hack, we're just moving the background
    // group along the Y axis and starting over when we go too far
    stars.y = stars.y > 768 ? 0 : stars.y;
    // stars.y += 4.0;

    return this;
};


proto.addSpeedLine = function(){
    var field = this.config.field,
        randInRange = FooFighter.Util.randInRange,
        game = this.game,
        group = this.gameState.groups.backGroup,
        line;

    line = group.create(
        game.world.width * Math.random(),
        game.world.height * Math.random(),
        'speedLine'
    );
    line.alpha = field.lineOpacity * randInRange(0.1, 1);
    line.body.velocity.y = randInRange(
        field.lineSpeed * 0.5, field.lineSpeed
    );
    line.events.onOutOfBounds.add(function(){
        this.y = -100;
        this.x = game.world.width * Math.random();
        this.body.velocity.y = randInRange(
            field.lineSpeed * 0.5, field.lineSpeed
        );
        this.alpha = field.lineOpacity * randInRange(0.1, 1);
    }, line);

    return line;
};


proto.addStar = function(){
    var field = this.config.field,
        group = this.gameState.groups.backGroup,
        randInRange = FooFighter.Util.randInRange,
        starType = 'Background/starSmall.png',
        variance = this.config.field.velocityVariance,
        game = this.game,
        star;

    if ( Math.random() >= 0.9 ) {
        starType = 'Background/starBig.png';
    }
    star = group.create(
        game.world.width * Math.random(),
        game.world.height * Math.random(),
        'sprites',
        starType
    );
    star.alpha = field.starOpacity * randInRange(0.1, 1);
    star.body.velocity.y = randInRange(
        field.starSpeed * variance, field.starSpeed
    );
    star.events.onOutOfBounds.add(function(){
        this.y = 0;
        this.x = game.world.width * Math.random();
        this.body.velocity.y = randInRange(
            field.starSpeed * variance, field.starSpeed
        );
        this.alpha = field.starOpacity * randInRange(0.1, 1);
    }, star);

    return star;
};


FooFighter.StarField = StarField;

})(FooFighter);
