function Enemy1(game, key) {
	Phaser.Sprite.call(this,game, game.world.width - 64, game.world.centerY, key);
	
	this.anchor.set(0.5);
    this.scale.setTo(-1, 1);
	this.DRAG = 1000;
	this.MAX_VELOCITY = 400;
	this.ACCELERATION = 1500;

	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, this.MAX_VELOCITY);
	console.log(this.cursors);
}

Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy1.prototype.constructor = Enemy1;

Enemy1.prototype.create = function() {
  //this.body.velocity.x = -100;
}

Enemy1.prototype.update = function() {
	
	this.body.velocity.setTo(-200,0);
	//this.body.acceleration.setTo(0,0);
	

}