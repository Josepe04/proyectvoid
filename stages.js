window.addEventListener("load",function(){


  Q.load("pruebabala.png, reimu.png, sanguinaria.png, balaPlayer.png,"+
   "bola.png, balaRedonda.png,up.png, flor.png, reimu_onmyoBall.png, ooiri.png, bolita.png,"+
   "bolita.png, fuego.png,miniOrbeRojo.png, arrow.png, music.png, fire.png, spawner.png,"+
   "sombrero.png, ovalo.png,flecha.png, fantasma.png, plato.png,"+
   "mobRed.png, mobBlue.png, mobOrange.png, mobWhite.png,"+
   "pu1.png, pu1D.png, reimu_animal.png, escudo.png,"+
   "escenario_koishi.png, Torreta.png, koishi_bala1.png, koishi_bala2.png, koishi_bala3.png,"+
   "koishi_bala4.png, koishi_bala5.png, koishi.png, koishi.json, escenario_kokoro.png, kokoro.png,"+
   "kokoro.json, kokoro_bala1.png, kokoro_bala2.png, kokoro_bala3.png, kokoro_bala4.png, kokoro_bala5.png, kokoro_bala6.png,"+
   "Touhou_castles.jpg, fondo_reimu.png, "+
   "templo.png, templo.json,forest.png, forest.json,river.png, river.json,fall.png, fall.json, montaña.png,montaña.json, volcan.png, volcan.json,"+
   "Advise-futo.png, Advise-hijiri.png,Advise-ichirin.png, Advise-kokoro.png, Advise-mamizou.png, Advise-mokou.png, Advise-reimu.png, Advise-koishi.png,"+
   "futo-grande.png, hijiri-grande.png, mamizou-grande.png, reimu-grande.png, mokou-grande.png, ichirin-grande.png, koishi-grande.png, kokoro-grande.png,"+
   "futo.png,futo.json,hijiri.png,hijiri.json,ichirin2.png,ichirin.json,mamizou2.png,mamizou.json, moukou.png,moukou.json,"+
   "reimu.png,reimu.json,marisa.png,marisa.json,"+
   "coin.mp3,death.mp3,levelup.mp3,Necrofantasia.mp3,reach_for_the_moon.mp3,staffroll.mp3,Song_of_storms.mp3, escenarioAdri1.mp3,escenarioAdri2.mp3, byob.mp3,koishi.mp3, kokoro.mp3,"+
   "balaPower1.png, balaPower2.png, balaPower3.png, poweruphud.png", function() {
    Q.compileSheets("forest.png","forest.json"); //Añade la Sheet del bosque.
    Q.compileSheets("templo.png","templo.json"); //Añade la Sheet del bosque.
    Q.compileSheets("river.png","river.json");
    Q.compileSheets("fall.png","fall.json");
    Q.compileSheets("volcan.png","volcan.json");
    Q.compileSheets("montaña.png","montaña.json");
    Q.compileSheets("koishi.png","koishi.json");
    Q.compileSheets("kokoro.png","kokoro.json");
    Q.compileSheets("mamizou2.png","mamizou.json");
    Q.compileSheets("ichirin2.png","ichirin.json")
    Q.compileSheets("marisa.png", "marisa.json");
    Q.compileSheets("reimu.png", "reimu.json");
    Q.compileSheets("moukou.png", "moukou.json");
    Q.compileSheets("hijiri.png", "hijiri.json");
    Q.compileSheets("futo.png","futo.json");
    Q.stageScene("levelHijiri");
  });


  Q.scene('hud',function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: -80, y: -20
    }));

    var label = container.insert(new Q.UI.Text({x:200, y: 20,
      label: "vidas: " + stage.options.vidas, color: "white" }));
    container.fit(16);
  });

  Q.scene('hudboss',function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: -80, y: -20
    }));

    var label = container.insert(new Q.UI.Text({x:1200, y: 20,
      label: "boss: " + stage.options.vida, color: "white" }));
    container.fit(16);
  });


  Q.Sprite.extend("antiSpellBoton", {
    init: function (p) {
      this._super(p,{
        asset: "poweruphud.png",
        didAnimationOn: false,
        didAnimationOff: false,
        opacity: 0.6,
        type: 0
      });

    },

    step: function (dt) {
      var marisa = Q('Marisa').first();
      if(marisa.p.antispell && !this.p.didAnimationOn) {
        this.p.didAnimationOn = true;
        this.add('tween');
        this.animate({opacity: 1},{callback: function() {
          this.p.didAnimationOn = false;
        }});
      }
      else if(!marisa.p.antispell && !this.p.didAnimationOff){
        this.p.didAnimationOff = true;
        this.add('tween');
        this.animate({opacity: 0.4},{callback: function() {
          this.p.didAnimationOff = false;
        }});
      }

    }

  });


    //ANDRES

