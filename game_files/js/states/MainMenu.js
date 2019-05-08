"use strict";

function MainMenu(game) {
	Phaser.State.call(this, game);
}
	MainMenu.prototype = Object.create(Phaser.State.prototype);
	MainMenu.prototype.constructor = MainMenu;
	
	MainMenu.prototype.preload = function() {
		game.load.image("player_side", "assets/imgs/player_side.png");
        game.load.image("P-shot","assets/imgs/projectile-blue.png");
	}
	MainMenu.prototype.create = function() {
		game.add.text(0,0,"Press SPACEBAR to start", {fill: "#facade"});
	}
	MainMenu.prototype.update = function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("GamePlay", true, false);
		}
	}
