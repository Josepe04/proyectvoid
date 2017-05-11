
window.addEventListener("load",function(){

var Q = window.Q = Quintus({audioSupported: [ 'mp3','ogg' ]})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
    .setup({width: 1000, height: 600})
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

Q.component("controles", {

    added: function() {
      var p = this.entity.p;

      if(!p.stepDistance) { p.stepDistance = 7; }
      if(!p.stepDelay) { p.stepDelay = 0.001; }

      p.stepWait = 0;
      this.entity.on("step",this,"step");
    },

    cambiarVelocidad: function(newVel){
      if(!this.entity.p.stepDistance) { p.stepDistance = newVel; }
    },

    step: function(dt) {
      var p = this.entity.p,
          moved = false;
      p.stepWait -= dt;

      if(p.stepping) {
        p.x += p.diffX * dt / p.stepDelay ;
        p.y += p.diffY * dt / p.stepDelay ;
      }

      if(p.stepWait > 0) { return; }
      if(p.stepping) {
        p.x = p.destX;
        p.y = p.destY;
      }
      p.stepping = false;

      p.diffX = 0;
      p.diffY = 0;

      if(Q.inputs['left']) {
        p.diffX = -p.stepDistance;
      } else if(Q.inputs['right']) {
        p.diffX = p.stepDistance;
      }

      if(Q.inputs['up']) {
        p.diffY = -p.stepDistance;
      } else if(Q.inputs['down']) {
        p.diffY = p.stepDistance;
      }

      if(p.diffY || p.diffX ) {
        p.stepping = true;
        p.origX = p.x;
        p.origY = p.y;
        p.destX = p.x + p.diffX;
        p.destY = p.y + p.diffY;
        p.stepWait = p.stepDelay;
      }

    }

});


Q.Sprite.extend("Marisa",{
  init: function(p) {
    this._super({
      asset:"pruebaMarisa.png",
      x:2000,
      y:2000,
      gravity:0,
      radio:30,
      sensor:true
    });
    this.ultimo = 0;
    this.add('2d, controles');
    this.on("sensor");
  },

  step: function(dt) {
  },

  sensor: function(colObj){
  }
  
});

var colisionCircular = function(posObj1,posObj2,dist){
  var cat1 = Math.abs(posObj1.x - posObj2.x);
  var cat2 = Math.abs(posObj1.y - posObj2.y);
  var value = Math.sqrt(Math.pow(cat1,2)+Math.pow(cat2,2)); 
  if(value <= dist)
    return true;
  else
    return false;
}

Q.Sprite.extend("Enemigo",{
  init: function(p) {
    this._super({
      asset:"pruebaMarisa.png",
      x:2400,
      y:2000,
      radio:60,
      gravity:0,
      sensor:true
    });
    this.ultimo = 0;
    this.add('2d');
    this.on("sensor");
  },

  step: function(dt) {
  },

  sensor: function(colObj){
    if(colisionCircular(this.p,colObj.p,this.p.radio+colObj.p.radio))
      console.log("funciona2");
  }
  
});



Q.scene("levelChema",function(stage) {
  Q.stageTMX("level.tmx",stage);
  var enemy = stage.insert(new Q.Enemigo());
  var player = stage.insert(new Q.Marisa());
  stage.add("viewport").centerOn(2000,2000);
});

Q.loadTMX("level.tmx , balas1.png, balas1.json , pruebaMarisa.png", function() {
  Q.compileSheets("coin.png","coin.json");
  Q.stageScene("levelChema");
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
 * al jugador, NO TERMINADA
 */
var balaDirijida = function(posPlayer,posBoss){
  var velocidades = {vx:0,vy:0};
  var difx = posPlayer.x-posBoss.x;
  var dify = posPlayer.y-posBoss.y;

 
  velocidades.vx = 1;
  velocidades.vy = 1 * (dify/difx);

  return velocidades;
}

});