/*__________________________________________________NIVEL KOISHI__________________________________________________________________________________________*/

    // Estructura con las posiciones de las cuales podran salir los orbes de Invulnerabilidad
    var veloc1 = 300;
    var posiciones1 = {
      // arriba izquierda
      1: { posX: 1600, posY: 1690, velX: veloc1, velY: veloc1},
      // abajo izquierda
      2: { posX: 1600, posY: 2310, velX: veloc1, velY: -veloc1},
      // arriba derecha
      3: { posX: 2800, posY: 1690, velX: -veloc1, velY: veloc1},
      // abajo derecha
      4: { posX: 2800, posY: 2310, velX: -veloc1, velY: -veloc1}
    };

    // Estructura con las posiciones de las cuales podran salir los orbes de Sanacion (salen de las torretas)
    var posiciones2 = {
      // arriba izquierda
      1: { posX: 2300, posY: 1760},
      // abajo izquierda
      2: { posX: 2420, posY: 2150},
      // arriba derecha
      3: { posX: 2600, posY: 1890}
    };


    //SPAWNER Orbes Invulnerabilidad
    Q.Sprite.extend("SpawnerOrbesInvulnerabilidad",{
      init: function(p){
        this._super(p, {

        });
        // time y delay son pasados por parametros, la idea es que time sufra el retraso de delay para el primer spawn
        this.p.time -= this.p.delay;

      },

      step: function(dt){
        // time va aumentando en cada step hasta que supera el limite (tambien dado por parametros)
        this.p.time+=dt;
        if(this.p.time>this.p.timelimit){
          // Elegimos al azar una de las posiciones
          var pos = Math.floor((Math.random() * 10)) % 4 + 1;
          var px = posiciones1[pos].posX;
          var py = posiciones1[pos].posY;
          // Interesa que sea un poco mas rapido horizontalmente
          var vex = posiciones1[pos].velX  * 1.5;
          var vey = posiciones1[pos].velY;
          Q.stage().insert(new Q.OrbeInvulnerabilidad({x:px, y:py, vx:vex, vy:vey}));
          this.p.time = 0;
         }
      }

    });

    //SPAWNER Orbes Sanacion
    Q.Sprite.extend("SpawnerOrbesSanacion",{
      init: function(p){
        this._super(p, {

        });
        // time y delay son pasados por parametros, la idea es que time sufra el retraso de delay
        this.p.time -= this.p.delay;
      },

      step: function(dt){
        // time va aumentando en cada step hasta que supera el limite (tambien dado por parametros)
        this.p.time+=dt;
        if(this.p.time>this.p.timelimit){
          // Elegimos al azar una de las posiciones
          var pos = Math.floor((Math.random() * 10)) % 3 + 1;
          var px = posiciones2[pos].posX;
          var py = posiciones2[pos].posY;
          Q.stage().insert(new Q.OrbeSanacion({x:px, y:py}));
          this.p.time = 0;
         }
      }

    });


/*______________________________________________FIN NIVEL KOISHI__________________________________________________________________________________________*/


