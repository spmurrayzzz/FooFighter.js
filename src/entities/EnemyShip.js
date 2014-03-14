
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

};


FooFighter.EnemyShip = EnemyShip;

})(FooFighter);
