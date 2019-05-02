"use strict";

var game = new Phaser.Game(960, 640, Phaser.AUTO);

var MainMenu = function(game){};
MainMenu.prototype = {
	preload: function() {
		game.load.image("player_side", "assets/imgs/player_side.png");
	},
	create: function() {
		game.add.text(0,0,"Press SPACEBAR to start", {fill: "#facade"});
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("GamePlay", true, false);
		}
	}
}

var GamePlay = function(game){};
GamePlay.prototype = {
	preload: function() {
		console.log("GamePlay: preload");
	},
	create: function() {
		console.log("GamePlay: create");
		this.player = new Player(game, "player_side");
		game.add.existing(this.player);
	},
	update: function() {
	}
}

var GameOver = function(game){};
GameOver.prototype = {
	preload: function() {
	},
	create: function() {
		game.add.text(0,0,"Press SPACEBAR to retry", {fill: "#facade"});
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("GamePlay", true, false);
		}
	}
}

game.state.add("MainMenu", MainMenu);
game.state.add("GamePlay", GamePlay);
game.state.add("GameOver", GameOver);
game.state.start("MainMenu");