"use strict";

function Boot(game) {}
	
	Boot.prototype = {
		init: function(){},
		preload: function(){
			game.load.image("player_side", "assets/imgs/player_side.png");
			game.load.image("P-shot","assets/imgs/projectile-blue.png");
            game.load.audio("MainTrack","assets/audio/Captain Shmup.wav");
            game.load.audio("PShot", "assets/audio/PShot.wav");
            game.load.audio("rail_charge", "assets/audio/railSpinup.wav");
            game.load.audio("rail_shot", "assets/audio/railShot.wav");
		},
		create: function(){
			
		},
		update: function(){
			game.state.start("MainMenu", true, false);
		},
		render: function(){}
	}
