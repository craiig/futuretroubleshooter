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

var fs = require('fs');

var WordPOS = require('wordpos'),
    wordpos = new WordPOS();

var natural = require('natural'),
	wordnet = new natural.WordNet();

var nlp = require('nlp_comprimise');

nounInflector = new natural.NounInflector();


/*var c = function(a, b){ //concat WITH SPACE (if needed)
	if(a == "" || b == ""){
		return a + b;
	} else {
		return a + " " + b
	}
}*/
var c = function(){ //concat all arguments passed in
	var s = []
	for(var i=0; i<arguments.length; i++){ //directly using arguments.join(" ") didn't seem to work.
		if(arguments[i] != ""){
			s.push(arguments[i])
		}
	}
	a = s.join(" ")
	return a;
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

var symplural = function(a){
	//how bad is this?
	sing = nlp.singularize(a);
	if(sing){
		return nlp.pluralize(sing);
	} else {
		return nlp.pluralize(a);
	}
}

var symsingle = function(a){
	//how bad is this?
	sing = nlp.singularize(a);
	if(sing){
		return sing;
	} else {
		return a;
	}
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
		"Oculus",
		"Turbo",
		"Maximum",
		"Minimum",
		"Average",
		"Acceptable",
		"Transparent",
		"Dreamy",
		"Delectable",
		"Delicious",
		"Sunbeam",
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
		"Cyberrealities",
		"Tarantulas",
		"Space Cakes",
		"Cephalopods",

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
		"obsessive",
		"crowdfunded",
		"big data",
		"post-scarcity",
		"terrible",
		"screaming",
		"blithely",
		"cultured",
		"owl-faced",
		"chemical",
		"acidic",
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
		"makerfaires",
		"hackathons",
		"biodogs",
		"commandos",
		"gamedevs",
		"turbulence",
		"dataleeches",
		"cybrarians",
		"commentspam",
		"cybercriminals",
		"brand ambassadors",
		"teenage witches",
		"freelancers",
		"nanocyclists",
		"spaceghosts",
		"cyberdentists",
		"cyberdoctors",
		"homeopaths",
		"cyberjugglers",
		"cyber capitalists",
		"cyber communists",
		"cyberdetectives",
		"fembots",
		"vampyres",
	])
}

var cyberfood = function(){
	var a = [
		"nutrient paste",
		"cyberdew",
		"hyperliquour",
		"craft brew",
		"romulan ale",
		"synthahol",
		"cybernoodles",
		"orbitz",
		"cybernerds",
		"hypertomatoes",
		"cyberbeans",
		"beambroth",
		"megacheese",
		"cryomelon",
		"spacebananas",
		"nanoberries",
		"rocket",
		"astro-juice",
		"biobread",
		"biobutter",
		"polybutter",
		"polycake",
		"astrobacon",
		"polymeats",
		"polydairy",
		"polygrains",
		"cryptokimchi",
		"astrokraut",
		"astropickles",
		"roboberries",
		"PIZZA",
		"roast polychicken",
		"potato salad(tm)",
	]
	return s(a);
}

var verb = function(){
	var a = [
		"swizzle",
		"configure",
		"reconfigure",
		"reverse",
		"invert",
		"replace",
		"charge",
		"reboot",
		"use",
		"activate",
		"re-synergize",
		"phase shift",
		"regenerate",
		"traverse",
		"observe",
		"perceive",
		"resleeve",
		"smoke",
		"avoid",
		"dechlorinate",
		"crowdfund",
		"cry into",
		"alienate",
		"spoon",
		"eat",
		"bake",
		"crowdsource",
		"move into",
		"brainsteal",
		"spiderize",
		"unicornize",
		"sob into",
		"google talk to",
		"dream of",
		"stuff",
		"cram",
		"scandalize",
		"spacewalk",
		"go swimming with",
		"research modifications to",
		"buy", //a fresh
	]; 

	//.map(function(e){ return e +" "+ noun });
	//a.push("recalculate the "+noun+" matrix");
	//a.push("verify the "+noun+" settings");

	return s(a);
}

var article = function(){
	return s(["the", "some", "a", "your"]);
}


