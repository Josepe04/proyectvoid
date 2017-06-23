window.addEventListener("load",function(){

/*  //SPAWNER PRUEBA
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
          case "mobRed":
            Q.stage().insert(new Q.EnemigoDemo({x:this.p.x, y: this.p.y}));
            break;
        }
         this.p.i++;
         this.p.time = 0;
       }
    }

  });*/

/*  Q.scene("levelDemo",function(stage) {
    Q.stageTMX("level.tmx",stage);
    //var boss = stage.insert(new Q.Reimu());
    var pu = stage.insert(new Q.PowerDisplay({x:2300, y:2300}));
    var player = stage.insert(new Q.Marisa());
  //  var spwner1 = stage.insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1700, y:2300, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:1}));
    //var spwner2 = stage.insert(new Q.SpawnerHijiri({asset: "spawner.png", x:1700, y:1700, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:2}));
    //var spwner3 = stage.insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2700, y:2300, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:0}));
    var spwner4 = stage.insert(new Q.SpawnerHijiri({asset: "spawner.png", x:2700, y:1700, time:0, timelimit:1, delay:2, numEnemy:20, level: 1, enemy:3}));
    stage.add("viewport").centerOn(2200,2000);
  });
*/

  Q.load("pruebabala.png, reimu.png, sanguinaria.png, balaPlayer.png,"+
   "bola.png, balaRedonda.png,up.png, flor.png, reimu_onmyoBall.png, ooiri.png, bolita.png,"+
   "bolita.png, fuego.png,miniOrbeRojo.png, arrow.png, music.png, fire.png, spawner.png,"+
   "sombrero.png, ovalo.png,flecha.png, fantasma.png, plato.png,"+
   "mobRed.png, mobBlue.png, mobOrange.png, mobWhite.png,"+
   "pu1.png, pu1D.png, reimu_animal.png,"+
   "escudo.png,"+
   "Touhou_castles.jpg, fondo_reimu.png, "+
   "templo.png, templo.json,forest.png, forest.json,river.png, river.json,fall.png, fall.json, montaña.png,montaña.json, volcan.png, volcan.json,"+
   "Advise-futo.png, Advise-hijiri.png,Advise-ichirin.png, Advise-kokoro.png, Advise-mamizou.png, Advise-mokou.png, Advise-reimu.png,"+
   "futo-grande.png, hijiri-grande.png, mamizou-grande.png, reimu-grande.png, mokou-grande.png, ichirin-grande.png,"+
   "ichirin.png, Ichirin.json,futo.png,futo.json,hijiri.png,hijiri.json,ichirin.png,ichirin.json,koishi.png,koishi.json, kokoro.png,kokoro.json, Mamizou.png,Mamizou.json, moukou.png,moukou.json,"+
   "reimu.png,reimu.json,marisa.png,marisa.json,"+
   "coin.mp3,death.mp3,levelup.mp3,Necrofantasia.mp3,reach_for_the_moon.mp3,staffroll.mp3,Song_of_storms.mp3,"+
   "balaPower1.png, balaPower2.png, balaPower3.png", function() {
    Q.compileSheets("forest.png","forest.json"); //Añade la Sheet del bosque.
    Q.compileSheets("templo.png","templo.json"); //Añade la Sheet del bosque.
    Q.compileSheets("river.png","river.json");
    Q.compileSheets("fall.png","fall.json");
    Q.compileSheets("volcan.png","volcan.json");
    Q.compileSheets("montaña.png","montaña.json");
    Q.compileSheets("Mamizou.png","Mamizou.json");
    Q.compileSheets("ichirin.png","Ichirin.json")
    Q.compileSheets("marisa.png", "marisa.json");
    Q.compileSheets("reimu.png", "reimu.json");
    Q.compileSheets("moukou.png", "moukou.json");
    Q.compileSheets("hijiri.png", "hijiri.json");
    Q.compileSheets("futo.png","futo.json");
    Q.stageScene("levelMamizou");
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
      Q.stageScene('levelMokou');
      Q.stageScene('hud', 3, Q('Marisa').first().p);
      //Q.stageScene('hudboss', 4, Q('Reimu').first().p);
    });

    container.fit(20);
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



    //ANDRES

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
  /*  if(Q('Hijiri').first()== null){
      this.destroy();
    }else */if(this.p.i==this.p.numEnemy){
      Q('Hijiri').first().destruyeSpawner();
      this.destroy();
    }

 },

sensor: function(colObj){
}

});



//////////////////////////////////////////////////////END OF STAGES/////////////////////////////////////////////////////////////////////////////

Q.scene("levelMamizou",function(stage) {

var fondo = stage.insert(new Q.FondoBosque());
stage.add("viewport").centerOn(2200,2000);
Q.stage().insert(new Q.MamizouAdvise());
Q.stage().insert(new Q.CartelAdvise({asset:"Advise-mamizou.png"}));
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
  Q.stageScene('levelHijiri');
  //Q.stageScene('hud', 3, Q('Marisa').first().p);
});

container.fit(20);
});

Q.scene("levelHijiri",function(stage) {
 var fondo = stage.insert(new Q.FondoRio());
 Q.stage().insert(new Q.HijiriAdvise());
 Q.stage().insert(new Q.CartelAdvise({asset:"Advise-hijiri.png"}));

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
    //Q.stageScene('hud', 3, Q('Marisa').first().p);
  });

  container.fit(20);
});

Q.scene("levelKoishi",function(stage) {
 var fondo = stage.insert(new Q.FondoRio());
 Q.stage().insert(new Q.KoishiAdvise());
 Q.stage().insert(new Q.CartelAdvise({asset:"Advise-koishi.png"}));

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
    //Q.stageScene('hud', 3, Q('Marisa').first().p);
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
  Q.stageScene('levelIchirin');
  //Q.stageScene('hud', 3, Q('Marisa').first().p);
});

container.fit(20);
});


Q.scene("levelIchirin",function(stage) {
  var fondo = stage.insert(new Q.FondoTemplo());
  stage.add("viewport").centerOn(2200,2000);
  Q.stage().insert(new Q.IchirinAdvise());
  Q.stage().insert(new Q.CartelAdvise({asset:"Advise-ichirin.png"}));
  Q.audio.stop();
  Q.audio.play("reach_for_the_moon.mp3",{ loop: true });
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
  var fondo = stage.insert(new Q.FondoVolcan());
  Q.stage().insert(new Q.KokoroAdvise());
  Q.stage().insert(new Q.CartelAdvise({asset:"Advise-kokoro.png"}));
  Q.audio.stop();
  Q.audio.play("reach_for_the_moon.mp3",{ loop: true });
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
  //Q.stageScene('hud', 3, Q('Marisa').first().p);
});

container.fit(20);
});

Q.scene("levelFuto",function(stage) {
 var fondo = stage.insert(new Q.FondoFall());
 Q.stage().insert(new Q.FutoAdvise());
 Q.stage().insert(new Q.CartelAdvise({asset:"Advise-futo.png"}));
 Q.stage().insert(new Q.PowerDisplayFinal({x:2400,y:2000,vx:-40}));
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
    //Q.stageScene('hud', 3, Q('Marisa').first().p);
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
         Q.stage().insert(new Q.PowerDisplay({x:2300, y:2300}));
         var player = Q.stage().insert(new Q.Marisa());
         Q.stageScene('hud',3, Q('Marisa').first().p);
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
         var boss = stage.insert(new Q.Hijiri());
         var player = stage.insert(new Q.Marisa());
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
