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

  /*
  Q.loadTMX("level.tmx, pruebaMarisa.png,pruebabala.png, reimu.png, mobDemo.png, arrow.png, pu1.png, pu1D.png, sanguinaria.png,"
   +"reimu_onmyoBall.png, ooiri.png", function() {
    Q.stageScene("levelChema");
    Q.stageScene('hud', 3, Q('Marisa').first().p);
    //Q.stageScene('hudboss', 4, Q('Reimu').first().p);
  });
  */
  Q.load("pruebaMarisa.png, pruebabala.png, escenario_koishi.png, Torreta.png, koishi_bala1.png, koishi_bala2.png, koishi_bala3.png, koishi_bala4.png, koishi_bala5.png, koishi.png, koishi.json, mobDemo.png, arrow.png, pu1.png, pu1D.png, sanguinaria.png",  function() {
    Q.compileSheets("koishi.png", "koishi.json");
    Q.stageScene("levelAndres");
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
        // time y delay son pasados por parametros, la idea es que time sufra el retraso de delay
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

    Q.scene("levelAndres",function(stage) {
    // Mete el fondo del escenario
    stage.insert(new Q.Repeater({ asset: "escenario_koishi.png", speedX: 0, speedY: 0, type: 0, h:screen.height, w:screen.width }));


    var pu = stage.insert(new Q.PowerDisplay({x:2300, y:2300}));
    var torreta1 = stage.insert(new Q.Torreta({x:2300, y:1870}));
    var torreta2 = stage.insert(new Q.Torreta({x:2600, y:2000}));
    var torreta3 = stage.insert(new Q.Torreta({x:2420, y:2263}));
    var boss = stage.insert(new Q.Koishi({t1:torreta1, t2:torreta2, t3:torreta3}));
    var player = stage.insert(new Q.Marisa());
    // cuanto mas timelimit mas tiempo tardan en salir los objetos del spawner, el delay es para determinar cuanto tarda en salir el PRIMERO de ellos
    var spawner1 = stage.insert(new Q.SpawnerOrbesInvulnerabilidad({time:0, timelimit:8, delay:2}));
    //var spawner2 = stage.insert(new Q.SpawnerOrbesSanacion({time:0, timelimit:2, delay:2}));

    //var orbe = stage.insert(new Q.OrbeReimu({x:2500, y:2329,reloadTime:0.1,destroyTime:30,vel:250}));
    //var spwner1 = stage.insert(new Q.SpawnerDemo({i: 0, x:2500, y:2329, time:0, timelimit:2, delay:2, numEnemy:20, enemy:"mobDemo"}));
    //var spwner2 = stage.insert(new Q.SpawnerDemo({i: 0, x:2500, y:1664, time:0, timelimit:2, delay:2, numEnemy:20, enemy:"mobDemo"}));
    stage.add("viewport").centerOn(2200,2000);
  });

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

  });
