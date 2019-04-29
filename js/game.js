/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
   
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    /*
        game.load.spritesheet('tileset', 'assets/map/CedarLodge.png', 1349, 951);
    */
    
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    
    game.load.image('sprite', 'assets/sprites/sprite.png');
    
};

Game.create = function(){
    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(Game.getCoordinates, this);
    Client.askNewPlayer();
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    
/* var line; */
/* line=new Phaser.line(player.x,player.y,x,y); */
    var tween = game.add.tween(player);
    
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);
 
            // make it a red rectangle
            gra.lineStyle(3, 0xff0000);
 
            // start by moving to a point
            //=gra.moveTo(player.x-350,player.y-250);
            // draw a line
            //gra.lineTo(x-350,y-250);
            //gra.moveTo(0,0);
            gra.moveTo(player.x-672+16,player.y-432+16);
            gra.lineTo(x-672+16,y-432+16);
   
   
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};