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

	this.cursors = game.input.keyboard.createCursorKeys();
	this.cursors = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: game.input.keyboard.addKey(Phaser.Keyboard.D)
	}
	
	this.weapons = [];
	this.weapons[0] = new SingleShot(game, this.position.x, this.position.y, 1, "P-shot");
	
	this.weapon = this.weapons[0];
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.preload = function(){
}

Player.prototype.create = function() {
	
}

Player.prototype.update = function() {
	
	this.body.acceleration.setTo(0,0);
	
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
<<<<<<< HEAD
	
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		this.weapon.fire(this);
=======
	//handling weapon fire
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
        this.shot = new SingleShot(game, this.position.x, this.position.y, 1, "P-shot");
        game.add.existing(this.shot);
>>>>>>> 4df16c4a0f8b4470646ed645d07eef7f31ea665c
	}
}