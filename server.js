var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.render('chat.ejs');
});

io.on('connection', function(socket){
	console.log('A user connected');
	socket.on('disconnect', function(){
		console.log('User disconnected');
	});
});

const port = process.env.PORT || 8080;
http.listen(port);