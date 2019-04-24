"use strict";

function Player(game, key) {
	Phaser.Sprite.call(this,game, 64, game.world.centerY, key);
	
	this.anchor.set(0.5);
	this.DRAG = 25;
	this.MAX_VELOCITY = 250;
	this.ACCELERATION = 125;

	game.physics.enable(this);
	this.body.collideWorldBounds = true;
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
	
	console.log(this.cursors);
}

Player.prototype.update = function() {
	
	//X and Y Axis Movement
	if (this.cursors.right.isDown && this.body.velocity.x < this.MAX_VELOCITY) {
		this.body.velocity.x += this.ACCELERATION;
	}
	else if (this.cursors.left.isDown && this.body.velocity.x > -this.MAX_VELOCITY) {
		this.body.velocity.x -= this.ACCELERATION;
	}
	else if(this.body.velocity.x < 0 ){
		this.body.velocity.x += this.DRAG;
	}
	else if(this.body.velocity.x > 0){
		this.body.velocity.x -= this.DRAG;
	}
	
	if (this.cursors.up.isDown && this.body.velocity.y > -this.MAX_VELOCITY) {
		this.body.velocity.y -= this.ACCELERATION;
	}
	else if (this.cursors.down.isDown && this.body.velocity.y < this.MAX_VELOCITY) {
		this.body.velocity.y += this.ACCELERATION;
	}
	else if(this.body.velocity.y < 0){
		this.body.velocity.y += this.DRAG;
	}
	else if(this.body.velocity.y > 0){
		this.body.velocity.y -= this.DRAG;
	}
	
}