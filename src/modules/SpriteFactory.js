
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
        align = options.align || null,
        x = options.x,
        y = options.y,
        events = options.events || null,
        event,
        i,
        handlers,
        sprite;

    if ( align === 'center' ) {
        x = game.world.centerX;
        y = game.world.centerY;
    }

    if ( group === null ) {
        sprite = game.add.sprite(x, y, sheet, frame);
    } else {
        sprite = group.create(x, y, sheet, frame);
    }

    if ( anchor !== null ) {
        sprite.anchor = {
            x: anchor.x,
            y: anchor.y
        };
    }

    if ( events !== null ) {
        for ( event in events ) {
            handlers = events[event];
            for ( i = 0; i < handlers.length; i++ ) {
                sprite.events[event].add(handlers[i]);
            }
        }
    }

    return sprite;
};


FooFighter.SpriteFactory = SpriteFactory;

})(FooFighter);
