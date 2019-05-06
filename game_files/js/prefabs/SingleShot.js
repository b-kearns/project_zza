"use strict";

function SingleShot(game, posX, posY, direction, key) {
	Phaser.Group.call(this, game, game.world, "SingleShot", false, true, Phaser.Physics.ARCADE);
	
	//console.log(direction);
	this.DIRECTION = direction;
	//console.log(this.DIRECTION);
    this.nextFire = 0;
	this.bulletSpeed = 1000;
	this.fireRate = 100;
	
	// var Bullet = function(game, key){
		// Phaser.Sprite.call(this, game, 0, 0, key);
		// this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
		// this.anchor.set(0.5);
		// this.checkWorldBounds = true;
		// this.outOfBoundsKill = true;
		// this.exists = false;
		
		// this.tracking = false;
		// this.scaleSpeed = 0;
	// };
	
	// Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    // Bullet.prototype.constructor = Bullet;
	
	// Bullet.prototype.fire = function (direction, x, y, angle, speed, gx, gy) {

        // gx = gx || 0;
        // gy = gy || 0;

        // this.reset(x, y);
        // this.scale.set(1 * direction);
		// //console.log(direction);

        // this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

        // this.angle = angle;

        // this.body.gravity.set(gx, gy);

    // };
	
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
	
	//console.log("Fire!");
}