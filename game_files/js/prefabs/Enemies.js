//prefab for all of the enemies

function Enemy1(game, posX, posY, key) {
	Phaser.Sprite.call(this, game, posX, posY, key);
	// set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(-1, 1);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;
	this.HEALTH = 2;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, this.MAX_VELOCITY);
    this.body.setSize(20, 20, 5, 10);
	
	this.weapon = new SingleShot(game, this.position.x, this.position.y, -1, "enemyWeapon", 1);
}

Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy1.prototype.constructor = Enemy1;

Enemy1.prototype.create = function() {
	// var timer = game.time.create(false);
	// timer.loop(200, this.shoot, this);
	// timer.start();
}

Enemy1.prototype.update = function() {
	//game.physics.arcade.overlap(this.weapon, GamePlay.player, GamePlay.collisionHandle, null, this);
	//kill the object when is out of scope
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	// sine wave movement
	if(this.position.y < 310){
	  this.body.acceleration.setTo(-200,400);
    }
    else if(this.position.y > 320 ){
      this.body.acceleration.setTo(-200,-400); 
    }
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.kill();
	}
	// fire rate
	if(this.alive && this.inCamera && game.rnd.integerInRange(1,100) > 90){this.weapon.fire(this);}
}

Enemy1.prototype.shoot = function(){
	for(var i = 0; i < 20; i++){
		this.weapon.fire(this);
	}
}