"use strict";
// where the magic happens
var CHECKPOINT;

var BACKGROUND;
var BGM;
var EQ;

var PLAYER;
var SCORE = 0;
var NEWGAME = true;

function sendToGameOver(cache){
	PLAYER.shipTrail.kill();
	PLAYER.kill();
	EQ.kill();
	BGM.stop();
	game.state.start("GameOver", false, false, BACKGROUND, CHECKPOINT, cache);
}

function sendToZza(){
	BGM.stop();
	game.state.start("Zza", false, false, PLAYER, EQ, BACKGROUND);
}

function makeEnemy(player, key){
	switch(key){
	//basic p-shot enemy
	case 1:
			try{
				this.enemy = this.cache[0].getFirstExists(false);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.reset(game.world.width, game.world.centerY + (100 * game.rnd.integerInRange(-2,2)));
			}
			catch{console.log("Spawn Case 1 Failed");return;}
			break;
	//double shot rambopus
	case 2:
			try{
				this.enemy = this.cache[1].getFirstExists(false);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.reset(game.world.width - 50 * game.rnd.integerInRange(1, 4), -100);
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
				this.enemy.respawn(game.world.width - 50 * game.rnd.integerInRange(1, 4), game.world.height-120);
			}
			catch{console.log("Spawn Case 3 Failed");return;}
			break;
	//tribeam ship
	case 4:
			try{
				this.enemy = this.cache[3].getFirstExists(false);
				this.enemy.outOfCameraBoundsKill = false;
				this.enemy.HEALTH = this.enemy.DEFAULT;
				this.enemy.reset(game.world.width, game.world.centerY + (100 * game.rnd.integerInRange(-2,2)));
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
				this.enemy.respawn(game.world.width - 50 * game.rnd.integerInRange(1, 4), game.world.height-120);
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
				this.enemy.respawn(game.world.width - 50 * game.rnd.integerInRange(1, 4), 120);
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
				this.enemy.respawn(game.world.width - 50 * game.rnd.integerInRange(1, 4), 120);
			}
			catch{console.log("Spawn Case 7 Failed");return;}
			break;
	}

}

function collisionHandle(target, weapon){
	if(target.SHIELD){
	   target.SHIELD = false;
	   if(!weapon.PENETRATE){weapon.kill();}
	   return;
	}		
    game.add.tween(target).to({tint: 0xfefefe}, 50, null, true, 0, false, false);
    game.add.tween(target).to({tint: 0xffffff}, 50, null, true, 70, false, false);
	target.HEALTH -= weapon.DAMAGE;
	if(!weapon.PENETRATE){weapon.kill();}			
}

function checkCollision(enemy){
	this.enemy = enemy;
	game.physics.arcade.overlap(this.enemy.weapon, this.player, collisionHandle, null, this);
}

function startTimer(key, interval){
	console.log("Start Timer: Interval " +interval +": Key " +key);
	game.time.events.loop(Phaser.Timer.SECOND * interval, makeEnemy, this, this.player, key);
}
//handle pickups
function handlePickup(player, pickup){
	console.log(pickup);
	switch(pickup.UNLOCK){
		case 1:
			//DOUBLE
			//UPGRADE!!!
			player.weapons[0] = new DoubleShot(game, PLAYER.position.x, PLAYER.position.y, 1, "P-shot", 32);
			player.weapons[0].UNLOCK = true;
			break;
		case 2:
			//SHOTGUN
			player.weapons[1].UNLOCK = true;
			break;
		case 3:
			//TRIBEAM
			player.weapons[2].UNLOCK = true;
			break;
		case 4:
			//RAIL
			player.weapons[4].UNLOCK = true;
			break;
		case 5:
			//SHIELD
			player.SHIELD = true;
			break;
	}
	
    pickup.kill();

}

function spawnPickup(pickups, key){
	pickups.getFirst("UNLOCK", key).revive();
	pickups.getFirst("UNLOCK", key).reset(game.world.width, game.world.centerY + 200 * game.rnd.integerInRange(-1, 1));
}
//handle loading the game objects in a boot-like level

