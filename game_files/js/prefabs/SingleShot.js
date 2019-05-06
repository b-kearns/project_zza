"use strict";

function SingleShot(game, key) {
	Phaser.Sprite.call(this,game, 64, game.world.centerY, key);
}

SingleShot.prototype = Object.create(Phaser.Sprite.prototype);
SingleShot.prototype.constructor = Player;

SingleShot.prototype.update = function() {
}