"use strict";
// player controller
function Player(game, key) {
	Phaser.Sprite.call(this,game, 64, game.world.centerY, key);
	//PC variables
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
    //PC controls
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
	// if(this.HEALTH <= 0){
		// this.kill();
		// //GamePlay.equipped.kill();
		// game.state.start("GameOver", false, false, this.background);
	// }
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





