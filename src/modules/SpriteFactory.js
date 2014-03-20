
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
        recycle = options.recycle || null,
        velocity = options.velocity || null,
        x = options.x,
        y = options.y,
        events = options.events || null,
        event,
        i,
        handlers,
        sprite,
        didRecycle = false;

    if ( align === 'center' ) {
        x = game.world.centerX;
        y = game.world.centerY;
    }

    if ( group === null ) {
        sprite = game.add.sprite(x, y, sheet, frame);
    } else {
        if ( recycle !== null ) {
            sprite = this.recycleSprite(group, options);
            if ( !sprite ) {
                sprite = group.create(x, y, sheet, frame);
            } else {
                didRecycle = true;
            }
        } else {
            sprite = group.create(x, y, sheet, frame);
        }
    }

    if ( anchor !== null ) {
        sprite.anchor = {
            x: anchor.x,
            y: anchor.y
        };
    }

    if ( velocity !== null ) {
        for ( var v in velocity ) {
            sprite.body.velocity[v] = velocity[v];
        }
    }

    if ( events !== null && didRecycle !== null ) {
        for ( event in events ) {
            handlers = events[event];
            for ( i = 0; i < handlers.length; i++ ) {
                sprite.events[event].add(handlers[i]);
            }
        }
    }

    return sprite;
};


proto.recycleSprite = function( group, options ){
    var sprite;

    if ( typeof group === 'undefined' ) {
        throw new Error('Recycle functionality requires a group.');
    }

    sprite = group.getFirstExists(false);

    if ( !sprite ) {
        return false;
    } else {
        sprite.revive();
        sprite.reset(options.x, options.y);
    }

    return sprite;

};


FooFighter.SpriteFactory = SpriteFactory;

})(FooFighter);
