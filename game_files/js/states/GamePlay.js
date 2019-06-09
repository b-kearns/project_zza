"use strict";
// where the magic happens
var CHECKPOINT;
var CHECKPOINT_SCORE = 0;
var BANNER;
var BGM;
var BACKGROUND;
var EQ;
var PICKUPS;
var CACHE;
var PLATS;
var SUX;
var PLAYER;
var SCORE = 0;
var SCORETEXT;
var NEWGAME = true;

function displayText(x, y, words, fontSize, time){
	SUX = game.add.bitmapText(x, y, "myfont", words, fontSize);
	SUX.anchor.setTo(0.5, 0.5);
	game.time.events.add(time, destroy, this, SUX);
}
//send to game over when player dies
function sendToGameOver(cache, score){
	for(var i = 0; i < cache.length-1; i++){
		cache[i].forEachExists(destroy, this);
	}
	if(ZZA != null){
		ZZA.kill();
		if(PLATS[0] != null){PLATS[0].kill();}
		if(PLATS[1] != null){PLATS[1].kill();}
		for(var i = 0; i < TENTS.length; i++){
			for(var j = 0; j < TENTS[i].length; j++){
				TENTS[i][j].kill();
			}
		}
	}
	PLAYER.shipTrail.kill();
	BANNER.kill();
	SUX.kill();
	PLAYER.kill();
	EQ.kill();
	BGM.stop();
	game.state.start("GameOver", false, false, BACKGROUND, CHECKPOINT, cache, PLATS, SCORETEXT);
}

function destroy(target){
	target.kill();
}

function makeEnemy(player, key){
	switch(key){
	//basic p-shot enemy
	case 1:
			try{
				this.enemy = this.cache[0].getFirstExists(false);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.respawn(game.world.width, game.world.centerY + (80 * game.rnd.integerInRange(-2,2)));
				this.enemy.bringToTop();
			}
			catch{console.log("Spawn Case 1 Failed");return;}
			break;
	//double shot rambopus
	case 2:
			try{
				this.enemy = this.cache[1].getFirstExists(false);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.respawn(game.world.width - 50 * game.rnd.integerInRange(1, 4), -100);
			}
			catch{console.log("Spawn Case 2 Failed");return;}
			break;
	//shotgun turret
	case 3:
			try{
				this.enemy = this.cache[2].getFirstExists(false);
				this.enemy.scale.setTo(-1.0, 1.0);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.respawn(game.world.width + 5 * game.rnd.integerInRange(1, 4), game.world.height - 105);
			}
			catch{console.log("Spawn Case 3 Failed");return;}
			break;
	//tribeam ship
	case 4:
			try{
				this.enemy = this.cache[3].getFirstExists(false);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.respawn(game.world.width, game.world.centerY + (90 * game.rnd.integerInRange(-2,2)));
			}
			catch{console.log("Spawn Case 4 Failed");return;}
			break;
	//rail turret
	case 5:
			try{
				this.enemy = this.cache[4].getFirstExists(false);
				this.enemy.scale.setTo(-1.0, 1.0);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.respawn(game.world.width + 5 * game.rnd.integerInRange(1, 4), game.world.height-130);
			}
			catch{console.log("Spawn Case 5 Failed");return;}
			break;
	//Upside down shotgun turret
	case 6:
			try{
				this.enemy = this.cache[2].getFirstExists(false);
				this.enemy.scale.setTo(-1.0, -1.0);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.respawn(game.world.width + 5 * game.rnd.integerInRange(1, 4), 120);
			}
			catch{console.log("Spawn Case 6 Failed");return;}
			break;
	//Upside down rail turret
	case 7:
			try{
				this.enemy = this.cache[4].getFirstExists(false);
				this.enemy.scale.setTo(-1.0, -1.0);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.respawn(game.world.width + 5 * game.rnd.integerInRange(1, 4), 120);
			}
			catch{console.log("Spawn Case 7 Failed");return;}
			break;
	}

}
//weapon collision
function collisionHandle(target, weapon){
	//console.log(target);
	if(target.SHIELD != null && target.SHIELD){
	   target.SHIELD = false;
	   if(!weapon.PENETRATE){weapon.kill();}
	   return;
	}		
    game.add.tween(target).to({tint: 0xfefefe}, 50, null, true, 0, false, false);
    game.add.tween(target).to({tint: 0xffffff}, 50, null, true, 70, false, false);
	target.HEALTH -= weapon.DAMAGE;
	if(target.HEALTH <= 0 && !target.HERO){
		checkPickups(PLAYER, target, PICKUPS);
	}
	if(!weapon.PENETRATE){weapon.kill();}			
}

