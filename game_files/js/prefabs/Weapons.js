"use strict";

function SingleShot(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "SingleShot", false, true, Phaser.Physics.ARCADE);
	
	this.DIRECTION = direction;
	this.PENETRATE = false;
    this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 200;
    this.SFX = game.add.audio("PShot");
	
	for(var i = 0; i < ammo; i++){
		this.add(new Bullet(game, "P-shot"), true);
		console.log("Creating Ammo!");
	}
}

SingleShot.prototype = Object.create(Phaser.Group.prototype);
SingleShot.prototype.constructor = SingleShot;

SingleShot.prototype.fire = function(source) {
	if(!source){return;}
	if(game.time.time < this.nextFire){
		return;
	}
	this.bullet = this.getFirstExists(false);
	if(this.bullet === null){return;}
    this.SFX.play();
	this.getFirstExists(false).fire(this.DIRECTION, source.position.x, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, 0);

	this.nextFire = game.time.time + this.fireRate;
	
}