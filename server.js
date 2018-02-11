var express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.render('chat.ejs');
});

const port = process.env.PORT || 8080;
app.listen(port);