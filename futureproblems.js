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

var WordPOS = require('wordpos'),
    wordpos = new WordPOS();

var natural = require('natural'),
	wordnet = new natural.WordNet();


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
		"cyberdragons",
	])
}

var futureverbs = function(noun){
	var a = [
		"configure the",
		"reconfigure the",
		"reverse polarity of the",
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
		"resleeve the",
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
		"sleeve",
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

var simply = function(){
	var a = [
		"just",
		"simply",
		"clearly just",
		"look just",
		"carefully"
	];
	return s(a);
}

var futurehelpwith = function(word){
	var a = [
		//"quickfix "+word+" with " + futureverbs( futurenouns() ),
		//word + " seems to be working. just " + futureverbs( futurenouns() ),
		"you don't need " + word +" to "+  futureverbs( futurenouns() ),
		c(simply(), futureverbs( word )),
		c(simply(), futureverbs( word )),
		c(simply(), futureverbs( word )) + " and then " + futureverbs( futurenouns() ),
	]
	return s(a)
}


function wordpos_filter(phrase, callback){
	//clean up the given phrase using wordpos to isolate a couple nouns
	//callback(words)
	wordpos.getPOS(phrase, function(results){
		console.log(results);

		var orig_nouns = results.nouns.slice(0);
		var nouns = results.nouns;
		results.nouns = []

		for( proparray in results ){
			for(i in results[proparray]){
				var word = results[proparray][i]
				var pos = nouns.indexOf(word)
				if(pos != -1){
					nouns.splice(pos, 1);
				}
			}
		}

		if(nouns.length == 0){ //fallback incase we eliminated all nouns
			if(results.rest.length > 0){
				for(i in results.rest){
					nouns.push(results.rest[i])
				}
			} else {	
				nouns = orig_nouns
			}
		}

		//filter out other words
		filter = ["help"]
		for( i in nouns ){
			w = nouns[i]
			pos = filter.indexOf(w)
			if(pos != -1){
				nouns.splice(pos, 1);
			}
		}

		//console.log(nouns.join(" "))
		callback( nouns.join(" ") )
	});
}

function extract_help(phrase){
	// help me with X
	// help me X
	// help with X
	//returns X
	res = [
		/help .*? with (.*)/gm,
		/help me (.*)/gm,
		/help (.*)/gm,
	]

	for(i in res){
		re = res[i];
		match = re.exec(phrase);
		if(match){
			return match[1];
		}
	}
}

function make_response(phrase, callback){
	//glue together the text extractor and wordpos filter
	//phrase = extract_help(phrase);

	wordpos_filter(phrase, function(noun){
		if(noun == ""){ //couldn't get anything from the filter
			console.log("wordpos-filter couldn't deal with: "+phrase);
			callback(futurephrase())
		} else {
			callback(futurehelpwith(noun));
		}
	});
}

//figure out if running as a node module or not
if(!module.parent){

	console.log("help @spacehelper how do I go there ".replace(/@\w*/g, ""))

	//make_response( "help @spacehelper ", console.log)
	return;
	//phrasing tests
	make_response("how best to handle an overpopulated airbnb booking for a week?", console.log)
	make_response("can you really help me with stuff?", console.log)
	make_response("help me make coffee", console.log)
	make_response("help me with escaping from space prison", console.log);
	make_response("help me get to mars", console.log);
	make_response("help amy", console.log);
	make_response("help me eat candy", console.log);
	make_response("help my car won't start", console.log);
	make_response("i need help with my girlfriend", console.log);
	make_response("help me stop your tweets", console.log);
	make_response("i need help with escaping from space prison", console.log);

	//basic tests
	console.log(futurephrase());

	//another way to test: generate until this word appears
	return
	test_str = "sleeve"
	do {
		testphrase = futurephrase()	
	}
	while( testphrase.indexOf(test_str) == -1 )
	console.log(testphrase)

} else {
	module.exports = {
		get_future_response: make_response,
		get_future : futurephrase,
	}
}