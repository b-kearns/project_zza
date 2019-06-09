//you've won!

function Victory(game){}

Victory.prototype = {
	init: function(player, background, plats){
		this.player = player;
		this.background = background;
		this.plats = plats;
	},
	preload(){
	},
	create: function(){
		this.screen = [];
		this.bgm = game.add.audio("winTrack");
		this.bgm.play();
		// game.input.enabled = false;
		this.player.alive = false;
		this.player.collideWorldBounds = false;
		game.add.tween(this.player).to({x: game.world.width/2, y: game.world.height - 64}, 2000, "Linear", true, 0, 0, false);
		//game.add.tween(this.player).to({y: 500}, 2000, "Linear", true, 3000, 0, false);
		//game.add.tween(this.player).to({y: 300}, 1000, "Linear", true, 5000, 0, false);
		game.add.tween(this.player).to({y: -200}, 1000, "Linear", true, 3000, 0, false);
		game.time.events.add(4000, this.playerKill, this, this.player);
		game.time.events.add(4000, this.gameText, this);
		game.time.events.add(60000, this.enterCredits, this);
		
		this.credits = game.add.bitmapText(game.world.centerX, game.world.height - 200, "myfont", "Credits", 34);
		this.credits.anchor.setTo(0.5, 0.5);
		this.credits.inputEnabled = true;
		this.credits.events.onInputDown.add(this.enterCredits, this);
		this.credits.events.onInputOver.add(this.highlight, this, this.credits);
		this.credits.events.onInputOut.add(this.clear, this, this.credits);
		this.screen.push(this.credits);
	},
	render: function(){
	},
	playerKill: function(player){
		player.kill();
		player.shipTrail.kill();
	},
	gameText: function(){
		// this.winText = game.add.bitmapText(game.world.width/2, -400, "myfont", "You Win!!!!", 60);
		this.winText = game.add.bitmapText(game.world.width/2, -200, "myfont", "Victory!!!", 60);
		this.winText.anchor.setTo(0.5,0.5);
		this.screen.push(this.winText);
		game.add.tween(this.winText).to({y: 200}, 2000, "Linear", true, 0, 0, false);
	},
	sendToMenu(){
		if(this.plats != null){
			if(this.plats[0] != null){this.plats[0].kill();}
			if(this.plats[1] != null){this.plats[1].kill();}
		}
		game.scale.setGameSize(960, 640);
		game.state.start("Credits", false, false);
	},
	//credits tab
	enterCredits: function(){
		if(this.plats != null){
			if(this.plats[0] != null){this.plats[0].kill();}
			if(this.plats[1] != null){this.plats[1].kill();}
		}
		this.bgm.stop();
		this.clearScreen();
		game.scale.setGameSize(960, 640);
		game.state.start("Credits", false, false, null, this.background);
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