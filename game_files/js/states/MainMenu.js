"use strict";
// first user interface
function MainMenu(game) {}
	
	MainMenu.prototype = {
		init: function(){},
		preload: function(){
			
		},
		create: function(){
            //set up user interface
			this.background = [];
			this.background[0] = game.add.tileSprite(0,0,960,640,"StarsBackground");
            this.background[1] = game.add.sprite(-200,100,"EarthBackground");
            this.background[1].scale.setTo(3.5, 3.5);
			this.text = game.add.text(0,0,"Press SPACEBAR to start", {fill: "#facade"});
            //load music
            this.menuBGM = game.add.audio("Menu");
			this.menuBGM.loop = true;
            this.menuBGM.play();
		},
		update: function(){
            // start background movement for parallax
            for(var i = 1; i < this.background.length + 1; i++){
				this.background[i - 1].position.x -= 0.015 * i;
			}
            //start music and go to gameplay
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
                
				this.text.kill();
                this.menuBGM.stop();
				game.state.start("Level_0", false, false, this.background, this.BGM);
			}
		},
		render: function(){}
	}
