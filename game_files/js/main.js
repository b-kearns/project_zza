//Members: Corey Hunt, Brandon Kearns, Cole Watts
//Group Name: Project Zza
//Game Title: Captain S.H.M.U.P(Strategic Human Military Uprising Protocol)

"use strict";

var game = new Phaser.Game(960, 640, Phaser.AUTO);

// this.MainMenu = new MainMenu(game);
// game.add.existing(this.MainMenu);

// this.GamePlay = new GamePlay(game);
// game.add.existing(this.GamePlay);

// this.GameOver = new GameOver(game);
// game.add.existing(this.GameOver);
//Let's start a game!
game.state.add("Boot", Boot);
game.state.add("MainMenu", MainMenu);
game.state.add("Intro", Intro);
game.state.add("Level_0", Level_0);
game.state.add("Level_1", Level_1);
game.state.add("Level_2", Level_2);
game.state.add("Level_3", Level_3);
game.state.add("Level_4", Level_4);
game.state.add("GameOver", GameOver);
game.state.start("Boot");

