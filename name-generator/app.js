var ecstatic = require('ecstatic');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

const port = process.env.PORT || 8080;

var names = JSON.parse(fs.readFileSync('names.json', 'utf-8'));
var surnames = JSON.parse(fs.readFileSync('surnames.json', 'utf-8'));

app.use(ecstatic({
	root: `${__dirname}/public`,
	showdir: true
}));

io.sockets.on('connection', (socket)=>{
	console.log('New client connected!');

	socket.on('generateName', ()=>{
		name = genName(names, surnames);
		socket.emit('nameGenerated', name);

	})
});

function genName(names, surnames) {
	
	return names[randNum(0,100)].name + ' ' + surnames[randNum(0,100)].name; 	
}

function randNum(min, max){
	return Math.floor((Math.random() * max) + min);
}

server.listen(port, ()=>{
	console.log('Serving on port ' + port);
})