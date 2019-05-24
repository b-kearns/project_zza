function Enemy1(game, posX, posY, key) {
	Phaser.Sprite.call(this,game, posX, posY, key);
	
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
	
	this.weapon = new SingleShotE(game, this.position.x, this.position.y, -1, "enemyWeapon", 1);
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
	
	if(this.inCamera && !this.outOfCameraBoundsKill){
		this.outOfCameraBoundsKill = true;
	}
	
	if(this.position.y < 310){
	  this.body.acceleration.setTo(-200,400);
    }
    else if(this.position.y > 320 ){
      this.body.acceleration.setTo(-200,-400); 
    }
	
	if(this.HEALTH <= 0){
		this.kill();
	}
	
	if(this.alive && this.inCamera && game.rnd.integerInRange(1,100) > 90){this.weapon.fire(this);}
}

Enemy1.prototype.shoot = function(){
	for(var i = 0; i < 20; i++){
		this.weapon.fire(this);
	}
}

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
	
	if(this.alive && this.inCamera && game.rnd.integerInRange(1,100) > 90){this.weapon.fire(this);}
}

Enemy2.prototype.shoot = function(){
	for(var i = 0; i < 20; i++){
		this.weapon.fire(this);
	}
}*/
