window.addEventListener("load",function(){

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

  Q.scene("levelDemo",function(stage) {
    Q.stageTMX("level.tmx",stage);
    //var boss = stage.insert(new Q.Reimu());
    var pu = stage.insert(new Q.PowerDisplay({x:2300, y:2300}));
    var player = stage.insert(new Q.Marisa());
    var spwner1 = stage.insert(new Q.SpawnerDemo({i: 0, x:2500, y:2329, time:0, timelimit:2, delay:2, numEnemy:20, enemy:"mobDemo"}));
    var spwner2 = stage.insert(new Q.SpawnerDemo({i: 0, x:2500, y:1664, time:0, timelimit:2, delay:2, numEnemy:20, enemy:"mobDemo"}));
    stage.add("viewport").centerOn(2200,2000);
  });

  Q.load("Advise-mamizou.png, mamizou-grande.png,Mamizou.png, Mamizou.json,forest.png, forest.json, pruebaMarisa.png, pruebabala.png, reimu.png, mobDemo.png, arrow.png, pu1.png, pu1D.png, sanguinaria.png", function() {
    Q.compileSheets("forest.png","forest.json"); //Añade la Sheet del bosque.
    Q.compileSheets("Mamizou.png","Mamizou.json");
    Q.stageScene("levelAdrian1");
    //Q.stageScene('hud', 3, Q('Marisa').first().p);
    //Q.stageScene('hudboss', 4, Q('Reimu').first().p);
  });


  Q.scene('endGame',function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    }));

    var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                    label: "Play Again", keyActionName: "confirm" }))
    var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                     label: stage.options.label }));
    button.on("click",function() {
      Q.clearStages();
      Q.stageScene('levelDemo');
      Q.stageScene('hud', 3, Q('Marisa').first().p);
      Q.stageScene('hudboss', 4, Q('Reimu').first().p);
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


  /*Animación del fondo bosque */
  Q.animations("forestAnim", {
    anim: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,
    13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    31,32,33,34,35,36,38,39], rate: 1/4, flip: false, loop: true}
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

  Q.Sprite.extend("MamizouAdvise", {
    init: function (p) {
      this._super(p,{
        asset: "mamizou-grande.png",
        x: 2200,
        y: 2000,
        type: 0
      });
      this.add('tween');
      this.animate({w: this.p.w - 300, h: this.p.h - 100, angle: 360 }, 1).chain({y:this.p.y-20},1.2).chain({y: this.p.y - 20, opacity: 0.0});
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



    //ANDRES

    //ADRI
    Q.scene("levelAdrian1",function(stage) {
    //stage.insert(new Q.Repeater({ asset: "fondoForest1.png", speedX: 0.5, vx:0.5, speedY: 0.5, repeatY: true, type: 0}));
    var fondo = stage.insert(new Q.FondoBosque());
    var boss = stage.insert(new Q.Mamizou());
    var pu = stage.insert(new Q.PowerDisplay({x:2300, y:2300}));
    var player = stage.insert(new Q.Marisa());
    //var orbe = stage.insert(new Q.OrbeReimu({x:2500, y:2329,reloadTime:0.1,destroyTime:30,vel:250}));
    //var spwner1 = stage.insert(new Q.SpawnerDemo({i: 0, x:2500, y:2329, time:0, timelimit:2, delay:2, numEnemy:20, enemy:"mobDemo"}));
    //var spwner2 = stage.insert(new Q.SpawnerDemo({i: 0, x:2500, y:1664, time:0, timelimit:2, delay:2, numEnemy:20, enemy:"mobDemo"}));
    //var direccion = {x:true, y:false};
    stage.add("viewport").centerOn(2200,2000);
    });

    //CHEMA
    Q.scene("levelChema",function(stage) {
    Q.stageTMX("level.tmx",stage);
    var boss = stage.insert(new Q.Reimu());
    var pu = stage.insert(new Q.PowerDisplay({x:2300, y:2300}));
    var player = stage.insert(new Q.Marisa());
    //var orbe = stage.insert(new Q.OrbeReimu({x:2500, y:2329,reloadTime:0.1,destroyTime:30,vel:250}));
    //var spwner1 = stage.insert(new Q.SpawnerDemo({i: 0, x:2500, y:2329, time:0, timelimit:2, delay:2, numEnemy:20, enemy:"mobDemo"}));
    //var spwner2 = stage.insert(new Q.SpawnerDemo({i: 0, x:2500, y:1664, time:0, timelimit:2, delay:2, numEnemy:20, enemy:"mobDemo"}));
    stage.add("viewport").centerOn(2200,2000);
  });
    //SERGIO

  });
