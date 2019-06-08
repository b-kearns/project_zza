//you've won!

function Victory(game){}

Victory.prototype = {
	create: function(){
		this.bgm = game.add.audio("winTrack");
		this.bgm.play();
		PLAYER.alive = false;
	}
}