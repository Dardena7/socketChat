var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var favicon = require('serve-favicon');

var users_list = [];


app.use(favicon(__dirname + '/public/favicon.ico'))

.get('/', function(req, res) {
	console.log(__dirname);
	res.render('chat.ejs');
});

io.on('connection', function(socket){
	console.log('A user connected');
	socket.on('disconnect', function(){
		if(users_list.includes(socket.name))
			users_list.splice(users_list.indexOf(socket.name), 1);
		socket.broadcast.emit('new_users_list', users_list);
		socket.broadcast.emit('user_left', socket.name);
	});

	socket.on('new_user', function(name){
		add_new_user(socket, name)
	});

	socket.on('new_message', function(new_msg) {
		socket.broadcast.emit('new_message', {name: socket.name, msg: new_msg});
	});


});

const port = process.env.PORT || 8080;
http.listen(port);




function add_new_user(socket, name) {
	var incorrect_message = check_name(name);
	if(incorrect_message)
		socket.emit('bad_name', incorrect_message);
	else {
		socket.name = name;
		users_list.push(name);
		users_list.sort();
		socket.emit('new_users_list', users_list);
		socket.broadcast.emit('new_users_list', users_list);
		socket.broadcast.emit('user_joined', socket.name);
	}
}

function check_name(name) {
	var incorrect = false;
	if(users_list.includes(name))
		incorrect = 'Le pseudo est déjà utilisé !';
	else if(name.length < 4)
		incorrect = 'Le pseudo est trop court !';
	else if(name.length > 12)
		incorrect = 'Le pseudo est trop long !';
	return incorrect;
}