/*__________________________________________________NIVEL KOKORO__________________________________________________________________________________________*/

    // Estructura con las posiciones de las cuales podran salir las discipulas
    var posiciones3 = {
      // Las discipulas saldran de la derecha del todo en 5 puntos equdistantes verticalmente
      1: { posX: 2800, posY: 1690},
      2: { posX: 2800, posY: 1845},
      3: { posX: 2800, posY: 2000},
      4: { posX: 2800, posY: 2155},
      5: { posX: 2800, posY: 2310}
    };

    //SPAWNER Discipulas
    Q.Sprite.extend("SpawnerDiscipulas",{
      init: function(p){
        this._super(p, {

        });
        // time y delay son pasados por parametros, la idea es que time sufra el retraso de delay para el primer spawn
        this.p.time -= this.p.delay;
      },

      step: function(dt){
        // time va aumentando en cada step hasta que supera el limite (tambien dado por parametros)
        this.p.time+=dt;
        if(this.p.time>this.p.timelimit){
          // Elegimos al azar una de las posiciones
          var pos = Math.floor((Math.random() * 10)) % 5 + 1;
          var px = posiciones3[pos].posX;
          var py = posiciones3[pos].posY;
          Q.stage().insert(new Q.Discipula({x:px, y:py, vx:-350}));
          this.p.time = 0;
         }
      }

    });


    Q.Sprite.extend("AndanadaKunais",{
      init: function(p){
        this._super(p, {
          i:0,
          vx:0,
          vy:0,
          first: true,
          gravity:0,
          time: 0,
          sensor: true
        });
      },

      step: function(dt){
        this.p.time+=dt;

        if((this.p.i<this.p.numAndanadas) && (this.p.time>this.p.reload || this.p.first)){
          var vx = -500;
          // Lanzaremos un abanico infernal de kunais
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala3.png", x:this.p.x ,y:this.p.y,
                                  vx:vx, vy:-300,rad: 15,
                                  funcionColision:function(colObj){}}));
            Q.stage().insert(new Q.Bala({asset: "kokoro_bala3.png", x:this.p.x ,y:this.p.y,
                                    vx:vx, vy:-200,rad: 15,
                                    funcionColision:function(colObj){}}));
            Q.stage().insert(new Q.Bala({asset: "kokoro_bala3.png", x:this.p.x ,y:this.p.y,
                                    vx:vx, vy:-100,rad: 15,
                                    funcionColision:function(colObj){}}));
            Q.stage().insert(new Q.Bala({asset: "kokoro_bala3.png", x:this.p.x ,y:this.p.y,
                                    vx:vx, vy:0,rad: 15,
                                    funcionColision:function(colObj){}}));
            Q.stage().insert(new Q.Bala({asset: "kokoro_bala3.png", x:this.p.x ,y:this.p.y,
                                    vx:vx, vy:100,rad: 15,
                                    funcionColision:function(colObj){}}));
            Q.stage().insert(new Q.Bala({asset: "kokoro_bala3.png", x:this.p.x ,y:this.p.y,
                                    vx:vx, vy:200,rad: 15,
                                    funcionColision:function(colObj){}}));
            Q.stage().insert(new Q.Bala({asset: "kokoro_bala3.png", x:this.p.x ,y:this.p.y,
                                    vx:vx, vy:300,rad: 15,
                                    funcionColision:function(colObj){}}));
           this.p.i++;
           this.p.time = 0;
           // Variable de control para la primera andanada
           this.p.first = false;
         }

         if(this.p.i == this.p.numAndanadas){
           this.destroy();
         }
      },

    sensor: function(colObj){
     }

   });


    //SPAWNER Discipulas de elite
    Q.Sprite.extend("SpawnerDiscipulasElite",{
      init: function(p){
        this._super(p, {

        });
        // time y delay son pasados por parametros, la idea es que time sufra el retraso de delay para el primer spawn
        this.p.time -= this.p.delay;
      },

      step: function(dt){
        // time va aumentando en cada step hasta que supera el limite (tambien dado por parametros)
        this.p.time+=dt;
        if(this.p.time>this.p.timelimit){
          // Elegimos al azar una de las posiciones
          var pos = Math.floor((Math.random() * 10)) % 5 + 1;
          var px = posiciones3[pos].posX;
          var py = posiciones3[pos].posY;
          Q.stage().insert(new Q.DiscipulaElite({x:px, y:py}));
          this.p.time = 0;
         }
      }

    });

    //SPAWNER Cuchillos
    Q.Sprite.extend("SpawnerCuchillos",{
      init: function(p){
        this._super(p, {

        });
        // time y delay son pasados por parametros, la idea es que time sufra el retraso de delay
        this.p.time -= this.p.delay;
      },

      step: function(dt){
        // time va aumentando en cada step hasta que supera el limite (tambien dado por parametros)
        this.p.time+=dt;
        if(this.p.time>this.p.timelimit){
          var inf = 2310;
          var sup = 1690;
          var vec = 300;
          // Dispararemos dos filas de balas desde los extremos inferior y superior del escenario en sentido contrario
          // Fila Inferior:
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:1650, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:1770, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:1890, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:2010, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:2130, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:2250, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:2370, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:2490, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:2610, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala2.png", x:2730, y:inf, vy:-vec, rad: 15, funcionColision:function(colObj){}}));

          // Fila Superior:
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:1650, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:1770, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:1890, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:2010, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:2130, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:2250, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:2370, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:2490, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:2610, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "kokoro_bala1.png", x:2730, y:sup, vy:vec, rad: 15, funcionColision:function(colObj){}}));

          this.p.time = 0;
         }
      }

    });

