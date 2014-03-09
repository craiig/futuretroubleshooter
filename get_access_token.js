/* cheap script to get the access token and secret from twitter for an arbitrary account


*/

var OAuth = require('oauth').OAuth;

var config = require('./config.js');
config = config.get();

var OAUTH_CONFIG = {
  RequestTokenUrl : "https://api.twitter.com/oauth/request_token",
  AccessTokenUrl  : "https://api.twitter.com/oauth/access_token",
  Version         : "1.0",
  Method          : "HMAC-SHA1"
};


var consumerKey = config.consumer_key
var consumerSecret = config.consumer_secret

oa = new OAuth(
    OAUTH_CONFIG.RequestTokenUrl,
    OAUTH_CONFIG.AccessTokenUrl,
    consumerKey,
    consumerSecret,
    OAUTH_CONFIG.Version,
    null,
    OAUTH_CONFIG.Method
  );

oa.getOAuthRequestToken(function(err, token, token_secret, results){

      var url = "http://twitter.com/oauth/authorize?oauth_token=" + token;
      var stdin = process.openStdin();
      stdin.setEncoding('utf8');
      process.stdout.write('please visit ' + url + ' to get verification code.\n');
      process.stdout.write('input verification code: ');
      stdin.on('data', function (chunk) {
        var verifier = chunk.split('\n')[0];
        oa.getOAuthAccessToken(
          token, token_secret, verifier,
          function(error, akey, asecret, results2){
            	console.log("access key: "+akey)
            	console.log("access secret: "+asecret)
          }
        );
      });
    
  });