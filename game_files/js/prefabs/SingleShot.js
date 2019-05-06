"use strict";

function SingleShot(game, posX, posY, direction, key) {
	Phaser.Sprite.call(this,game, posX, posY, key);
    this.anchor.set(0.5);
	game.physics.enable(this);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
    
    this.tracking = false;
    this.scaleSpeed = 0;
}

SingleShot.prototype = Object.create(Phaser.Sprite.prototype);
SingleShot.prototype.constructor = SingleShot;

SingleShot.prototype.update = function() {
   this.body.velocity.setTo(500 , 0);
}