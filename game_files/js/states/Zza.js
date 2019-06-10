//final boss level
var ZZA;
var TENTS;
var bossDeath;
var explosions;

function Zza(game){}

Zza.prototype = {
	init: function(background, player, enemies, cache, equipped, pickups, plats, scoreText){
		this.background = background;
		this.BGM = BGM;
		this.player = player;
		this.enemies = enemies;
		this.cache = cache;
		this.equipped = equipped;
		this.pickups = pickups;
		this.plats = plats;
		this.scoreText = scoreText;
	},
	preload: function(){
		console.log("ZZA: Preload");
	},
	create: function(){
		game.scale.setGameSize(640, 960);
		
		this.background[0].width = game.world.width;
		this.background[0].height = game.world.height;
		
		this.player.flipPOV();
		
		this.scoreText.reset(100, game.world.height - 64);
		this.Zza = game.add.sprite(game.world.centerX, -500, "Atlas", "OctoBoss");

		this.Zza.anchor.setTo(0.5, 0.5);

		ZZA = this.Zza;
		
		this.Top1 = game.add.sprite(this.Zza.position.x - 64, this.Zza.position.y, "Atlas", "tentacle top");
		this.Mid1 = game.add.sprite(this.Zza.position.x - 84, this.Zza.position.y, "Atlas", "Tentacle mid");
		this.Bot1 = new Enemy6(game, this.Zza.position.x - 84, this.Zza.position.y, "Tentacle bot", 1);
		game.add.existing(this.Bot1);
		
		this.Top2 = game.add.sprite(this.Zza.position.x - 40, this.Zza.position.y, "Atlas", "tentacle top");
		this.Mid2 = game.add.sprite(this.Zza.position.x - 40, this.Zza.position.y, "Atlas", "Tentacle mid");
		this.Bot2 = new Enemy6(game, this.Zza.position.x - 40, this.Zza.position.y, "Tentacle bot", 2);
		game.add.existing(this.Bot2);

		this.Top3 = game.add.sprite(this.Zza.position.x + 40, this.Zza.position.y, "Atlas", "tentacle top");
		this.Mid3 = game.add.sprite(this.Zza.position.x + 40, this.Zza.position.y, "Atlas", "Tentacle mid");
		this.Bot3 = new Enemy6(game, this.Zza.position.x + 40, this.Zza.position.y, "Tentacle bot", 2);
		game.add.existing(this.Bot3);

		this.Top4 = game.add.sprite(this.Zza.position.x + 64, this.Zza.position.y, "Atlas", "tentacle top");
		this.Mid4 = game.add.sprite(this.Zza.position.x + 84, this.Zza.position.y, "Atlas", "Tentacle mid");
		this.Bot4 = new Enemy6(game, this.Zza.position.x + 84, this.Zza.position.y, "Tentacle bot", 1);
		game.add.existing(this.Bot4);
		
		this.tent_1 = [this.Top1, this.Mid1, this.Bot1];
		this.tent_2 = [this.Top2, this.Mid2, this.Bot2];
		this.tent_3 = [this.Top3, this.Mid3, this.Bot3];
		this.tent_4 = [this.Top4, this.Mid4, this.Bot4];
		
		this.tentacles = [this.tent_1, this.tent_2, this.tent_3, this.tent_4];
		
		for(var i = 0; i < this.tentacles.length; i++){
			for(var j = 0; j < this.tentacles[i].length; j++){
				this.tentacles[i][j].anchor.setTo(0.5, 0);
			}
		}
		
		this.plats = [];
		this.plats[0]= game.add.tileSprite(-100,0,100,game.world.height,"Atlas", "leftPlat");
		this.plats[1]= game.add.tileSprite(640,0,70,game.world.height,"Atlas", "rightPlat");
		
		for(var i = 0; i < 2; i++){
			game.physics.enable(this.plats[i]);
			this.plats[i].body.immovable = true;
			this.plats[i].moveDown();
			this.plats[i].moveDown();
			this.plats[i].moveDown();
			this.plats[i].moveDown();
			this.plats[i].moveDown();
			this.plats[i].moveDown();
			this.plats[i].moveDown();
		}
		
		this.BGM = game.add.audio("zzaTrack");
		this.BGM.loop = true;
		
		BGM = this.BGM;
		PLATS = this.plats;
		
		game.time.events.add(3950, this.BGM.play, this.BGM);
		game.add.tween(this.plats[0]).to({x: -30}, 3000, "Linear", true, 0, 0, false);
		game.add.tween(this.plats[1]).to({x: 570}, 3000, "Linear", true, 0, 0, false);
		
		game.add.tween(this.Zza).to({y: 164}, 5000, "Linear", true, 0, 0, false);
		
		game.add.tween(this.Top1).to({y: 230}, 5000, "Linear", true, 0, 0, false);
		game.add.tween(this.Mid1).to({y: 275}, 5000, "Linear", true, 0, 0, false);
		game.add.tween(this.Bot1).to({y: 330}, 5000, "Linear", true, 0, 0, false);
		
		game.add.tween(this.Top2).to({y: 270}, 5000, "Linear", true, 0, 0, false);
		game.add.tween(this.Mid2).to({y: 320}, 5000, "Linear", true, 0, 0, false);
		game.add.tween(this.Bot2).to({y: 375}, 5000, "Linear", true, 0, 0, false);
		
		game.add.tween(this.Top3).to({y: 270}, 5000, "Linear", true, 0, 0, false);
		game.add.tween(this.Mid3).to({y: 320}, 5000, "Linear", true, 0, 0, false);
		game.add.tween(this.Bot3).to({y: 375}, 5000, "Linear", true, 0, 0, false);
		
		game.add.tween(this.Top4).to({y: 230}, 5000, "Linear", true, 0, 0, false);
		game.add.tween(this.Mid4).to({y: 275}, 5000, "Linear", true, 0, 0, false);
		game.add.tween(this.Bot4).to({y: 330}, 5000, "Linear", true, 0, 0, false);
		
		this.Top1.angle = 30;
		this.Top4.angle = -30;
		
		this.Bot1.body.angularVelocity = 25;
		this.Bot2.body.angularVelocity = 25;
		this.Bot3.body.angularVelocity = -25;
		this.Bot4.body.angularVelocity = -25;

		this.weapons = [this.Bot1.weapon, this.Bot2.weapon, this.Bot3.weapon, this.Bot4.weapon];
		
		TENTS = this.tentacles;
		
		game.time.events.loop(Phaser.Timer.SECOND * 3, spawnShield, this);

		this.bossDeath = game.add.emitter(this.Zza.position.x, this.Zza.position.y);
    	this.bossDeath.width = this.Zza.width / 2;
    	this.bossDeath.height = this.Zza.height / 2;
		this.bossDeath.makeParticles("bigBoom", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 20);
		//this.bossDeath.setAlpha(0.9, 0, 900);
    	this.bossDeath.setScale(1, 1.6, 1, 1.6, 1000, Phaser.Easing.Quintic.Out);

	},
	update: function(){
		this.scoreText.setText("Score: " + SCORE);
		this.plats[0].tilePosition.y -=3;
		this.plats[1].tilePosition.y -=3;
		this.background[0].tilePosition.y -=1;
		
		//collision handling for pickups
		game.physics.arcade.overlap(this.cache[5], this.player, handlePickup, null, this);
		
		game.physics.arcade.collide(this.plats, this.player);
		
		game.physics.arcade.overlap(this.tent_1[2], this.player.weapon, collisionHandle, null, this);
		game.physics.arcade.overlap(this.tent_2[2], this.player.weapon, collisionHandle, null, this);
		game.physics.arcade.overlap(this.tent_3[2], this.player.weapon, collisionHandle, null, this);
		game.physics.arcade.overlap(this.tent_4[2], this.player.weapon, collisionHandle, null, this);
		
		game.physics.arcade.overlap(this.player, this.weapons, collisionHandle, null, this);
		
		if(!this.tent_1[2].alive){this.tent_1[0].kill();this.tent_1[1].kill();}
		if(!this.tent_2[2].alive){this.tent_2[0].kill();this.tent_2[1].kill();}
		if(!this.tent_3[2].alive){this.tent_3[0].kill();this.tent_3[1].kill();}
		if(!this.tent_4[2].alive){this.tent_4[0].kill();this.tent_4[1].kill();}

		//IF ALL TENTACLES DIE, ZZA BLOWS UP, SEND TO VICTORY
		if(!this.tent_1[2].alive && !this.tent_2[2].alive && !this.tent_3[2].alive && !this.tent_4[2].alive){

			this.bossDeath.x = this.Zza.x;
        	this.bossDeath.y = this.Zza.y;
			this.bossDeath.start(false, 1000, 100, 40);

    		this.Zza.kill();

			//ZZA BLOWS UP
			this.sendVictory();
		}

	},
	render: function(){
		
	},
	tentacleCollision: function(tentacle, weapon){
	},
	sendVictory: function(){
		BGM.stop();
		game.state.start("Victory", false, false, this.player, this.background, this.plats);
	}
}