//futureadj
var adj = function(){
	return s([
		"plasma",
		"warp",
		"wavelet",
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
		"color",
		"gamma",
		"tachyon",
		"spacetime",
		"memetic",
		"lagrangian",
		"bionic",
		"crypto",
		"bikini",
		"empty",
		"overflow",
		"super",
		"energy",
		"nanobot",
		"voight-kampff",
		"wearable",
		"culture",
		"sex-ray",
		"dinosaur",
		"demon",
		"euclidean",
		"non euclidean",
		"practical",
		"declarative",
		"party",
		"command",
		"sentient",
		"biogarbage",
	])
}

var futurepeople = function(){
	var a = [
		"jazzpunk",
		"cyberpunk",
		"engineer",
		"cane toad",
	]
}

var noun = function(){
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
		"moderator",
		"modem",
		"modulator",
		"dispenser",
		"guidance vector",
		"wizard",
		"droid",
		"blaster",
		"battlesuit",
		"robot",
		"stardrive",
		"warphole",
		"tank",
		"cargosweater",
		"tube",
		"sleeve",
		"scope",
		"mixtape",
		"cybersweater",
		"nanosweater",
		"makerfaire",
		"hackspace",
		"roadtrip",
		"cyberweb",
		"flange",
		"casserole",
		"cyberchip",
		"astro-juice",
		"starship",
		"coffeebot",
		"gurubot",
		"pointer",
		"space cat",
	];
	//.map(function(e){ return c(futureadj(), e)}) //combine all nouns here with a randomly selected future adjective
	return s(a);
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

/*** some simple assembly functions to build larger words*/
var nounphrase = function(){
	return s([
		pronoun(),
	]);
};

var adjnoun = function(){
	return c(adj(), noun());
}
var verbtheadjnoun = function(word){
	if(word){
		return c(verb(), article(), word);
	} else {
		return c(verb(), article(), adj(), noun());
	}
}

/** phrase generation */
var futurephrase = function(){
	//<phrase> ::= <futureverb> " " <article> " " <futureadj> " " <futurenoun> ;

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
		return c( e, verb(), article(), adj(), noun() );
	});

	a.push( "double check " + c(article(), adj(), noun()) +" for "+ c(futurebadadj(), futurebadnoun()) );
	a.push("sounds like you've got "+ c( futurebadadj(), futurebadnoun()) );
	a.push( "oh shit! " + c(futurebadadj(), futurebadnoun()) + "!");
	a.push( "you are your own " + adjnoun() );
	a.push( "disregard " + c(futurebadadj(), futurebadnoun()) + " acquire " + adjnoun());
	a.push( "DIY " + s([ c(futurebadadj(), futurebadnoun()),  adjnoun()])  )
	a.push( "420 " + verbtheadjnoun() + " every day" );
	
	a.push( (Math.round(100 * Math.random()) )+ " reasons why you should " + verbtheadjnoun());
	a.push( "monetize " + c(futurebadadj(), futurebadnoun()) );
	a.push(c(futurebadadj(), futurebadnoun()) + ": ruining " + p( adjnoun() ) + "?")
	//a.push( "too " + futureadj() + "; didn't " + verbtheadjnoun( adjnoun() ))

	//products
	a.push("promoted tweet: buy a new " + adjnoun()); // + " from " + makecompany());
	a.push("new review - " + adjnoun()); // + " from " + makecompany());
	a.push(adjnoun() + " unboxing video "); // + makecompany());
	//a.push("rumor - " + c(adjnoun(), s(["announcement", "IPO"])) + s( ["", " from " + makecompany()] ) );
	a.push(s(["don't panic", "rumor", "breaking"]) + " - " + c(adjnoun(), future_events()) + s( ["", " from " + makecompany()] ) );
	a.push(adjnoun() + " will disrupt " + adjnoun() + " market");
	a.push(p(adjnoun()) + " are mega-trending with " + c( futurebadadj(), futurebadnoun()) );
	

	var x = verbtheadjnoun();
	var y_noun = adjnoun();
	var y = c( verb(), article(), y_noun );
	a.push("i have come here to " + y + " and " + x + ", and i'm all outta " + p(y_noun))

	a.push("can you believe these "+ p(adjnoun()) + s(["", " have "+c( futurebadadj(), futurebadnoun())]))

	var subreddit = c(futurebadadj(), s([p(adjnoun()), futurebadnoun()]) )
	a.push(s(["into", "got", "like", "problems with"]) + " " + subreddit +"? subscribe to /r/"+ nodash(nospace(subreddit)));

	var bad = c( futurebadadj(), futurebadnoun());
	var good = adjnoun();
	var what = s(["harm", "help", "aid", "stop", "block", "support", "correlate with"])
	a.push("new study finds " + bad + " "+what+" " + p(good));

	a.push("do you really need "+s([p(adjnoun()), c(futurebadadj(), futurebadnoun())]) + "?");
	a.push("sorry to hear about your "+s([p(adjnoun()), c(futurebadadj(), futurebadnoun())]))

	a.push("some of my best friends are "+s([p(adjnoun()), c(futurebadadj(), futurebadnoun())]))

	//cyber food
	a.push("go to town on your " + cyberfood());
	a.push("dish up the " + cyberfood())
	a.push("spend some time with " + cyberfood());
	//a.push("add " + s([1,2,4]) )
	a.push("having a picnic? bring " + cyberfood());
	a.push("having brunch? i recommend " + cyberfood());
	a.push("cook up a storm with " + cyberfood());
	a.push("BE HEALTHY FOREVER BY EATING " + cyberfood().toUpperCase() );
	a.push("BYO "+ cyberfood().toUpperCase());
	a.push("fresh homemade "+cyberfood());
	a.push("go eat "+cyberfood()+ " on a mountain");

	return s(a);
}

