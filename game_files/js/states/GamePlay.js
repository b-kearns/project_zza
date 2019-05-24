"use strict";
// where the magic happens
var CHECKPOINT;

function Level_0(game) {}

	Level_0.prototype = {
		init: function(background, check){
			console.log(check);
			this.background = background;
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
			
			this.BGM = game.add.audio("MainTrack");
            this.BGM.loop = true;
		},
		create: function(){
			
			
			console.log("BG Exists? " + (this.background != null));
			
			game.add.existing(this.player);
			
			this.enemies1 = game.add.group();
			this.enemies2 = game.add.group();
			this.enemies3 = game.add.group();
			this.enemies4 = game.add.group();
			
			this.equipped = game.add.bitmapText(game.world.width - 256, game.world.height - 64, "myfont", "Weapon: " + this.player.weapon.NAME, 24);
			
			//this.BGM.play();
			
		},
		update: function(){
			this.nextLevel();
		},
		render: function(){
		},
		nextLevel: function(){
			console.log(CHECKPOINT);
			switch(CHECKPOINT){
				case 1:
					game.state.start("Level_1", false, false, this.background, this.BGM, this.player, this.enemies1, this.enemies2, this.enemies3, this.enemies4, this.equipped);
					break;
				case 2:
					game.state.start("Level_2", false, false, this.background, this.BGM, this.player, this.enemies1, this.enemies2, this.enemies3, this.enemies4, this.equipped);
					break;
				case 3:
					game.state.start("Level_3", false, false, this.background, this.BGM, this.player, this.enemies1, this.enemies2, this.enemies3, this.enemies4, this.equipped);
					break;
				case 4:
					game.state.start("Level_4", false, false, this.background, this.BGM, this.player, this.enemies1, this.enemies2, this.enemies3, this.enemies4, this.equipped);
					break;
			}
			
		}
	}