function checkCollision(enemy){
	// this.enemy = enemy;
	try{game.physics.arcade.overlap(enemy.weapon, this.player, collisionHandle, null, this);}
	catch{return;}
}

function startTimer(key, interval){
	//console.log("Start Timer: Interval " +interval +": Key " +key);
	game.time.events.loop(Phaser.Timer.SECOND * interval, makeEnemy, this, this.player, key);
}
//handle pickups
function handlePickup(player, pickup){
	//console.log(pickup);
	this.yoink = game.add.audio("itemPickup");

	switch(pickup.UNLOCK){
		case 1:
			//DOUBLE
			//UPGRADE!!!
			player.weapons[0] = new DoubleShot(game, PLAYER.position.x, PLAYER.position.y, 1, "projectile-blue", 32);
			player.weapons[0].UNLOCK = true;
			player.DOUBLE_UNLOCK = true;
			displayText(480, 160, "New Weapon Unlocked!!!", 48, 1500);
			BANNER.exists = true;
			BANNER.play("weaponUnlock", 6, true, false);
			game.time.events.add(1500, destroy, this, BANNER);
			break;
		case 2:
			//SHOTGUN
			player.weapons[1].UNLOCK = true;
			displayText(480, 160, "New Weapon Unlocked!!!", 48, 1500);
			BANNER.exists = true;
			BANNER.play("weaponUnlock", 6, true, false);
			game.time.events.add(1500, destroy, this, BANNER);
			break;
		case 3:
			//TRIBEAM
			player.weapons[2].UNLOCK = true;
			this.words = "New Weapon Unlocked!!!";
			displayText(480, 160, "New Weapon Unlocked!!!", 48, 1500);
			BANNER.exists = true;
			BANNER.play("weaponUnlock", 6, true, false);
			game.time.events.add(1500, destroy, this, BANNER);
			break;
		case 4:
			//RAIL
			player.weapons[3].UNLOCK = true;
			displayText(480, 160, "New Weapon Unlocked!!!", 48, 1500);
			BANNER.exists = true;
			BANNER.play("weaponUnlock", 6, true, false);
			game.time.events.add(1500, destroy, this, BANNER);
			break;
		case 5:
			//SHIELD
			player.SHIELD = true;
			break;
	}

	this.yoink.play();

    pickup.kill();

}

function spawnPickup(x, y, pickups, key){
	try{
		pickups.getFirst("UNLOCK", key).revive();
		pickups.getFirst("UNLOCK", key).reset(x, y);
	}
	catch(err){console.log("Pickup Spawn Failed: " +err);return;}
}
//weapon unlocking
function checkPickups(player, target, pickups){
	// console.log("Checking for pickups: " +target.KEY);
	switch(target.KEY){
		case 0:
			break;
		case 1:
			//console.log(player.DOUBLE_UNLOCK);
			if(!player.DOUBLE_UNLOCK){
				spawnPickup(target.position.x, target.position.y, pickups, 1);
			}
			break;
		case 2:
			if(!player.weapons[1].UNLOCK){
				spawnPickup(target.position.x, target.position.y, pickups, 2);
			}
			break;
		case 3:
			if(!player.weapons[2].UNLOCK){
				spawnPickup(target.position.x, target.position.y, pickups, 3);
			}
			break;
		case 4:
			if(!player.weapons[3].UNLOCK){
				spawnPickup(target.position.x, target.position.y, pickups, 4);
			}
			break;
	}
}

function spawnShield(){
	if(CHECKPOINT >= 5){
		if(game.rnd.integerInRange(1,100) > 70){
			spawnPickup(game.world.centerX + 200 * game.rnd.integerInRange(-1,1), game.world.height + 64, PICKUPS, 5);
		}
	}
	else{
		if(game.rnd.integerInRange(1,100) > 70){
			spawnPickup(game.world.width + 64, game.world.centerY + 200 * game.rnd.integerInRange(-1,1), PICKUPS, 5);
		}
	}
}

