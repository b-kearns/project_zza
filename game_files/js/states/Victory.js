//you've won!

function Victory(game){}

Victory.prototype = {
	init: function(player){
		this.player = player;
	},
	preload(){
	},
	create: function(){
		this.bgm = game.add.audio("winTrack");
		this.bgm.play();
		game.input.enabled = false;
		this.player.collideWorldBounds = false;
		game.add.tween(this.player).to({x: game.world.width/2, y: game.world.height - 64}, 2000, "Linear", true, 0, 0, false);
		//game.add.tween(this.player).to({y: 500}, 2000, "Linear", true, 3000, 0, false);
		//game.add.tween(this.player).to({y: 300}, 1000, "Linear", true, 5000, 0, false);
		game.add.tween(this.player).to({y: -200}, 1000, "Linear", true, 3000, 0, false);
		game.time.events.add(3700, this.playerKill, this, this.player);
		game.time.events.add(4000, this.gameText, this);
		game.time.events.add(60000, this.sendToMenu, this);
	},
	render: function(){
	},
	playerKill: function(player){
		player.kill();
	},
	gameText: function(){
		this.winText = game.add.bitmapText(game.world.width/2, -400, "myfont", "You Win!!!!", 60);
		this.winText = game.add.bitmapText(game.world.width/2, -200, "myfont", "Congratulations!!!", 60);
		this.winText.anchor.setTo(0.5,0.5);
		game.add.tween(this.winText).to({y: 200}, 2000, "Linear", true, 0, 0, false);
	},
	sendToMenu(){
		game.scale.setGameSize(960, 640);
		game.state.start("MainMenu", true, false);
	}
}