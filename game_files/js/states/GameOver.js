"use strict";

function GameOver(game) {}
	
GameOver.prototype = {
	init: function(background, CHECKPOINT, cache, plats, score){
		this.background = background;
		this.CHECKPOINT = CHECKPOINT;
		this.cache = cache;
		this.plats = plats;
		this.scoreText = score;
		console.log("GameOver: " + this.CHECKPOINT);
	},
	preload: function(){},
	create: function(){
		this.screen = [];
		this.title = game.add.bitmapText(game.world.centerX, game.world.centerY - 150, "myfont", "Game Over", 80);
		this.title.anchor.setTo(0.5, 0.5);
		this.screen.push(this.title);
		
		this.main = game.add.bitmapText(game.world.centerX + 220, game.world.height - 250, "myfont", "Return to Main Menu?", 32);
		this.main.anchor.setTo(0.5, 0.5);
		this.main.inputEnabled = true;
		this.main.events.onInputDown.add(this.returnToMain, this);
		this.main.events.onInputOver.add(this.highlight, this, this.main);
		this.main.events.onInputOut.add(this.clear, this, this.main);
		this.screen.push(this.main);
		
		this.again = game.add.bitmapText(game.world.centerX - 220, game.world.height - 250, "myfont", "Restart at Checkpoint?", 32);
		this.again.anchor.setTo(0.5, 0.5);
		this.again.inputEnabled = true;
		this.again.events.onInputDown.add(this.returnToCheckpoint, this);
		this.again.events.onInputOver.add(this.highlight, this, this.again);
		this.again.events.onInputOut.add(this.clear, this, this.again);
		this.screen.push(this.again);
		
        this.Uninstall = game.add.audio("GameOver");
        this.Uninstall.loop = true;
        this.Uninstall.play();
	},
	update: function(){
		for(var i = 1; i < this.background.length + 1; i++){
			this.background[i - 1].position.x -= 0.01 * i;
		}
		
	},
	returnToMain: function(){
		this.clearScreen();
		this.Uninstall.stop();
		SCORETEXT.kill();
		game.state.start("MainMenu", false, false);
	},
	returnToCheckpoint: function(){
		this.clearScreen();
		this.Uninstall.stop();
		SCORETEXT.kill();
		game.state.start("Level_0", false, false, this.background, this.CHECKPOINT, this.cache, this.plats, this.scoreText);
	},
	highlight: function(text){
		text.tint = 0x5BC6FD;
	},
	clear: function(text){
		text.tint = 0xFFFFFF;
	},
	clearScreen: function(){
		for(var i = 0; i < this.screen.length; i++){
			this.screen[i].kill();
		}
		if(this.plats != null){
			for(var i = 0; i < this.plats.length; i++){
				this.plats[i].kill();
			}
			this.plats = [];
			console.log("Killing Plats: " + this.plats);
		}
	}
}