function Level_0(game) {}

	Level_0.prototype = {
			

		init: function(background, check, cache, plats, score){

      SCORE = CHECKPOINT_SCORE;
			this.background = background;
			BACKGROUND = this.background;
			if(check != null){
				CHECKPOINT = check;
			}
			else {
				CHECKPOINT = 1;
			}
			if(cache != null){this.cache = cache;}
			else{NEWGAME = true;}
			if(plats != null){this.plats = plats;}
			else{this.plats = [];}
			this.scoreText = score;
			//console.log("Level 0 Transition: " + this.plats.length);
		},
		preload: function(){
			console.log("Level_0: Preload");
			game.time.advancedTiming = true;
			//create player
			if(NEWGAME){
				this.player = new Player(game, "Blue-04");
				PLAYER = this.player;
				
				this.enemies = game.add.group();
				this.s_enemies = game.add.group();
				this.d_enemies = game.add.group();
				this.shot_enemies = game.add.group();
				this.t_enemies = game.add.group();
				this.r_enemies = game.add.group();
				this.pickups = game.add.group();
				
				//creating single shot enemies
				for(var i = 0; i < 8; i++){
					this.enemy = new Enemy1(game, game.world.width, game.world.centerY, "Dark-Grey-04");
					game.add.existing(this.enemy);
					this.s_enemies.add(this.enemy);
					this.enemy.exists = false;
				}
				
				//creating doubleshot enemies

				for(var i = 0; i < 2; i++){
					this.enemy = new Enemy2(game, game.world.width, game.world.centerY, "OctoMini");

					game.add.existing(this.enemy);
					this.d_enemies.add(this.enemy);
					this.enemy.exists = false;
				}

				//creating shotgun enemies
				for(var i = 0; i < 3; i++){
					this.enemy = new Enemy3(game, game.world.width, game.world.centerY, "TankBase");
					game.add.existing(this.enemy);
					this.shot_enemies.add(this.enemy);
				}

				//creating tri beam enemies

				for(var i = 0; i < 5; i++){
					this.enemy = new Enemy4(game, game.world.width, game.world.centerY, "TriEnemy");

					game.add.existing(this.enemy);
					this.t_enemies.add(this.enemy);

					this.enemy.exists = false;
				}
				
				//creating rail gun enemies

				for(var i = 0; i < 2; i++){
					this.enemy = new Enemy5(game, game.world.width, game.world.centerY, "TurretBase");

					game.add.existing(this.enemy);
					this.r_enemies.add(this.enemy);
				}
				
				//make double shot pickup
				this.Double = new Pickup(game, game.world.width, game.world.centerY, "DoublePickup", 1);
				game.add.existing(this.Double);
				this.pickups.add(this.Double);
				this.Double.exists = false;
				//shotgun
				this.Shotty = new Pickup(game, game.world.width, game.world.centerY, "ShotgunPickup", 2);
				game.add.existing(this.Shotty);
				this.pickups.add(this.Shotty);
				this.Shotty.exists = false;
				//trishot
				this.Tri = new Pickup(game, game.world.width, game.world.centerY, "TriPickup", 3);
				game.add.existing(this.Tri);
				this.pickups.add(this.Tri);
				this.Tri.exists = false;
				//railgun
				this.Rail = new Pickup(game, game.world.width, game.world.centerY, "RailPickup", 4);
				game.add.existing(this.Rail);
				this.pickups.add(this.Rail);
				this.Rail.exists = false;
				//shield
				this.Shield = new Pickup(game, game.world.width, game.world.centerY, "ShieldPickup", 5);
				game.add.existing(this.Shield);
				this.pickups.add(this.Shield);
				this.Shield.exists = false;


				this.cache = [this.s_enemies, this.d_enemies, this.shot_enemies, this.t_enemies, this.r_enemies, this.pickups];

				NEWGAME = false;
			}
			else{

				this.player = PLAYER;
				this.player.respawn(64, game.world.centerY);
				
				this.BGM = BGM;
			}
			
			PICKUPS = this.pickups;
			CACHE = this.cache;
		},
		create: function(){
			game.add.existing(this.player);
			this.scoreText = game.add.bitmapText(64, game.world.height - 64, "myfont", "Score: " + SCORE, 24);
			SCORETEXT = this.scoreText;
			EQ = this.player.equipped;
			//weapon unlocking banner animation
			this.banner = game.add.sprite(0,100,"Atlas", "weaponUnlock0");
			this.banner.animations.add("weaponUnlock", Phaser.Animation.generateFrameNames("weaponUnlock", 0,1,"",1),5,false);
			this.banner.exists = false;
			BANNER = this.banner;
		},
		update: function(){
			this.nextLevel();
		},
		render: function(){
		},
		nextLevel: function(){
			//levels
			console.log("Return to Checkpoint: " + CHECKPOINT);
			switch(CHECKPOINT){
				case 1:
					game.state.start("Level_1", false, false, this.background, this.player, this.enemies, this.cache, this.equipped, this.pickups, this.scoreText);
					break;
				case 2:
					game.state.start("Level_2", false, false, this.background, this.player, this.enemies, this.cache, this.equipped, this.pickups, this.plats, this.scoreText);
					break;
				case 3:
					game.state.start("Level_3", false, false, this.background, this.player, this.enemies, this.cache, this.equipped, this.pickups, this.plats, this.scoreText);
					break;
				case 4:
					game.state.start("Level_4", false, false, this.background, this.player, this.enemies, this.cache, this.equipped, this.pickups, this.plats, this.scoreText);
					break;
				case 5:
					game.state.start("Zza", false, false, this.background, this.player, this.enemies, this.cache, this.equipped, this.pickups, this.plats, this.scoretext);
					break;
			}
			
		}
	}

