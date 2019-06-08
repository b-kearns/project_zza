"use strict";
// first user interface
function MainMenu(game) {}
	
	MainMenu.prototype = {
		init: function(bgm){
			if(bgm != null){
				this.menuBGM = bgm;
			}
		},
		preload: function(){
			//display scrolling background
			this.background = [];
			this.background[0] = game.add.tileSprite(0,0,960,640,"StarsBackground");
            this.background[1] = game.add.sprite(-200,100,"EarthBackground");
            this.background[1].scale.setTo(3.5, 3.5);
			this.background[2] = game.add.tileSprite(960,0,1990,640, "debrisBackground");
			this.background[2].alpha = 0.75;
		},
		create: function(){
            //set up user interface
			this.screen = [];
			//display title
			this.title = game.add.bitmapText(game.world.centerX, game.world.centerY - 150, "myfont", "Captain SHMUP", 80);
			this.title.anchor.setTo(0.5, 0.5);
			this.screen.push(this.title);
			//credits button
			this.credits = game.add.bitmapText(game.world.centerX + 200, game.world.height - 100, "myfont", "Credits", 32);
			this.credits.anchor.setTo(0.5, 0.5);
			this.credits.inputEnabled = true;
			this.credits.events.onInputDown.add(this.enterCredits, this);
			this.credits.events.onInputOver.add(this.highlight, this, this.credits);
			this.credits.events.onInputOut.add(this.clear, this, this.credits);
			this.screen.push(this.credits);
			//instructions button
			this.instructions = game.add.bitmapText(game.world.centerX - 200, game.world.height - 100, "myfont", "Instructions", 32);
			this.instructions.anchor.setTo(0.5, 0.5);
			this.instructions.inputEnabled = true;
			this.instructions.events.onInputDown.add(this.enterInstructions, this);
			this.instructions.events.onInputOver.add(this.highlight, this, this.instructions);
			this.instructions.events.onInputOut.add(this.clear, this, this.instructions);
			this.screen.push(this.instructions);
			//play button
			this.play = game.add.bitmapText(game.world.centerX, game.world.centerY + 32, "myfont", "Start!", 48);
			this.play.anchor.setTo(0.5, 0.5);
			this.play.anchor.setTo(0.5, 0.5);
			this.play.inputEnabled = true;
			this.play.events.onInputDown.add(this.start, this);
			this.play.events.onInputOver.add(this.highlight, this, this.play);
			this.play.events.onInputOut.add(this.clear, this, this.play);
			this.screen.push(this.play);
			
            //load music
			if(this.menuBGM == null){
				this.menuBGM = game.add.audio("Menu");
				this.menuBGM.loop = true;
				this.menuBGM.play();
			}
		},
		update: function(){
            // // start background movement for parallax
            // for(var i = 1; i < this.background.length + 1; i++){
				// this.background[i - 1].position.x -= 0.015 * i;
			// }
            //start music and go to gameplay
			// if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
                
				// this.title.kill();
                // this.menuBGM.stop();
				// game.state.start("Level_0", false, false, this.background, this.BGM);
			// }
		},
		//credits tab
		enterCredits: function(){
			this.clearScreen();
			game.state.start("Credits", false, false);
		},
		//instructions tab
		enterInstructions: function(){
			this.clearScreen();
			game.state.start("Instructions", false, false);
		},
		highlight: function(text){
			text.tint = 0x5BC6FD;
		},
		clear: function(text){
			text.tint = 0xFFFFFF;
		},
		//start game
		start: function(){
			this.clearScreen();
			this.menuBGM.stop();
			game.state.start("Level_0", false, false, this.background, this.BGM);
		},
		clearScreen: function(){
			for(var i = 0; i < this.screen.length; i++){
				this.screen[i].kill();
			}
		}
	}
	
function Credits(game){}

	Credits.prototype = {
		preload: function(){
			console.log("Credits: Preload");
		},
		create: function(){
			this.screen = [];

			this.main = game.add.bitmapText(game.world.centerX-120, 50, "myfont", "--CREDITS--", 40);
			this.main = game.add.bitmapText(game.world.centerX-400, 125, "myfont", "Corey Hunt: Sound Designer, Artist, Programmer", 32);
			this.main = game.add.bitmapText(game.world.centerX-275, 200, "myfont", "Brandon Kearns: Lead Programmer", 32);
			this.main = game.add.bitmapText(game.world.centerX-200, 275, "myfont", "Cole Watts: Programmer", 32);
			this.main = game.add.bitmapText(game.world.centerX-285, 425, "myfont", "*All assets owned by developers*", 32);
			this.main.tint = 0xfefefe;

			this.main = game.add.bitmapText(game.world.centerX + 250, game.world.height - 50, "myfont", "Return to Main Menu?", 32);
			this.main.anchor.setTo(0.5, 0.5);
			this.main.inputEnabled = true;
			this.main.events.onInputDown.add(this.returnToMain, this);
			this.main.events.onInputOver.add(this.highlight, this, this.main);
			this.main.events.onInputOut.add(this.clear, this, this.main);
			this.screen.push(this.main);
		},
		update: function(){
		},
		returnToMain: function(){
			this.clearScreen();
			game.state.start("MainMenu", false, false);
		},
		clearScreen: function(){
			for(var i = 0; i < this.screen.length; i++){
				this.screen[i].kill();
			}
		},
		highlight: function(text){
			text.tint = 0x5BC6FD;
		},
		clear: function(text){
			text.tint = 0xFFFFFF;
		}
	}
	
function Instructions(game){}

	Instructions.prototype = {
		preload: function(){
			console.log("Instructions: Preload");
		},
		create: function(){
			this.screen = [];

			this.instructionText = game.add.bitmapText();
			this.main = game.add.bitmapText(game.world.centerX + 220, game.world.height - 120, "myfont", "Return to Main Menu?", 32);

			this.main.anchor.setTo(0.5, 0.5);
			this.main.inputEnabled = true;
			this.main.events.onInputDown.add(this.returnToMain, this);
			this.main.events.onInputOver.add(this.highlight, this, this.main);
			this.main.events.onInputOut.add(this.clear, this, this.main);
			this.screen.push(this.main);
		},
		update: function(){
		},
		returnToMain: function(){
			this.clearScreen();
			game.state.start("MainMenu", false, false);
		},
		clearScreen: function(){
			for(var i = 0; i < this.screen.length; i++){
				this.screen[i].kill();
			}
		},
		highlight: function(text){
			text.tint = 0x5BC6FD;
		},
		clear: function(text){
			text.tint = 0xFFFFFF;
		}
	}
