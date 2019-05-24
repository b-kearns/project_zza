"use strict";
// all of the posible weapons are their own objects

//set p shooter specfic data for bullets
function SingleShot(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "SingleShot", false, true, Phaser.Physics.ARCADE);
	
	this.NAME = "Single";
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 200;
    this.SFX = game.add.audio("weapon_fx_1");
	
	for(var i = 0; i < ammo; i++){
	this.add(new Bullet(game, "weapon1"), true);
	}
}

SingleShot.prototype = Object.create(Phaser.Group.prototype);
SingleShot.prototype.constructor = SingleShot;
// handle p shooter fire event
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

function SingleShotE(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "SingleShotE", false, true, Phaser.Physics.ARCADE);
	
	this.NAME = "Single";
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 200;
    this.SFX = game.add.audio("weapon_fx_1");
	
	for(var i = 0; i < ammo; i++){
	this.add(new Bullet(game, "enemyWeapon"), true);
	}
}

SingleShotE.prototype = Object.create(Phaser.Group.prototype);
SingleShotE.prototype.constructor = SingleShotE;

SingleShotE.prototype.fire = function(source) {
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

function ScatterShot(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "ScatterShot", false, true, Phaser.Physics.ARCADE);
	
	this.NAME = "Scatter";
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 100;
    this.SFX = game.add.audio("weapon_fx_1");
	
	for(var i = 0; i < ammo; i++){
	this.add(new Bullet(game, "weapon1"), true);
	}
}

ScatterShot.prototype = Object.create(Phaser.Group.prototype);
ScatterShot.prototype.constructor = ScatterShot;

ScatterShot.prototype.fire = function(source) {
	if(!source){return;}
	if(game.time.time < this.nextFire){
		return;
	}
	this.bullet = this.getFirstExists(false);
	if(this.bullet === null){return;}
    this.SFX.play();
	var y = (source.y + source.height / 2) + this.game.rnd.between(-20, 20);
	this.getFirstExists(false).fire(this.DIRECTION, source.position.x + 20, y - 20, 0, this.bulletSpeed * this.DIRECTION, 0, 0);

	this.nextFire = game.time.time + this.fireRate;
	
}

function SplitShot(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "SplitShot", false, true, Phaser.Physics.ARCADE);
	
	this.NAME = "Split";
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 200;
    this.SFX = game.add.audio("weapon_fx_1");
	
	for(var i = 0; i < ammo; i++){
	this.add(new Bullet(game, "weapon1"), true);
	}
}

SplitShot.prototype = Object.create(Phaser.Group.prototype);
SplitShot.prototype.constructor = SingleShot;

SplitShot.prototype.fire = function(source) {
	if(!source){return;}
	if(game.time.time < this.nextFire){
		return;
	}
	this.bullet = this.getFirstExists(false);
	if(this.bullet === null){return;}
    this.SFX.play();
    this.getFirstExists(false).fire(this.DIRECTION, source.position.x, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, -500);
    this.getFirstExists(false).fire(this.DIRECTION, source.position.x, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, 0);
    this.getFirstExists(false).fire(this.DIRECTION, source.position.x, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, 500);

	this.nextFire = game.time.time + this.fireRate;
	
}
// add specific data to shotgun bullets

function Shotgun(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "Shotgun", false, true, Phaser.Physics.ARCADE);
	
	this.NAME = "Shotgun";
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 800;
	this.fireRate = 1000;
    this.SFX = game.add.audio("shotgun_fx");
	
	for(var i = 0; i < ammo; i++){
		this.add(new Bullet(game, "weapon2"), true);
		//console.log("Creating Ammo!");
	}
}

Shotgun.prototype = Object.create(Phaser.Group.prototype);
Shotgun.prototype.constructor = Shotgun;
// handle shotgun fire event
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
	//set all the variables unique to the railgun
	this.NAME = "Railgun";
	this.DIRECTION = direction;
	this.PENETRATE = true;
	this.DAMAGE = 5;
    this.nextFire = 0;
	this.bulletSpeed = 1600;
	this.fireRate = 5000;
    this.SFX_1 = game.add.audio("rail_charge");
    this.SFX_2 = game.add.audio("rail_shot");
	
	for(var i = 0; i < ammo; i++){
		this.add(new Bullet(game, "weapon4"), true);
		//console.log("Creating Ammo!");
	}
}

Railgun.prototype = Object.create(Phaser.Group.prototype);
Railgun.prototype.constructor = Railgun;
// handle the railguun spinup of its fire event
Railgun.prototype.fire = function(source) {
	if(!source){return;}
	if(game.time.time < this.nextFire){
		return;
	}
	this.bullet = this.getFirstExists(false);
	if(this.bullet === null){return;}
    this.SFX_1.play();
	this.nextFire = game.time.time + this.fireRate;
	game.time.events.add(Phaser.Timer.SECOND * 1, this.fireRail, this, source, this.bullet);
	
}
// handle bullet firing of it's fire event
Railgun.prototype.fireRail = function(source, bullet) {

	this.SFX_2.play();
	bullet.fire(this.DIRECTION, source.position.x + 15, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, 0);

	this.nextFire = game.time.time + this.fireRate;
	
}
// handles the teleporting of the PC
function BlinkDrive(game) {
	Phaser.Group.call(this, game, game.world, "BlinkDrive", false, true, Phaser.Physics.ARCADE);
	
	this.NAME = "Blink Drive";
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