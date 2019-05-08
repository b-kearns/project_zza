"use strict";

function MainMenu(game) {}
	
	MainMenu.prototype = {
		init: function(){},
		preload: function(){
			game.load.image("player_side", "assets/imgs/player_side.png");
			game.load.image("P-shot","assets/imgs/projectile-blue.png");
		},
		create: function(){
			game.add.text(0,0,"Press SPACEBAR to start", {fill: "#facade"});
		},
		update: function(){
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				game.state.start("GamePlay", true, false);
			}
		},
		render: function(){}
	}
