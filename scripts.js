toggleVisibility(document.getElementById("show_rules_button"), document.getElementById("rules"));
toggleVisibility(document.getElementById("show_stats_button"), document.getElementById("stats"));

var player_name = localStorage.getItem("player_name");

var player_rock = localStorage.getItem("player_rock");
var player_paper = localStorage.getItem("player_paper");
var player_scissors = localStorage.getItem("player_scissors");

var bowser_rock = localStorage.getItem("bowser_rock");
var bowser_paper = localStorage.getItem("bowser_paper");
var bowser_scissors = localStorage.getItem("bowser_scissors");

var total_games = localStorage.getItem("total_games");
var total_wins = localStorage.getItem("total_wins");
var total_losses = localStorage.getItem("total_losses");
var win_loss_ratio = localStorage.getItem("win_loss_ratio");

var feedback_message = document.getElementById("feedback_message");

if(!player_name){
	showOrNot(throw_choice,false);
	showOrNot(enter_name,true);
	showOrNot(feedback_message,true);
	showOrNot(document.getElementById("log_out_button"),false);
	feedback_message.innerHTML="Enter a name to proceed.";
	feedback_message.classList.remove("good");
	feedback_message.classList.add("bad")
}
else{
	updateNames(player_name);
	updateAllStats();
	showOrNot(throw_choice,true);
	showOrNot(enter_name,false);
	showOrNot(feedback_message,false);
}

var name_button = document.getElementById("name_button");
name_button.addEventListener("click", function(){
	var p_name = document.getElementById("name_textfield").value;
	localStorage.setItem("player_name", p_name);
	updateNames(localStorage.getItem("player_name"));
	player_name=localStorage.getItem("player_name");
	showOrNot(throw_choice,true);
	showOrNot(enter_name,false);
	feedback_message.innerHTML="Name successfully saved.";
	feedback_message.classList.remove("bad");
	feedback_message.classList.add("good");
	showOrNot(log_out_button,true);
});

//when game played
var throw_button=document.getElementById("throw_choice_button");
throw_button.addEventListener("click", function(){feedback_message;
	var win_message = document.getElementById("game_result_text");
	var player_choice = player_choice_function();
	if(player_choice=="blank"){
		feedback_message.innerHTML="Please select rock, paper, or scissors";
		feedback_message.classList.remove("good");
		feedback_message.classList.add("bad")
		showOrNot(feedback_message,true);
		showOrNot(game_results,false);
	}
	else{
		var bowser_choice = bowser_choice_function();
		win_message.innerHTML=who_wins(player_choice,bowser_choice);
		showOrNot(feedback_message,false);
		showOrNot(game_results,true);
		showOrNot(throw_choice,false);
	}
	updateAllStats();
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
	feedback_message.innerHTML="Your data will be deleted forever. Are you sure you want to log out?";
	feedback_message.classList.remove("good");
	feedback_message.classList.add("bad");
	showOrNot(feedback_message,true);
	showOrNot(log_out_button, false);
	showOrNot(reset_stats_button, true);
});

var reset_stats_button=document.getElementById("reset_stats_button");
reset_stats_button.addEventListener("click", function(){
	resetStorage();
	feedback_message.innerHTML="Enter a name to proceed.";
	showOrNot(reset_stats_button, false);
	showOrNot(enter_name, true);
	showOrNot(throw_choice,false);
	showOrNot(stats,false);
	showOrNot(game_results,false);
});

function who_wins(player, bowser){
	var tg = parseInt(localStorage.getItem("total_games"))+1;
	localStorage.setItem("total_games",tg);

	if(player=="rock"){
		if(bowser=="rock") return "It's a tie!";
		else if(bowser=="paper")return bowser_wins();
		else return player_wins();
	}

	if(player=="paper"){
		if(bowser=="paper") return "It's a tie!";
		else if(bowser=="scissors")return bowser_wins();
		else return player_wins();
	}

	if(player=="scissors"){
		if(bowser=="scissors") return "It's a tie!";
		else if(bowser=="rock") return bowser_wins();
		else return player_wins();
	}
}

function player_choice_function(){
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

		var r = 0;
		r = parseInt(localStorage.getItem("player_rock"))+1;
		localStorage.setItem("player_rock",r);

		return "rock";
	}
	else if(pc=="paper"){
		showOrNot(player_image,true);
		player_image.setAttribute("src","Images/playerPaper.png");
		player_image.setAttribute("alt","Paper");

		var p = 0;
		p = parseInt(localStorage.getItem("player_paper"))+1;
		localStorage.setItem("player_paper",p);

		return "paper";
	}
	else{
		showOrNot(player_image,true);
		player_image.setAttribute("src","Images/playerScissors.png");
		player_image.setAttribute("alt","Scissors");

		var s = 0;
		s = parseInt(localStorage.getItem("player_scissors"))+1;
		localStorage.setItem("player_scissors",s);

		return "scissors";
	}
}

