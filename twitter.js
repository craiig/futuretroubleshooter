var util = require('util');
var readline = require('readline');
var Twit = require('twit');

var config = require('./config.js');

var botaccount = "spacehelper"
var tweetInterval = 120 * (60 * 1000); //in milliseconds

var thefuture = require('./futureproblems.js')

var T = new Twit(config.get())

var stream = T.stream('user',  {replies: "all", with: "user"})

stream.on('connect', function (request) {
  console.log("connected to twitter!");
  startCommand();
})

stream.on('disconnect', function (disconnectMessage) {
  console.log("disconnected from twitter!");
  console.log(disconnectMessage);
})

stream.on('user_event', function (e) {
    console.log("event: "+e.event+" from: "+e.source.screen_name);
    if(e.target_object){
        console.log("\t "+e.target_object.user.screen_name+": "+e.target_object.text)
    }
    //console.log(e);
})

//helper function to make tweets
function postTweet(msg){
    console.log("posting tweet: ")
    console.log(msg)
    T.post('statuses/update', msg, function(err, reply) {
        //  ...
        if(err != null){
            console.log("error posting response: ")
            console.log("post:")
            console.log(post)
            console.log("err:")
            console.log(err);
            console.log("reply:")
            console.log(reply);
        }
    })
}

//set up response event
stream.on('tweet', function(data) {
	if(data.in_reply_to_screen_name == botaccount){
        console.log("message from "+data.user.screen_name+": "+data.text);
        //console.log(util.inspect(data));

        if( data.text.indexOf("help me") != -1 || data.text.indexOf("help with") != -1 ){
            console.log("\tHELP REQUESTED: ");

            var post = {
                status: "@"+data.user.screen_name+ " " + thefuture.get_future(),
                in_reply_to_status_id: data.id_str,
            }
            postTweet(post);
        }
        
	}
});

//set up repeat tweeting
var repeatTweet = setInterval(function(){
    var post = {
        status: thefuture.get_future()
    }
    postTweet(post)
}, tweetInterval);

//set up console behaviour
function startCommand(){
    var help = "(g)enerate phrase - (p)ost last generated phrase - (help) - (c)heck autotweet status - (tweet) - (q)uit"
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log(help)
    rl.setPrompt("spacehelper$ ")
    rl.prompt()

    var lastPhrase = -1

    rl.on('line', function(cmd){
        tokens = cmd.split(" ")
        switch(tokens[0]){
            case "q":
                rl.close();
                process.exit();
                break;
            case "help":
            case "h":
                console.log(help);
                break;
            case "g":
                lastPhrase = thefuture.get_future();
                console.log( lastPhrase )
                break;
            case "p":
                if(lastPhrase != -1){
                    var post = {
                        status: lastPhrase
                    }
                    postTweet(post)
                } else {
                    console.log("generate a phrase first!")
                }
                break;
            case "c":
                console.log(repeatTweet);
                break;
            case "tweet":
                var post = {
                    status: tokens.slice(1).join(" ")
                }
                postTweet(post)
                break;
        }

        rl.prompt()
    })
}
