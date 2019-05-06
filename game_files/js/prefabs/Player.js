"use strict";

function Player(game, key) {
	Phaser.Sprite.call(this,game, 64, game.world.centerY, key);
	
	this.anchor.set(0.5);
	this.DRAG = 1000;
	this.MAX_VELOCITY = 400;
	this.ACCELERATION = 1500;

	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, this.MAX_VELOCITY);
	//this.acceleration = this.ACCELERATION;
	this.cursors = game.input.keyboard.createCursorKeys();
	this.cursors = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: game.input.keyboard.addKey(Phaser.Keyboard.D)
	}
	console.log(this.cursors);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.create = function() {
	// this.MOVEMENT = {
		// up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		// down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		// left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		// right: game.input.keyboard.addKey(Phaser.Keyboard.D)
	// }
	
	//console.log(this.cursors);
}

Player.prototype.update = function() {
	
	//this.body.velocity.setTo(0,0);
	this.body.acceleration.setTo(0,0);
	
	if(this.cursors.left.isDown){
		//this.body.velocity.x = -this.MAX_VELOCITY;
		this.body.acceleration.x = -this.ACCELERATION;
	}
	else if(this.cursors.right.isDown){
		//this.body.velocity.x = this.MAX_VELOCITY;
		this.body.acceleration.x = this.ACCELERATION;
	}
	
	if(this.cursors.up.isDown){
		//this.body.velocity.y = -this.MAX_VELOCITY;
		this.body.acceleration.y = -this.ACCELERATION;
	}
	else if(this.cursors.down.isDown){
		//this.body.velocity.y = this.MAX_VELOCITY;
		this.body.acceleration.y = this.ACCELERATION;
	}
	
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
		console.log("Fire!");
	}
}