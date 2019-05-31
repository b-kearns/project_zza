"use strict";

var shipTrail;
var playerDeath;
	
// player controller
function Player(game, key) {

	Phaser.Sprite.call(this,game, 64, game.world.centerY, "Atlas", key);

	//PC variables
	this.anchor.set(0.5);
	this.DRAG = 1000;
	this.MAX_VELOCITY = 400;
	this.ACCELERATION = 1500;
	this.HEALTH = 1;
	this.EQUIP = 0;
	this.SHIELD = false;
	this.POINTS = 0;
	this.HERO = true;
	this.DOUBLE_UNLOCK = false;
    //spin up physics
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, this.MAX_VELOCITY);
    this.body.setSize(15, 15, 15, 15);
	
    //handle the player thruster emitter
    this.shipTrail = game.add.emitter(this.position.x -20, this.position.y, 400);
    this.shipTrail.width = 10;
    this.shipTrail.makeParticles("Atlas", "trail");
    this.shipTrail.setXSpeed(-200, -250);
    this.shipTrail.setYSpeed(25, -50);
    this.shipTrail.setRotation(50,-50);
    this.shipTrail.setAlpha(1, 0.01, 800);
    this.shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
    this.shipTrail.start(false, 5000, 10);

   	//player death explosion
	this.playerDeath = game.add.emitter(this.position.x, this.position.y);
    this.playerDeath.width = 25;
   	this.playerDeath.height = 25;
	this.animations.add("explosion", "Atlas", ["explosion0001","explosion0002","explosion0003","explosion0004","explosion0005","explosion0006","explosion0007","explosion0008","explosion0009","explosion0010","explosion0011",], 10, false);
    this.playerDeath.makeParticles("explosion");
    this.playerDeath.setAlpha(0.9, 0, 800);
    this.playerDeath.setScale(1.2, 1.3, 1.2, 1.3, 1000, Phaser.Easing.Quintic.Out); 
    this.o_noes = game.add.audio("playerDeath");
    this.o_noes.volume = 0.75;

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
	this.weapons[0] = new SingleShot(game, this.position.x, this.position.y, 1, "weapon1", 16);
	this.weapons[1] = new Shotgun(game, this.position.x, this.position.y, 1, "P-shot", 32);
	this.weapons[2] = new TriShot(game, this.position.x, this.position.y, 1, "P-shot", 32, 400);
	this.weapons[3] = new Railgun(game, this.position.x, this.position.y, 1, "P-shot", 1);
	
	// this.weapons[4] = new DoubleShot(game, this.position.x, this.position.y, 1, "P-shot", 32);

	this.weapon = this.weapons[this.EQUIP];
	
	this.blinkDrive = new BlinkDrive(game);
    //handles the shield sprite
    this.SHIELD_SPRITE = game.add.sprite(0,0, "Atlas", "ShipShield");
    this.SHIELD_SPRITE.anchor.set(0.5);
    
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.preload = function(){
}

Player.prototype.create = function() {
	
}

Player.prototype.update = function() {
	if(!this.shipTrail.alive && this.exists){this.shipTrail.revive();}
	
	this.SHIELD_SPRITE.bringToTop();
	
	this.shipTrail.x = this.position.x;
	this.shipTrail.y = this.position.y;

	this.weapon = this.weapons[this.EQUIP];
	
    // movement data
	this.body.acceleration.setTo(0,0);
    
    this.SHIELD_SPRITE.position.x = this.position.x;
    this.SHIELD_SPRITE.position.y = this.position.y;
    if(this.SHIELD){
       this.SHIELD_SPRITE.exists = true;
    }
    else{
       this.SHIELD_SPRITE.exists = false;
    }
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
		
		// if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
			// this.blinkDrive.jump(this);
		// }
		
		if(game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)){
			this.swap(false);
		}
		else if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)) {
			this.swap(true);
		}
	}

	if(this.HEALTH <= 0) {
			this.playerDeath.x = this.x;
        	this.playerDeath.y = this.y;
        	this.playerDeath.start(false, 1000, 10, 10);
            this.o_noes.play();

			this.shipTrail.kill();
			this.kill();
			this.HEALTH = 1;
			sendToGameOver(CACHE);
		}
	
}

Player.prototype.swap = function(direction) {
	//SWAP LEFT
	if(direction){
		if(this.EQUIP - 1 < 0){this.key = this.weapons.length - 1;}
		else{this.key = this.EQUIP - 1;}
		if(this.weapons[this.key].UNLOCK){this.EQUIP = this.key;}
	}
	else {
		if(this.EQUIP + 1 >= this.weapons.length){this.key = 0;}
		else{this.key = this.EQUIP + 1;}
		if(this.weapons[this.key].UNLOCK){this.EQUIP = this.key;}
	}
}