var attach = function(){
	var a = [
		"slap",
		"attach",
		"geneweld",
		"cybertape",
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
		//"quickfix "+word+" with " + verbtheadjnoun( adjnoun() ),
		//word + " seems to be working. just " + verbtheadjnoun( adjnoun() ),
		c(simply(), attach()) + " " + adjnoun()+ " to your " + word,
		//"you don't need " + word +" to "+  verbtheadjnoun( adjnoun() ),
		c(simply(), verbtheadjnoun(word)),
		c(simply(), verbtheadjnoun(word)),
		c(simply(), verbtheadjnoun(word)),
		c(simply(), verbtheadjnoun( word )) + " and then " + verbtheadjnoun( adjnoun() ),
		"disregard " + word + " acquire " + adjnoun(),
	];
	return s(a)
}

var futurequestions = function(term){
	var a = [
		"no",
		"signs point to maybe",
		"signs point to " + adjnoun(),
		"ask again later",
		"without a doubt",
		"dubious",

		//from an 8-ball list
		"it is certain",
		"it is decidedly so",
		"without a doubt",
		"yes definitely",
		"you may rely on it, " + symsingle(futurebadnoun()),
		"as i see it, yes",
		"most likely",
		"outlook good if you "+verbtheadjnoun( adjnoun() ),
		"yes",
		"signs point to yes",
		"reply hazy try again after you "+verbtheadjnoun( adjnoun() ),
		verbtheadjnoun( adjnoun() ) + " and ask again later",
		//"better not tell you now",
		"better not tell you before you "+verbtheadjnoun( adjnoun() ),
		"cannot predict now",
		"concentrate on " + c(futurebadadj(), symplural(futurebadnoun())) + " and ask again",
		"don't count on it, " + nlp.singularize(futurebadnoun()),
		"my reply is no",
		"my "+ c(futurebadadj(), symplural(futurebadnoun())) + " say no",
		"outlook not so good",
		"very doubtful",
	];
	return s(a);
}


function extract_help(phrase){
	// help me with X
	// help me X
	// help with X
	//returns X
	res = [
		/help .*? with my (.*)/igm,
		/help .*? with (.*)/igm,
		/help with your (.*)/igm,
		/help with my (.*)/igm,
		/help with (.*)/igm,
		/help me (.*)/igm,
		//help (.*)/igm,
	]

	for(i in res){
		re = res[i];
		match = re.exec(phrase);
		if(match){
			return match[1].replace(/[\.?]/g, ""); //eliminate punctuation
		}
	}
	return null;
}

function is_question(phrase){
	phrase = phrase.trim();
	if(phrase.slice(-1) == "?"){
		return true;
	} else {
		return false;
	}
}

function get_nn(terms){
	//helper to detect NN in a tagged sentence from nlp
	var ret = []
	for(var i in terms){
		term = terms[i];
		if(term.pos.tag == "NN" || term.pos.tag == "NNS"){
			ret.push(term);
		}
	}
	return ret;
}

function get_jj(terms){
	//helper to detect NN in a tagged sentence from nlp
	var ret = []
	for(var i in terms){
		term = terms[i];
		if(term.pos.tag == "JJ"){
			ret.push(term);
		}
	}
	return ret;
}

