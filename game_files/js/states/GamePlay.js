"use strict";

function GamePlay(game) {
	Phaser.State.call(this, game);
}
	GamePlay.prototype = Object.create(Phaser.State.prototype);
	GamePlay.prototype.constructor = GamePlay;
	
	GamePlay.prototype.preload = function() {
	}
	
	GamePlay.prototype.create = function() {
		//Create Player
		this.player = new Player(game, "player_side");
		game.add.existing(this.player);
		
        //making the event timer
        var timer = game.time.create(false);
        timer.loop(2000, makeEnemy, this);
        timer.start();
	}
	
	GamePlay.prototype.update = function() {
	}
	
	GamePlay.makeEnemy = function() {
		this.enemy1 = new Enemy1(game, game.world.width, 200, "player_side");
		game.add.existing(this.enemy1);
		this.enemy1 = new Enemy1(game, game.world.width, 400, "player_side");
		game.add.existing(this.enemy1);
	}