function Level_1(game) {}
	
	Level_1.prototype = {

		init: function(background, player, enemies, cache, equipped, pickups, score){
            // so the background parallax, and loaded enemies persists between states

			this.background = background;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
			this.pickups = pickups;
			CHECKPOINT = 1;
			this.scoreText = score;
		},
		preload: function(){
			console.log("Level_1: Preload");
		},
		create: function(){
			this.BGM = game.add.audio("MainTrack1");
			this.BGM.play();
			BGM = this.BGM;
			//timer for next level
			game.time.events.add(1000 * 125, this.nextLevel, this);

			game.time.events.loop(Phaser.Timer.SECOND * 8, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 19, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 27, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 34, makeEnemy, this, this.player, 2);
			game.time.events.add(1000 * 36, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 43, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 46, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 50, makeEnemy, this, this.player, 2);
			game.time.events.add(1000 * 52, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 54, makeEnemy, this, this.player, 2);
			game.time.events.add(1000 * 60, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 65, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 67, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 70, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 74, makeEnemy, this, this.player, 2);
			game.time.events.add(1000 * 76, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 78, makeEnemy, this, this.player, 2);
			game.time.events.add(1000 * 82, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 85, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 87, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 90, makeEnemy, this, this.player, 2);
			game.time.events.add(1000 * 92, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 98, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 100, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 102, makeEnemy, this, this.player, 2);
			game.time.events.add(1000 * 105, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 107, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 110, makeEnemy, this, this.player, 1);
			game.time.events.add(1000 * 112, makeEnemy, this, this.player, 2);

			game.time.events.loop(Phaser.Timer.SECOND * 7, spawnShield, this);

		},
		update: function(){
			this.scoreText.setText("Score: " + SCORE);
			//debris background
			if(this.background[2].position.x > 0){
				this.background[2].position.x -= 1;
			}
			else{
				this.background[2].tilePosition.x -= 1;
			}
            //collision handling for pickups
			game.physics.arcade.overlap(this.cache[5], this.player, handlePickup, null, this);
			
			//collision handling for bullets
			for(var i = 0; i < this.cache.length - 1; i++){
				game.physics.arcade.overlap(this.cache[i], this.player.weapon, collisionHandle, null, this);
				this.cache[i].forEachExists(checkCollision, this);
			}
			//move the background
			this.background[0].tilePosition.x -= 0.015;
			this.background[1].position.x -= 0.04;
			
			//debug options
			if(game.input.keyboard.justPressed(Phaser.Keyboard.O)){
				this.nextLevel();
			}
			if(game.input.keyboard.isDown(Phaser.Keyboard.E) && game.input.keyboard.isDown(Phaser.Keyboard.R) && game.input.keyboard.isDown(Phaser.Keyboard.T) && game.input.keyboard.isDown(Phaser.Keyboard.Y)){
				PLAYER.HEALTH = 50;
				console.log("cheater");
			}
            if(this.input.keyboard.justPressed(Phaser.Keyboard.P)){
				this.debug = !this.debug;
            }
        },
        render: function(){
			//handle debug info
			if(this.debug){
				game.debug.body(this.player);
				this.player.weapon.forEachAlive(this.renderGroup, this);

           }
		},
        //debug stuff
		renderGroup: function(member){
			game.debug.body(member);
		},
        //checkpoint system for level transition
		nextLevel: function(){
			CHECKPOINT_SCORE = SCORE;
			this.BGM.stop();
			game.state.start("Level_2", false, false, this.background, this.player, this.enemies, this.cache, this.equipped, null, null, this.scoreText);
		}
	}
	//level 2... START!!!
