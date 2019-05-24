"use strict";

var playerDeath;

function GamePlay(game) {}
	
	GamePlay.prototype = {
		init: function(background, BGM){
			this.background = background;
			this.BGM = BGM;
		},
		preload: function(){
			console.log("GamePlay: Preload");
		},
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

			//explosion
			this.explosions = game.add.group();
    		this.explosions.enableBody = true;
    		this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    		this.explosions.createMultiple(30, 'explosion');
    		this.explosions.setAll('anchor.x', 0.5);
    		this.explosions.setAll('anchor.y', 0.5);
    		this.explosions.forEach(function(explosion) {
    			explosion.animations.add('explosion');
   			 })

   			//player death explosion
			this.playerDeath = game.add.emitter(this.player.position.x, this.player.position.y);
    		this.playerDeath.width = 25;
   			this.playerDeath.height = 25;
    		this.playerDeath.makeParticles('explosion', [0,1,2,3,4,5,6,7,8,9,10], 10);
    		this.playerDeath.setAlpha(0.9, 0, 800);
    		this.playerDeath.setScale(1.2, 1.3, 1.2, 1.3, 1000, Phaser.Easing.Quintic.Out);

		},
		update: function(){
			game.physics.arcade.overlap(this.enemies, this.player.weapon, this.collisionHandle, null, this);
			this.enemies.forEachExists(this.checkCollision, this);
			
			for(var i = 1; i < this.background.length + 1; i++){
				this.background[i - 1].position.x -= 0.01 * i;
			}
			
			this.equipped.setText("Weapon: " + this.player.weapon.NAME);
			
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
			//console.log(target);
			target.HEALTH -= this.player.weapon.DAMAGE;
			if(!this.player.weapon.PENETRATE){weapon.kill();}
			//console.log(target);
			var explosion = this.explosions.getFirstExists(false);
        	explosion.reset(target.body.x + target.body.halfWidth, target.body.y + target.body.halfHeight);
        	explosion.play('explosion', 30, false, true);
        
			
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
			this.equipped.kill();
			this.BGM.stop();
			this.playerDeath.x = this.player.x;
        	this.playerDeath.y = this.player.y;
        	this.playerDeath.start(false, 1000, 10, 10);

			this.player.kill();

			game.state.start("GameOver", false, false, this.background);
		}
	}