/*______________________________________________FIN NIVEL KOKORO__________________________________________________________________________________________*/




    //ADRI

    //CHEMA





var faseNivel;

var cambioFaseNivelChema1 = function(cambio){
  if(cambio)
    faseNivel--;
  if(faseNivel == 0 && cambio)
    Q.stage().insert(new Q.Reimu());
  else if(faseNivel == 1 && cambio){
    Q.stage().insert(new Q.SpawnerChema({i: 0,cambioFase:true,x:2500, y:2329, time:0, timelimit:2, delay:20, numEnemy:15,velx:0,vely:-100, comp: "2d, ooiriPatron"}));
    Q.stage().insert(new Q.SpawnerChema({i: 0,cambioFase:false, x:LIMITEL, y:2300, time:0, timelimit:3, delay:20, numEnemy:15,velx:100,vely:0, comp: "2d, orbesPatron"}));
  }
}
Q.Sprite.extend("SpawnerChema",{
      init: function(p){
        this._super(p, {

        });
        this.p.time -= this.p.delay;
      },

      step: function(dt){
        this.p.time+=dt;
        if((this.p.i<this.p.numEnemy) && this.p.time>this.p.timelimit){
           Q.stage().insert(new Q.EnemigoChema({vx: this.p.velx,vy:this.p.vely ,x:this.p.x, y: this.p.y,asset: "mobRed.png"},this.p.comp));
           this.p.i++;
           this.p.time = 0;
         }else if(this.p.i == this.p.numEnemy){
           cambioFaseNivelChema1(this.p.cambioFase);
           this.destroy();
         }
      }

});



//SERGIO

Q.Sprite.extend("SpawnerHijiri",{
 init: function(p){
   this._super(p, {
     i:0,
     sensor: true
   });
   this.p.time -= this.p.delay;
 },

 step: function(dt){
   this.p.time+=dt;
   if((this.p.i<this.p.numEnemy) && this.p.time>this.p.timelimit){
     switch(this.p.enemy){
       case 0:
         Q.stage().insert(new Q.EnemigoRed({x:this.p.x, y: this.p.y, vida: this.p.level}));
         break;
       case 1:
         Q.stage().insert(new Q.EnemigoBlue({x:this.p.x, y: this.p.y, vida: this.p.level}));
         break;
       case 2:
         Q.stage().insert(new Q.EnemigoOrange({x:this.p.x, y: this.p.y, vida: this.p.level}));
         break;
       case 3:
         Q.stage().insert(new Q.EnemigoWhite({x:this.p.x, y: this.p.y, vida: this.p.level}));
         break;
     }
      this.p.i++;
      this.p.time = 0;
    }
  if(this.p.i==this.p.numEnemy){
      Q('Hijiri').first().destruyeSpawner();
      this.destroy();
    }

 },

sensor: function(colObj){
}

});



