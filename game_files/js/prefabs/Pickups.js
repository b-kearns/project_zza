//create the pickup objects

function Pickup(game, posX, posY, key, weap){
   	Phaser.Sprite.call(this, game, posX, posY, key);
        game.physics.enable(this);
	    this.body.collideWorldBounds = false;
	    this.outOfCameraBoundsKill = false;
    	this.autoCull = true;
        this.body.velocity.setTo(-150, 0);
        this.UNLOCK = weap;
        this.scale.setTo(0.75,0.75);
}
    
Pickup.prototype = Object.create(Phaser.Sprite.prototype);
Pickup.prototype.constructor = Pickup;

Pickup.prototype.update = function(){
    //set path
    this.body.velocity.x = -150;
	
    if(this.body.position.y < 310){
        this.body.velocity.y = 30;
    }
    else if(this.body.position.y > 310 ){
        this.body.velocity.y = -30;
    }
    else if(this.body.position.y === 310){
        this.body.velocity.y = 0;
    }
}