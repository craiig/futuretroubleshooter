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

nounInflector = new natural.NounInflector();


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

var sp = function(dict){ //randomly return an item based on a probability
	/*{
		0.3 : "hello",
		0.7 : "hi there",
		1 : "yes",
	}*/

	var rnd = Math.random(); // 0-1 = 0.1342143562
	//console.log(rnd)
	for(var k in dict){
		//console.log(k)
		if( rnd > k ){
			return dict[k];
		}
	}
	return dict[1]; //default
}

var p = function(s){
	//pluralize
	return nounInflector.pluralize(s)
}

var nospace = function(s){
	return s.replace(/\s/g, "");
}

var nodash = function(s){
	return s.replace(/-/g, "");
}


var makecompany = function(){
	var first = [
		"Massive",
		"Cyberdyne",
		"Veridian",
		"Omni",
		"Cray",
		"Enron",
		"Arizona",
		"Y",
		"Atlantis",
		"Chrono",
		"Martian",
		"Wayland",
		"Hyper",
		"Venture",
		"Andreessen-Horowitz",
		"Quantum",
		"Oculus"
	]

	var second = [
		//"",
		"Book",
		"Cyberdynamics",
		"Galactic",
		"Systems",
		"Combinator",
		"Dumpmines",
		"HQ",
		"Solutions",
		"X",
		"Vistas",
		"Light",
		"Quantum",
		"Ventures",
		"Telecommunications",
		"Simulations",
		"BioFarms",
		"Cyberrealities"
	]

	var suffix = {
		1: "",
		0.6 : "",
		0.5 : "GMBH",
		0.4 : "LLC",
		0.3 : "Corp",
		0.2 : "TLD",
		0.1 : "Consortium"
	}

	return s(first) + " " + c(s(second), sp(suffix));
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
		"antigen",
		"bikini",
		"nuclear",
		"invisible",
		"self-replicating",
		"chimera",
		"steampunk",
	])
}

var futurebadnoun = function(){
	return s([
		"death cults",
		"techroaches",
		"nanobots",
		"selfies",
		"cyberteens",
		"wireheads",
		"vr junkies",
		"load imbalance",
		"automaton bait",
		"droids",
		"cyberdragons",
		"biodogs",
		"commandos",
		"turbulence",
		"dataleeches",
		"cybrarians",
		"commentspam",
	])
}

var cyberfood = function(){
	var a = [
		"nutrient paste",
		"soylent green",
		"cyberdew",
		"hyperliquour",
		"craft brewed",
		"romulan ale",
		"pan galactic"
	]
}

var futureverbs = function(noun){
	var a = [
		"swizzle the",
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
		"smoke the",
		"avoid the",
	].map(function(e){ return e +" "+ noun });
	a.push("recalculate the "+noun+" matrix");
	a.push("verify the "+noun+" settings");
	
	return s(a);
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
		"bikini",
		"super",
		"energy",
		"nanobot",
		"voight-kampff",
		"wearable",
		"sex-ray",
		"dinosaur",
		"demon",
		"euclidean",
		"non euclidean",
		"practical",
		"declarative",
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
		"shark",
		"cyberjack",
		"grammar",
		"dispenser",
		"guidance vector",
		"wizard",
		"droid",
		"blaster",
		"robot",
		"stardrive",
		"warphole",
		"sleeve",
		"scope",
		"mixtape",
	].map(function(e){ return c(futureadj(), e)}) //combine all nouns here with a randomly selected future adjective
	return s(a)
}

var future_events = function(){
	var a = [
		"announcement",
		"IPO",
		"data leak",
		"security breach",
		"infestation",
		"overflow",
		"cyberflow",

	];
	return s(a);
}

