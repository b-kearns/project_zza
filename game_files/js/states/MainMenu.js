"use strict";

function MainMenu(game) {}
	
	MainMenu.prototype = {
		init: function(){},
		preload: function(){
			game.load.image("player_side", "assets/imgs/player_side.png");
			game.load.image("weapon1","assets/imgs/projectile-blue.png");
            game.load.image("enemy1", "assets/imgs/Red-02.png")
            game.load.audio("MainTrack","assets/audio/Captain Shmup.wav");
            game.load.audio("weapon_fx_1", "assets/audio/PShot.wav");
		},
		create: function(){
			game.add.text(0,0,"Press SPACEBAR to start", {fill: "#facade"});
            this.BGM = game.add.audio("MainTrack");
            this.BGM.loop = true;
		},
		update: function(){
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
                this.BGM.play();
				game.state.start("GamePlay", true, false);
			}
		},
		render: function(){}
	}
