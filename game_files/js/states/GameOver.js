"use strict";

function GameOver(game) {}
	
	GameOver.prototype.init = function(background) {
		this.background = background;
	}
	GameOver.prototype.preload = function() {
	}
	GameOver.prototype.create = function() {
	}
	GameOver.prototype.update = function() {
		for(var i = 1; i < this.background.length + 1; i++){
			this.background[i - 1].position.x -= 0.01 * i;
		}
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("GamePlay", true, false);
		}
	}
	
	GameOver.prototype = {
		init: function(){},
		preload: function(){},
		create: function(){
			this.text = game.add.text(0,0,"Press SPACEBAR to retry", {fill: "#facade"});
		},
		update: function(){
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				this.text.kill();
				game.state.start("MainMenu", true, false);
			}
		},
		render: function(){}
	}
