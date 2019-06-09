//prefab for all of the enemies

///////////////////////////////Small Single Shot Enemy//////////////////////////////////////////////////////////////

function Enemy1(game, posX, posY, key) {
	Phaser.Sprite.call(this, game, posX, posY, "Atlas", key);
	// set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(-1, 1);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 200;
	this.ACCELERATION = 1500;
	this.HEALTH = 2;
	this.DEFAULT = 2;
	this.POINTS = 100;
	this.HERO = false;
	this.KEY = 0;
	this.SHOOT = true;
	this.WEAP_ANGLE = 0;
	//give it physics
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, 500);
    this.body.velocity.setTo(200, 0);
    this.body.setSize(15, 20, 5, 10);

    //explosion death effect
	this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1,11,"",4), 20, false);
	this.animations.add("idle", Phaser.Animation.generateFrameNames("Dark-Grey-", 4,4, "", 2), 1, true);
	
	this.animations.play("idle");
    // audio object for death 
    this.boom = game.add.audio("enemyDeath");
	
	this.weapon = new SingleShot(game, this.position.x, this.position.y, -1, "projectile-blue", 1);
}

Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy1.prototype.constructor = Enemy1;

Enemy1.prototype.update = function() {
	game.world.bringToTop(this);
    //sliiiide to the left
    this.body.velocity.x = -200;
    //kill the object when is out of scope
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.SHOOT = false;
		this.animations.play("explosion", 20, false, true);

        this.boom.play();
		
		SCORE += this.POINTS;
		
		this.HEALTH = this.DEFAULT;
	}
	// fire rate
	if(this.SHOOT && this.exists && this.inCamera && game.rnd.integerInRange(1,100) > 95){this.weapon.fire(this);}
}

Enemy1.prototype.respawn = function(x,y) {
	this.tint = 0xFFFFFF;
	this.SHOOT = true;
	try{this.animations.play("idle");}
	catch{console.log("Animations Broke");return;}
	this.exists = true;
	this.reset(x, y);
}

Enemy1.prototype.shoot = function(){
	for(var i = 0; i < 20; i++){
		this.weapon.fire(this);
	}
}
///////////////////////////////Rambopus Enemy//////////////////////////////////////////////////////////////

function Enemy2(game, posX, posY, key) {
	Phaser.Sprite.call(this, game, posX, posY, "Atlas", key);
	// set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(0.75, 0.75);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;
	this.HEALTH = 10;
	this.DEFAULT = 10;
	this.POINTS = 250;
	this.HERO = false;
	this.KEY = 1;
	this.SHOOT = true;
	this.WEAP_ANGLE = 0;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(0, 300);

	this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1,11,"",4), 20, false);
	this.animations.add("idle", Phaser.Animation.generateFrameNames("OctoMini", "", "","",0), 1, true);
	this.animations.play("idle");
	// audio object for death 
    this.boom = game.add.audio("enemyDeath");
	this.weapon = new DoubleShot(game, this.position.x, this.position.y, -1, "projectile-blue", 16);
}

Enemy2.prototype = Object.create(Phaser.Sprite.prototype);
Enemy2.prototype.constructor = Enemy2;

Enemy2.prototype.respawn = function(x,y) {

	this.exists = true;
	this.tint = 0xFFFFFF;
	this.SHOOT = true;
	this.animations.play("idle");

	this.reset(x, y);
}

Enemy2.prototype.update = function() {
	game.world.bringToTop(this);
	this.body.velocity.y = 200;
	//kill the object when is out of scope
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.SHOOT = false;
		this.animations.play("explosion", 20, false, true);

        this.boom.play();

		SCORE += this.POINTS;
		
		this.HEALTH = this.DEFAULT;
	}
	//FIRE!!!
	if(this.SHOOT && this.exists && this.inCamera && game.rnd.integerInRange(1,100) > 95){try{this.shoot();}catch{return;}}
}
//also fire...
Enemy2.prototype.shoot = function(){
	for(var i = 0; i < 8; i++){
		this.weapon.fire(this);
	}
}


///////////////////////////////Small Turret Enemy//////////////////////////////////////////////////////////////