function Level_1(game) {}
	
	Level_1.prototype = {
		init: function(background, BGM, player, enemies1, enemies2, enemies3, enemies4, equipped){
            // so the background parallax persists between states
			this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies1 = enemies1;
			this.enemies2 = enemies2;
			this.enemies3 = enemies3;
			this.enemies4 = enemies4;
			this.equipped = equipped;
		},
		preload: function(){
			console.log("Level_1: Preload");
			console.log("Level_1: " + CHECKPOINT);
		},
		create: function(){
			//game.time.events.loop(Phaser.Timer.SECOND * 1, this.makeEnemy, this, this.player, 1);
			//game.time.events.loop(Phaser.Timer.SECOND * 2, this.makeEnemy, this, this.player, 2);
			game.time.events.loop(Phaser.Timer.SECOND * 1, this.makeEnemy, this, this.player, 4);
		},
		update: function(){
            //collision handling
			game.physics.arcade.overlap(this.enemies1, this.player.weapon, this.collisionHandle, null, this);
			game.physics.arcade.overlap(this.enemies2, this.player.weapon, this.collisionHandle, null, this);
			game.physics.arcade.overlap(this.enemies3, this.player.weapon, this.collisionHandle, null, this);
			game.physics.arcade.overlap(this.enemies4, this.player.weapon, this.collisionHandle, null, this);
			this.enemies1.forEachExists(this.checkCollision, this);
			this.enemies2.forEachExists(this.checkCollision, this);
			this.enemies3.forEachExists(this.checkCollision, this);
			this.enemies4.forEachExists(this.checkCollision, this);
			
			//move the background
			for(var i = 1; i < this.background.length + 1; i++){
				this.background[i - 1].position.x -= 0.01 * i;
			}
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
			if(this.player.HEALTH <= 0) {
				this.sendToGameOver();
			}
        },
        render: function(){
           //handle debug info
           if(this.debug){
              game.debug.body(this.player);
              //game.debug.body(this.makeEnemy);
              this.enemies1.forEachAlive(this.renderGroup, this);
              this.enemies2.forEachAlive(this.renderGroup, this);
              this.enemies3.forEachAlive(this.renderGroup, this);
              this.enemies4.forEachAlive(this.renderGroup, this);
              this.player.weapon.forEachAlive(this.renderGroup, this);
           }
		},
		makeEnemy: function(player, key){
            //makin enemies
            switch(key){
            case 1:
                   if(this.enemies1.length === 0){
                     for(var i = 0; i < 10; i++){
                       this.enemy1 = new Enemy1(game, 1000, game.rnd.integerInRange(40,600), "enemy1");
                       game.add.existing(this.enemy1);
                       this.enemies1.add(this.enemy1);
                       this.enemy1.exists = false;
                     }
                   }
                   else if(!this.firstCall1){
				      for(var i = 1; i < 5; i++){
					    this.enemy1 = this.enemies1.getFirstExists(false);
					    if(this.enemy1 != null){
						  this.enemy1.outOfCameraBoundsKill = false;
						  this.enemy1.HEALTH = 2;
						  this.enemy1.reset(1000, game.rnd.integerInRange(40,600));
					    }
				      }
			       }
			       this.firstCall1 = false;
                   break;
            case 2:
                   if(this.enemies2.length === 0){
                     for(var i = 0; i < 10; i++){
                       this.enemy2 = new Enemy2(game, game.rnd.integerInRange(700,850), -130, "enemy2");
                       game.add.existing(this.enemy2);
                       this.enemies2.add(this.enemy2);
                       this.enemy2.exists = false;
                     }
                   }
                   else if(!this.firstCall2){
						console.log("Spawn");

					  for(var i = 1; i < 2; i++){
						this.enemy2 = this.enemies2.getFirstExists(false);
						//console.log(this.enemy);
						if(this.enemy2 != null){
						  this.enemy2.outOfCameraBoundsKill = false;
						  this.enemy2.HEALTH = 4;
						  this.enemy2.reset(game.rnd.integerInRange(700,850), 0);
						}
					  }
			       }
			       this.firstCall2 = false;
                   break;
            case 3:
                   if(this.enemies3.length === 0){
                     for(var i = 0; i < 10; i++){
                       this.enemy3 = new Enemy3(game, 1000, 610, "enemy3");
                       game.add.existing(this.enemy3);
                       this.enemies3.add(this.enemy3);
                       this.enemy3.exists = false;
                     }
                   }
                   else if(!this.firstCall3){
						console.log("Spawn");

					  for(var i = 1; i < 2; i++){
						this.enemy3 = this.enemies3.getFirstExists(false);
						//console.log(this.enemy);
						if(this.enemy3 != null){
						  this.enemy3.outOfCameraBoundsKill = false;
						  this.enemy3.HEALTH = 1;
						  this.enemy3.reset(1000, 610);
						}
					  }
			       }
			       this.firstCall3 = false;
                   break;
            case 4:
                   if(this.enemies4.length === 0){
                     for(var i = 0; i < 10; i++){
                       this.enemy4 = new Enemy4(game, 900, game.rnd.integerInRange(0, 640), "enemy4");
                       game.add.existing(this.enemy4);
                       this.enemies4.add(this.enemy4);
                       this.enemy4.exists = false;
                     }
                   }
                   else if(!this.firstCall4){
						console.log("Spawn");

					  for(var i = 1; i < 2; i++){
						this.enemy4 = this.enemies4.getFirstExists(false);
						//console.log(this.enemy);
						if(this.enemy4 != null){
						  this.enemy4.outOfCameraBoundsKill = false;
						  this.enemy4.HEALTH = 3;
						  this.enemy4.reset(900, game.rnd.integerInRange(0, 640));
						}
					  }
			       }
			       this.firstCall4 = false;
                   break;
            case 5:
                   break;
            }
			/*if(this.enemies.length === 0){
				for(var i = 0; i < 10; i++){
					this.enemy = new Enemy1(game, 1000, 1000, "enemy1", this.player);
					game.add.existing(this.enemy);
					this.enemies.add(this.enemy);
					this.enemy.exists = false;
				}
			}
			else if(!this.firstCall){
				for(var i = 1; i < 5; i++){
					this.enemy = this.enemies.getFirstExists(false);
					//console.log(this.enemy);
					if(this.enemy != null){
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = 2;
						this.enemy.reset(game.world.width + 64 * i, game.rnd.integerInRange(150, 250) * i + game.rnd.integerInRange(100,300));
					}
				}
			}
			
			this.firstCall = false;
			*/
		},
        //collision handling
		collisionHandle: function(target, weapon){
			target.HEALTH -= this.player.weapon.DAMAGE;
			if(!this.player.weapon.PENETRATE){weapon.kill();}
			console.log("Handled");
		},
		checkCollision: function(enemy){
			this.enemy = enemy;
			//console.log(this.weapon.PENETRATE);
			game.physics.arcade.overlap(this.enemy.weapon, this.player, this.collisionHandle, null, this);
		},
		renderGroup: function(member){
			game.debug.body(member);
		},
		sendToGameOver: function(){
            //kill it with fire!!!!
			this.equipped.kill();
			this.BGM.stop();
			this.player.kill();
			game.state.start("GameOver", false, false, this.background, CHECKPOINT);
		},
		nextLevel: function(){
			CHECKPOINT++;
			game.state.start("Level_2", false, false, this.background, this.BGM, this.player, this.enemies, this.equipped);
		}
	}
	
