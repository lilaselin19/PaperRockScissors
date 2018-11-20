var currentPlayer = localStorage.getItem("currentPlayer");
var players = JSON.parse(localStorage.getItem("players"));
var p;

var currentVillain = localStorage.getItem("currentVillain");
var villains = JSON.parse(localStorage.getItem("villains"));
var v;

var feedback_message = document.getElementById("feedback_message");
var greeting_span = document.getElementById("greeting_span");
var game_results = document.getElementById("game_results");

if(!currentPlayer==true){
	greeting_span.innerHTML="Hi";
	showOrNot(throw_choice,false);
	showOrNot(enter_name,true);
	showOrNot(feedback_message,true);
	showOrNot(document.getElementById("log_out_button"),false);
	feedback_message.innerHTML="Enter a name to proceed.";
	feedback_message.classList.remove("good");
	feedback_message.classList.add("bad");
	currentVillain="B(r)owser";
	v=createPlayer("B(r)owser",0,0,0,0,0,0,0);
	villains=[v];
	v.updateVillainStats();
	localStorage.setItem("currentVillain",currentVillain);
	localStorage.setItem("villains",JSON.stringify(villains));
}
else{
	greeting_span.innerHTML="Hi ";
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
	showOrNot(throw_choice,true);
	showOrNot(enter_name,false);
	showOrNot(feedback_message,false);
}

var name_button = document.getElementById("name_button");
name_button.addEventListener("click", function(){
	greeting_span.innerHTML="Hi ";
	if(document.getElementById("name_textfield").value==""){
		feedback_message.innerHTML="Your name must be at least one character long.";
		feedback_message.classList.remove("good");
		feedback_message.classList.add("bad");
	}
	else{
		currentPlayer = document.getElementById("name_textfield").value;
		localStorage.setItem("currentPlayer",currentPlayer);
		var newPlayer=true;
		if(!players){
			players = [];
			localStorage.setItem("players",JSON.stringify(players));
		}
		for(var i=0;i<players.length;i++){
			if(currentPlayer===players[i].name){
				newPlayer=false;
				p=players[i];
				break;
			}
			else newPlayer=true;
		}
		if(newPlayer){
			p = createPlayer(currentPlayer,0,0,0,0,0,0,0);
			players=JSON.parse(localStorage.getItem("players"));
			players.push(p);
			localStorage.setItem("players",JSON.stringify(players));
			feedback_message.innerHTML="Name successfully saved.";
		}
		else feedback_message.innerHTML="Welcome Back!";
		p= createPlayer(p.name,p.rock,p.paper,p.scissors,p.games,p.wins,p.losses,p.ratio);
		p.updatePlayerStats();
		showOrNot(throw_choice,true);
		showOrNot(enter_name,false);
		feedback_message.classList.remove("bad");
		feedback_message.classList.add("good");
		showOrNot(log_out_button,true);
	}
});

var throw_button=document.getElementById("throw_choice_button");
throw_button.addEventListener("click", function(){feedback_message;
	var win_message = document.getElementById("game_result_text");
	var player_choice = playerChoiceFunction();
	if(player_choice=="blank"){
		feedback_message.innerHTML="Please select rock, paper, or scissors";
		feedback_message.classList.remove("good");
		feedback_message.classList.add("bad")
		showOrNot(feedback_message,true);
		showOrNot(game_results,false);
	}
	else{
		var bowser_choice = bowserChoiceFunction();
		win_message.innerHTML=who_wins(player_choice,bowser_choice);
		showOrNot(feedback_message,false);
		showOrNot(game_results,true);
		showOrNot(throw_choice,false);
	}
	p.updatePlayerStats();
	v.updateVillainStats();

	for(var i=0;i<players.length;i++){
		if(currentPlayer===players[i].name){
			players[i]=p;
		}
	}
	for(var i=0;i<villains.length;i++){
		if(currentVillain===villains[i].name){
			villains[i]=v;
		}
	}
	localStorage.setItem("players",JSON.stringify(players));
	localStorage.setItem("villains",JSON.stringify(villains));
});

var play_again_button=document.getElementById("play_again_button");
play_again_button.addEventListener("click", function(){
	showOrNot(game_results,false);
	showOrNot(throw_choice,true);
	showOrNot(document.getElementById("fireworks"),false);
	document.getElementById("drop_down_choice").value=" ";
});

var log_out_button=document.getElementById("log_out_button");
log_out_button.addEventListener("click", function(){
	feedback_message.innerHTML="Are you sure you want to log out?";
	feedback_message.classList.remove("good");
	feedback_message.classList.add("bad");
	showOrNot(feedback_message,true);
	showOrNot(log_out_button, false);
	showOrNot(reset_stats_button, true);
	for(var i=0;i<players.length;i++){
		if(currentPlayer===players[i].name){
			players[i]=p;
		}
	}
	for(var i=0;i<villains.length;i++){
		if(currentVillain===villains[i].name){
			villains[i]=v;
		}
	}
	localStorage.setItem("players",JSON.stringify(players));
	localStorage.setItem("villains",JSON.stringify(villains));
});

