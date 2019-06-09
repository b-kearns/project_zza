"use strict";
// first user interface
function MainMenu(game) {}
	
	MainMenu.prototype = {
		init: function(reset){
			this.reset = reset;
		},
		preload: function(){
			//display scrolling background
			this.background = [];
			this.background[0] = game.add.tileSprite(0,0,960,640,"StarsBackground");
            this.background[1] = game.add.sprite(game.world.width * 0.8, 100, "EarthBackground");
            this.background[1].scale.setTo(3.5, 3.5);
            this.background[1].anchor.setTo(1, 0);
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
			if(this.menuBGM == null || this.reset){
				this.menuBGM = game.add.audio("Menu");
				this.menuBGM.loop = true;
				this.menuBGM.play();
			}
		},
		update: function(){
		},
		//credits tab
		enterCredits: function(){
			this.clearScreen();
			game.state.start("Credits", false, false, this.menuBGM);
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
		init: function(bgm, background){
			if(bgm == null){
				this.menuBGM = game.add.audio("Menu");
				this.menuBGM.loop = true;
				this.menuBGM.play();
			}
			else{
				this.menuBGM = bgm;
			}
			this.background = background;
			this.background[0].width = game.world.width;
			this.background[0].height = game.world.height;
			this.backgroun[1].reset(game.world.width * 0.8, 100);
		},
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
			//this.main.tint = 0xfefefe;

			this.main = game.add.bitmapText(game.world.centerX + 290, game.world.height - 50, "myfont", "Return to Main Menu?", 24);
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
			if(this.menuBGM.isPlaying){game.state.start("MainMenu", false, false, false);}
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

			//this.instructionText = game.add.bitmapText();

			this.title = game.add.bitmapText(game.world.centerX, 50, "myfont", "--INSTRUCTIONS--", 40);
			
			this.title.anchor.setTo(0.5, 0.5);
			this.screen.push(this.title);
			
			this.movement = game.add.bitmapText(50, 150, "myfont", "WASD : Use movement keys to avoid projectiles!", 30);
			this.movement.anchor.setTo(0, 0.5);
			this.screen.push(this.movement);
			
			this.attack = game.add.bitmapText(50, 230, "myfont", "SPACEBAR : Fire your weapon to destroy enemy ships!", 30);
			this.attack.anchor.setTo(0, 0.5);
			this.screen.push(this.attack);
			
			this.arrows = game.add.bitmapText(50, 310, "myfont", "Left / Right Arrow Keys : Cycle through weapons", 30);
			this.arrows.anchor.setTo(0, 0.5);
			this.screen.push(this.arrows);

			this.shieldText = game.add.bitmapText(140, 390, "myfont", ": Pickup energy shields to improve your defenses!", 30);
			this.shieldText.anchor.setTo(0, 0.5);
			this.screen.push(this.shieldText);

			this.shieldIcon = this.game.add.sprite(50, 395, "Atlas", "ShieldPickup");
			this.shieldIcon.anchor.setTo(0, 0.5);
			this.screen.push(this.shieldIcon);
			
			this.upgradeText = game.add.bitmapText(140, 470, "myfont", ": Unlock new weapons to use against the enemy!", 30);
			this.upgradeText.anchor.setTo(0, 0.5);
			this.screen.push(this.upgradeText);

			this.pickupIcon = this.game.add.sprite(50, 475, "Atlas", "DoublePickup");
			this.pickupIcon.anchor.setTo(0, 0.5);
			this.screen.push(this.pickupIcon);
      
			this.main = game.add.bitmapText(game.world.width - 170, game.world.height - 50, "myfont", "Return to Main Menu?", 24);

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
