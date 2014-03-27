var util = require('util');
var readline = require('readline');
var Twit = require('twit');

var config = require('./config.js');

var T = new Twit(config.get())

T.get('statuses/mentions_timeline', { count: 500 }, function(err, reply) {
  for(var i in reply){
    msg = reply[i];
    console.log(msg.text);
  }
})