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
  //  var spwner1 = stage.insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1700, y:2300, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:1}));
    //var spwner2 = stage.insert(new Q.SpawnerHijiri({asset: "spawner.png", x:1700, y:1700, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:2}));
    //var spwner3 = stage.insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2700, y:2300, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:0}));
    var spwner4 = stage.insert(new Q.SpawnerHijiri({asset: "spawner.png", x:2700, y:1700, time:0, timelimit:1, delay:2, numEnemy:20, level: 1, enemy:3}));
    stage.add("viewport").centerOn(2200,2000);
  });

  /*Q.loadTMX("level.tmx, pruebaMarisa.png,pruebabala.png, reimu.png, mobDemo.png, arrow.png, pu1.png, pu1D.png, sanguinaria.png,"
   +"reimu_onmyoBall.png, ooiri.png", function() {
    Q.stageScene("levelChema");
    Q.stageScene('hud', 3, Q('Marisa').first().p);
    //Q.stageScene('hudboss', 4, Q('Reimu').first().p);
  });*/

  Q.loadTMX("level.tmx, pruebaMarisa.png,pruebabala.png, reimu.png,"+
  "mobRed.png, mobBlue.png, mobOrange.png, mobWhite.png, arrow.png, music.png, fire.png, pu1.png, pu1D.png, sanguinaria.png, spawner.png, hijiri.png, hijiri.json, sombrero.png, ovalo.png,"+//png Sergio
  "reimu_onmyoBall.png, ooiri.png", function() {
    Q.compileSheets("hijiri.png", "hijiri.json");
    Q.stageScene("levelSergio1");
    Q.stageScene('hud', 3, Q('Marisa').first().p);
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



    //ANDRES

    //ADRI

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
    Q.scene("levelSergio1",function(stage) {
     Q.stageTMX("level.tmx",stage);
     var boss = stage.insert(new Q.Hijiri());
     var player = stage.insert(new Q.Marisa());

     stage.add("viewport").centerOn(2200,2000);
 });


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
        if(Q('Hijiri').first()== null){
          this.destroy();
        }else if(this.p.i==this.p.numEnemy){
          Q('Hijiri').first().destruyeSpawner();
          this.destroy();
        }

     },

   sensor: function(colObj){
    }

   });

   Q.scene('endHijiri',function(stage) {
     var container = stage.insert(new Q.UI.Container({
       x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
     }));

     var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                     label: "Play Again", keyActionName: "confirm" }))
     var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                                      label: stage.options.label }));
     button.on("click",function() {
       Q.clearStages();
       Q.stageScene('levelSergio1');
       Q.stageScene('hud', 3, Q('Marisa').first().p);
       Q.stageScene('hudboss', 4, Q('Hijiri').first().p);
     });

     container.fit(20);
   });

  });
