
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
    this.laserVelocity = 500;
    this.lastFired = null;
    this.fireTimer = 1500;
}

var proto = EnemyShip.prototype;


proto.create = function(){
    var game = this.game,
        minVelocity = this.velocityRange.min,
        maxVelocity = this.velocityRange.max,
        randInRange = FooFighter.Util.randInRange;

    console.log('enemyShip');
    this.sprite = this.group.create(
        game.world.width * Math.random(),
        -50,
        'sprites',
        'enemyShip.png'
    );
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.sprite.body.velocity.y = randInRange(minVelocity, maxVelocity);
    this.bindEvents();
};


proto.bindEvents = function(){
    var vent = this.gameState.vent;

    vent.on('update', this.checkFireLaser.bind(this));
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
            x: 0.5,
            y: 1
        };
        laser.outOfBoundsKill = true;
    } else {
        laser.revive();
        laser.x = pos.x;
        laser.y = pos.y;
    }

    laser.body.velocity.y = this.laserVelocity;
};


FooFighter.EnemyShip = EnemyShip;

})(FooFighter);
