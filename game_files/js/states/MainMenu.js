"use strict";

function MainMenu(game) {}
	
	MainMenu.prototype = {
		init: function(){},
		preload: function(){
			
		},
		create: function(){
            this.backdrop = game.add.tileSprite(0,0,800,640,"StarsBackground");
            this.earth = game.add.sprite(0,100,"EarthBackground");
            this.earth.scale.setTo(3.5, 3.5);
			game.add.text(0,0,"Press SPACEBAR to start", {fill: "#facade"});
            this.BGM = game.add.audio("MainTrack");
            this.BGM.loop = true;
		},
		update: function(){
            this.backdrop.tilePosition.x -= 0.05;
            this.earth.position.x -= 0.1;
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
                this.BGM.play();
				game.state.start("GamePlay", true, false);
			}
		},
		render: function(){}
	}
