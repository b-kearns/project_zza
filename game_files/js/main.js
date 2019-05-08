"use strict";

var game = new Phaser.Game(960, 640, Phaser.AUTO);

this.MainMenu = new MainMenu(game);
game.add.existing(this.MainMenu);

this.GamePlay = new GamePlay(game);
game.add.existing(this.GamePlay);

this.GameOver = new GameOver(game);
game.add.existing(this.GameOver);

game.state.add("MainMenu", this.MainMenu);
game.state.add("GamePlay", this.GamePlay);
game.state.add("GameOver", this.GameOver);
game.state.start("MainMenu");

