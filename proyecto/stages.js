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

  Q.load("pruebaMarisa.png,pruebabala.png, reimu.png, mobDemo.png, arrow.png, pu1.png, pu1D.png, sanguinaria.png,"
   +"reimu_animal.png, bola.png, balaRedonda.png,up.png, flor.png,reimu_onmyoBall.png, ooiri.png"
   +", reimu.json, Touhou_castles.jpg, fondo_reimu.png, miniOrbeRojo.png", function() {
    Q.compileSheets("reimu.png", "reimu.json");
    Q.stageScene("levelChema");
    Q.stageScene('hud',3, Q('Marisa').first().p);
    
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
    stage.insert(new Q.Repeater({ asset: "fondo_reimu.png", speedX: 0, speedY: 0, type: 0, h:screen.height ,w:screen.width}));
    //var boss = stage.insert(new Q.Reimu());
    stage.insert(new Q.Marisa());
    stage.insert(new Q.SpawnerChema({i: 0,cambioFase:true,x:2500, y:LIMITEUP, time:0, timelimit:2, delay:2, numEnemy:15,velx:0,vely:100, comp: "2d, orbePatron"}));
    stage.insert(new Q.SpawnerChema({i: 0,cambioFase:false,x:2500, y:LIMITEDOWN, time:0, timelimit:2, delay:2, numEnemy:15,velx:0,vely:-100, comp: "2d, orbePatron"}));
    faseNivel = 2;
    stage.add("viewport").centerOn(2200,2000);
});

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
           Q.stage().insert(new Q.EnemigoChema({vx: this.p.velx,vy:this.p.vely ,x:this.p.x, y: this.p.y,asset: "mobDemo.png"},this.p.comp));
           this.p.i++;
           this.p.time = 0;
         }else if(this.p.i == this.p.numEnemy){
           cambioFaseNivelChema1(this.p.cambioFase);
           this.destroy();
         }
      }
 
});




    //SERGIO

  });