function terms_fix(terms){
	//post process terms to remove some annoying things
	for(var i in terms){
		var term = terms[i];
		term.word = term.word.replace(/^you\s?/i, "");

		if(term.word == ""){
			terms.splice(i);
		}
	}

	return terms;
}

function make_response(phrase, callback){
	//eliminate some annoying stuff
	var phrase = phrase.replace(/\s*@?spacehelper/g, "");
	phrase = phrase.replace(/https?:\/\/[^\s]*/g, "");

	//parse this with the help_with extractor
	var help_with = extract_help(phrase);

	//try to find entities
	var sentences = nlp.sentences(phrase);

	//split up sentences even more, because I disagree with the handling of questions by nlp
	for(var i in sentences){
		//sentences.splice(i, 1, sentences[i].split("?"));

		//fix up the split to  include the question mark (helps out nlp)
		var split = sentences[i].split("?");
		if(split.length > 1){
			for(var j=0; j< (split.length-1); j++){
				split[j] = split[j] + "?"
			}
		}

		Array.prototype.splice.apply(sentences, [i,1].concat(split)); //omg
	}

	//combine all terms together from the named entity spotter
	var terms = []
	for(var i in sentences){
		var words = nlp.spot(sentences[i]);
		if(words.length){
			for(var w in words){
				terms.push(words[w]);
			}
		}
	}

	terms = terms_fix(terms); //fix up terms here beause we might drop some

	//extract terms directly from the tags if we're out of luck with the above
	if(terms.length == 0){
		var tags = nlp.tag(phrase);
		var nn = terms_fix(get_nn(tags));
		var jj = get_jj(tags);
		var candidates;

		if(nn.length > 0){
			candidates = nn;
		} else if(jj.length > 0){
			candidates = jj;
		}

		for(var i in candidates){
			tag = candidates[i];
			push = 0;
			tag.word = tag.word.replace( /[.\?!]/g, ""); //clean up the word a bit
			terms.push(tag);
		}
	}

	terms = terms_fix(terms); //fix up terms again

	//select best term (if any)
	/*var best_term;
	if(terms.length > 0){
		best_term = s(terms).word; //randomly select a term
	}*/

	//debug section
	/*console.log("phrase: "+phrase);
	if(help_with){
		console.log("help with: "+help_with)
	}

	console.log("is question: " + "" + (is_question(phrase) ? "yes" : "no")  );
	console.log("sentences:");
	console.log(sentences);
	//console.log("nlp tag:");
	//console.log(nlp.tag(phrase));
	console.log("terms:")
	console.log(terms);
	console.log("--")*/


	//figure out potential responses
	var potential = [];

	//prefer help with over all else:
	if(help_with){
		potential.push( futurehelpwith(help_with) );
	}

	if(terms.length > 0){
		for(var i in terms){
			var t = terms[i];
			potential.push( futurehelpwith(t.word) );
		}
	}

	if (is_question(phrase)){
			potential.push( futurequestions() );
		}
	if(potential.length == 0){
		//if (is_question(phrase)){
		//	potential.push( futurequestions(best_term) );
		//}
		potential.push( futurephrase() );

	}

	callback(s(potential));
}

//figure out if running as a node module or not
if(!module.parent){

	//console.log(makecompany());

	if( 0 ){ //test against all mentions so far
		var mentions = fs.readFileSync('test_mentions.txt');
		var lines = mentions.toString().split("\n");
		for(var i in lines){
			make_response(lines[i], console.log);
		}
	}

	//basic phrasing tests
	//make_response("am i any more intelligent spacehelper?", console.log);
	if( 1 ){
		console.log("------ response tests ------");
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
	make_response("i need help with my coffeemaker", console.log)
	make_response(" aren't you tired? ", console.log)
	make_response("hey there http://derps.com/derps", console.log)
	make_response("help my car won't start", console.log);
	make_response("i need help with my girlfriend", console.log);
	make_response("help me stop your tweets", console.log);
	make_response("are you feeling any more intelligent spacehelper?", console.log);
	}

	//basic tests
	console.log("------ basic tests ------");
	console.log(futurephrase());

	//another way to test: generate until this word appears
	//return
	test_str = "best friends"
	do {
		testphrase = futurephrase();
		//testphrase = futurequestions();
	}
	while( testphrase.toLowerCase().indexOf(test_str.toLowerCase()) == -1 );
	console.log(testphrase)

} else {
	module.exports = {
		get_future_response: make_response,
		get_future : futurephrase,
	}
}
