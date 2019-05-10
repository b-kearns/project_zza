"use strict";

function GamePlay(game) {}
	
	GamePlay.prototype = {
		init: function(){},
		preload: function(){},
		create: function(){
			//Create Player
			this.player = new Player(game, "player_side");
			game.add.existing(this.player);
			
			this.enemies = game.add.group();
			
			//making the event timer
			this.firstCall = true;
			this.makeEnemy();
			
			var timer = game.time.create(false);
			timer.loop(1800, this.makeEnemy, this);
			timer.start();
			
			this.equipped = game.add.bitmapText(game.world.width - 256, game.world.height - 64, "myfont", "Weapon: " + this.player.weapon.NAME, 24);
		},
		update: function(){
			game.physics.arcade.overlap(this.enemies, this.player.weapon, this.collisionHandle, null, this);
			this.enemies.forEachExists(this.checkCollision, this);
			
			this.equipped.setText("Weapon: " + this.player.weapon.NAME);
			
			if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
				game.state.start("GameOver", true, false);
			}
            if(this.input.keyboard.justPressed(Phaser.Keyboard.P)) {
              this.debug = !this.debug;
            }
        },
        render: function(){
           if(this.debug){
              game.debug.body(this.player);
              //game.debug.body(this.makeEnemy);
              this.enemies.forEachAlive(this.renderGroup, this);
              this.player.weapon.forEachAlive(this.renderGroup, this);
           }
       },
		makeEnemy: function(player){
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
			// this.enemy1 = new Enemy1(game, game.world.width, 200, "player_side");
			// game.add.existing(this.enemy1);
			// this.enemy1 = new Enemy1(game, game.world.width, 400, "player_side");
			// game.add.existing(this.enemy1);
		},
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
		}
	}