function Level_0(game) {}

	Level_0.prototype = {
		init: function(background, check, cache){
			//console.log(check);

			this.background = background;
			BACKGROUND = background;
			if(check != null){
				CHECKPOINT = check;
			}
			else {
				CHECKPOINT = 1;
			}
			if(cache != null){this.cache = cache;}
			else{NEWGAME = true;}
		},
		preload: function(){
			console.log("Level_0: Preload");
			game.time.advancedTiming = true;
			
			if(NEWGAME){
				this.player = new Player(game, "player_side");
				PLAYER = this.player;
				
				this.BGM = game.add.audio("MainTrack");

				BGM = this.BGM;

				this.BGM.loop = true;
				
				this.enemies = game.add.group();
				this.s_enemies = game.add.group();
				this.d_enemies = game.add.group();
				this.shot_enemies = game.add.group();
				this.t_enemies = game.add.group();
				this.r_enemies = game.add.group();
				this.pickups = game.add.group();
				
				//creating single shot enemies
				console.log("Spooling up single shot enemies");
				for(var i = 0; i < 8; i++){
					this.enemy = new Enemy1(game, game.world.width, game.world.centerY, "enemy1");
					game.add.existing(this.enemy);
					this.s_enemies.add(this.enemy);
					this.enemy.exists = false;
				}
				
				//creating doubleshot enemies
				console.log("Spooling up double shot enemies");
				for(var i = 0; i < 2; i++){
					this.enemy = new Enemy2(game, game.world.width, game.world.centerY, "enemy2");
					game.add.existing(this.enemy);
					this.d_enemies.add(this.enemy);
					this.enemy.exists = false;
				}

				//creating shotgun enemies
				console.log("Spooling up shotgun enemies");
				for(var i = 0; i < 3; i++){
					this.enemy = new Enemy3(game, game.world.width, game.world.centerY, "enemy3");
					game.add.existing(this.enemy);
					this.shot_enemies.add(this.enemy);
				}

				//creating tri beam enemies
				console.log("Spooling up tribeam enemies");
				for(var i = 0; i < 5; i++){
					this.enemy = new Enemy4(game, game.world.width, game.world.centerY, "enemy4");
					game.add.existing(this.enemy);
					this.t_enemies.add(this.enemy);

					this.enemy.exists = false;
				}
				
				//creating rail gun enemies
				console.log("Spooling up rail gun enemies");
				for(var i = 0; i < 1; i++){
					this.enemy = new Enemy5(game, game.world.width, game.world.centerY, "enemy5");
					game.add.existing(this.enemy);
					this.r_enemies.add(this.enemy);
				}
				
				//make double shot pickup
				this.Double = new Pickup(game, game.world.width, game.world.centerY, "pickup01", 1);
				game.add.existing(this.Double);
				this.pickups.add(this.Double);
				this.Double.exists = false;
				//shotgun
				this.Shotty = new Pickup(game, game.world.width, game.world.centerY, "pickup02", 2);
				game.add.existing(this.Shotty);
				this.pickups.add(this.Shotty);
				this.Shotty.exists = false;
				//trishot
				this.Tri = new Pickup(game, game.world.width, game.world.centerY, "pickup03", 3);
				game.add.existing(this.Tri);
				this.pickups.add(this.Tri);
				this.Tri.exists = false;
				//railgun
				this.Rail = new Pickup(game, game.world.width, game.world.centerY, "pickup04", 4);
				game.add.existing(this.Rail);
				this.pickups.add(this.Rail);
				this.Rail.exists = false;
				//shield
				this.Shield = new Pickup(game, game.world.width, game.world.centerY, "pickup05", 5);
				game.add.existing(this.Shield);
				this.pickups.add(this.Shield);
				this.Shield.exists = false;


				this.cache = [this.s_enemies, this.d_enemies, this.shot_enemies, this.t_enemies, this.r_enemies, this.pickups];

				NEWGAME = false;
			}
			else{
				this.player = PLAYER.reset(64, game.world.centerY);
				this.player.revive();
				
				this.BGM = BGM;
			}
		},
		create: function(){
			game.add.existing(this.player);
			
			this.equipped = game.add.bitmapText(game.world.width - 256, game.world.height - 64, "myfont", "Weapon: " + this.player.weapon.NAME, 24);

			EQ = this.equipped;

			this.BGM.play();
		},
		update: function(){
			this.nextLevel();
		},
		render: function(){
		},
		nextLevel: function(){
			
			switch(CHECKPOINT){
				case 1:
					game.state.start("Level_1", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped, this.pickups);
					break;
				case 2:
					game.state.start("Level_2", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped, this.pickups);
					break;
				case 3:
					game.state.start("Level_3", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped, this.pickups);
					break;
				case 4:
					game.state.start("Level_4", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped, this.pickups);
					break;
			}
			
		}
	}

function Level_1(game) {}
	
	Level_1.prototype = {
		init: function(background, BGM, player, enemies, cache, equipped, pickups){
            // so the background parallax, bgm, and loaded enemies persists between states
			this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
			this.pickups = pickups;
		},
		preload: function(){
			console.log("Level_1: Preload");
		},
		create: function(){
			game.time.events.loop(Phaser.Timer.SECOND * 5, makeEnemy, this, this.player, 1);
			game.time.events.loop(Phaser.Timer.SECOND * 10, makeEnemy, this, this.player, 2);
			game.time.events.loop(Phaser.Timer.SECOND * 15, makeEnemy, this, this.player, 3);
			game.time.events.loop(Phaser.Timer.SECOND * 15, makeEnemy, this, this.player, 6);
			game.time.events.loop(Phaser.Timer.SECOND * 15, makeEnemy, this, this.player, 4);
			game.time.events.loop(Phaser.Timer.SECOND * 20, makeEnemy, this, this.player, 5);
			game.time.events.loop(Phaser.Timer.SECOND * 22, makeEnemy, this, this.player, 7);
		},
		update: function(){

            //collision handling for pickups
			game.physics.arcade.overlap(this.cache[5], this.player, handlePickup, null, this);
			//collision handling for bullets
			for(var i = 0; i < this.cache.length - 1; i++){
				game.physics.arcade.overlap(this.cache[i], this.player.weapon, collisionHandle, null, this);
				this.cache[i].forEachExists(checkCollision, this);
			}
			//move the background
			this.background[0].tilePosition.x -= 0.015;
			this.background[1].position.x -= 0.03;
			
			//UI w00t!
			this.equipped.setText("Weapon: " + this.player.weapon.NAME);
			//debug options
			if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
				this.nextLevel();
			}
			if(game.input.keyboard.justPressed(Phaser.Keyboard.Q)){
				spawnPickup(this.pickups, 3);
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
			CHECKPOINT++;
			game.state.start("Level_2", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped);
		},
        //janky UI
		displayText: function(string){
			game.add.text(0,0,string, {fill: "#facade"});
		}
	}
	//level 2... START!!!
