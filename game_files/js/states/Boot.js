"use strict";
// state to handle load times
function Boot(game) {}
	
	Boot.prototype = {
		init: function(){},
		preload: function(){
            // preloading all assets before game starts
			game.load.bitmapFont("myfont", "assets/imgs/pixel_fantasy.png", "assets/imgs/pixel_fantasy.fnt");
			game.load.atlas("Atlas", "assets/imgs/CaptainAtlas.png","assets/imgs/atlas.json");

			
             game.load.image("EarthBackground", "assets/imgs/earth.png");
             game.load.image("StarsBackground", "assets/imgs/stars.png");
             game.load.image("debrisBackground", "assets/imgs/debrisBackground.png");
            
			//bgms
			game.load.audio("MainTrack1","assets/audio/mainBGM1.wav");
			game.load.audio("MainTrack2","assets/audio/mainBGM2.wav");
			game.load.audio("MainTrack3","assets/audio/mainBGM3.wav");
			game.load.audio("MainTrack4","assets/audio/mainBGM4.wav");
			game.load.audio("GameOver","assets/audio/Uninstall.wav");
			game.load.audio("Menu","assets/audio/ShmupMenu.wav");
			game.load.audio("zzaTrack", "assets/audio/zzaTrack.wav");
			game.load.audio("zzaStinger", "assets/audio/zzaStinger.wav");
			game.load.audio("winTrack", "assets/audio/winTrack.wav");
			//sfx
            game.load.audio("weapon_fx_1", "assets/audio/PShot.wav");
            game.load.audio("shotgun_fx", "assets/audio/shotblast.wav");
			game.load.audio("rail_charge", "assets/audio/railSpinup.wav");
            game.load.audio("rail_shot", "assets/audio/railShot.wav");
            game.load.audio("tri_shot", "assets/audio/triShot.wav");
            game.load.audio("enemyDeath", "assets/audio/enemyDeath.wav");
            game.load.audio("playerDeath", "assets/audio/playerDeath.wav");
            game.load.audio("itemPickup", "assets/audio/ItemPickup.wav")
		},
		create: function(){
			
		},
		update: function(){
			game.state.start("MainMenu", true, false);
		},
		render: function(){}
	}