function Level_2(game) {}
	
	Level_2.prototype = {

		init: function(background, player, enemies, cache, equipped, pickups, plats, score){
            // so the background parallax persists between states

			this.background = background;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;

			CHECKPOINT = 2;
			this.scoreText = score;
		},
		preload: function(){
			console.log("Level_2: Preload");
		},
		create: function(){
			//timer for next level
			game.time.events.add(1000 * 90, this.nextLevel, this);

			this.plats = [];
			PLATS = this.plats;

            this.plats[0]= game.add.tileSprite(0,640,960,110, "Atlas", "space plat");

            game.physics.enable(this.plats[0]);
            this.plats[0].body.immovable = true;
            this.plats[0].body.setSize(960,100,0,14);
            this.plats[0].moveDown();
            this.plats[0].moveDown();
            this.plats[0].moveDown();
            this.plats[0].moveDown();
            this.plats[0].moveDown();
            this.plats[0].moveDown();
            this.plats[0].moveDown();
			game.add.tween(this.plats[0]).to({y: 530}, 2000, "Linear", true, 0, 0, false);

			this.BGM = game.add.audio("MainTrack2");
			this.BGM.play();
			BGM = this.BGM;
			game.time.events.loop(Phaser.Timer.SECOND * 5, makeEnemy, this, this.player, 1);
			game.time.events.loop(Phaser.Timer.SECOND * 9, makeEnemy, this, this.player, 2);
			game.time.events.add(1000 * 20, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 35, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 45, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 55, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 65, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 75, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 85, makeEnemy, this, this.player, 3);

			game.time.events.loop(Phaser.Timer.SECOND * 7, spawnShield, this);


		},
		update: function(){
			this.scoreText.setText("Score: " + SCORE);
            this.plats[0].tilePosition.x -=2;
			
			if(this.background[2].position.x > 0){
				this.background[2].position.x -= 2;
			}
			else{
				this.background[2].tilePosition.x -= 1;
			}

			//collision handling for pickups
			game.physics.arcade.overlap(this.cache[5], this.player, handlePickup, null, this);
			
			//collision handling for platforms
			game.physics.arcade.collide(this.plats, this.player);
			
			//collision handling for bullets
			for(var i = 0; i < this.cache.length - 1; i++){
				game.physics.arcade.overlap(this.cache[i], this.player.weapon, collisionHandle, null, this);
				this.cache[i].forEachExists(checkCollision, this);
			}
			
			//move the background
			this.background[0].tilePosition.x -= 0.015;
			this.background[1].position.x -= 0.04;
		
			//debug options
			if(game.input.keyboard.justPressed(Phaser.Keyboard.O)){
				this.nextLevel();
			}
			if(this.input.keyboard.justPressed(Phaser.Keyboard.P)) {
				this.debug = !this.debug;
			}
        },
        render: function(){
			//handle debug info
			if(this.debug){
				game.debug.body(this.player);
				this.enemies.forEachAlive(this.renderGroup, this);
				this.player.weapon.forEachAlive(this.renderGroup, this);
			}
        },
		renderGroup: function(member){
			game.debug.body(member);
		},
		nextLevel: function(){
			
			CHECKPOINT_SCORE = SCORE;
			this.BGM.stop();
			game.state.start("Level_3", false, false, this.background, this.player, this.enemies, this.cache, this.equipped, null, this.plats, this.scoreText);

			game.time.events.removeAll();
		}
		
	}