//////////////////////////////////////////////////////END OF STAGES/////////////////////////////////////////////////////////////////////////////



Q.scene("levelHijiri",function(stage) {
 var fondo = stage.insert(new Q.FondoRio());
 Q.stage().insert(new Q.HijiriAdvise());
 Q.stage().insert(new Q.CartelAdvise({asset:"Advise-hijiri.png"}));
 Q.audio.stop();
 Q.audio.play("byob.mp3",{ loop: true });
 stage.add("viewport").centerOn(2200,2000);
});

Q.scene('endHijiri',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Next Stage", keyActionName: "confirm" }))
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                   label: stage.options.label }));
  button.on("click",function() {
    Q.clearStages();
    Q.stageScene('levelKoishi');
  });

  container.fit(20);
});

Q.scene("levelKoishi",function(stage) {
 stage.insert(new Q.Repeater({ asset: "escenario_koishi.png", speedX: 0, speedY: 0, type: 0, h:screen.height, w:screen.width }));
 Q.stage().insert(new Q.KoishiAdvise());
 Q.stage().insert(new Q.CartelAdvise({asset:"Advise-koishi.png"}));
 Q.audio.stop();
 Q.audio.play("koishi.mp3",{ loop: true });
 stage.add("viewport").centerOn(2200,2000);
});

Q.scene('endKoishi',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Next Stage", keyActionName: "confirm" }))
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                   label: stage.options.label }));
  button.on("click",function() {
    Q.clearStages();
    Q.stageScene('levelMokou');
  });

  container.fit(20);
});


Q.scene("levelMokou",function(stage) {
  var fondo = stage.insert(new Q.FondoVolcan());
  Q.stage().insert(new Q.MokouAdvise());
  Q.stage().insert(new Q.CartelAdvise({asset:"Advise-mokou.png"}));
  Q.audio.stop();
  Q.audio.play("reach_for_the_moon.mp3",{ loop: true });
  stage.add("viewport").centerOn(2200,2000);
});

Q.scene('endMokou',function(stage) {
var container = stage.insert(new Q.UI.Container({
  x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
}));

var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                label: "Next Stage", keyActionName: "confirm" }))
var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                 label: stage.options.label }));
button.on("click",function() {
  Q.clearStages();
  Q.stageScene('levelMamizou');
});

container.fit(20);
});

Q.scene("levelMamizou",function(stage) {

var fondo = stage.insert(new Q.FondoBosque());
stage.add("viewport").centerOn(2200,2000);
Q.stage().insert(new Q.MamizouAdvise());
Q.stage().insert(new Q.CartelAdvise({asset:"Advise-mamizou.png"}));
Q.audio.stop();
Q.audio.play("escenarioAdri1.mp3",{ loop: true });
});

Q.scene('endMamizou',function(stage) {
var container = stage.insert(new Q.UI.Container({
  x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
}));

var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                label: "Next Stage", keyActionName: "confirm" }))
var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                 label: stage.options.label }));
button.on("click",function() {
  Q.clearStages();
  Q.stageScene('levelIchirin');
});

container.fit(20);
});


Q.scene("levelIchirin",function(stage) {
  var fondo = stage.insert(new Q.FondoTemplo());
  stage.add("viewport").centerOn(2200,2000);
  Q.stage().insert(new Q.IchirinAdvise());
  Q.stage().insert(new Q.CartelAdvise({asset:"Advise-ichirin.png"}));
  Q.audio.stop();
  Q.audio.play("escenarioAdri2.mp3",{ loop: true });
});

Q.scene('endIchirin',function(stage) {
var container = stage.insert(new Q.UI.Container({
  x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
}));

var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                label: "Next Stage", keyActionName: "confirm" }))
var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                 label: stage.options.label }));
button.on("click",function() {
  Q.clearStages();
  Q.stageScene('levelKokoro');
});

