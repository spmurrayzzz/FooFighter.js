
;(function( FooFighter ){

function SpriteFactory ( gameState ) {
    this.gameState = gameState;
    this.game = gameState.game;
}

var proto = SpriteFactory.prototype;


proto.createSprite = function( sheet, frame, options ){
    var game = this.game,
        group = options.group || null,
        anchor = options.anchor || null,
        x = options.x,
        y = options.y,
        sprite;

    if ( group === null ) {
        sprite = game.add.sprite(x, y, sheet, frame);
    } else {
        sprite = group.create(x, y, sheet, frame);
    }

    if ( anchor ) {
        sprite.anchor = {
            x: anchor.x,
            y: anchor.y
        };
    }

    return sprite;
};


FooFighter.SpriteFactory = SpriteFactory;

})(FooFighter);
