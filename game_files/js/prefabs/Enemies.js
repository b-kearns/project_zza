//prefab for all of the enemies

///////////////////////////////Small Single Shot Enemy//////////////////////////////////////////////////////////////

function Enemy1(game, posX, posY, key) {
	Phaser.Sprite.call(this, game, posX, posY, key);
	// set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(-1, 1);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 200;
	this.ACCELERATION = 1500;
	this.HEALTH = 2;
	this.DEFAULT = 2;
	this.POINTS = 100;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, 500);
    this.body.velocity.setTo(200, 0);
    this.body.setSize(20, 20, 5, 10);
	
	this.weapon = new SingleShot(game, this.position.x, this.position.y, -1, "enemyWeapon", 2);
}

Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy1.prototype.constructor = Enemy1;

Enemy1.prototype.update = function() {
	//game.physics.arcade.overlap(this.weapon, GamePlay.player, GamePlay.collisionHandle, null, this);
	//kill the object when is out of scope
    this.body.velocity.x = -200;
	
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.kill();
		
		SCORE += this.POINTS;
		
		this.HEALTH = this.DEFAULT;
	}
	// fire rate
	if(this.exists && this.inCamera && game.rnd.integerInRange(1,100) > 95){this.weapon.fire(this);}
}

Enemy1.prototype.shoot = function(){
	for(var i = 0; i < 20; i++){
		this.weapon.fire(this);
	}
}
///////////////////////////////Rambopus Enemy//////////////////////////////////////////////////////////////

function Enemy2(game, posX, posY, key) {
	Phaser.Sprite.call(this,game, posX, posY, key);
	// set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(0.75, 0.75);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;
	this.HEALTH = 10;
	this.DEFAULT = 10;
	this.POINTS = 250;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(0, 300);
	
	this.weapon = new DoubleShot(game, this.position.x, this.position.y, -1, "enemyWeapon", 16);
}

Enemy2.prototype = Object.create(Phaser.Sprite.prototype);
Enemy2.prototype.constructor = Enemy2;

Enemy2.prototype.create = function() {
	
}

Enemy2.prototype.update = function() {

	//kill the object when is out of scope
	this.body.velocity.y = 200;

	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.kill();
		
		SCORE += this.POINTS;
		
		this.HEALTH = this.DEFAULT;
	}
	
	if(this.exists && this.inCamera && game.rnd.integerInRange(1,100) > 95){try{this.shoot();}catch{return;}}
}

Enemy2.prototype.shoot = function(){
	for(var i = 0; i < 10; i++){
		this.weapon.fire(this);
	}
}


///////////////////////////////Small Turret Enemy//////////////////////////////////////////////////////////////

function Enemy3(game, posX, posY, key) {
	this.BASE = Phaser.Sprite.call(this, game, posX, posY, "enemy3-1");
	this.BARREL = Phaser.Sprite.call(this, game, posX, posY, "enemy3");
	// set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(-1, 1);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;
	this.HEALTH = 1;
	this.DEFAULT = 1;
	this.POINTS = 200;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(0, 300);
	
	this.weapon = new Shotgun(game, this.position.x, this.position.y, -1, "Weapon2", 1);
}

Enemy3.prototype = Object.create(Phaser.Sprite.prototype);
Enemy3.prototype.constructor = Enemy1;

Enemy3.prototype.create = function() {
	
}

Enemy3.prototype.update = function() {
	//game.physics.arcade.overlap(this.weapon, GamePlay.player, GamePlay.collisionHandle, null, this);
	//kill the object when is out of scope
	    this.body.velocity.x = -100;

	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.kill();
		
		SCORE += this.POINTS;
		
		this.HEALTH = this.DEFAULT;
	}
	// fire rate
	if(this.alive && this.inCamera && game.rnd.integerInRange(1,100) > 90){this.weapon.fire(this);}
}

Enemy3.prototype.shoot = function(){
	for(var i = 0; i < 2; i++){
		this.weapon.fire(this);
	}
}

// ///////////////////////////////Trishot Enemy//////////////////////////////////////////////////////////////

// function Enemy4(game, posX, posY, key) {
	// Phaser.Sprite.call(this,game, posX, posY, key);
	// // set enemy data
	// this.anchor.set(0.5);
    // this.scale.setTo(-1, 1);
	// this.DRAG = 8000;
	// this.MAX_VELOCITY = 500;
	// this.ACCELERATION = 1500;
	// this.HEALTH = 3;
	
	// game.physics.enable(this);
	// this.body.collideWorldBounds = false;
	// // this.outOfCameraBoundsKill = false;
	// // this.autoCull = false;
	// this.body.drag.setTo(this.DRAG, this.DRAG);
	// this.body.maxVelocity.setTo(300, 300);
    

	
	// this.weapon = new TriShot(game, this.position.x, this.position.y, -1, "Weapon3", 3);
// }

// Enemy4.prototype = Object.create(Phaser.Sprite.prototype);
// Enemy4.prototype.constructor = Enemy1;

// Enemy4.prototype.create = function() {
	// // var timer = game.time.create(false);
	// // timer.loop(200, this.shoot, this);
	// // timer.start();
// }

// Enemy4.prototype.update = function() {
	// //game.physics.arcade.overlap(this.weapon, GamePlay.player, GamePlay.collisionHandle, null, this);
    // //set path
    // this.body.velocity.x = -200;
	
    // // if(this.body.position.y < 310){
        // // this.body.velocity.y = 160;
    // // }
    // // else if(this.body.position.y > 310 ){
        // // this.body.velocity.y = -160;
    // // }
    // // else if(this.body.position.y === 310){
        // // this.body.velocity.y = 0;
    // // }
	// //kill the object when is out of scope
	// // if(this.inCamera && !this.outOfCameraBoundsKill){
		// // this.outOfCameraBoundsKill = true;
	// // }
	// // allow player to kill with shots
	// if(this.HEALTH <= 0){
		// this.kill();
	// }
	// // fire rate
	// //if(this.alive && this.inCamera && game.rnd.integerInRange(1,100) > 90){this.weapon.fire(this);}
// }

// Enemy4.prototype.shoot = function(){
	// for(var i = 0; i < 10; i++){
		// this.weapon.fire(this);
	// }
// }
