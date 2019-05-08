"use strict";

function GamePlay(game) {}
	
	GamePlay.prototype = {
		preload: function(){},
		create: function(){
			//Create Player
			this.player = new Player(game, "player_side");
			game.add.existing(this.player);
			
			//making the event timer
			var timer = game.time.create(false);
			timer.loop(2000, this.makeEnemy, this);
			timer.start();
		},
		update: function(){
			if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
				game.state.start("GameOver", true, false);
			}
		},
		makeEnemy: function(){
			this.enemy1 = new Enemy1(game, game.world.width, 200, "player_side");
			game.add.existing(this.enemy1);
			this.enemy1 = new Enemy1(game, game.world.width, 400, "player_side");
			game.add.existing(this.enemy1);
		}
	}
