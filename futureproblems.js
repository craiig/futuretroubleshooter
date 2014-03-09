// construct phrases out of a bunch of technobabble
// to get started, look at futurephrase()
// basically a bunch of hand coded random generation paths

// utilities to help with generation:
// s(array) will randomly select a phrase from the array
// c(a,b) will combine two (potentially empty) strings while ensuring there is only one space

/* credit where credit's due:
some words sourced from:
http://www.catb.org/esr/sf-words/glossary.html
http://www.jessesword.com/sf/list/
*/

var c = function(a, b){ //concat WITH SPACE (if needed)
	if(a == "" || b == ""){
		return a + b;
	} else {
		return a + " " + b
	}
}

var s = function(array){ //randomly select an item from an array
	return array[Math.floor(Math.random() * array.length)]
}

var futurebadadj = function(){
	return s([
		"",
		"angry",
		"viral",
		"memetic",
		"sapient",
		"crypto",
		"electromagnetic",
	])
}

var futurebadnoun = function(){
	return s([
		"techroaches",
		"nanobots",
		"selfies",
		"cyberteens",
		"wireheads",
		"vr junkies",
		"load imbalance",
		"automaton bait",
	])
}

var futureverbs = function(noun){
	var a = [
		"configure the",
		"reconfigure the",
		"reverse polarity on the",
		"invert the",
		"replace the",
		"charge the",
		"buy a fresh",
		"reboot the",
		"use the",
		"activate the",
		"re-synergize the",
		"phase shift the",
		"regenerate the",
		"traverse the",
		"research modifications to the",
	].map(function(e){ return e +" "+ noun });
	a.push("recalculate the "+noun+" matrix");
	a.push("verify the "+noun+" settings");
	
	return s(a);
	//.push("re-calculate the "+noun+" matrix")
}

var futureadj = function(){
	return s([
		"plasma",
		"warp",
		"wave",
		"eldritch",
		"habitat",
		"laser",
		"beam",
		"location",
		"android",
		"biosculpture",
		"wizard",
		"dyson",
		"emotion",
		"memetic",
		"hyperspace",
		"FTL",
		"tachyon",
		"spacetime",
		"memetic",
		"lagrangian",
		"bionic",
		"crypto",
		"energy",
		"nanobot",
	])
}

var futurenouns = function(){
	var a = [
		"coil",
		"reactor",
		"engine",
		"coil converter",
		"controller",
		"core",
		"network",
		"interface",
		"divider",
		"grammar",
		"dispenser",
		"guidance vector",
		"wizard",
		"blaster",
		"robot",
		"stardrive",
		"warphole",
		"scope",
	].map(function(e){ return c(futureadj(), e)}) //combine all nouns here with a randomly selected future adjective
	return s(a)
}

var futurephrase = function(){
	var a = [
		"",
		"maybe you should",
		"you're gonna have to",
		"have you tried to",
		"easy. just",
		"manual says to",
		"navigation console recommends to",
		"cybergoogle for how to",
		"make sure not to",
		"query the dataweb for how to",
		"who doesn't know how to",
		"are you telling me you can't"
	].map(function(e){
		return c(e, futureverbs( futurenouns() ))
	});
	a.push( "double check the "+ futurenouns() +" for "+ c(futurebadadj(), futurebadnoun()) );
	a.push("sounds like you've got "+ c( futurebadadj(), futurebadnoun()) );
	a.push( "oh shit! " + c(futurebadadj(), futurebadnoun()) + "!");

	return s(a);
}

var futurehelp = function(word){
	
}

//figure out if running as a node module or not
if(!module.parent){

	console.log(futurehelp("amy"));

	//basic tests
	console.log(futurephrase());

	//another way to test: generate until this word appears
	return
	test_str = "can't"
	do {
		testphrase = futurephrase()	
	}
	while( testphrase.indexOf(test_str) == -1 )
	console.log(testphrase)

} else {
	module.exports = {
		get_future : futurephrase,
	}
}