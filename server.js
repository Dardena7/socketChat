var express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.render('chat.ejs');
});

const port = process.env.PORT || 4000;
app.listen(port);