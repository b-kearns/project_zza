"use strict";
// all of the posible weapons are their own objects

//set p shooter specfic data for bullets
function SingleShot(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "SingleShot", false, true, Phaser.Physics.ARCADE);
	
	this.UNLOCK = true;
	this.NAME = "Single";
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 500;
	this.fireRate = 200;
    this.SFX = game.add.audio("weapon_fx_1");
	
	for(var i = 0; i < ammo; i++){

	this.add(new Bullet(game, key, this.DAMAGE, this.PENETRATE), true);

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

//get the double shooter man!
function DoubleShot(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "DoubleShot", false, true, Phaser.Physics.ARCADE);
	
	this.UNLOCK = false;
	this.NAME = "Double";

	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 500;
	this.fireRate = 150;
	this.ALT = 1;
    this.SFX = game.add.audio("weapon_fx_1");
	
	for(var i = 0; i < ammo; i++){

		this.add(new Bullet(game, key, this.DAMAGE, this.PENETRATE), true);

	}
}

DoubleShot.prototype = Object.create(Phaser.Group.prototype);
DoubleShot.prototype.constructor = DoubleShot;

DoubleShot.prototype.fire = function(source) {
	if(!source){return;}
	if(game.time.time < this.nextFire){
		return;
	}
	this.bullet = this.getFirstExists(false);
	if(this.bullet === null){return;}
    this.SFX.play();
	
	this.getFirstExists(false).fire(this.DIRECTION, source.position.x + 20, source.position.y - 10 * this.ALT, 0, this.bulletSpeed * this.DIRECTION, 0, 0);

	this.nextFire = game.time.time + this.fireRate;
	this.ALT *= -1;
}
//this is how we trishot
function TriShot(game, posX, posY, direction, key, ammo, fireRate) {
	Phaser.Group.call(this, game, game.world, "TriShot", false, true, Phaser.Physics.ARCADE);
	
	this.UNLOCK = false;
	this.NAME = "Tri";
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 400;
	this.fireRate = fireRate;
    this.SFX = game.add.audio("tri_shot");
    this.SFX.volume = 0.75;
	
	for(var i = 0; i < ammo; i++){
		this.add(new Bullet(game, "TriShot", this.DAMAGE, this.PENETRATE), true);
	}
}

TriShot.prototype = Object.create(Phaser.Group.prototype);
TriShot.prototype.constructor = TriShot;

TriShot.prototype.fire = function(source) {
	if(!source){return;}
	if(game.time.time < this.nextFire){
		return;
	}
	// this.bullet = this.getFirstExists(false);
	// if(this.bullet === null){return;}
    this.SFX.play();
	try{
		this.getFirstExists(false).fire(this.DIRECTION, source.position.x, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, -this.bulletSpeed/2);
		this.getFirstExists(false).fire(this.DIRECTION, source.position.x, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, 0);
		this.getFirstExists(false).fire(this.DIRECTION, source.position.x, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, this.bulletSpeed/2);
	}
	catch{return;}
	
	this.nextFire = game.time.time + this.fireRate;
	
}

//shoot gun
function Shotgun(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "Shotgun", false, true, Phaser.Physics.ARCADE);
	
	this.UNLOCK = false;
	this.NAME = "Shotgun";
	this.DIRECTION = direction;
	this.PENETRATE = false;
	this.DAMAGE = 1;
    this.nextFire = 0;
	this.bulletSpeed = 200;
	this.fireRate = 1000;
    this.SFX = game.add.audio("shotgun_fx"); 
    this.SFX.volume = 0.75;
	// add specific data to shotgun bullets
	for(var i = 0; i < ammo; i++){
		this.add(new Bullet(game, "ShotgunShot", this.DAMAGE, this.PENETRATE), true);
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
	
    this.SFX.play();
	if(this.DIRECTION < 0){
		try{
			for(var i = 0; i < Math.floor(this.children.length/4); i++) {
				this.getFirstExists(false).fire(this.DIRECTION, source.position.x + game.rnd.integerInRange(10, 15), source.position.y + game.rnd.integerInRange(-10, 10), (game.rnd.integerInRange(-20, 20) + source.angle) + 180, this.bulletSpeed * this.DIRECTION, 0, 0);
			}
		}
		catch{this.nextFire = game.time.time + this.fireRate; return;}
	}
	else{
		try{
			for(var i = 0; i < Math.floor(this.children.length/4); i++) {
				this.getFirstExists(false).fire(this.DIRECTION, source.position.x + game.rnd.integerInRange(10, 15), source.position.y + game.rnd.integerInRange(-10, 10), game.rnd.integerInRange(-20, 20), this.bulletSpeed * this.DIRECTION, 0, 0);
			}
		}
		catch{this.nextFire = game.time.time + this.fireRate; return;}
	}

	this.nextFire = game.time.time + this.fireRate;
}
//make the rail shooter
function Railgun(game, posX, posY, direction, key, ammo) {
	Phaser.Group.call(this, game, game.world, "Railgun", false, true, Phaser.Physics.ARCADE);
	//set all the variables unique to the railgun
	this.UNLOCK = false;
	this.NAME = "Railgun";
	this.DIRECTION = direction;
	this.PENETRATE = true;
	this.DAMAGE = 5;
    this.nextFire = 0;
	this.bulletSpeed = 1600;
	this.fireRate = 5000;
    this.SFX_1 = game.add.audio("rail_charge");
    this.SFX_2 = game.add.audio("rail_shot");
    this.SFX_1.volume = 0.75;
    this.SFX_2.volume = 0.75;
	
	for(var i = 0; i < ammo; i++){
		this.add(new Bullet(game, "RailShot", this.DAMAGE, this.PENETRATE), true);
	}
}

Railgun.prototype = Object.create(Phaser.Group.prototype);
Railgun.prototype.constructor = Railgun;
// handle the railgun spinup of its fire event
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
	if(source.angle > 0){
		bullet.fire(this.DIRECTION, source.position.x + 15, source.position.y, source.angle + 180, this.bulletSpeed * this.DIRECTION, 0, 0);	
	}
	else{
		bullet.fire(this.DIRECTION, source.position.x + 15, source.position.y, 0, this.bulletSpeed * this.DIRECTION, 0, 0);	
	}

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

	player.position.x += 150;
	
	this.nextFire = game.time.time + this.fireRate;
}