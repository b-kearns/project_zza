"use strict";

function GameOver(game) {}
	
	GameOver.prototype.preload = function() {
	}
	GameOver.prototype.create = function() {
	}
	GameOver.prototype.update = function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("GamePlay", true, false);
		}
	}
	
	GameOver.prototype = {
		init: function(){},
		preload: function(){},
		create: function(){
			game.add.text(0,0,"Press SPACEBAR to retry", {fill: "#facade"});
		},
		update: function(){
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				game.state.start("GamePlay", true, false);
			}
		},
		render: function(){}
	}
