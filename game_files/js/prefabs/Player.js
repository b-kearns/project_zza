"use strict";
<<<<<<< HEAD

var shipTrail;
var playerDeath;

function Player(game, key) {

	Phaser.Sprite.call(this, game, 64, game.world.centerY, key);
	
=======
// player controller
function Player(game, key) {
	Phaser.Sprite.call(this,game, 64, game.world.centerY, key);
	//PC variables
>>>>>>> 478c945af36f7c6b4a3dbfc48cecca6362420f3b
	this.anchor.set(0.5);
	this.DRAG = 1000;
	this.MAX_VELOCITY = 400;
	this.ACCELERATION = 1500;
	this.HEALTH = 2;
	this.EQUIP = 0;
    //spin up physics
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, this.MAX_VELOCITY);
    this.body.setSize(10, 10, 5, 10);
<<<<<<< HEAD

    shipTrail = game.add.emitter(this.position.x -20, this.position.y, 400);
    shipTrail.width = 10;
    shipTrail.makeParticles('trail');
    shipTrail.setXSpeed(-200, -250);
    shipTrail.setYSpeed(25, -50);
    shipTrail.setRotation(50,-50);
    shipTrail.setAlpha(1, 0.01, 800);
    shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
    shipTrail.start(false, 5000, 10);
    
=======
    //PC controls
>>>>>>> 478c945af36f7c6b4a3dbfc48cecca6362420f3b
	this.cursors = game.input.keyboard.createCursorKeys();
	this.cursors = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: game.input.keyboard.addKey(Phaser.Keyboard.D)
	}
	//swappable weapons for PC
	this.weapons = [];
	this.weapons[0] = new SingleShot(game, this.position.x, this.position.y, 1, "P-shot", 16);
	this.weapons[1] = new Shotgun(game, this.position.x, this.position.y, 1, "P-shot", 32);
	this.weapons[2] = new Railgun(game, this.position.x, this.position.y, 1, "P-shot", 1);
	this.weapons[3] = new TriShot(game, this.position.x, this.position.y, 1, "P-shot", 32);
	this.weapons[4] = new DoubleShot(game, this.position.x, this.position.y, 1, "P-shot", 32);

	this.weapon = this.weapons[this.EQUIP];
	
	this.blinkDrive = new BlinkDrive(game);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.preload = function(){
}

Player.prototype.create = function() {
	
}

Player.prototype.update = function() {
	//game.physics.arcade.overlap(this.weapon, GamePlay.enemies, GamePlay.collisionHandle, null, this);

	shipTrail.x = this.position.x;
	shipTrail.y = this.position.y;

	this.weapon = this.weapons[this.EQUIP];
    // movement data
	this.body.acceleration.setTo(0,0);
	if(this.alive) {
		if(this.cursors.left.isDown){
			this.body.acceleration.x = -this.ACCELERATION;
		}
		else if(this.cursors.right.isDown){
			this.body.acceleration.x = this.ACCELERATION;
		}
		
		if(this.cursors.up.isDown){
			this.body.acceleration.y = -this.ACCELERATION;
		}
		else if(this.cursors.down.isDown){
			this.body.acceleration.y = this.ACCELERATION;
		}
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.weapon.fire(this);
		}
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
			this.blinkDrive.jump(this);
		}
		
		if(game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)){
			this.swap(false);
		}
		else if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)) {
			this.swap(true);
		}
	}
	
}

Player.prototype.swap = function(direction) {
	//SWAP LEFT
	if(direction){
		this.EQUIP--;
		if(this.EQUIP < 0){this.EQUIP = this.weapons.length - 1;}
	}
	else {
		this.EQUIP++;
		if(this.EQUIP >= this.weapons.length){this.EQUIP = 0;}
	}
}







