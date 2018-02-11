var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var favicon = require('serve-favicon');


app.use(favicon(__dirname + '/public/favicon.ico'))

.get('/', function(req, res) {
	console.log(__dirname);
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