function Level_3(game) {}
	
	Level_3.prototype = {


		init: function(background, player, enemies, cache, equipped, pickups, plats, score){
            this.background = background;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
			this.pickups = pickups;
            this.plats = plats;

			CHECKPOINT = 3;
			this.scoreText = score;

		},
		preload: function(){
			console.log("Level_3: Preload");
		},
		create: function(){
			//timer for next level
			game.time.events.add(1000 * 120, this.nextLevel, this);

			//console.log("Plats length: " + this.plats.length);
			if(this.plats.length <= 0){
				this.plats[0]= game.add.tileSprite(0,640,960,110, "Atlas", "space plat");

				game.physics.enable(this.plats[0]);
				this.plats[0].body.immovable = true;
				this.plats[0].body.setSize(960,100,0,14);
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				game.add.tween(this.plats[0]).to({y: 530}, 2000, "Linear", true, 0, 0, false);
			}

			this.plats[1]= game.add.tileSprite(0, -110, 960, 110, "Atlas", "space plat top");
            game.physics.enable(this.plats[1]);
            this.plats[1].body.immovable = true;
            this.plats[1].body.setSize(960,100,0,14);
            this.plats[1].moveDown();
            this.plats[1].moveDown();
            this.plats[1].moveDown();
            this.plats[1].moveDown();
            this.plats[1].moveDown();
            this.plats[1].moveDown();
            this.plats[1].moveDown();
			game.add.tween(this.plats[1]).to({y: 0}, 2000, "Linear", true, 0, 0, false);

			this.BGM = game.add.audio("MainTrack3");
			this.BGM.play();
			BGM = this.BGM;

			PLATS = this.plats;
			//console.log(this.plats);

			game.time.events.loop(Phaser.Timer.SECOND * 4, makeEnemy, this, this.player, 1);
			game.time.events.loop(Phaser.Timer.SECOND * 8, makeEnemy, this, this.player, 2);
			game.time.events.loop(Phaser.Timer.SECOND * 12, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 15, makeEnemy, this, this.player, 6);
			game.time.events.add(1000 * 25, makeEnemy, this, this.player, 4);
			game.time.events.add(1000 * 30, makeEnemy, this, this.player, 6);
			game.time.events.add(1000 * 45, makeEnemy, this, this.player, 6);
			game.time.events.add(1000 * 55, makeEnemy, this, this.player, 4);
			game.time.events.add(1000 * 60, makeEnemy, this, this.player, 6);
			game.time.events.add(1000 * 75, makeEnemy, this, this.player, 6);
			game.time.events.add(1000 * 85, makeEnemy, this, this.player, 4);
			game.time.events.add(1000 * 90, makeEnemy, this, this.player, 6);
			game.time.events.add(1000 * 100, makeEnemy, this, this.player, 4);
			game.time.events.add(1000 * 105, makeEnemy, this, this.player, 6);


			game.time.events.loop(Phaser.Timer.SECOND * 7, spawnShield, this);

		},
		update: function(){
			this.scoreText.setText("Score: " + SCORE);
			this.plats[0].tilePosition.x -= 2;
			this.plats[1].tilePosition.x -= 2;
			
			if(this.background[2].position.x > 0){
				this.background[2].position.x -= 1.5;
			}
			else{
				this.background[2].tilePosition.x -= 1.5;
			}

            //collision handling for pickups
			game.physics.arcade.overlap(this.cache[5], this.player, handlePickup, null, this);
			
			//collision handling for platforms
			game.physics.arcade.collide(this.plats, this.player);
			
			//collision handling for bullets
			for(var i = 0; i < this.cache.length - 1; i++){
				game.physics.arcade.overlap(this.cache[i], this.player.weapon, collisionHandle, null, this);
				this.cache[i].forEachExists(checkCollision, this);
			}
			
			//move the background
			this.background[0].tilePosition.x -= 0.015;
			this.background[1].position.x -= 0.04;
		
			//debug options
			if(game.input.keyboard.justPressed(Phaser.Keyboard.O)){
				this.nextLevel();
			}
			if(this.input.keyboard.justPressed(Phaser.Keyboard.P)) {
				this.debug = !this.debug;
			}
        },
        render: function(){
			//handle debug info
			if(this.debug){
				game.debug.body(this.player);
				this.enemies.forEachAlive(this.renderGroup, this);
				this.player.weapon.forEachAlive(this.renderGroup, this);
			}
		},
		renderGroup: function(member){
			game.debug.body(member);
		},
		nextLevel: function(){
			CHECKPOINT_SCORE = SCORE;
			this.BGM.stop();
			game.state.start("Level_4", false, false, this.background, this.player, this.enemies, this.cache, this.equipped, this.pickups, this.plats, this.scoreText);
		}
	}
	
