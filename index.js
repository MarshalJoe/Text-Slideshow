var app = require('express')();
var server = require('http').Server(app);
var twilio = require('twilio');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// Handle an incoming request from Twilio
app.post('/message', function(request, response) {
    //create a TwiML response object. This object helps us generate an XML
    //string that we will ultimately return as the result of this HTTP request
    var twiml = new twilio.TwimlResponse();
 
    // prepare the TwiML response
    twiml.message(function() {
        this.body('Text received!');
    });

    console.log("Message: " + request.body.Body);
    console.log(request.body.NumMedia);

    if (request.body.NumMedia > 0) {
        io.emit("picture", request.body.MediaUrl0)
    }

    // Render an XML response
    response.type('text/xml');
    response.send(twiml.toString());
});

server.listen(3000, function(){
  console.log('listening on port 3000');
});