function bowser_choice_function(){
	var bowser_image = document.getElementById("bowser_throw_image");
	var rand = Math.random();
	if(rand<0.33){
		showOrNot(bowser_image,true);
		bowser_image.setAttribute("src","Images/bowserRock.png");
		bowser_image.setAttribute("alt","Rock");

		var r = 0;
		r = parseInt(localStorage.getItem("bowser_rock"))+1;
		localStorage.setItem("bowser_rock",r);

		document.getElementById("bowser_choice_span").innerHTML="rock";

		return "rock";
	}
	else if(rand<=.66){
		showOrNot(bowser_image,true);
		bowser_image.setAttribute("src","Images/bowserPaper.png");
		bowser_image.setAttribute("alt","Paper");

		var p = 0;
		p = parseInt(localStorage.getItem("bowser_paper"))+1;
		localStorage.setItem("bowser_paper",p);

		document.getElementById("bowser_choice_span").innerHTML="paper";

		return "paper";
	}
	else{
		showOrNot(bowser_image,true);
		bowser_image.setAttribute("src","Images/bowserScissors.png");
		bowser_image.setAttribute("alt","Scissors");

		var s = 0;
		s = parseInt(localStorage.getItem("bowser_scissors"))+1;
		localStorage.setItem("bowser_scissors",s);

		document.getElementById("bowser_choice_span").innerHTML="scissors";

		return "scissors";
	}
}

function bowser_wins(){
	var lg = parseInt(localStorage.getItem("total_losses"))+1;
	localStorage.setItem("total_losses",lg);
	var wlr = reduceRatio(localStorage.getItem("total_wins"),lg);
	localStorage.setItem("win_loss_ratio",wlr);
	return "B(r)owser wins!";
}

function player_wins(){
	var wg = parseInt(localStorage.getItem("total_wins"))+1;
	localStorage.setItem("total_wins",wg);
	var lg = parseInt(localStorage.getItem("total_losses"));
	var wlr = reduceRatio(localStorage.getItem("total_wins"),lg);
	localStorage.setItem("win_loss_ratio",wlr);
	var msg = player_name+" wins!"
	showOrNot(document.getElementById("fireworks"),true);
	return msg;
}

function updateNames(p_name){
	var name_elements=document.getElementsByClassName("player_name_span");
	for(var i=0; i<name_elements.length; i++){
		name_elements[i].innerHTML=p_name;
	}
	player_name = localStorage.getItem("player_name");
}

function updateStats(stat_span, stat){
	var elements=document.getElementsByClassName(stat_span);
	for(var i=0; i<elements.length; i++){
		elements[i].innerHTML=stat;
	}
}

function updateAllStats(){
	updateStats("player_rock_span",localStorage.getItem("player_rock"));
	updateStats("player_paper_span",localStorage.getItem("player_paper"));
	updateStats("player_scissors_span",localStorage.getItem("player_scissors"));
	updateStats("bowser_rock_span",localStorage.getItem("bowser_rock"));
	updateStats("bowser_paper_span",localStorage.getItem("bowser_paper"));
	updateStats("bowser_scissors_span",localStorage.getItem("bowser_scissors"));
	updateStats("total_games_span",localStorage.getItem("total_games"));
	updateStats("total_wins_span",localStorage.getItem("total_wins"));
	updateStats("win_loss_ratio_span",localStorage.getItem("win_loss_ratio"));
}

function reduceRatio(a,b){
	for(var i=2; i<=a; i++){
		if(a%i==0 && b%i==0){
			a=a/i;
			b=b/i;
			i=2;
		}
	}
	return a+":"+b;
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

function toggleVisibility(button_element, div_element){
	button_element.addEventListener("click", function(){
	  if(div_element.classList.contains("hidden")){
	    div_element.classList.remove("hidden");
	    div_element.classList.add("visible");
	  }
	  else{
	    div_element.classList.remove("visible");
	    div_element.classList.add("hidden");
	  }
	});
}

function resetStorage(){
	localStorage.setItem("player_name","")
	localStorage.setItem("player_rock",0);
	localStorage.setItem("player_paper",0);
	localStorage.setItem("player_scissors",0);
	localStorage.setItem("bowser_rock",0);
	localStorage.setItem("bowser_paper",0);
	localStorage.setItem("bowser_scissors",0);
	localStorage.setItem("total_games",0);
	localStorage.setItem("total_wins",0);
	localStorage.setItem("total_losses",0);
	localStorage.setItem("win_loss_ratio",0);
	updateAllStats();
	updateNames(localStorage.getItem("player_name"));
}
