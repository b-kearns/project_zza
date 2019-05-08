"use strict";

function SingleShot(game, posX, posY, direction, key) {
	Phaser.Group.call(this, game, game.world, "SingleShot", false, true, Phaser.Physics.ARCADE);
	
	this.DIRECTION = direction;
    this.nextFire = 0;
	this.bulletSpeed = 1000;
	this.fireRate = 100;
	
	for(var i = 0; i < 64; i++){
		this.add(new Bullet(game, "P-shot"), true);
		console.log("Creating Ammo!");
	}
}

SingleShot.prototype = Object.create(Phaser.Group.prototype);
SingleShot.prototype.constructor = SingleShot;

SingleShot.prototype.fire = function(source) {
	if(game.time.time < this.nextFire){
		return;
	}

	this.getFirstExists(false).fire(this.DIRECTION, source.position.x, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, 0);

	this.nextFire = game.time.time + this.fireRate;
	
}