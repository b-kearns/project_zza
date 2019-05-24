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
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = true;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(this.MAX_VELOCITY, 500);
    this.body.velocity.setTo(200, 0);
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
     this.body.velocity.x = -200;
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
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

<<<<<<< HEAD
/*var Enemy2;

function Enemy2(game, posX, posY, key) {
	Phaser.Sprite.call(this,game, posX, posY, key);
	
	Enemy2 = game.add.group();
    Enemy2.enableBody = true;
    Enemy2.physicsBodyType = Phaser.Physics.ARCADE;
    Enemy2.createMultiple(30, 'enemy1');
    Enemy2.setAll('anchor.x', 0.5);
    Enemy2.setAll('anchor.y', 0.5);
    Enemy2.setAll('scale.x', 0.5);
    Enemy2.setAll('scale.y', 0.5);
    Enemy2.setAll('angle', 180);
    //Enemy2.forEach(function(enemy){
     //   enemy.damageAmount = 40;
    //});
	
	this.weapon = new SingleShotE(game, this.position.x, this.position.y, -1, "enemyWeapon", 1);
=======
///////////////////////////////Rambopus Enemy//////////////////////////////////////////////////////////////

function Enemy2(game, posX, posY, key) {
	Phaser.Sprite.call(this,game, posX, posY, key);
	// set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(0.75, 0.75);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;
	this.HEALTH = 4;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = false;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(0, 300);
	
	this.weapon = new DoubleShot(game, this.position.x, this.position.y, -1, "enemyWeapon", 1);
>>>>>>> 7298c66bc8654a4bc3996dbc94d755cf341cf4e0
}

Enemy2.prototype = Object.create(Phaser.Sprite.prototype);
Enemy2.prototype.constructor = Enemy1;

Enemy2.prototype.create = function() {
	// var timer = game.time.create(false);
	// timer.loop(200, this.shoot, this);
	// timer.start();
}

Enemy2.prototype.update = function() {
	//game.physics.arcade.overlap(this.weapon, GamePlay.player, GamePlay.collisionHandle, null, this);
<<<<<<< HEAD
	
	var startingX = game.rnd.integerInRange(100, game.width - 100);
    var verticalSpeed = 180;
    var spread = 60;
    var frequency = 70;
    var verticalSpacing = 70;
    var numEnemiesInWave = 5;
    var timeBetweenWaves = 2500;

    //  Launch wave
    for (var i =0; i < numEnemiesInWave; i++) {
        var enemy = Enemy2.getFirstExists(false);
        if (enemy) {
            enemy.startingX = startingX;
            enemy.reset(game.width / 2, -verticalSpacing * i);
            enemy.body.velocity.y = verticalSpeed;

            enemy.update = function(){
              //  Wave movement
              this.body.x = this.startingX + Math.sin((this.y) / frequency) * spread;
          	};
        }
    }

	if(this.HEALTH <= 0){
		this.kill();
	}
	
=======
	//kill the object when is out of scope
	    this.body.velocity.y = 200;

	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.kill();
	}
	// fire rate
>>>>>>> 7298c66bc8654a4bc3996dbc94d755cf341cf4e0
	if(this.alive && this.inCamera && game.rnd.integerInRange(1,100) > 90){this.weapon.fire(this);}
}

Enemy2.prototype.shoot = function(){
<<<<<<< HEAD
	for(var i = 0; i < 20; i++){
		this.weapon.fire(this);
	}
}*/
=======
	for(var i = 0; i < 40; i++){
		this.weapon.fire(this);
	}
}

///////////////////////////////Small Turret Enemy//////////////////////////////////////////////////////////////

function Enemy3(game, posX, posY, key) {
	Phaser.Sprite.call(this,game, posX, posY, key);
	// set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(-1, 1);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;
	this.HEALTH = 1;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = false;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(0, 300);
	
	this.weapon = new Shotgun(game, this.position.x, this.position.y, -1, "Weapon2", 1);
}

Enemy3.prototype = Object.create(Phaser.Sprite.prototype);
Enemy3.prototype.constructor = Enemy1;

Enemy3.prototype.create = function() {
	// var timer = game.time.create(false);
	// timer.loop(200, this.shoot, this);
	// timer.start();
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
	}
	// fire rate
	if(this.alive && this.inCamera && game.rnd.integerInRange(1,100) > 90){this.weapon.fire(this);}
}

Enemy3.prototype.shoot = function(){
	for(var i = 0; i < 2; i++){
		this.weapon.fire(this);
	}
}

///////////////////////////////Trishot Enemy//////////////////////////////////////////////////////////////

function Enemy4(game, posX, posY, key) {
	Phaser.Sprite.call(this,game, posX, posY, key);
	// set enemy data
	this.anchor.set(0.5);
    this.scale.setTo(-1, 1);
	this.DRAG = 8000;
	this.MAX_VELOCITY = 500;
	this.ACCELERATION = 1500;
	this.HEALTH = 3;
	
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	this.outOfCameraBoundsKill = false;
	this.autoCull = false;
	this.body.drag.setTo(this.DRAG, this.DRAG);
	this.body.maxVelocity.setTo(300, 300);
    

	
	this.weapon = new TriShot(game, this.position.x, this.position.y, -1, "Weapon3", 1);
}

Enemy4.prototype = Object.create(Phaser.Sprite.prototype);
Enemy4.prototype.constructor = Enemy1;

Enemy4.prototype.create = function() {
	// var timer = game.time.create(false);
	// timer.loop(200, this.shoot, this);
	// timer.start();
}

Enemy4.prototype.update = function() {
	//game.physics.arcade.overlap(this.weapon, GamePlay.player, GamePlay.collisionHandle, null, this);
    //set path
    this.body.velocity.x = -200;
    if(this.body.position.y < 310){
        this.body.velocity.y = 160;
    }
    else if(this.body.position.y > 310 ){
        this.body.velocity.y = -160;
    }
    else if(this.body.position.y === 310){
        this.body.velocity.y = 0;
    }
	//kill the object when is out of scope
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	// allow player to kill with shots
	if(this.HEALTH <= 0){
		this.kill();
	}
	// fire rate
	//if(this.alive && this.inCamera && game.rnd.integerInRange(1,100) > 90){this.weapon.fire(this);}
}

Enemy4.prototype.shoot = function(){
	for(var i = 0; i < 10; i++){
		this.weapon.fire(this);
	}
}
>>>>>>> 7298c66bc8654a4bc3996dbc94d755cf341cf4e0