var reset_stats_button=document.getElementById("reset_stats_button");
reset_stats_button.addEventListener("click", function(){
	console.log("check 1");
	greeting_span.innerHTML="Hi";
	feedback_message.innerHTML="Enter a name to proceed.";
	console.log("check 2");
	reset();
	console.log("check 3");
	showOrNot(reset_stats_button, false);
	showOrNot(enter_name, true);
	console.log("check 4");
	showOrNot(throw_choice,false);
	console.log("check 5");
	showOrNot(game_results,false);
});

function who_wins(player, bowser){
	p.incrementGames();
	v.incrementGames();

	if(player=="rock"){
		if(bowser=="rock") return "It's a tie!";
		else if(bowser=="paper")return bowserWins();
		else return playerWins();
	}

	if(player=="paper"){
		if(bowser=="paper") return "It's a tie!";
		else if(bowser=="scissors")return bowserWins();
		else return playerWins();
	}

	if(player=="scissors"){
		if(bowser=="scissors") return "It's a tie!";
		else if(bowser=="rock") return bowserWins();
		else return playerWins();
	}
}

function playerChoiceFunction(){
	var player_image = document.getElementById("player_throw_image");
	var bowser_image = document.getElementById("bowser_throw_image");
	var pc = document.getElementById("drop_down_choice").value;
	document.getElementById("player_choice_span").innerHTML=pc;
	if(pc==" "){
		showOrNot(player_image,false);
		showOrNot(bowser_image,false);
		return "blank";
	}
	else if(pc=="rock"){
		showOrNot(player_image,true);
		player_image.setAttribute("src","Images/playerRock.png");
		player_image.setAttribute("alt","Rock");

		p.incrementRock();

		return "rock";
	}
	else if(pc=="paper"){
		showOrNot(player_image,true);
		player_image.setAttribute("src","Images/playerPaper.png");
		player_image.setAttribute("alt","Paper");

		p.incrementPaper();

		return "paper";
	}
	else{
		showOrNot(player_image,true);
		player_image.setAttribute("src","Images/playerScissors.png");
		player_image.setAttribute("alt","Scissors");

		p.incrementScissors();

		return "scissors";
	}
}

function bowserChoiceFunction(){
	var bowser_image = document.getElementById("bowser_throw_image");
	var rand = Math.random();
	if(rand<0.33){
		showOrNot(bowser_image,true);
		bowser_image.setAttribute("src","Images/bowserRock.png");
		bowser_image.setAttribute("alt","Rock");

		v.incrementRock();

		document.getElementById("villain_choice_span").innerHTML="rock";

		return "rock";
	}
	else if(rand<=.66){
		showOrNot(bowser_image,true);
		bowser_image.setAttribute("src","Images/bowserPaper.png");
		bowser_image.setAttribute("alt","Paper");

		v.incrementPaper();

		document.getElementById("villain_choice_span").innerHTML="paper";

		return "paper";
	}
	else{
		showOrNot(bowser_image,true);
		bowser_image.setAttribute("src","Images/bowserScissors.png");
		bowser_image.setAttribute("alt","Scissors");

		v.incrementScissors();

		document.getElementById("villain_choice_span").innerHTML="scissors";

		return "scissors";
	}
}

function bowserWins(){
	p.incrementLosses();
	p.updateRatio();
	v.incrementWins();
	return "B(r)owser wins!";
}

function playerWins(){
	p.incrementWins();
	p.updateRatio();
	v.incrementLosses();
	var msg = currentPlayer+" wins!"
	showOrNot(document.getElementById("fireworks"),true);
	return msg;
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

function reduceRatio(wins,losses){
	for(var i=2; i<=wins; i++){
		if(wins%i==0 && losses%i==0){
			wins=wins/i;
			losses=losses/i;
			i=1;
		}
	}
	return wins+":"+losses;
}

function showOrNot(div_element, show){
	if(show&&div_element.classList.contains("hidden")){
		div_element.classList.remove("hidden");
		div_element.classList.add("visible");
	}
	else if(!show&&div_element.classList.contains("visible")){
		div_element.classList.remove("visible");
		div_element.classList.add("hidden");
	}
}

function reset(){
	currentPlayer="";
	localStorage.setItem("currentPlayer",currentPlayer);
	document.getElementById("drop_down_choice").value=" ";
	updateStat("player_name_span",currentPlayer);
	updateStat("player_rock_span",0);
	updateStat("player_paper_span",0);
	updateStat("player_scissors_span",0);
	updateStat("total_games_span",0);
	updateStat("total_wins_span",0);
	updateStat("win_loss_ratio_span",0);
}