function Level_4(game) {}
	
	Level_4.prototype = {

		init: function(background, player, enemies, cache, equipped, pickups, plats, score){
            this.background = background;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
            this.plats = plats;
			CHECKPOINT = 4;
            this.plats = plats
			this.scoreText = score;
		},
		preload: function(){
			console.log("Level_4: Preload");
		},
		create: function(){
			this.BGM = game.add.audio("MainTrack4");
			this.BGM.play();
			BGM = this.BGM;
			//timer for next level
			game.time.events.add(1000 * 83, this.nextLevel, this);
			
			//console.log("Start of Level 4: " + this.plats[1]);
            if(this.plats[1] != null){game.add.tween(this.plats[1]).to({y: -110}, 2000, "Linear", true, 0, 0, false);}
			
			if(this.plats.length <= 0){
				this.plats[0]= game.add.tileSprite(0,640,960,110, "Atlas", "space plat");

				game.physics.enable(this.plats[0]);
				this.plats[0].body.immovable = true;
				this.plats[0].body.setSize(960,100,0,14);
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				this.plats[0].moveDown();
				game.add.tween(this.plats[0]).to({y: 530}, 2000, "Linear", true, 0, 0, false);
			}
			
            game.time.events.loop(Phaser.Timer.SECOND * 4, makeEnemy, this, this.player, 1);
			game.time.events.loop(Phaser.Timer.SECOND * 10, makeEnemy, this, this.player, 2);
			game.time.events.add(1000 * 14, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 18, makeEnemy, this, this.player, 5);
			game.time.events.add(1000 * 23, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 25, makeEnemy, this, this.player, 4);
			game.time.events.add(1000 * 33, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 37, makeEnemy, this, this.player, 5);
			game.time.events.add(1000 * 42, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 45, makeEnemy, this, this.player, 4);
			game.time.events.add(1000 * 47, makeEnemy, this, this.player, 5);
			game.time.events.add(1000 * 51, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 58, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 62, makeEnemy, this, this.player, 5);
			game.time.events.add(1000 * 65, makeEnemy, this, this.player, 4);
			game.time.events.add(1000 * 69, makeEnemy, this, this.player, 3);
			game.time.events.add(1000 * 74, makeEnemy, this, this.player, 5);

			game.time.events.loop(Phaser.Timer.SECOND * 7, spawnShield, this);
			
			PLATS = this.plats;
		},
		update: function(){
			this.scoreText.setText("Score: " + SCORE);
			this.plats[0].tilePosition.x -=2;
			if(this.plats[1] != null){this.plats[1].tilePosition.x -=3;}
			
			if(this.background[2].position.x > 0){
				this.background[2].position.x -= 1.5;
			}
			else{
				this.background[2].tilePosition.x -= 1.5;
			}

            //collision handling for pickups
			game.physics.arcade.overlap(this.cache[5], this.player, handlePickup, null, this);
			
			//collision handling for platforms
			game.physics.arcade.collide(this.plats, this.player);
			
			//collision handling for bullets
			for(var i = 0; i < this.cache.length - 1; i++){
				game.physics.arcade.overlap(this.cache[i], this.player.weapon, collisionHandle, null, this);
				this.cache[i].forEachExists(checkCollision, this);
			}
				
			//move the background
			this.background[0].tilePosition.x -= 0.015;
			this.background[1].position.x -= 0.04;

			//debug options
			if(game.input.keyboard.justPressed(Phaser.Keyboard.O)){
				this.nextLevel();
			}
			if(this.input.keyboard.justPressed(Phaser.Keyboard.P)) {
				this.debug = !this.debug;
			}
        },
        render: function(){
           //handle debug info
			if(this.debug){
				game.debug.body(this.player);
				game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
				this.player.weapon.forEachAlive(this.renderGroup, this);
			}
        },
		renderGroup: function(member){
			game.debug.body(member);
		},
		nextLevel: function(){
			CHECKPOINT_SCORE = SCORE;
			game.time.events.add(3000, BGM.stop, BGM);
			BGM = game.add.audio("zzaStinger");
			game.time.events.add(3000, BGM.play, BGM);
			game.add.tween(this.background[2].position).to({x: -1990}, 4000, "Linear", true, 0, 0, false);
			game.add.tween(this.plats[0]).to({y: 1000}, 4000, "Linear", true, 0, 0, false);
			game.time.events.add(4000, this.startZza, this);
		},
		startZza: function(){
			game.state.start("Zza", false, false, this.background, this.player, this.enemies, this.cache, this.equipped, this.pickups, this.plats, this.scoreText);
		}
	}
	
