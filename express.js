var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
const { Z_UNKNOWN } = require('zlib');


//global variable for tweet data
var tweetinfo = []
var searchTweets = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    //tweetinfo = fs.readFileSync('favs.json', 'utf-8').split('\n');
    tweetinfo = JSON.parse(data);
  }

});


 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweets : tweetinfo});
});

//Shows tweet info
app.get('/tweets', function(req, res) {
  //TODO: send tweet info
  var searchKey = req.params.id
  var result = 0;
  for(var i = 0; i < tweets.length; i++){
      if(tweets[i].id_str === searchKey){
          result = i
      }
  }

  res.send({tweet: tweets[result]})
});

//Shows searched tweets
app.get('/tweets/searchinfo/:search', function(req, res){
  //TODO: send searched tweets
  var searchKey = req.params.search
  let tweets = tweetinfo;
  let results = [];

  for(var i = 0; i < tweets.length; i++){
    if( tweets[i].id == searchKey){
      results.push(tweets[i]);
    }
  }

  if(results) {
    searchTweets.push(results);
    res.send(results[0]);
  }
  else{
      res.send('Search result not found!');
  }

});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  var tweetId = req.body.tweetId;
  var tweetText = req.body.tweetText;
  

    tweetinfo.push({ 
        id: tweetId,
        text: tweetText,
        created_at: new Date() //"Wed Mar 13 23:01:36 +0000 2013"
    });

    res.send('Successfully created tweet!');
});

//Posts searched tweets
app.get('/tweets/recent-search', function(req, res) {
  //TODO: search a tweet
  if(searchTweets){
    res.send({tweets: searchTweets});
  }
  else{
      res.send('No recent search found!');
  }
});

//Update
app.put('/tweetinfo/:name/:newName', function(req, res) {
  //TODO: update tweets
  var searchKey = req.params.name
  var result = -1;
  let tweets = tweetinfo;
  for(var i = 0; i < tweets.length; i++){
      if(tweets[i].user.name == searchKey){
          result = i
      }
  }
  if(result != -1){
      tweets[result].user.screen_name = req.params.newName
      res.send('Succesfully updated username!');
  }
  else{
      res.send('Username not found!');
  }
});

//Delete 
app.delete('/tweetinfo/:id', function(req, res) {
  //TODO: delete a tweet
  var searchKey = req.params.id
    var result = -1;
    let tweets = tweetinfo;
    for(var i = 0; i < tweets.length; i++){
        if(tweets[i].id == searchKey){
            result = i
        }
    }
    if(result != -1){
      tweetinfo = tweets.filter((tweet)=> tweet.id != searchKey)
      console.log(tweetinfo);
      res.send('Successfully deleted tweet!');
    }
    else{
        res.send('Tweet ID was not found!');
    }

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});