function Enemy3(game, posX, posY, key, verticalScale) {
	if(verticalScale == null){verticalScale = 1;}
	this.BARREL = game.add.sprite(posX, posY, "Atlas", "TankBarrel");
	Phaser.Sprite.call(this, game, posX, posY, "Atlas", key);
	this.anchor.setTo(0.4, 0.5);
	
	this.BARREL.anchor.setTo(0, 0.5);
	//set enemy data
    this.scale.setTo(-1, verticalScale);
    //this.BARREL.scale.setTo(-1, 1);
	
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;
	this.HEALTH = 3;
	this.DEFAULT = 3;
	this.POINTS = 200;
	this.HERO = false;
	this.KEY = 2;
	this.SHOOT = true;
	this.WEAP_ANGLE = 0;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.BARREL.outOfCameraBoundsKill = false;
	this.BARREL.autoCull = true;
	this.autoCull = true;
	this.BARREL.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);

	

	this.body.maxVelocity.setTo(this.MAX_VELOCITY, 500);
    this.body.velocity.setTo(-200, 0);
	
	this.weapon = new Shotgun(game, this.BARREL.position.x, this.BARREL.position.y, -1, "ShotgunShot", 8);
	
	this.BARREL.exists = false;
	this.exists = false;
	
	//console.log(this.body);
  
	this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1,11,"",4), 20, false);
	this.animations.add("idle", Phaser.Animation.generateFrameNames("TankBase", "", "","",0), 1, true);
	this.animations.play("idle");
    // audio object for death 
    this.boom = game.add.audio("enemyDeath");

}

Enemy3.prototype = Object.create(Phaser.Sprite.prototype);
Enemy3.prototype.constructor = Enemy3;

Enemy3.prototype.respawn = function(x, y) {
	this.tint = 0xFFFFFF;
	this.SHOOT = true;
	this.animations.play("idle");
	this.BARREL.exists = true;
	this.exists = true;
	this.reset(x, y);
}

Enemy3.prototype.update = function() {
	game.world.bringToTop(this);
	this.BARREL.position.x = this.position.x;
	this.BARREL.position.y = this.position.y;
	
	this.BARREL.rotation = game.physics.arcade.angleBetween(this.BARREL, PLAYER);

	//i like to move it move it
	this.body.velocity.x = -250;
	
	//kill the object when is out of scope
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.SHOOT = false;
		this.BARREL.exists = false;
		this.animations.play("explosion", 20, false, true);

        this.boom.play();
		
		SCORE += this.POINTS;
		
		this.HEALTH = this.DEFAULT;
	}
	
	if(!this.exists){this.BARREL.exists = false;}
	
	if(this.SHOOT && this.exists && this.inCamera && game.rnd.integerInRange(1,100) > 95){try{this.weapon.fire(this.BARREL);}catch{return;}}
}

Enemy3.prototype.shoot = function(){
	for(var i = 0; i < 2; i++){
		this.weapon.fire(this.BARREL);
	}
}

// ///////////////////////////////Trishot Enemy//////////////////////////////////////////////////////////////

function Enemy4(game, posX, posY, key) {
	Phaser.Sprite.call(this,game, posX, posY, "Atlas", key);
	//set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(-1, 1);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;

	this.HEALTH = 1;
	this.DEFAULT = 1;

	this.POINTS = 250;
	this.HERO = false;
	this.KEY = 3;
	this.SHOOT = true;
	this.WEAP_ANGLE = 0;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = false;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(300, 300);

    //explosion
	this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1,11,"",4), 20, false);
	this.animations.add("idle", Phaser.Animation.generateFrameNames("TriEnemy", "", "","",0), 1, true);
	this.animations.play("idle");
    // audio object for death 
    this.boom = game.add.audio("enemyDeath");

	this.weapon = new TriShot(game, this.position.x, this.position.y, -1, "TriShot", 9, 600);
}

Enemy4.prototype = Object.create(Phaser.Sprite.prototype);
Enemy4.prototype.constructor = Enemy4;

Enemy4.prototype.respawn = function(x,y) {
	this.tint = 0xFFFFFF;
	this.SHOOT = true;
	this.animations.play("idle");
	this.exists = true;
	this.reset(x, y);
}

Enemy4.prototype.update = function() {
	//game.physics.arcade.overlap(this.weapon, GamePlay.player, GamePlay.collisionHandle, null, this);
	game.world.bringToTop(this);
    //set path
    this.body.velocity.x = -300;
	
	//kill the object when is out of scope
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	//allow player to kill with shots
	if(this.HEALTH <= 0){
		this.SHOOT = false;
		this.animations.play("explosion", 20, false, true);

        this.boom.play();

		SCORE += this.POINTS;
		
		this.HEALTH = this.DEFAULT;
	}
	//fire rate
	if(this.SHOOT && this.exists && this.inCamera && game.rnd.integerInRange(1,100) > 97){try{this.shoot();}catch{return;}}
}

Enemy4.prototype.shoot = function(){
	for(var i = 0; i < 2; i++){
		this.weapon.fire(this);
	}
}

