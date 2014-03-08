// construct phrases out of a bunch of technobabble
// to get started, look at futurephrase()
// basically a bunch of hand coded random generation paths

// utilities to help with generation:
// s(array) will randomly select a phrase from the array
// c(a,b) will combine two strings while ensuring there is only one space

/* credit where credit's due:
some words sourced from: http://www.catb.org/esr/sf-words/glossary.html
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
	return [
		"",
		"angry",
		"viral",
		"memetic"
	]
}

var futurebadnoun = function(){
	return [
		"techroaches",
		"nanobots",
		"selfies"
	]
}

var futureverbs = function(noun){
	a = [
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
		"synergize the",
	].map(function(e){ return e +" "+ noun });
	a.push("recalculate the "+noun+" matrix");
	a.push("verify the "+noun+" settings");
	a.push("double check the "+noun+" for "+ c(s(futurebadadj()), s(futurebadnoun())) );
	return a;
	//.push("re-calculate the "+noun+" matrix")
}

var futureadj = function(){
	return [
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
		"memetic"
	]
}

var futurenouns = function(){
	a = [
		"coil",
		"reactor",
		"coil converter",
		"control",
		"network",
		"interface",
		"divider",
		"dispenser",
		"guide",
		"wizard",
		"blaster",
	].map(function(e){ return s(futureadj()) + " " + e})
	return a
}

var futurephrase = function(){
	return s(futureverbs( s(futurenouns()) )) ;
}

console.log(futurephrase());