container.fit(20);
});
Q.scene("levelKokoro",function(stage) {
  Q.stage().insert(new Q.Repeater({ asset: "escenario_kokoro.png", speedX: 0, speedY: 0, type: 0, h:screen.height, w:screen.width }));
  Q.stage().insert(new Q.KokoroAdvise());
  Q.stage().insert(new Q.CartelAdvise({asset:"Advise-kokoro.png"}));
  Q.audio.stop();
  Q.audio.play("kokoro.mp3",{ loop: true });
  stage.add("viewport").centerOn(2200,2000);
});

Q.scene('endKokoro',function(stage) {
var container = stage.insert(new Q.UI.Container({
  x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
}));

var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                label: "Next Stage", keyActionName: "confirm" }))
var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                 label: stage.options.label }));
button.on("click",function() {
  Q.clearStages();
  Q.stageScene('levelFuto');
});

container.fit(20);
});

Q.scene("levelFuto",function(stage) {
 var fondo = stage.insert(new Q.FondoFall());
 Q.stage().insert(new Q.FutoAdvise());
 Q.stage().insert(new Q.CartelAdvise({asset:"Advise-futo.png"}));

 Q.audio.stop();
 Q.audio.play("Song_of_storms.mp3",{loop:true});
 stage.add("viewport").centerOn(2200,2000);
});

Q.scene('endFuto',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Next Stage", keyActionName: "confirm" }))
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                   label: stage.options.label }));
  button.on("click",function() {
    Q.clearStages();
    Q.stageScene('levelFinal');
  });

  container.fit(20);
});

Q.scene("levelFinal",function(stage) {
     var fondo = stage.insert(new Q.FondoMontaña());
    Q.stage().insert(new Q.ReimuAdvise());
    Q.stage().insert(new Q.CartelAdvise({asset:"Advise-reimu.png"}));
    Q.audio.stop();
    Q.audio.play("Necrofantasia.mp3",{ loop: true });
    stage.add("viewport").centerOn(2200,2000);
});

Q.scene('endFinal',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "RESTART", keyActionName: "confirm" }))
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                   label: stage.options.label }));
  button.on("click",function() {
    Q.clearStages();
    Q.stageScene('levelHijiri');

  });

  container.fit(20);
});

Q.scene('endGame',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));
  Q.audio.stop();
  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Play Again", keyActionName: "confirm" }))
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                   label: stage.options.label }));
  button.on("click",function() {
    Q.clearStages();
    Q.stageScene('levelHijiri');
  });

  container.fit(20);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////BACKGROUND ANIMATIONS/////////////////////////////////////////////////////////////////////////////

/*Animación del fondo bosque */
Q.animations("forestAnim", {
  anim: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,
  13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
  31,32,33,34,35,36,37,38,39], rate: 1/3, flip: false, loop: true}
});

/* Sprite que representa el fondo del bosque */
Q.Sprite.extend("FondoBosque", {
  init: function (p) {
    this._super(p,{
      sprite:"forestAnim",
      sheet:"forest",
      x: 2200,
      y: 2000,
      type: 0
    });
    this.add("animation");
    this.play("anim");
  }

});

/*Animación del templo*/
Q.animations("temploAnim", {
  anim: { frames: [0,1,2,3,4,5,6,7], rate: 1/3, flip: false, loop: true}
});

