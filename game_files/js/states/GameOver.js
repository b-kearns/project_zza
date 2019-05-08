"use strict";

function GameOver(game) {
	Phaser.State.call(this, game);
}
	GameOver.prototype = Object.create(Phaser.State.prototype);
	GameOver.prototype.constructor = GameOver;
	
	GameOver.prototype.preload = function() {
	}
	GameOver.prototype.create = function() {
		game.add.text(0,0,"Press SPACEBAR to retry", {fill: "#facade"});
	}
	GameOver.prototype.update = function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("GamePlay", true, false);
		}
	}
