"use strict";

function SingleShot(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "SingleShot", false, true, Phaser.Physics.ARCADE);
	
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 200;
    this.SFX = game.add.audio("PShot");
	
	for(var i = 0; i < ammo; i++){
		this.add(new Bullet(game, "P-shot"), true);
		//console.log("Creating Ammo!");
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

function Shotgun(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "Shotgun", false, true, Phaser.Physics.ARCADE);
	
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 800;
	this.fireRate = 1000;
    this.SFX = game.add.audio("PShot");
	
	for(var i = 0; i < ammo; i++){
		this.add(new Bullet(game, "P-shot"), true);
		//console.log("Creating Ammo!");
	}
}

Shotgun.prototype = Object.create(Phaser.Group.prototype);
Shotgun.prototype.constructor = Shotgun;

Shotgun.prototype.fire = function(source) {
	if(!source){return;}
	if(game.time.time < this.nextFire){
		return;
	}
	this.bullet = this.getFirstExists(false);
	if(this.bullet === null){return;}
    this.SFX.play();
	for(var i = 0; i < Math.floor(this.children.length/2); i++) {
		this.getFirstExists(false).fire(this.DIRECTION, source.position.x + game.rnd.integerInRange(10, 15), source.position.y + game.rnd.integerInRange(-10, 10), game.rnd.integerInRange(-30, 30), this.bulletSpeed * this.DIRECTION, 0, 0);

	}

	this.nextFire = game.time.time + this.fireRate;
}

function Railgun(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "Railgun", false, true, Phaser.Physics.ARCADE);
	
	this.DIRECTION = direction;
	this.PENETRATE = true;
	this.DAMAGE = 5;
    this.nextFire = 0;
	this.bulletSpeed = 1600;
	this.fireRate = 5000;
    this.SFX_1 = game.add.audio("rail_charge");
    this.SFX_2 = game.add.audio("rail_shot");
	
	for(var i = 0; i < ammo; i++){
		this.add(new Bullet(game, "P-shot"), true);
		//console.log("Creating Ammo!");
	}
}

Railgun.prototype = Object.create(Phaser.Group.prototype);
Railgun.prototype.constructor = Railgun;

Railgun.prototype.fire = function(source) {
	if(!source){return;}
	if(game.time.time < this.nextFire){
		return;
	}
	this.bullet = this.getFirstExists(false);
	if(this.bullet === null){return;}
    this.SFX_1.play();
	game.time.events.add(Phaser.Timer.SECOND * 1, this.fireRail, this, source, this.bullet);
	
}

Railgun.prototype.fireRail = function(source, bullet) {

	this.SFX_2.play();
	bullet.fire(this.DIRECTION, source.position.x + 15, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, 0);

	this.nextFire = game.time.time + this.fireRate;
	
}

function BlinkDrive(game) {
	Phaser.Group.call(this, game, game.world, "BlinkDrive", false, true, Phaser.Physics.ARCADE);
	
	this.fireRate = 5000;
	this.nextFire = 0;
}

BlinkDrive.prototype = Object.create(Phaser.Group.prototype);
BlinkDrive.prototype.constructor = BlinkDrive;

BlinkDrive.prototype.jump = function(player) {
	if(!player){return;}
	if(game.time.time < this.nextFire) {return;}
	
	//NEEDS ANIMATION
	player.position.x += 150;
	
	this.nextFire = game.time.time + this.fireRate;
}