function Level_2(game) {}
	
	Level_2.prototype = {
		init: function(background, BGM, player, enemies, cache, equipped){
            // so the background parallax persists between states
			this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
		},
		preload: function(){
			console.log("Level_2: Preload");
		},
		create: function(){
			this.plats = [];
            this.plats[0]= game.add.tileSprite(0,640,960,110,"Plats");
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
		},
		update: function(){
            this.plats[0].tilePosition.x -=2;
            //collision handling
				game.physics.arcade.overlap(this.cache, this.player.weapon, collisionHandle, null, this);
				game.physics.arcade.collide(this.player, this.plats);1
				for(var i = 0; i < this.cache.length; i++){
					this.cache[i].forEachExists(checkCollision, this);
				}
				
				//move the background
				this.background[0].tilePosition.x -= 0.015;
				this.background[1].position.x -= 0.03;
			
				//UI w00t!
				this.equipped.setText("Weapon: " + this.player.weapon.NAME);
				//debug options
				if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
					this.nextLevel();
				}
				if(game.input.keyboard.justPressed(Phaser.Keyboard.Q)){
					this.player.kill();
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
			CHECKPOINT++;
			game.state.start("Level_3", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped, this.plats);
			game.time.events.removeAll();
		}
		
	}

function Level_3(game) {}
	
	Level_3.prototype = {
		init: function(background, BGM, player, enemies, cache, equipped, plats){
            this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
            this.plats = plats;
		},
		preload: function(){
			console.log("Level_3: Preload");
		},
		create: function(){
			this.plats[1]= game.add.tileSprite(0, -110, 960, 110, "TopPlats");
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
		},
		update: function(){
			this.plats[0].tilePosition.x -= 2.5;
			this.plats[1].tilePosition.x -= 2.5;
            //collision handling
			game.physics.arcade.overlap(this.cache, this.player.weapon, collisionHandle, null, this);
			game.physics.arcade.collide(this.player, this.plats);
			for(var i = 0; i < this.cache.length; i++){
				this.cache[i].forEachExists(checkCollision, this);
			}
			
			//move the background
			this.background[0].tilePosition.x -= 0.015;
			this.background[1].position.x -= 0.03;
		
			//UI w00t!
			this.equipped.setText("Weapon: " + this.player.weapon.NAME);
			//debug options
			if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
				this.nextLevel();
			}
			if(game.input.keyboard.justPressed(Phaser.Keyboard.Q)){
				this.player.kill();
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
			CHECKPOINT++;
			game.state.start("Level_4", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped, this.plats);
		}
	}
	
function Level_4(game) {}
	
	Level_4.prototype = {
		init: function(background, BGM, player, enemies, cache, equipped, plats){
            this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
            this.plats = plats
		},
		preload: function(){
			console.log("Level_4: Preload");
		},
		create: function(){
            game.add.tween(this.plats[1]).to({y: -110}, 2000, "Linear", true, 0, 0, false);

		},
		update: function(){

			this.plats[0].tilePosition.x -=3;
			this.plats[1].tilePosition.x -=3;

            //collision handling
			game.physics.arcade.overlap(this.cache, this.player.weapon, collisionHandle, null, this);
			game.physics.arcade.collide(this.player, this.plats);
				for(var i = 0; i < this.cache.length; i++){
					this.cache[i].forEachExists(checkCollision, this);
				}
				
				//move the background
				this.background[0].tilePosition.x -= 0.015;
				this.background[1].position.x -= 0.03;
			
				//UI w00t!
				this.equipped.setText("Weapon: " + this.player.weapon.NAME);
				//debug options
				if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
                    game.add.tween(this.plats[0]).to({y: 840}, 3000, "Linear", true, 0, 0, false);
                   	game.time.events.add(Phaser.Timer.SECOND * 3, sendToZza, this, this.player);
				}
				if(game.input.keyboard.justPressed(Phaser.Keyboard.Q)){
					this.player.kill();
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
		}
	}
	