//////////////Railgun Turret////////////////////
function Enemy5(game, posX, posY, key, verticalScale) {
	if(verticalScale == null){verticalScale = 1;}
	this.BARREL = game.add.sprite(posX, posY, "Atlas", "TurretHead");
	Phaser.Sprite.call(this, game, posX, posY, "Atlas", key);
	this.anchor.setTo(0.6, 0);
	
	this.BARREL.anchor.setTo(0.5);
	this.BARREL.scale.setTo(-1.0, 1.0);
	//set enemy data
    this.scale.setTo(-1, verticalScale);
    //this.BARREL.scale.setTo(-1, 1);
	
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;

	this.HEALTH = 3;
	this.DEFAULT = 3;

	this.POINTS = 400;
	this.HERO = false;
	this.KEY = 4;
	this.SHOOT = true;
	this.WEAP_ANGLE = 0;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.BARREL.outOfCameraBoundsKill = false;
	this.BARREL.autoCull = true;
	this.autoCull = true;
	this.BARREL.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);

	

	this.body.maxVelocity.setTo(this.MAX_VELOCITY, 500);
    this.body.velocity.setTo(-200, 0);
	
	this.weapon = new Railgun(game, this.BARREL.position.x, this.BARREL.position.y, -1, "RailShot", 1);
	
	this.BARREL.exists = false;
	this.exists = false;
	
  	this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1,11,"",4), 20, false);
  	this.animations.add("idle", Phaser.Animation.generateFrameNames("TurretBase", "", "","",0), 1, true);
	this.animations.play("idle");

    this.boom = game.add.audio("enemyDeath");

}

Enemy5.prototype = Object.create(Phaser.Sprite.prototype);
Enemy5.prototype.constructor = Enemy5;

Enemy5.prototype.respawn = function(x, y) {
	this.tint = 0xFFFFFF;
	this.SHOOT = true;
	this.animations.play("idle");
	this.BARREL.exists = true;
	this.exists = true;
	this.reset(x, y);
}

Enemy5.prototype.update = function() {
	game.world.bringToTop(this);
	this.BARREL.position.x = this.position.x;
	this.BARREL.position.y = this.position.y;
	
	//track the player UwU
	this.BARREL.rotation = game.physics.arcade.angleBetween(this.BARREL, PLAYER);

	//i like to move it move it
	this.body.velocity.x = -200;
	
	//kill the object when is out of scope
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.SHOOT = false;
		this.BARREL.exists = false;
		this.animations.play("explosion", 20, false, true);

        this.boom.play();
		
		SCORE += this.POINTS;
		
		this.HEALTH = this.DEFAULT;
	}
	
	if(!this.exists){this.BARREL.exists = false;}
	
	if(this.SHOOT && this.exists && this.inCamera && game.rnd.integerInRange(1,100) > 95){try{this.weapon.fire(this.BARREL);}catch{return;}}
}

Enemy5.prototype.shoot = function(){
	for(var i = 0; i < 2; i++){
		this.weapon.fire(this.BARREL);
	}
}

function Enemy6(game, posX, posY, key, weapon_version) {
	Phaser.Sprite.call(this, game, posX, posY, "Atlas", key);
	// set enemy data
	this.anchor.set(0.5);
    // this.scale.setTo(-1, 1);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 200;
	this.ACCELERATION = 1500;
	this.HEALTH = 5;
	this.DEFAULT = 5;
	this.POINTS = 400;
	this.HERO = false;
	this.KEY = 0;
	this.SHOOT = true;
	this.WEAP_ANGLE = 0;
	this.ZZA = true;
	
	//give it physics
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, 500);
    this.body.velocity.setTo(200, 0);
    // this.body.setSize(15, 20, 5, 10);

    //explosion death effect
	this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1,11,"",4), 20, false);
	this.animations.add("idle", Phaser.Animation.generateFrameNames("Tentacle bot", "","", "", 0), 1, true);
	
	this.animations.play("idle");
    // audio object for death 
    this.boom = game.add.audio("enemyDeath");
	
	this.weapon_one = new SingleShot(game, this.position.x, this.position.y, -1, "projectile-blue", 2);
	
	this.weapon_two = new Shotgun(game, this.position.x, this.position.y, -1, "ShotgunShot", 8);
	
	if(weapon_version < 2){this.weapon = this.weapon_one;}
	else{this.weapon = this.weapon_two;}
}

Enemy6.prototype = Object.create(Phaser.Sprite.prototype);
Enemy6.prototype.constructor = Enemy6;

Enemy6.prototype.update = function() {
	
	if(this.body.rotation >= 30){
		this.body.angularVelocity = -25;
	}
	else if(this.body.rotation <= -30){
		this.body.angularVelocity = 25;
	}
	
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		
		this.SHOOT = false;
		this.alive = false;
		this.animations.play("explosion", 20, false, true);

        this.boom.play();
		
		SCORE += this.POINTS;
		
		this.HEALTH = this.DEFAULT;
	}
	
	if(this.SHOOT && this.exists && this.inCamera && game.rnd.integerInRange(1,100) > 95){try{this.weapon.fire(this);}catch{console.log("failed to fire");return;}}
}
