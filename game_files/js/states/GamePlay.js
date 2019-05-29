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

//handle loading the game objects in a boot-like level

function Level_0(game) {}

	Level_0.prototype = {
		init: function(background, check, cache){
			console.log(check);
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
				
				this.cache = [this.s_enemies, this.d_enemies, this.shot_enemies, this.t_enemies, this.r_enemies];
				
				NEWGAME = false;
			}
			else{
				this.player = PLAYER.reset(64, game.world.centerY);
				this.player.revive();
				
				this.BGM = BGM;
				
				console.log(this.cache.length);
				console.log(this.cache[0].children.length);
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
					game.state.start("Level_1", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped);
					break;
				case 2:
					game.state.start("Level_2", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped);
					break;
				case 3:
					game.state.start("Level_3", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped);
					break;
				case 4:
					game.state.start("Level_4", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped);
					break;
			}
			
		}
	}

function Level_1(game) {}
	
	Level_1.prototype = {
		init: function(background, BGM, player, enemies, cache, equipped){
            // so the background parallax, bgm, and loaded enemies persists between states
			this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
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
            //collision handling
			game.physics.arcade.overlap(this.cache, this.player.weapon, collisionHandle, null, this);
			
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
            if(this.input.keyboard.justPressed(Phaser.Keyboard.P)){
				this.debug = !this.debug;
            }
            if(this.input.keyboard.justPressed(Phaser.Keyboard.H)){
				//this.pickup = new Pickup(game, 900, game.rnd.integerInRange(60,600), "pickup05", 5);
                //game.add.existing(this.pickup);
                this.player.SHIELD = true;
            }
        },
        render: function(){
			//handle debug info
			if(this.debug){
				game.debug.body(this.player);
				this.player.weapon.forEachAlive(this.renderGroup, this);
			}
		},
		renderGroup: function(member){
			game.debug.body(member);
		},
		nextLevel: function(){
			console.log(game.time.events);
			CHECKPOINT++;
			game.state.start("Level_2", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped);
			game.time.events.removeAll();
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
			
		},
		update: function(){
            //collision handling
				game.physics.arcade.overlap(this.cache, this.player.weapon, collisionHandle, null, this);
				
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
			game.state.start("Level_3", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped);
			game.time.events.removeAll();
		}
		
	}

function Level_3(game) {}
	
	Level_3.prototype = {
		init: function(background, BGM, player, enemies, cache, equipped){
            this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
		},
		preload: function(){
			console.log("Level_3: Preload");
		},
		create: function(){
			
		},
		update: function(){
            //collision handling
			game.physics.arcade.overlap(this.cache, this.player.weapon, collisionHandle, null, this);
			
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
			game.state.start("Level_4", false, false, this.background, this.BGM, this.player, this.enemies, this.cache, this.equipped);
		}
	}
	
function Level_4(game) {}
	
	Level_4.prototype = {
		init: function(background, BGM, player, enemies, cache, equipped){
            this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.cache = cache;
			this.equipped = equipped;
		},
		preload: function(){
			console.log("Level_4: Preload");
		},
		create: function(){
		},
		update: function(){
            //collision handling
			game.physics.arcade.overlap(this.cache, this.player.weapon, collisionHandle, null, this);
				
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
					sendToGameOver(this.cache);
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
	
