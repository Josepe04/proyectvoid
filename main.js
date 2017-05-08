
window.addEventListener("load",function(){

var Q = window.Q = Quintus({audioSupported: [ 'mp3','ogg' ]})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
    .setup({})
    .controls().touch()
    .enableSound();

/*
Q.animations('ejemplo', {
  ejemplo: { frames: [1,2,3], rate: 1/3, next: 'stand_left', loop: false, trigger: "destroy" },
});
*/


Q.animations('coin_anim', {
  shine: { frames: [0,1,2], rate: 1/2},
});

Q.scene("level1",function(stage) {
  Q.stageTMX("level.tmx",stage);
  //stage.add("viewport").follow(player);
});


Q.scene('endGame',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Play Again" , keyActionName: "confirm"}))         
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                   label: stage.options.label }));
  button.on("click",function() {
    Q.clearStages();
    Q.stageScene('level1');
    Q.stageScene('hud', 3, Q('Mario').first().p);
    Q.audio.stop();
    Q.audio.play("music_main.mp3",{ loop: true });
  });

  container.fit(20);
});

/*
Q.scene('title',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  var button = container.insert(new Q.UI.Button({ asset:"mainTitle.png" ,x: 0, y: 0, fill: "#CCCCCC",
                                                   keyActionName: "confirm"}))         
  button.on("click",function() {
    Q.clearStages();
    Q.stageScene('level1');
    Q.stageScene('hud', 3, Q('Player').first().p);
    Q.audio.play("music_main.mp3",{ loop: true });
  });

  container.fit(20);
});
*/
Q.scene('hud',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: -80, y: -20
  }));

  var label = container.insert(new Q.UI.Text({x:200, y: 20,
    label: "Score: " + stage.options.score, color: "black" }));
  container.fit(16);
});


Q.loadTMX("level.tmx , coin.mp3, music_main.mp3, music_die.mp3, music_level_complete.mp3, mario_small.json, mario_small.png, goomba.png ,goomba.json, bloopa.png, bloopa.json, princess.png ,mainTitle.png, coin.png, coin.json", function() {
  Q.compileSheets("mario_small.png","mario_small.json");
  Q.compileSheets("goomba.png","goomba.json");
  Q.compileSheets("bloopa.png","bloopa.json");
  Q.compileSheets("coin.png","coin.json");
  Q.stageScene("title");
});



/**
 * funcion para generar los cosas en las posiciones indicadas
 * @param {*} posiciones 
 * @param {*} stage 
 */
 /*
var cosas = function(posiciones,stage){
  var array = [];
  for(var i = 0; i < posiciones.length;i++){
    array[i] = stage.insert(new Q.Cosas());
    array[i].p.x = posiciones[i].x;
    array[i].p.y = posiciones[i].y;
    stage.add(array[i]);
  }
}*/

/**
 * esta funcion la utilizaremos para que el enemigo lance una bala dirijida
 * al jugador
 */
var balaDirijida = function(posPlayer,posBoss){
  var velocidades = {vx:0,vy:0};
  var difx = posPlayer.x-posBoss.x;
  var dify = posPlayer.y-posBoss.y;
  /*hay cuatro casos:
    1) difx e y son positivos.
    2) difx positivo e y negativo.
    3) difx negativo e y positivo.
    4) difx e y son negativos.
    Creo que se puede hacer mas corto,
    pero prefiero probarlo asi y luego reducirlo.
  */ 
  if(difx >= 0 && dify >= 0){
    if(difx > dify){
      velocidades.vy = 1;
      velocidades.vx = 1 * (difx/dify);
    }else{
      velocidades.vx = 1;
      velocidades.vy = 1 * (dify/difx);  
    }
  } else if(difx >= 0 && dify < 0){
    
  }
  return velocidades;
}


});
