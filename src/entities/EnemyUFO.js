
;(function( FooFighter ){

function EnemyUFO ( gameState, group ) {
    this.gameState = gameState;
    this.game = gameState.game;
    this.vent = gameState.vent;
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
        update: null
    };
}

var proto = EnemyUFO.prototype;


proto.create = function(){
    var game = this.game,
        player = this.gameState.entities.player.sprite;

    this.sprite = this.group.create(
        game.world.width * Math.random(),
        -20,
        'sprites',
        'enemyUFO.png'
    );
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.sprite.outOfBoundsKill = true;
    this.game.physics.accelerateToXY(
        this.sprite,
        player.x,
        player.y,
        300,
        600
    );
    this.bindEvents();
};


proto.bindEvents = function(){
    this.sprite.events.onKilled.add(function(){
        this.game.time.events.add(
            5000,
            this.sprite.destroy.bind(this.sprite)
        );
    }.bind(this));
};


FooFighter.EnemyUFO = EnemyUFO;

})(FooFighter);