function Level_2(game) {}
	
	Level_2.prototype = {
		init: function(background, BGM, player, enemies, equipped){
            // so the background parallax persists between states
			this.background = background;
			this.BGM = BGM;
			this.player = player;
			this.enemies = enemies;
			this.equipped = equipped;
		},
		preload: function(){
			console.log("Level_2: Preload");
			console.log("Level_2: " + CHECKPOINT);
		},
		create: function(){

		},
		update: function(){
            //collision handling
			game.physics.arcade.overlap(this.enemies, this.player.weapon, this.collisionHandle, null, this);
			this.enemies.forEachExists(this.checkCollision, this);
			//move the background
			for(var i = 1; i < this.background.length + 1; i++){
				this.background[i - 1].position.x -= 0.01 * i;
			}
			//UI w00t!
			this.equipped.setText("Weapon: " + this.player.weapon.NAME);
			//debug options
			if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
				this.nextLevel();
			}
            if(this.input.keyboard.justPressed(Phaser.Keyboard.P)) {
              this.debug = !this.debug;
            }
			if(this.player.HEALTH <= 0) {
				this.sendToGameOver();
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
            //makin enemies
			if(this.enemies.length === 0){
				for(var i = 0; i < 10; i++){
					this.enemy = new Enemy1(game, 1000, 1000, "enemy1", this.player);
					game.add.existing(this.enemy);
					this.enemies.add(this.enemy);
					this.enemy.exists = false;
				}
			}
			else if(!this.firstCall){
				for(var i = 1; i < 5; i++){
					this.enemy = this.enemies.getFirstExists(false);
					//console.log(this.enemy);
					if(this.enemy != null){
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = 2;
						this.enemy.reset(game.world.width + 64 * i, game.rnd.integerInRange(150, 250) * i + game.rnd.integerInRange(100,300));
					}
				}
			}
			
			this.firstCall = false;
			
		},
        //collision handling
		collisionHandle: function(target, weapon){
			target.HEALTH -= this.player.weapon.DAMAGE;
			if(!this.player.weapon.PENETRATE){weapon.kill();}
			console.log("Handled");
		},
		checkCollision: function(enemy){
			this.enemy = enemy;
			//console.log(this.weapon.PENETRATE);
			game.physics.arcade.overlap(this.enemy.weapon, this.player, this.collisionHandle, null, this);
		},
		renderGroup: function(member){
			game.debug.body(member);
		},
		sendToGameOver: function(){
            //kill it with fire!!!!
			this.equipped.kill();
			this.BGM.stop();
			this.player.kill();
			game.state.start("GameOver", false, false, this.background, CHECKPOINT);
		},
		nextLevel: function(){
			CHECKPOINT++;
			game.state.start("Level_3", false, false, this.background, this.BGM, this.player, this.enemies, this.equipped);
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
			
		},
		update: function(){
            //collision handling
			game.physics.arcade.overlap(this.enemies, this.player.weapon, this.collisionHandle, null, this);
			this.enemies.forEachExists(this.checkCollision, this);
			//move the background
			for(var i = 1; i < this.background.length + 1; i++){
				this.background[i - 1].position.x -= 0.01 * i;
			}
			//UI w00t!
			this.equipped.setText("Weapon: " + this.player.weapon.NAME);
			//debug options
			if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
				this.nextLevel();
			}
            if(this.input.keyboard.justPressed(Phaser.Keyboard.P)) {
              this.debug = !this.debug;
            }
			if(this.player.HEALTH <= 0) {
				this.sendToGameOver();
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
            //makin enemies
			if(this.enemies.length === 0){
				for(var i = 0; i < 10; i++){
					this.enemy = new Enemy1(game, 1000, 1000, "enemy1", this.player);
					game.add.existing(this.enemy);
					this.enemies.add(this.enemy);
					this.enemy.exists = false;
				}
			}
			else if(!this.firstCall){
				for(var i = 1; i < 5; i++){
					this.enemy = this.enemies.getFirstExists(false);
					//console.log(this.enemy);
					if(this.enemy != null){
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = 2;
						this.enemy.reset(game.world.width + 64 * i, game.rnd.integerInRange(150, 250) * i + game.rnd.integerInRange(100,300));
					}
				}
			}
			
			this.firstCall = false;
			
		},
        //collision handling
		collisionHandle: function(target, weapon){
			target.HEALTH -= this.player.weapon.DAMAGE;
			if(!this.player.weapon.PENETRATE){weapon.kill();}
			console.log("Handled");
		},
		checkCollision: function(enemy){
			this.enemy = enemy;
			//console.log(this.weapon.PENETRATE);
			game.physics.arcade.overlap(this.enemy.weapon, this.player, this.collisionHandle, null, this);
		},
		renderGroup: function(member){
			game.debug.body(member);
		},
		sendToGameOver: function(){
            //kill it with fire!!!!
			this.equipped.kill();
			this.BGM.stop();
			this.player.kill();
			game.state.start("GameOver", false, false, this.background, CHECKPOINT);
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
			game.physics.arcade.overlap(this.enemies, this.player.weapon, this.collisionHandle, null, this);
			this.enemies.forEachExists(this.checkCollision, this);
			//move the background
			for(var i = 1; i < this.background.length + 1; i++){
				this.background[i - 1].position.x -= 0.01 * i;
			}
			//UI w00t!
			this.equipped.setText("Weapon: " + this.player.weapon.NAME);
			//debug options
			if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
				this.sendToGameOver();
			}
            if(this.input.keyboard.justPressed(Phaser.Keyboard.P)) {
              this.debug = !this.debug;
            }
			if(this.player.HEALTH <= 0) {
				this.sendToGameOver();
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
            //makin enemies
			if(this.enemies.length === 0){
				for(var i = 0; i < 10; i++){
					this.enemy = new Enemy1(game, 1000, 1000, "enemy1", this.player);
					game.add.existing(this.enemy);
					this.enemies.add(this.enemy);
					this.enemy.exists = false;
				}
			}
			else if(!this.firstCall){
				for(var i = 1; i < 5; i++){
					this.enemy = this.enemies.getFirstExists(false);
					//console.log(this.enemy);
					if(this.enemy != null){
						this.enemy.outOfCameraBoundsKill = false;
						this.enemy.HEALTH = 2;
						this.enemy.reset(game.world.width + 64 * i, game.rnd.integerInRange(150, 250) * i + game.rnd.integerInRange(100,300));
					}
				}
			}
			
			this.firstCall = false;
			
		},
        //collision handling
		collisionHandle: function(target, weapon){
			target.HEALTH -= this.player.weapon.DAMAGE;
			if(!this.player.weapon.PENETRATE){weapon.kill();}
			console.log("Handled");
		},
		checkCollision: function(enemy){
			this.enemy = enemy;
			//console.log(this.weapon.PENETRATE);
			game.physics.arcade.overlap(this.enemy.weapon, this.player, this.collisionHandle, null, this);
		},
		renderGroup: function(member){
			game.debug.body(member);
		},
		sendToGameOver: function(){
            //kill it with fire!!!!
			
			this.player.kill();
			console.log("Level_4: GameOver");
			this.equipped.kill();
			this.BGM.stop();
			
			game.state.start("GameOver", false, false, this.background, CHECKPOINT);
		}
	}