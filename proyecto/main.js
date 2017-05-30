
window.addEventListener("load",function(){

var Q = window.Q = Quintus({audioSupported: [ 'mp3','ogg' ]})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
    .setup({width: 1280, height: 700})
    .controls().touch()
    .enableSound();

/*
Q.animations('ejemplo', {
  ejemplo: { frames: [1,2,3], rate: 1/3, next: 'stand_left', loop: false, trigger: "destroy" },
});
*/

var LIMITEX1 = 0,LIMITEX2 = 4000,LIMITEY1 = 500,LIMITEY2 = 3000;


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

      if(Q.inputs['left'] && p.x > 1559) {
        p.diffX = -p.stepDistance;
      } else if(Q.inputs['right'] && p.x < 2805) {
        p.diffX = p.stepDistance;
      }

      if(Q.inputs['up'] && p.y > 1664) {
        p.diffY = -p.stepDistance;
      } else if(Q.inputs['down'] && p.y < 2329) {
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

/**
 * A la bala le pasas el tipoBala que tiene las posiciones, el sprite, la animacion y la funcion de movimiento
 * todo esto lo definiremos nosotros segun el nivel, ademas tambien sirve para las balas del player solo que hay pasarle
 * una funcion de colision concreta(esto ultimo ya lo veremos el proximo dia en skype).
 */
Q.Sprite.extend("Bala",{
  init: function(tipoBala){
    //como crear una bala concreta
    //this.stage.insert(new Q.Bala(args));
    this._super({
      //sheet:tipoBala.sh,
      //sprite:tipoBala.spr,
      asset:tipoBala.asset,
      x:tipoBala.x,
      y:tipoBala.y,
      vx:tipoBala.vx,
      vy:tipoBala.vy,
      radio:tipoBala.rad,
      gravity:0,
      sensor:true
    });
    this.add('2d');
    this.on("sensor",tipoBala.funcionColision);
  },
  step: function(dt){
    this.p.x += dt*this.p.vx;
    this.p.y += dt*this.p.vy;
    if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
      this.destroy();
  }
});

Q.Sprite.extend("BalaPlayer",{
  init: function(tipoBala){
    //como crear una bala concreta
    //this.stage.insert(new Q.Bala(args));
    this._super({
      //sheet:tipoBala.sh,
      //sprite:tipoBala.spr,
      asset:tipoBala.asset,
      x:tipoBala.x,
      y:tipoBala.y,
      vx:tipoBala.vx,
      vy:tipoBala.vy,
      radio:tipoBala.rad,
      gravity:0,
      sensor:true
    });
    this.add('2d');
    this.on("sensor",tipoBala.funcionColision);
  },
  step: function(dt){
    this.p.x += dt*this.p.vx;
    this.p.y += dt*this.p.vy;
    if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
      this.destroy();
  }
});

Q.component("disparoPrincipal",{
  added: function() {
      this.tAcomulada = 0;
      this.reloadTime = 0.1;
      this.entity.on("step",this,"step");
  },
  step: function(dt){
    this.tAcomulada += dt;
    var p = this.entity.p;
    if(this.tAcomulada >= this.reloadTime && Q.inputs['fire']){
      this.tAcomulada = 0;
      var velocidadX = 0;
      if(p.diffX > 0){
        velocidadX = p.diffX * dt/ p.stepDelay;
      }
<<<<<<< HEAD
      Q.stage().insert(new Q.BalaPlayer({asset:"pruebabala.png",x:p.x + 1.5*p.radio,y:p.y,
=======
      Q.stage().insert(new Q.Bala({asset:"pruebabala.png",x:p.x + 1.5*p.radio,y:p.y,
>>>>>>> origin/master
                              vx:400 + velocidadX,vy:0,rad: 2,
                              funcionColision:function(colObj){
                                if(colObj.p.tipo == "enemy"){
                                  colObj.destroy();
                                }
                              }}));
    }
  }
});

Q.component("powerupDemo",{
  added: function() {
      this.tAcomulada = 0;
      this.reloadTime = 0.1;
      this.entity.on("step",this,"step");
      this.active = false;
  },
  step: function(dt){

    if(this.active){

      this.tAcomulada += dt;
      var p = this.entity.p;
      if(this.tAcomulada >= this.reloadTime && Q.inputs['fire']){
        this.tAcomulada = 0;
        var velocidadX = 0;
        if(p.diffX > 0){
          velocidadX = p.diffX * dt/ p.stepDelay;
        }
<<<<<<< HEAD
        Q.stage().insert(new Q.BalaPlayer({asset:"pu1.png",x:p.x + 1.5*p.radio,y:p.y,
=======
        Q.stage().insert(new Q.Bala({asset:"pu1.png",x:p.x + 1.5*p.radio,y:p.y,
>>>>>>> origin/master
                                vx:400 + velocidadX,vy:0,rad: 2,
                                funcionColision:function(colObj){
                                  if(colObj.p.tipo == "enemy"){
                                    colObj.destroy();
                                  }
                                }}));
<<<<<<< HEAD
       Q.stage().insert(new Q.BalaPlayer({asset:"pu1.png",x:p.x + 1.5*p.radio,y:p.y,
=======
       Q.stage().insert(new Q.Bala({asset:"pu1.png",x:p.x + 1.5*p.radio,y:p.y,
>>>>>>> origin/master
                                vx:400 + velocidadX,vy:100,rad: 2,
                                funcionColision:function(colObj){
                                  if(colObj.p.tipo == "enemy"){
                                    colObj.destroy();
                                  }
                                }}));
<<<<<<< HEAD
        Q.stage().insert(new Q.BalaPlayer({asset:"pu1.png",x:p.x + 1.5*p.radio,y:p.y,
=======
        Q.stage().insert(new Q.Bala({asset:"pu1.png",x:p.x + 1.5*p.radio,y:p.y,
>>>>>>> origin/master
                                vx:400 + velocidadX,vy:-100,rad: 2,
                                funcionColision:function(colObj){
                                  if(colObj.p.tipo == "enemy"){
                                    colObj.destroy();
                                  }
                                }}));
      }
    }
  },

    habilitar: function(){
      if(this.active) this.active =false;
      else this.active = true;
    }
});

<<<<<<< HEAD

Q.component("speellCard1Reimu",{
  added: function() {
    var p = this.entity.p;
    this.entity.on("step",this,"step");
    this.reloadTime = 0.75;
    this.active = true;
  },

  step: function(dt) {
    if(this.active){
      var p = this.entity.p;
      this.entity.p.time+=dt;
      if(p.time >=this.reloadTime){
          this.entity.p.time = 0;
        Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:-100,vy:150,rad: 2,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:-100,vy:70,rad: 2,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:-100,vy:0,rad: 2,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:-100,vy:-70,rad: 2,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:-100,vy:-150,rad: 2,
                                funcionColision:function(colObj){}}));


      }
    }


  },

    habilitar: function(){
      if(this.active) this.active =false;
      else this.active = true;
    }
});

=======
>>>>>>> origin/master
//BOSS PRUEBA
Q.Sprite.extend("Reimu",{
  init: function(p) {
      this._super({
        asset:"reimu.png",
        x:2700,
        y:2000,
<<<<<<< HEAD
        vy:100,
        time:0,
        gravity:0,
        radio:30,
        sensor:true,
        vida:2000
      });
      this.ultimo = 0;
      this.add('2d, speellCard1Reimu');
=======
        gravity:0,
        radio:30,
        sensor:true
      });
      this.ultimo = 0;
      this.add('2d');
>>>>>>> origin/master
      this.on("sensor");
    },

    step: function(dt) {
<<<<<<< HEAD
      if(this.p.y <= 1664) this.p.vy = 100;
      else if(this.p.y >= 2329) this.p.vy = -100;
    },

    sensor: function(colObj){
        if(colObj.isA("BalaPlayer")){
          this.p.vida --;
          colObj.destroy();
        }

        if(this.p.vida<=0) this.destroy();
=======
    },

    sensor: function(colObj){
>>>>>>> origin/master
    }
});


//PLAYER DEMO
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
    this.add('2d, controles , disparoPrincipal, powerupDemo');
    this.on("sensor");
  },

  step: function(dt) {
  },

  sensor: function(colObj){
  }

});

<<<<<<< HEAD
//POWER UP DISPLAY
Q.Sprite.extend("PowerDisplay",{
  init: function(p) {
    this._super(p, {
      asset:"pu1D.png",
      gravity:0,
      radio:30,
      sensor:true
    });
    this.add('2d');
    this.on("sensor");
  },

  sensor: function(colObj){
    if(colObj.isA("Marisa")){
      colObj.powerupDemo.habilitar();
      this.destroy();
    }
  }


});

=======
>>>>>>> origin/master
//PLAYER COLISION CENTER DEMO

var colisionCircular = function(posObj1,posObj2,dist){
  var cat1 = Math.abs(posObj1.x - posObj2.x);
  var cat2 = Math.abs(posObj1.y - posObj2.y);
  var value = Math.sqrt(Math.pow(cat1,2)+Math.pow(cat2,2));
  if(value <= dist)
    return true;
  else
    return false;
};

//ENEMIGO PRUEBA
Q.Sprite.extend("EnemigoDemo",{
  init: function(p) {
    this._super(p, {
      asset:"mobDemo.png",
      radio:60,
      time: 0,
      gravity:0,
      tipo: "enemy",
      sensor:true
    });
<<<<<<< HEAD
    if(this.p.y == 2329) this.p.vy = -150;
    else if(this.p.y == 1664) this.p.vy = 150;
=======
    if(this.p.y == 2329) this.p.vy = -100;
    else if(this.p.y == 1664) this.p.vy = 100;
>>>>>>> origin/master
    this.ultimo = 0;
    this.add('2d, arrowPatron');
    this.on("sensor");
  },

  step: function(dt) {
  },

  sensor: function(colObj){
    if(colisionCircular(this.p,colObj.p,this.p.radio+colObj.p.radio))
      console.log("funciona2");
  }

});

//ARROW DEMO
Q.component("arrowPatron", {

    added: function() {
      var p = this.entity.p;
      this.entity.on("step",this,"step");
      this.reloadTime = 0.5;
    },

    step: function(dt) {
      var p = this.entity.p;
      this.entity.p.time+=dt;
      if(p.time >=this.reloadTime){
          this.entity.p.time = 0;
        Q.stage().insert(new Q.Bala({asset: "arrow.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:-200,vy:0,rad: 2,
                                funcionColision:function(colObj){}}));

      }

    }

});

//SPAWNER PRUEBA
Q.Sprite.extend("SpawnerDemo",{
  init: function(p){
    this._super(p, {

    });
    this.p.time -= this.p.delay;
  },

  step: function(dt){
    this.p.time+=dt;
    if((this.p.i<this.p.numEnemy) && this.p.time>this.p.timelimit){
      switch(this.p.enemy){
        case "mobDemo":
          Q.stage().insert(new Q.EnemigoDemo({x:this.p.x, y: this.p.y}));
          break;
      }
       this.p.i++;
       this.p.time = 0;
     }


  }

});

var colisionBalaEnemiga = function(colObj){
  if(colisionCircular(this.p,colObj.p,this.p.radio+colObj.p.radio) &&
   colObj.isA("Marisa") )
    this.destroy();
};

Q.scene("levelChema",function(stage) {
  Q.stageTMX("level.tmx",stage);
  var pruebaBala = stage.insert(new Q.Bala({asset:"pruebabala.jpg",x:2400,y:2000,vx:-100,vy:0,rad:10,funcionColision:colisionBalaEnemiga}));
  var boss = stage.insert(new Q.Reimu());
<<<<<<< HEAD
  var pu = stage.insert(new Q.PowerDisplay({x:2300, y:2300}));
=======
>>>>>>> origin/master
  var player = stage.insert(new Q.Marisa());
  var spwner1 = stage.insert(new Q.SpawnerDemo({i: 0, x:2500, y:2329, time:0, timelimit:2, delay:2, numEnemy:20, enemy:"mobDemo"}));
  stage.add("viewport").centerOn(2200,2000);
});

<<<<<<< HEAD
Q.loadTMX("level.tmx, pruebaMarisa.png,pruebabala.png, reimu.png, mobDemo.png, arrow.png, pu1.png, pu1D.png, sanguinaria.png", function() {
=======
Q.loadTMX("level.tmx, pruebaMarisa.png,pruebabala.png, reimu.png, mobDemo.png, arrow.png, pu1.png", function() {
>>>>>>> origin/master
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
};

});
