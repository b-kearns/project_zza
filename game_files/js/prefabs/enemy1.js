function Enemy1(game, posX, posY, key) {
	Phaser.Sprite.call(this,game, posX, posY, key);
	
	this.anchor.set(0.5);
    this.scale.setTo(-1, 1);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;

	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, this.MAX_VELOCITY);
}

Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy1.prototype.constructor = Enemy1;

Enemy1.prototype.create = function() {
}

Enemy1.prototype.update = function() {
	if(this.position.y < 310){
	  this.body.acceleration.setTo(-400,500);
    }
    else if(this.position.y > 320 ){
      this.body.acceleration.setTo(-400,-500); 
    }
}