var futurephrase = function(){
	var a = [
		"",
		"maybe you should",
		"you're gonna have to",
		"have you tried to",
		"have you ever tried to",
		"easy. just",
		"manual says to",
		"navigation console recommends to",
		"metaquery wikipedia2 on how to",
		"dust off the encyclowiki for how to",
		"make sure not to",
		"query the dataweb for how to",
		"who doesn't know how to",
		"are you telling me you can't",
	].map(function(e){
		return c(e, futureverbs( futurenouns() ))
	});
	a.push( "double check the "+ futurenouns() +" for "+ c(futurebadadj(), futurebadnoun()) );
	a.push("sounds like you've got "+ c( futurebadadj(), futurebadnoun()) );
	a.push( "oh shit! " + c(futurebadadj(), futurebadnoun()) + "!");
	a.push( "you are your own " + futurenouns() );
	a.push( "disregard " + c(futurebadadj(), futurebadnoun()) + " acquire " + futurenouns());
	a.push( "DIY " + s([ c(futurebadadj(), futurebadnoun()),  futurenouns()])  )
	a.push( "420 " + futureverbs( futurenouns() ) + " every day" );
	a.push( (Math.round(100 * Math.random()) )+ " reasons why you should " + futureverbs( futurenouns() ));
	a.push( "monetize " + c(futurebadadj(), futurebadnoun()) );
	a.push(c(futurebadadj(), futurebadnoun()) + " are ruining " + p( futurenouns() ))
	//a.push( "too " + futureadj() + "; didn't " + futureverbs( futurenouns() ))
	
	//products
	a.push("promoted tweet: buy a new " + futurenouns()); // + " from " + makecompany());
	a.push("new review - " + futurenouns()); // + " from " + makecompany());
	a.push(futurenouns() + " unboxing video "); // + makecompany());
	//a.push("rumor - " + c(futurenouns(), s(["announcement", "IPO"])) + s( ["", " from " + makecompany()] ) );
	a.push(s(["don't panic", "rumor", "breaking"]) + " - " + c(futurenouns(), future_events()) + s( ["", " from " + makecompany()] ) );
	a.push(futurenouns() + " will disrupt " + futurenouns() + " market");
	a.push(p(futurenouns()) + " are mega-trending with " + c( futurebadadj(), futurebadnoun()) );

	var x = futureverbs( futurenouns() );
	var y_noun = futurenouns();
	var y = futureverbs( y_noun );
	a.push("i have come here to " + y + " and " + x + ", and i'm all outta " + p(y_noun))

	a.push("can you believe these "+ p(futurenouns()) + s(["", " have "+c( futurebadadj(), futurebadnoun())]))

	var subreddit = c(futurebadadj(), s([p(futurenouns()), futurebadnoun()]) )
	a.push(s(["into", "got", "like", "problems with"]) + " " + subreddit +"? subscribe to /r/"+ nodash(nospace(subreddit)));

	var bad = c( futurebadadj(), futurebadnoun());
	var good = futurenouns();
	var what = s(["harm", "help", "aid", "stop", "block", "support", "correlate with"])
	a.push("new study finds " + bad + " "+what+" " + p(good));

	a.push("do you really need "+s([p(futurenouns()), c(futurebadadj(), futurebadnoun())]) + "?");

	return s(a);
}

var attach = function(){
	var a = [
		"slap",
		"attach",
		"geneweld",
		"cyber tape",
	];
	return s(a);
}

var simply = function(){
	var a = [
		"",
		"",
		"",
		"",
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
		c(simply(), attach()) + " " + futurenouns()+ " to your " + word,
		"you don't need " + word +" to "+  futureverbs( futurenouns() ),
		c(simply(), futureverbs( word )),
		c(simply(), futureverbs( word )),
		c(simply(), futureverbs( word )),
		c(simply(), futureverbs( word )) + " and then " + futureverbs( futurenouns() ),
		"disregard " + word + " acquire " + futurenouns(),
	]
	return s(a)
}


function wordpos_filter(phrase, callback){
	//clean up the given phrase using wordpos to isolate a couple nouns
	//callback(words)
	wordpos.getPOS(phrase, function(results){
		console.log(results);

		var orig_nouns = results.nouns.slice(0); //make a copy of the original nouns
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
		filter = ["help", "you", "spacehelper"]
		for( i in nouns ){
			w = nouns[i].toLowerCase();
			pos = filter.indexOf(w)
			if(pos != -1){
				nouns.splice(pos, 1);
			}
		}

		console.log(nouns.join(" "))
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

	//console.log(makecompany());

	//phrasing tests
	if( 0 ){	
	make_response("how best to handle an overpopulated airbnb booking for a week?", console.log)
	make_response("can you really help me with stuff?", console.log)
	make_response("help me make coffee", console.log)
	make_response("help me with escaping from space prison", console.log);
	make_response("are you happy?", console.log);
	make_response("What should I batch cook today, spacehelper? I need to prep lunches for the week. Yams? Chicken? Cauliflower?", console.log);
	make_response("Can I take you out for a nice lobster dinner?", console.log);
	make_response("@spacehelper can anything save books?", console.log)
	make_response("@spacehelper can you help me with my temporary insomnia", console.log)
	make_response("Help with your fucked up grammar.", console.log)
	make_response("You know nothing, spacehelper.", console.log)
	make_response("can you give me some advice about dating?", console.log)
	make_response("That sounds really uncomfortable.", console.log)
	make_response("I want you to make more sense. Bad bot!", console.log)
	/* make_response("help my car won't start", console.log);
	make_response("i need help with my girlfriend", console.log);
	make_response("help me stop your tweets", console.log);
	make_response("i need help with escaping from space prison", console.log);*/
	}

	//basic tests
	console.log(futurephrase());

	//another way to test: generate until this word appears
	//return
	test_str = "rumor"
	do {
		testphrase = futurephrase();
	}
	while( testphrase.toLowerCase().indexOf(test_str) == -1 );
	console.log(testphrase)

} else {
	module.exports = {
		get_future_response: make_response,
		get_future : futurephrase,
	}
}