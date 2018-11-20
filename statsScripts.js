var currentPlayer = localStorage.getItem("currentPlayer");
var players = JSON.parse(localStorage.getItem("players"));
var p;

var currentVillain = localStorage.getItem("currentVillain");
var villains = JSON.parse(localStorage.getItem("villains"));
var v;

if(!currentPlayer==true){
	currentVillain="B(r)owser";
	v=createPlayer("B(r)owser",0,0,0,0,0,0,0);
	villains=[v];
	v.updateVillainStats();
}
else{
	for(var i=0;i<players.length;i++){
		if(currentPlayer===players[i].name){
			p=players[i];
		}
	}
	for(var i=0;i<villains.length;i++){
		if(currentVillain===villains[i].name){
			v=villains[i];
		}
	}
	p = createPlayer(p.name,p.rock,p.paper,p.scissors,p.games,p.wins,p.losses,p.ratio);
	p.updatePlayerStats();
	v = createPlayer(v.name,v.rock,v.paper,v.scissors,v.games,v.wins,v.losses,v.ratio);
	v.updateVillainStats();
}

function createPlayer(name, rock, paper, scissors, games, wins, losses, ratio){
	var p = name;
	var a ={
		name: name,
		rock: rock,
		paper: paper,
		scissors: scissors,
		games: games,
		wins: wins,
		losses: losses,
		ratio: ratio,
		incrementRock: function(){this.rock++;},
		incrementPaper: function(){this.paper++;},
		incrementScissors: function(){this.scissors++;},
		incrementGames: function(){this.games++;},
		incrementWins: function(){this.wins++;},
		incrementLosses: function(){this.losses++;},
		updateRatio: function(){this.ratio=reduceRatio(this.wins,this.losses);},
		updatePlayerStats: function(){
			updateStat("player_name_span",this.name);
			updateStat("player_rock_span",this.rock);
			updateStat("player_paper_span",this.paper);
			updateStat("player_scissors_span",this.scissors);
			updateStat("total_games_span",this.games);
			updateStat("total_wins_span",this.wins);
			updateStat("win_loss_ratio_span",this.ratio);
		},
		updateVillainStats: function(){
			updateStat("villain_name_span",this.name);
			updateStat("villain_rock_span",this.rock);
			updateStat("villain_paper_span",this.paper);
			updateStat("villain_scissors_span",this.scissors);
		}
	}
	return a;
}

function updateStat(stat_span, stat){
	var elements=document.getElementsByClassName(stat_span);
	for(var i=0; i<elements.length; i++){
		elements[i].innerHTML=stat;
	}
}