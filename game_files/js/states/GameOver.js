"use strict";

function GameOver(game) {}
	
GameOver.prototype = {
	init: function(background, CHECKPOINT, cache){
		this.background = background;
		this.CHECKPOINT = CHECKPOINT;
		this.cache = cache;
		console.log("GameOver: " + this.CHECKPOINT);
	},
	preload: function(){},
	create: function(){
		this.text = game.add.text(0,0,"Press SPACEBAR for another chance to WIN", {fill: "#facade"});
        this.Uninstall = game.add.audio("GameOver");
        this.Uninstall.loop = true;
        this.Uninstall.play();
	},
	update: function(){
		for(var i = 1; i < this.background.length + 1; i++){
			this.background[i - 1].position.x -= 0.01 * i;
		}
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.text.kill();
			this.Uninstall.stop();
			game.state.start("Level_0", false, false, this.background, this.CHECKPOINT, this.cache);
		}
	},
	render: function(){}
}
