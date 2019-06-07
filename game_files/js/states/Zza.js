//final boss level

function Zza(game){}

Zza.prototype = {
	init: function(background, player, enemies, cache, equipped, pickups, plats){
		this.background = background;
		this.BGM = BGM;
		this.player = player;
		this.enemies = enemies;
		this.cache = cache;
		this.equipped = equipped;
		this.pickups = pickups;
		this.plats = plats;
	},
	preload: function(){
		
	},
	create: function(){
		
		game.scale.setGameSize(640, 960);
		this.player.flipPOV();
		
		this.Zza = game.add.sprite(game.world.centerX, -500, "Atlas", "OctoBoss");
		this.Zza.anchor.setTo(0.5, 0.5);
		
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
		
		console.log(this.tentacles[0][2]);
	},
	update: function(){
		this.plats[0].tilePosition.y -=3;
		this.plats[1].tilePosition.y -=3;
		this.background[0].tilePosition.y -=1;
		
		game.physics.arcade.overlap(this.tent_1[2], this.player.weapon, collisionHandle, null, this);
		game.physics.arcade.overlap(this.tent_2[2], this.player.weapon, collisionHandle, null, this);
		game.physics.arcade.overlap(this.tent_3[2], this.player.weapon, collisionHandle, null, this);
		game.physics.arcade.overlap(this.tent_4[2], this.player.weapon, collisionHandle, null, this);
		
		checkCollision(this.tentacles[0][2]);
		checkCollision(this.tentacles[1][2]);
		checkCollision(this.tentacles[2][2]);
		checkCollision(this.tentacles[3][2]);
		
		if(!this.tent_1[2].alive){this.tent_1[0].kill();this.tent_1[1].kill();}
		if(!this.tent_2[2].alive){this.tent_2[0].kill();this.tent_2[1].kill();}
		if(!this.tent_3[2].alive){this.tent_3[0].kill();this.tent_3[1].kill();}
		if(!this.tent_4[2].alive){this.tent_4[0].kill();this.tent_4[1].kill();}
	},
	render: function(){
		
	},
	tentacleCollision: function(tentacle, weapon){
	}
}