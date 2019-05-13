"use strict";

function Boot(game) {}
	
	Boot.prototype = {
		init: function(){},
		preload: function(){
			game.load.bitmapFont("myfont", "assets/imgs/pixel_fantasy.png", "assets/imgs/pixel_fantasy.fnt");
			
			game.load.image("player_side", "assets/imgs/player_side.png"); 
			game.load.image("weapon1","assets/imgs/projectile-blue.png");
            game.load.image("enemy1", "assets/imgs/Red-02.png")
            game.load.image("weapon2", "assets/imgs/ScatterShot.png");
            game.load.image("weapon4", "assets/imgs/RailShot.png");
            game.load.image("EarthBackground", "assets/imgs/earth.png");
            game.load.image("StarsBackground", "assets/imgs/stars.png");
			game.load.audio("MainTrack","assets/audio/Captain Shmup.wav");
            game.load.audio("weapon_fx_1", "assets/audio/PShot.wav");
            game.load.audio("shotgun_fx", "assets/audio/shotblast.wav");
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