/* Sprite que representa el templo */
Q.Sprite.extend("FondoTemplo", {
  init: function (p) {
    this._super(p,{
      sprite:"temploAnim",
      sheet:"templo",
      x: 2200,
      y: 2000,
      type: 0
    });
    this.add("animation");
    this.play("anim");
  }

});


   /*Animación del fondo rio */
   Q.animations("riverAnim", {
     anim: { frames: [0,1,2,3,4,5], rate: 1/3, flip: false, loop: true}
   });

   /* Sprite que representa el fondo del rio */
   Q.Sprite.extend("FondoRio", {
     init: function (p) {
       this._super(p,{
         sprite:"riverAnim",
         sheet:"river",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add("animation");
       this.play("anim");
     }

   });


   /*Animación del fondo otoño(Fall) */
   Q.animations("fallAnim", {
     anim: { frames: [37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,
     20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], rate: 1/5, flip: false, loop: true}
   });

   /* Sprite que representa el fondo del otoño */
   Q.Sprite.extend("FondoFall", {
     init: function (p) {
       this._super(p,{
         sprite:"fallAnim",
         sheet:"fall",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add("animation");
       this.play("anim");
     }

   });

   Q.animations("volcanAnim", {
     anim: { frames: [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], rate: 1/4, flip: false, loop: true}
   });

   /* Sprite que representa el fondo del bosque */
   Q.Sprite.extend("FondoVolcan", {
     init: function (p) {
       this._super(p,{
         sprite:"volcanAnim",
         sheet:"volcan",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add("animation");
       this.play("anim");
     }

   });

   Q.animations("montañaAnim", {
     anim: { frames: [0,1,2,3,4,5,6,7], rate: 1/4, flip: false, loop: true}
   });

   /* Sprite que representa el fondo del bosque */
   Q.Sprite.extend("FondoMontaña", {
     init: function (p) {
       this._super(p,{
         sprite:"montañaAnim",
         sheet:"montaña",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add("animation");
       this.play("anim");
     }

   });

   //////////////////////////////////////////////////////STAGE ADVISES/////////////////////////////////////////////////////////////////////////////

   Q.Sprite.extend("KoishiAdvise", {
     init: function (p) {
       this._super(p,{
         asset: "koishi-grande.png",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add('tween');
       this.animate({w: this.p.w - 300, h: this.p.h - 100, angle: 360 }, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0},1.2, {callback: function() {
         var torreta1 = Q.stage().insert(new Q.Torreta({x:2300, y:1870}));
         var torreta2 = Q.stage().insert(new Q.Torreta({x:2600, y:2000}));
         var torreta3 = Q.stage().insert(new Q.Torreta({x:2420, y:2263}));
         var boss = Q.stage().insert(new Q.Koishi({t1:torreta1, t2:torreta2, t3:torreta3}));
         var player = Q.stage().insert(new Q.Marisa());
         // cuanto mas timelimit mas tiempo tardan en salir los objetos del spawner, el delay es para determinar cuanto tarda en salir el PRIMERO de ellos
         var spawner1 = Q.stage().insert(new Q.SpawnerOrbesInvulnerabilidad({time:0, timelimit:5, delay:2}));
       }});
     }
   });

   Q.Sprite.extend("IchirinAdvise", {
     init: function (p) {
       this._super(p,{
         asset: "ichirin-grande.png",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add('tween');
       this.animate({w: this.p.w - 300, h: this.p.h - 100, angle: 360 }, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0},1.2, {callback: function() {
         Q.stage().insert(new Q.Ichirin({vida: 500}));
         var player = Q.stage().insert(new Q.Marisa());
         Q.stageScene('hud',3, Q('Marisa').first().p);
       }});
     }
   });

   Q.Sprite.extend("KokoroAdvise", {
     init: function (p) {
       this._super(p,{
         asset: "kokoro-grande.png",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add('tween');
       this.animate({w: this.p.w - 300, h: this.p.h - 100, angle: 360 }, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0},1.2, {callback:function(){
         var boss = Q.stage().insert(new Q.Kokoro());
         var player = Q.stage().insert(new Q.Marisa());
         // cuanto mas timelimit mas tiempo tardan en salir los objetos del spawner, el delay es para determinar cuanto tarda en salir el PRIMERO de ellos
         var spawner1 = Q.stage().insert(new Q.SpawnerDiscipulas({time:0, timelimit:0.2, delay:2}));
         var spawner2 = Q.stage().insert(new Q.SpawnerDiscipulasElite({time:0, timelimit:2, delay:4}));
         var spawner3 = Q.stage().insert(new Q.SpawnerCuchillos({time:0, timelimit:8, delay:0}));
       }});
     }
   });



   Q.Sprite.extend("HijiriAdvise", {
     init: function (p) {
       this._super(p,{
         asset: "hijiri-grande.png",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add('tween');
       this.animate({w: this.p.w - 300, h: this.p.h - 100, angle: 360 }, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0},1.2, {callback:function(){
         var boss = Q.stage().insert(new Q.Hijiri());
         var player = Q.stage().insert(new Q.Marisa());
         Q.stageScene('hud',3, Q('Marisa').first().p);
       }});
     }
   });

   Q.Sprite.extend("FutoAdvise", {
     init: function (p) {
       this._super(p,{
         asset: "futo-grande.png",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add('tween');
       this.animate({w: this.p.w - 300, h: this.p.h - 100, angle: 360 }, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0},1.2, {callback:function(){
         var boss = Q.stage().insert(new Q.Futo());
         var player = Q.stage().insert(new Q.Marisa());
         player.add("antiSpellFuto");
         Q.stageScene('hud',3, Q('Marisa').first().p);
         Q.stage().insert(new Q.antiSpellBoton({x:LIMITEX1+100, y: 2300}));
       }});
     }
   });

   Q.Sprite.extend("MokouAdvise", {
     init: function (p) {
       this._super(p,{
         asset: "mokou-grande.png",
         x: 2200,
         y: 2000,
         type: 0
       });
       this.add('tween');
       this.animate({w: this.p.w - 300, h: this.p.h - 100, angle: 360 }, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0},1.2,{callback:function(){
         var boss = Q.stage().insert(new Q.Mokou());
         var mar = Q.stage().insert(new Q.Marisa());
         faseNivel = 2;
         Q.stageScene('hud',3, Q('Marisa').first().p);
       }});
     }});

     Q.Sprite.extend("ReimuAdvise", {
       init: function (p) {
         this._super(p,{
           asset: "reimu-grande.png",
           x: 2200,
           y: 2000,
           type: 0
         });
         this.add('tween');
         this.animate({w: this.p.w - 300, h: this.p.h - 100, angle: 360 }, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0},1.2,{callback:function(){
           var mar = Q.stage().insert(new Q.Marisa());
           mar.add("powerupChema");
           Q.stage().insert(new Q.SpawnerChema({i: 0,cambioFase:true,x:2500, y:LIMITEUP, time:0, timelimit:2, delay:2, numEnemy:15,velx:0,vely:100, comp: "2d, orbePatron"}));
           Q.stage().insert(new Q.SpawnerChema({i: 0,cambioFase:false,x:2500, y:LIMITEDOWN, time:0, timelimit:2, delay:2, numEnemy:15,velx:0,vely:-100, comp: "2d, orbePatron"}));
           faseNivel = 2;
           Q.stageScene('hud',3, Q('Marisa').first().p);
         }});
   }
 });

 Q.Sprite.extend("MamizouAdvise", {
   init: function (p) {
     this._super(p,{
       asset: "mamizou-grande.png",
       x: 2200,
       y: 2000,
       type: 0
     });
     this.add('tween');
     this.animate({w: this.p.w - 300, h: this.p.h - 100, angle: 360 }, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0}, 1.2, {callback: function() {
       var boss = Q.stage().insert(new Q.Mamizou({vida:1000, fake: false, insertar: true, y: 2000, x: 2700, tipo:"boss"}));
       var player = Q.stage().insert(new Q.Marisa());
       player.add("antiSpellMamizou");
       Q.stageScene('hud',3, Q('Marisa').first().p);
       Q.stage().insert(new Q.antiSpellBoton({x:LIMITEX1+100, y: 2300}));

     }});
   }
 });

 Q.Sprite.extend("CartelAdvise", {
   init: function (p) {
     this._super(p,{
       x: 1390,
       y: 2200,
       type: 0
     });
     this.add('tween');
     this.animate({x: this.p.x + 400}, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0});
   }
 });

});
