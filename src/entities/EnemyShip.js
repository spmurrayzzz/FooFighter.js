
;(function( FooFighter ){

function EnemyShip ( gameState, group ) {
    this.gameState = gameState;
    this.game = gameState.game;
    this.group = group;
    this.sprite = null;
    this.velocityRange = {
        min: 50,
        max: 250
    };
    this.laserVelocity = 300;
    this.lastFired = null;
    this.fireTimer = 5000;
    this.refs = {
        checkFireLaser: null
    };
}

var proto = EnemyShip.prototype;


proto.create = function(){
    var game = this.game,
        minVelocity = this.velocityRange.min,
        maxVelocity = this.velocityRange.max,
        randInRange = FooFighter.Util.randInRange;

    this.sprite = this.group.create(
        game.world.width * Math.random(),
        -20,
        'sprites',
        'enemyShip.png'
    );
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.sprite.outOfBoundsKill = true;
    this.sprite.body.velocity.y = randInRange(minVelocity, maxVelocity);
    this.bindEvents();
};


proto.bindEvents = function(){
    var vent = this.gameState.vent;

    this.refs.checkFireLaser = this.checkFireLaser.bind(this);
    vent.on('update', this.refs.checkFireLaser);
    vent.on('game-over', function(){
        vent.off('update', this.refs.checkFireLaser);
    }.bind(this));
    this.sprite.events.onKilled.add(function(){
        vent.off('update', this.refs.checkFireLaser);
    }.bind(this));
};


proto.checkFireLaser = function(){
    var currTime = new Date().getTime();

    if ( currTime - this.lastFired >= this.fireTimer ) {
        this.fireLaser();
        this.lastFired = currTime;
    }
};


proto.fireLaser = function(){
    var group = this.gameState.groups.enemyLasers,
        game = this.game,
        player = this.gameState.entities.player.sprite,
        velocity = this.laserVelocity,
        angle,
        pos,
        laser;

    pos = {
        x: this.sprite.body.x + this.sprite.body.width/2,
        y:this.sprite.body.y + this.sprite.height + 20
    };

    laser = group.getFirstExists(false);

    if ( !laser ) {
        laser = group.create(
            pos.x,
            pos.y,
            'sprites',
            'laserRed.png'
        );
        laser.anchor = {
            x: 0,
            y: 0
        };
        laser.outOfBoundsKill = true;
    } else {
        laser.revive().reset(pos.x, pos.y);
    }

    angle = Math.atan2(
        (player.y - laser.y),
        (player.x - laser.x)
    );
    laser.angle = Phaser.Math.radToDeg(angle) + 90;
    game.physics.moveToXY(laser, player.x, player.y, velocity);
};


FooFighter.EnemyShip = EnemyShip;

})(FooFighter);
