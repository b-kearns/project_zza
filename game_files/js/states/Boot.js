"use strict";
// state to handle load times
function Boot(game) {}
	
	Boot.prototype = {
		init: function(){},
		preload: function(){
            // preloading all assets before game starts
			game.load.bitmapFont("myfont", "assets/imgs/pixel_fantasy.png", "assets/imgs/pixel_fantasy.fnt");
			
			game.load.image("trail", "assets/imgs/trail.png"); 
			
			game.load.image("player_side", "assets/imgs/Blue-04.png"); 
			
			game.load.image("weapon1","assets/imgs/projectile-blue.png");
			
            game.load.image("enemy1", "assets/imgs/Dark-Grey-04.png");
            game.load.image("enemy2", "assets/imgs/OctoMini.png");
            game.load.image("enemy3", "assets/imgs/TankBarrel.png");
            game.load.image("enemy3-1", "assets/imgs/TankBase.png");
            game.load.image("enemy4", "assets/imgs/TriEnemy.png");
            game.load.image("enemy5", "assets/imgs/TurretHead.png");
            game.load.image("enemy5-1", "assets/imgs/TurretBase.png")
			
            game.load.image("enemyWeapon", "assets/imgs/projectile-red.png");
			
            game.load.image("pickup01", "assets/imgs/DoublePickup.png");
            game.load.image("pickup02", "assets/imgs/ShotgunPickup.png");
            game.load.image("pickup03", "assets/imgs/TriPickup.png");
            game.load.image("pickup04", "assets/imgs/RailPickup.png");
            game.load.image("pickup05", "assets/imgs/ShieldPickup.png");
			
            game.load.image("debris1", "assets/imgs/debrisShip01.png");
            game.load.image("debris2", "assets/imgs/debrisShip02.png");
            game.load.image("debris3", "assets/imgs/debrisShip03.png");
            game.load.image("debris4", "assets/imgs/debrisShip04.png");
            game.load.image("debris5", "assets/imgs/debrisShip05.png");
			
            game.load.image("ZZA", "assets/imgs/OctoBoss.png");
			
            game.load.image("TentieTop", "assets/imgs/tentacle top.png");
            game.load.image("TentieMid", "assets/imgs/Tentacle mid.png");
            game.load.image("TentieBot", "assets/imgs/Tentacle bot.png");
			
            game.load.image("weapon2", "assets/imgs/ShotgunShot.png");
            game.load.image("weapon3", "assets/imgs/TriShot.png");
            game.load.image("weapon4", "assets/imgs/RailShot.png");
			
            game.load.image("EarthBackground", "assets/imgs/earth.png");
            game.load.image("StarsBackground", "assets/imgs/stars.png");
			game.load.image("Platform", "assets/imgs/space plat.png");

			game.load.audio("MainTrack","assets/audio/CaptainShmupMain.wav");

            game.load.spritesheet("explosion", "assets/imgs/explosion_animation.png", 46, 46);
			
            game.load.audio("weapon_fx_1", "assets/audio/PShot.wav");
            game.load.audio("shotgun_fx", "assets/audio/shotblast.wav");
			game.load.audio("rail_charge", "assets/audio/railSpinup.wav");
            game.load.audio("rail_shot", "assets/audio/railShot.wav");
            game.load.audio("tri_shot", "assets/audio/triShot.wav");
		},
		create: function(){
			
		},
		update: function(){
			game.state.start("MainMenu", true, false);
		},
		render: function(){}
	}
