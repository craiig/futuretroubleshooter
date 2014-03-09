var util = require('util');
var Twit = require('twit');

var config = require('./config.js');

var botaccount = "spacehelper"

var thefuture = require('./futureproblems.js')

/*var twit = new twitter({
    consumer_key: 'STATE YOUR NAME',
    consumer_secret: 'STATE YOUR NAME',
    access_token_key: 'STATE YOUR NAME',
    access_token_secret: 'STATE YOUR NAME'
});*/
var T = new Twit(config.get())

var stream = T.stream('user',  {replies: "all", with: "user"})

stream.on('tweet', function(data) {
	if(data.in_reply_to_screen_name == botaccount){
        console.log("MESSAGE RECEIVED");
        console.log(util.inspect(data));

        if( data.text.indexOf("help") != -1 ){
            console.log("HELP REQUESTED");

            var post = {
                status: "@"+data.user.name+ " " + thefuture.get_future(),
                in_reply_to_status_id: data.id,
            }

            console.log("posting:");
            console.log(post);

            T.post('statuses/update', post, function(err, reply) {
                //  ...
                console.log("---send status---")
                console.log("err:")
                console.log(err);
                console.log("reply:")
                console.log(reply);
                console.log("----")
            })
        }

        
	}
});
