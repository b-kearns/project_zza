"use strict";
// where the magic happens
var CHECKPOINT;

var BACKGROUND;
var BGM;
var EQ;

var PLAYER;
var SCORE = 0;

function sendToGameOver(){
	EQ.kill();
	BGM.stop();
	
	game.state.start("GameOver", false, false, BACKGROUND, CHECKPOINT);
}

//handle loading the game objects in a boot-like level

function Level_0(game) {}

	Level_0.prototype = {
		init: function(background, check){
			console.log(check);
			this.background = background;
			BACKGROUND = background;
			if(check != null){
				CHECKPOINT = check;
			}
			else {
				CHECKPOINT = 1;
			}
		},
		preload: function(){
			console.log("Level_0: Preload");
			
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
			
			for(var i = 0; i < 8; i++){
				this.enemy = new Enemy1(game, game.world.width, game.world.centerY, "enemy1");
				game.add.existing(this.enemy);
				this.s_enemies.add(this.enemy);
				this.enemy.exists = false;
			}
			
			for(var i = 0; i < 3; i++){
				this.enemy = new Enemy2(game, game.world.width, game.world.centerY, "enemy2");
				game.add.existing(this.enemy);
				this.d_enemies.add(this.enemy);
				this.enemy.exists = false;
			}

			
			for(var i = 0; i < 3; i++){
				this.enemy = new Enemy3(game, game.world.width, game.world.centerY, "enemy3");
				game.add.existing(this.enemy);
				this.shot_enemies.add(this.enemy);
			}

			for(var i = 0; i < 5; i++){
				this.enemy = new Enemy4(game, game.world.width, game.world.centerY, "enemy4");
				game.add.existing(this.enemy);
				this.r_enemies.add(this.enemy);

				this.enemy.exists = false;
			}
				
			this.cache = [this.s_enemies, this.d_enemies, this.shot_enemies, this.t_enemies, this.r_enemies];
		},
		create: function(){
			
			console.log("BG Exists? " + (this.background != null));
			
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
			console.log("Level_1: " + CHECKPOINT);
		},
		create: function(){

			//game.time.events.add(Phaser.Timer.SECOND * 20, this.startTimer, this, 1, 3);
			//game.time.events.add(Phaser.Timer.SECOND * 30, this.startTimer, this, 2, 20);
			game.time.events.loop(Phaser.Timer.SECOND * 30, this.makeEnemy, this, 2);
			game.time.events.loop(Phaser.Timer.SECOND * 4, this.makeEnemy, this, this.player, 1);
			game.time.events.add(Phaser.Timer.SECOND * 120, this.nextLevel, this);
			

           //set the enemies to come in
			
			game.time.events.add(Phaser.Timer.SECOND * 30, this.startTimer, this, 2, 20);
			game.time.events.add(Phaser.Timer.SECOND * 100, this.startTimer, this, 4, 3);

			game.time.events.add(Phaser.Timer.SECOND * 15, this.makeEnemy, this, this.player, 1);
			
			

		},
		update: function(){
            //collision handling
			game.physics.arcade.overlap(this.cache, this.player.weapon, this.collisionHandle, null, this);
			
			for(var i = 0; i < this.cache.length; i++){
				this.cache[i].forEachExists(this.checkCollision, this);
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
				//game.debug.body(this.makeEnemy);
				
				this.player.weapon.forEachAlive(this.renderGroup, this);
           }
		},
        //collision handling
		collisionHandle: function(target, weapon){
			target.HEALTH -= weapon.DAMAGE;
			if(!weapon.PENETRATE){weapon.kill();}			
		},
		checkCollision: function(enemy){
			this.enemy = enemy;
			//console.log(this.weapon.PENETRATE);
			game.physics.arcade.overlap(this.enemy.weapon, this.player, this.collisionHandle, null, this);
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
		startTimer: function(key, interval){
			game.time.events.loop(Phaser.Timer.SECOND * interval, this.makeEnemy, this, this.player, key);
		},
		makeEnemy: function(player, key){
			switch(key){
            case 1:
					try{
						this.enemy = this.cache[0].getFirstExists(false);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.reset(game.world.width, game.world.centerY + (100 * game.rnd.integerInRange(-2,2)));
					}
					catch{console.log("Spawn Case 1 Failed");return;}
					break;
            case 2:
					try{
						this.enemy = this.cache[1].getFirstExists(false);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.reset(game.world.width - 50 * game.rnd.integerInRange(1, 4), -100);
					}
					catch{console.log("Spawn Case 2 Failed");return;}
					break;
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
            case 4:
            		try{
            			this.enemy = this.cache[4].getFirstExists(false);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.reset(game.world.width, game.world.centerY + (100 * game.rnd.integerInRange(-2,2)));
					}
					catch{console.log("Spawn Case 4 Failed");return;}
					break;
            case 5:
					break;

			case 6:
			//Upside down shotgun turret
					try{
						this.enemy = this.cache[2].getFirstExists(false);
						this.enemy.scale.setTo(-1.0, -1.0);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.respawn(game.world.width - 50 * game.rnd.integerInRange(1, 4), 120);
					}
					catch{console.log("Spawn Case 3 Failed");return;}
					break;
			case 7:
			//Upside down rail turret
					break;
			}

		},
        //collision handling
		collisionHandle: function(target, weapon){

            if(target.SHIELD){
               target.SHIELD = false;
               weapon.kill();
               return;
            }
			target.HEALTH -= this.player.weapon.DAMAGE;
			if(!this.player.weapon.PENETRATE){weapon.kill();}

			target.HEALTH -= weapon.DAMAGE;
			if(!weapon.PENETRATE){weapon.kill();}			

			target.HEALTH -= weapon.DAMAGE;
			if(!weapon.PENETRATE){weapon.kill();}			

		},
        //also collision handling
		checkCollision: function(enemy){
			this.enemy = enemy;
			//console.log(this.weapon.PENETRATE);
			game.physics.arcade.overlap(this.enemy.weapon, this.player, this.collisionHandle, null, this);
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
        // enemy timer
		startTimer: function(key, interval){
			game.time.events.loop(Phaser.Timer.SECOND * interval, this.makeEnemy, this, this.player, key);

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
			
			console.log(game.time.events);
		},
		preload: function(){
			console.log("Level_2: Preload");
			console.log("Level_2: " + CHECKPOINT);
		},
		create: function(){
			
			game.time.events.loop(Phaser.Timer.SECOND * 10, this.makeEnemy, this, this.player, 3);
			game.time.events.add(Phaser.Timer.SECOND * 120, this.nextLevel, this);
			game.time.events.loop(Phaser.Timer.SECOND * 5, this.makeEnemy, this, this.player, 1);
			game.time.events.loop(Phaser.Timer.SECOND * 15, this.makeEnemy, this, this.player, 2);
			//game.time.events.add(Phaser.Timer.SECOND * 20, this.startTimer, this, 1, 3);
			//game.time.events.add(Phaser.Timer.SECOND * 30, this.startTimer, this, 2, 20);
		},
		update: function(){
            //collision handling
				game.physics.arcade.overlap(this.cache, this.player.weapon, this.collisionHandle, null, this);
				
				for(var i = 0; i < this.cache.length; i++){
					this.cache[i].forEachExists(this.checkCollision, this);
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
              //game.debug.body(this.makeEnemy);
              this.enemies.forEachAlive(this.renderGroup, this);
              this.player.weapon.forEachAlive(this.renderGroup, this);
           }
        },
		//collision handling
		collisionHandle: function(target, weapon){
			target.HEALTH -= weapon.DAMAGE;
			if(!weapon.PENETRATE){weapon.kill();}			
		},
		checkCollision: function(enemy){
			this.enemy = enemy;
			//console.log(this.weapon.PENETRATE);
			game.physics.arcade.overlap(this.enemy.weapon, this.player, this.collisionHandle, null, this);
		},
		renderGroup: function(member){
			game.debug.body(member);
		},
		nextLevel: function(){
			CHECKPOINT++;
			game.state.start("Level_3", false, false, this.background, this.BGM, this.player, this.enemies, this.equipped);
			game.time.events.removeAll();
		},
		makeEnemy: function(player, key){
			switch(key){
            case 1:
					try{
						this.enemy = this.cache[0].getFirstExists(false);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.reset(game.world.width, game.world.centerY + (100 * game.rnd.integerInRange(-2,2)));
					}
					catch{console.log("Spawn Case 1 Failed");return;}
					break;
            case 2:
					try{
						this.enemy = this.cache[1].getFirstExists(false);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.reset(game.world.width - 50 * game.rnd.integerInRange(1, 4), -100);
					}
					catch{console.log("Spawn Case 2 Failed");return;}
					break;
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
            case 4:
					break;
            case 5:
					break;
			case 6:
			//Upside down shotgun turret
					try{
						this.enemy = this.cache[2].getFirstExists(false);
						this.enemy.scale.setTo(-1.0, -1.0);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.respawn(game.world.width - 50 * game.rnd.integerInRange(1, 4), 120);
					}
					catch{console.log("Spawn Case 6 Failed");return;}
					break;
			case 7:
			//Upside down rail turret
					break;
			}
		}
	}

function Level_3(game) {}
	
	Level_3.prototype = {
		init: function(background, BGM, player, enemies, equipped){
            this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.equipped = equipped;
		},
		preload: function(){
			console.log("Level_3: Preload");
		},
		create: function(){
			game.time.events.loop(Phaser.Timer.SECOND * 10, this.makeEnemy, this, this.player, 3);
			game.time.events.loop(Phaser.Timer.SECOND * 10, this.makeEnemy, this, this.player, 6);
			game.time.events.add(Phaser.Timer.SECOND * 120, this.nextLevel, this);
			game.time.events.add(Phaser.Timer.SECOND * 20, this.startTimer, this, 1, 3);
			game.time.events.add(Phaser.Timer.SECOND * 30, this.startTimer, this, 2, 20);
		},
		update: function(){
            //collision handling
			game.physics.arcade.overlap(this.cache, this.player.weapon, this.collisionHandle, null, this);
				
				for(var i = 0; i < this.cache.length; i++){
					this.cache[i].forEachExists(this.checkCollision, this);
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
              //game.debug.body(this.makeEnemy);
              this.enemies.forEachAlive(this.renderGroup, this);
              this.player.weapon.forEachAlive(this.renderGroup, this);
           }
        },
		makeEnemy: function(player, key){
			switch(key){
            case 1:
					try{
						this.enemy = this.cache[0].getFirstExists(false);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.reset(game.world.width, game.world.centerY + (100 * game.rnd.integerInRange(-2,2)));
					}
					catch{console.log("Spawn Case 1 Failed");return;}
					break;
            case 2:
					try{
						this.enemy = this.cache[1].getFirstExists(false);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.reset(game.world.width - 50 * game.rnd.integerInRange(1, 4), -100);
					}
					catch{console.log("Spawn Case 2 Failed");return;}
					break;
            case 3:
					try{
						this.enemy = this.cache[2].getFirstExists(false);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.respawn(game.world.width - 50 * game.rnd.integerInRange(1, 4), game.world.height-120);
					}
					catch{console.log("Spawn Case 3 Failed");return;}
					break;
            case 4:
					break;
            case 5:
					break;
			case 6:
			//Upside down shotgun turret
					try{
						this.enemy = this.cache[2].getFirstExists(false);
						this.enemy.scale.setTo(-1.0, -1.0);
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = this.enemy.DEFAULT;
						this.enemy.respawn(game.world.width - 50 * game.rnd.integerInRange(1, 4), 120);
					}
					catch{console.log("Spawn Case 6 Failed");return;}
					break;
			case 7:
			//Upside down rail turret
					break;
			}
		},
        //collision handling
		collisionHandle: function(target, weapon){
			target.HEALTH -= weapon.DAMAGE;
			if(!weapon.PENETRATE){weapon.kill();}			
		},
		checkCollision: function(enemy){
			this.enemy = enemy;
			//console.log(this.weapon.PENETRATE);
			game.physics.arcade.overlap(this.enemy.weapon, this.player, this.collisionHandle, null, this);
		},
		renderGroup: function(member){
			game.debug.body(member);
		},
		nextLevel: function(){
			CHECKPOINT++;
			game.state.start("Level_4", false, false, this.background, this.BGM, this.player, this.enemies, this.equipped);
		}
	}
	
function Level_4(game) {}
	
	Level_4.prototype = {
		init: function(background, BGM, player, enemies, equipped){
            this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.equipped = equipped;
		},
		preload: function(){
			console.log("Level_4: Preload");
			console.log(this.background[0].alive);
		},
		create: function(){
		},
		update: function(){
            //collision handling
			game.physics.arcade.overlap(this.cache, this.player.weapon, this.collisionHandle, null, this);
				
				for(var i = 0; i < this.cache.length; i++){
					this.cache[i].forEachExists(this.checkCollision, this);
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
              //game.debug.body(this.makeEnemy);
              this.enemies.forEachAlive(this.renderGroup, this);
              this.player.weapon.forEachAlive(this.renderGroup, this);
           }
        },
		makeEnemy: function(player){
            
		},
        //collision handling
		collisionHandle: function(target, weapon){
			target.HEALTH -= weapon.DAMAGE;
			if(!weapon.PENETRATE){weapon.kill();}			
		},
		checkCollision: function(enemy){
			this.enemy = enemy;
			//console.log(this.weapon.PENETRATE);
			game.physics.arcade.overlap(this.enemy.weapon, this.player, this.collisionHandle, null, this);
		},
		renderGroup: function(member){
			game.debug.body(member);
		},
	}
	
