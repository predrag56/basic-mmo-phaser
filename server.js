
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server); 


var mongo = require('mongodb').MongoClient;
//-------
var add=(function(){var counter=0; return function(){return counter +=1;}})();
//-------
var cnctd=0;

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
//----------------------------------

//mongo.connect('mongodb://'+mongoHost+'/'+mongoDBName,function(err,db){

//mongo.connect('mongodb://heroku_nl7x0l6c:r4da20k42uocgk4okqrrmcufh0@ds147926.mlab.com:47926/heroku_nl7x0l6c,function(err,db){


mongo.connect('mongodb://heroku_nl7x0l6c:r4da20k42uocgk4okqrrmcufh0@ds147926.mlab.com:47926/heroku_nl7x0l6c',function(err,db){
        if(err)
        {
         cnctd=1;
         console.log('nedje error');
         throw(err);
        }
        else
        {
         cnctd=2;
         console.log('NIDJE error');
        }
        
        server.db = db;
        console.log('Connection to db established');
    });
//------------------------------------    
});







io.on('connection',function(socket){

    socket.on('newplayer',function(){
        console.log('socket.on(newplayer)='+cnctd.toString());  //////!!!!!!!!!!!!!!
        
        
        //var plo="88";
        //var doc=plo; //plo.dbTrim(); 
        server.db.collection('players').insertOne('88',function(err){ if(err)throw err; console.log('Prodje ovo izgleda'); } );        
        
        
        //---------------------------------------
        
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
        };
        socket.emit('allplayers',getAllPlayers()); 
        console.log('emit allplayers');
        socket.broadcast.emit('newplayer',socket.player);
        console.log('broadcast.emitt NEWplayer');

        socket.on('click',function(data){
            console.log('click to '+data.x+', '+data.y+' add='+add());
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move',socket.player);
        });

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
            console.log('removed : '+socket.player.id);
        });
    });

    socket.on('test',function(){
        console.log('test received');
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        //if(player) players.push(player);
        if(player)
        { players.push(player);
          //console.log('player : '+player.toString());
          console.log('player : '+player.id);  
        }
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
