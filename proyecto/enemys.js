window.addEventListener("load",function(){


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
        tipo: "bala",
        sensor:true
      });
      this.add('2d');
      this.on("sensor",tipoBala.funcionColision);
    },
    step: function(dt){
      //this.p.x += dt*this.p.vx;
      //this.p.y += dt*this.p.vy;
      if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
        this.destroy();
    }
  });



  Q.component("speellCard1ReimuDemo",{
    added: function() {
      var p = this.entity.p;
      this.entity.on("step",this,"step");
      this.reloadTime = 0.7;
      this.active = true;
    },

    step: function(dt) {
      if(this.active){
        var p = this.entity.p;
        this.entity.p.time+=dt;
        if(p.time >=this.reloadTime){
            this.entity.p.time = 0;
          Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:-100,vy:150,rad: 15,
                                  funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:-100,vy:70,rad: 15,
                                  funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:-100,vy:0,rad: 15,
                                  funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:-100,vy:-70,rad: 15,
                                  funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.Bala({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:-100,vy:-150,rad: 15,
                                  funcionColision:function(colObj){}}));


        }
      }


    },

      habilitar: function(){
        if(this.active) this.active =false;
        else this.active = true;
      }
  });


  //BOSS PRUEBA
  Q.Sprite.extend("ReimuDemo",{
    init: function(p) {
        this._super({
          asset:"reimu.png",
          x:2700,
          y:2000,
          vy:100,
          time:0,
          time2:0,
          gravity:0,
          radio:30,
          sensor:true,
          tipo: "boss",
          vida:2000
        });
        this.ultimo = 0;
        this.add('2d, speellCard1Reimu2');
        this.on("sensor");
      },

      step: function(dt) {
        if(this.p.y <= 1664) this.p.vy = 100;
        else if(this.p.y >= 2329) this.p.vy = -100;
      },

      sensor: function(colObj){
          if(colObj.isA("BalaPlayer")){
            Q.stageScene('hudboss', 4, Q('Reimu').first().p);
          }

          if(this.p.vida<=0){
            this.destroy();
            Q.stageScene("endGame",1, { label: "You Win" });
          }
      }
  });


  //ENEMIGO PRUEBA
  Q.Sprite.extend("EnemigoDemo",{
    init: function(p) {
      this._super(p, {
        asset:"mobDemo.png",
        radio:60,
        time: 0,
        time2:0,
        gravity:0,
        vida:10,
        tipo: "enemy",
        sensor:true
      });
      if(this.p.y == 2329) this.p.vy = -150;
      else if(this.p.y == 1664) this.p.vy = 150;
      this.ultimo = 0;
      this.add('2d, arrowPatron');
      this.on("sensor");
    },

    step: function(dt) {
    },

    sensor: function(colObj){
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
          var mar = Q('Marisa').first().p;
          var modV = balaDirigida(mar,p);
          modV.vx = -modV.vx *200;
          modV.vy = -modV.vy *200;
          Q.stage().insert(new Q.Bala({asset: "arrow.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:modV.vx,vy:modV.vy,rad: 15,
                                  funcionColision:function(colObj){}}));

        }

      }

  });


  //ANDRES

  //ADRI
  Q.animations("mamizouAnim", {
    "ataque-basico": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/5, flip:"x", loop: false, trigger: "ataqueBasico"},
    "inicio": {frames:[0,1,2,3,4,5,6,7,8], rate: 1/5, flip:"x", loop: false, trigger: "iniciaBatalla"},
    "muerte": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], rate: 1/5, flip:"x", loop: false, trigger: "destruir"},
    "ataque-final": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,13], rate: 1/5, flip:"x", loop: false, trigger: "ataqueFinal"},
    "movimiento": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/5, flip:"x", loop: true}
  });

  Q.Sprite.extend("Mamizou", {
    init: function(p) {
      this._super(p, {
        sprite: "mamizouAnim",
        sheet: "start",
        x:2700,
        y:2000,
        time: 0,
        radio: 30,
        gravity: 0,
        sensor:true,
        tipo: "boss",
      });
      this.add("animation, 2d, arrowPatron");
      this.play("inicio");

      this.on("iniciaBatalla", function() {
        this.p.sheet = "stand";
        this.play("movimiento");
        this.p.vy = 100;
        Q.stage().insert(new Q.MamizouAdvise());
        Q.stage().insert(new Q.CartelAdvise({asset:"Advise-mamizou.png"}));
      });
    },

    step: function(dt) {
      if(this.p.y <= 1664) this.p.vy = 100;
      else if(this.p.y >= 2329) this.p.vy = -100;
    }

  });

  //ARROW DEMO
  Q.component("proyectilFlotante", {

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
          var mar = Q('Marisa').first().p;
          var modV = balaDirigida(mar,p);
          modV.vx = -modV.vx *200;
          modV.vy = -modV.vy *200;
          Q.stage().insert(new Q.Bala({asset: "arrow.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:modV.vx,vy:modV.vy,rad: 15,
                                  funcionColision:function(colObj){}}));

        }

      }

  });

  //CHEMA
    Q.Sprite.extend("Reimu",{
    init: function(p) {
        this._super({
          asset:"reimu.png",
          x:2700,
          y:2000,
          vy:100,
          time:0,
          time2:0,
          gravity:0,
          radio:30,
          sensor:true,
          fase:0,
          numFases:4,
          tipo: "boss",
          vida:100
        });
        this.ultimo = 0;
        this.add('2d, spellCard1Reimu1');
        this.on("sensor");
      },

      step: function(dt) {
        if(this.p.y <= 1664) this.p.vy = 100;
        else if(this.p.y >= 2329) this.p.vy = -100;
      },

      sensor: function(colObj){
          if(colObj.isA("BalaPlayer")){
            this.p.vida --;
            Q.stageScene('hudboss', 4, this.p);
            colObj.destroy();
          }

          if(this.p.vida<=0){
            if(this.p.fase >= this.p.numFases){
              this.destroy();
              Q.stageScene("endGame",1, { label: "You Win" });
            }else if(this.p.fase == 1){
              this.del("spellCard1Reimu1");
              this.add("spellCard1Reimu2");
              this.p.vida = 100;
            }else if(this.p.fase == 2){
              this.spellCard1Reimu2.limpiar();
              this.del("spellCard1Reimu2");
              this.add("spellCard1Reimu3");
              this.p.vida = 100;
            }else if(this.p.fase == 3){
              this.p.vida = 100;
            }
            this.p.fase++;
          }
      }
  });

  Q.Sprite.extend("OrbeReimu",{
      init: function(p){
      //como crear una bala concreta
      //this.stage.insert(new Q.Bala(args));
      this._super(p,{
        asset:"reimu_onmyoBall.png",
        gravity:0,
        tipo: "boss",
        time:0,
        time2:0,
        radio:10,
        mar:Q('Marisa').first().p,
        sensor:true
      });
      this.add('2d');
      this.on("sensor",function(){
        this.p.vx = 0;
        this.p.vy = 0;
      });
    },
    step: function(dt){
      var p = this.p;
      p.time+=dt;
      p.time2+=dt;
      var velx=0,vely=0;
      if(p.mar!=null){
        //x
        if(p.x < p.mar.x)
            p.vx = p.vel;
        else
          p.vx = -p.vel;
        //y
        if(p.y < p.mar.y)
          p.vy = p.vel;
        else
          p.vy = -p.vel;

        if(p.reloadTime <= p.time){
          p.time = 0;
          Q.stage().insert(new Q.BalaTemporal({asset: "ooiri.png", x:p.x ,y:p.y,radio: 15,destroyTime:5}));
        }
        if(p.mar.vidas <= 0){
          this.destroy();
        }
      }
    }
  });

  Q.Sprite.extend("BalaTemporal",{
    init: function(p){
      //como crear una bala concreta
      //this.stage.insert(new Q.Bala(args));
      this._super(p,{
        //sheet:tipoBala.sh,
        //sprite:tipoBala.spr,
        gravity:0,
        tipo: "bala",
        time:0,
        sensor:true
      });
      this.add('2d');
      this.on("sensor",function(){});
    },
    step: function(dt){
      this.p.time+=dt;
      if(this.p.time >= this.p.destroyTime){
        this.destroy();
      }
    }
  });


  Q.Sprite.extend("BalaRebota",{
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
        tipo: "bala",
        sensor:true
      });
      this.add('2d');
      this.on("sensor",tipoBala.funcionColision);
    },
    step: function(dt){
      this.p.x += dt*this.p.vx;
      this.p.y += dt*this.p.vy;
      if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 )
        this.destroy();
      else if( this.p.y < 1664 || this.p.y > 2329){
        this.p.vy = -this.p.vy;
      }
    }
  });

  Q.Sprite.extend("BalaSpell3",{
    init: function(p){
      //como crear una bala concreta
      //this.stage.insert(new Q.Bala(args));
      this._super(p,{
        //sheet:tipoBala.sh,
        //sprite:tipoBala.spr,
        gravity:0,
        tipo: "boss",
        sensor:true
      });
      this.add('2d');
      this.on("sensor");
    },
    step: function(dt){
      if( this.p.y < 2300 || this.p.x > 2600){
        this.p.vx = -this.p.vx;
      }
    }
  });

  Q.component("spellCard1Reimu1",{
    added: function() {
      var p = this.entity.p;
      this.entity.on("step",this,"step");
      this.reloadTime1 = 0.1;
      this.reloadTime2 = 0.1;
    },

    step: function(dt) {
        var p = this.entity.p;
        this.entity.p.time+=dt;
        this.entity.p.time2+=dt;
        var salida = Math.floor(Math.random() * LIMITER-1) + LIMITEL+1;
        if(p.time >=this.reloadTime1){
            this.entity.p.time = 0;
          Q.stage().insert(new Q.BalaRebota({asset: "sanguinaria.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:-100,vy:150,rad: 15,
                                  funcionColision:function(colObj){}}));
        }
        if(p.time2 >=this.reloadTime2){
            this.entity.p.time2 = 0;
          Q.stage().insert(new Q.Bala({asset: "ooiri.png", x:salida,y:LIMITEY1,
                                  vx:-50,vy:150,rad: 15,
                                  funcionColision:function(colObj){}}));
        }
      }
  });

  Q.component("spellCard1Reimu2",{
    added: function() {
      var p = this.entity.p;
      this.orbe = Q.stage().insert(new Q.OrbeReimu({x:p.x, y:p.y,reloadTime:0.3,vel:250}));
    },
    limpiar: function(){
      this.orbe.destroy();
    }
  });

  Q.component("spellCard1Reimu3",{
    added: function() {
      this.entity.on("step",this,"step");
      var p = this.entity.p;
      this.reloadTime1 = 0.2;
      p.time = 0;
      for(var i = LIMITEUP;i < LIMITEDOWN;i+=30){
         Q.stage().insert(new Q.Bala({asset: "ooiri.png", x:2600,y:i,
                                  vx:-40,vy:0,rad: 15,
                                  funcionColision:function(colObj){}}));
      }
    },
    step: function(dt){
      var p = this.entity.p;
      p.time+=dt;
      if(p.time >=this.reloadTime1){
          this.entity.p.time = 0;
          var mar = Q('Marisa').first().p;
          var modV = balaDirigida(mar,p);
          modV.vx = -modV.vx *200;
          modV.vy = -modV.vy *200;
          Q.stage().insert(new Q.Bala({asset: "arrow.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:modV.vx,vy:modV.vy,rad: 15,
                                  funcionColision:function(colObj){}}));
      }
    }
  });




  //SERGIO

  //Animaciones
  Q.animations("hijiri_animations", {
    invocar1: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], rate: 1/4, flip: "x", loop: false, trigger: "stand"},
    invocar2: {frames: [0, 1, 2, 3, 4, 5, 6], rate: 1/4, flip: "x", loop: false, trigger: "stand"},
    aparecer: {frames: [0, 1, 2, 3, 4, 5], rate: 1/3, flip: "x", loop: false, trigger: "inicio"},
    muerte: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], rate: 1/5, flip: "x", loop: false, trigger: "muerte"},
    invocar3: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], rate: 1/5, flip: "x", loop: false, trigger: "stand"},
    stand: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], rate: 1/5, flip: "x", loop: true}

  });
  //Boss
  Q.Sprite.extend("Hijiri",{
 init: function(p) {
     this._super({
       sprite: "hijiri_animations",
       sheet:"aparecerH",
       x:2700,
       y:2000,
       time:0,
       fase:0,
       numSpawn: 0,
       gravity:0,
       radio:30,
       sensor:true,
       tipo: "boss",
       maxVida :2000,
       vida:2000
     });

    this.on("inicio", function() {
    //  this.p.sheet= "invocar2H";
    //  this.play("invocar2");
      Q.stage().insert(new Q.Bala({asset: "sombrero.png", x:this.p.x - 1.5*this.p.radio,y:this.p.y,
                              vx:-300,vy:0,rad: 15,
                              funcionColision:function(colObj){}}));
      this.p.fase=1;
      });


    this.on("stand", function() {
      this.p.sheet= "standH";
      this.play("stand");
      });

    this.on("muerte", function() {
      this.p.numSpawn = 0;
       Q.stageScene("endHijiri",1, { label: "You Win" });
       this.destroy();
     });

     this.add('2d, animation');
     this.on("sensor");
     this.comenzar();
     this.play("aparecer");

   },

   comenzar: function(){
     this.add("spellCard1Hijiri");
     Q.stage().insert(new Q.HijiriAdvise());
     Q.stage().insert(new Q.CartelAdvise({asset:"Advise-hijiri.png"}));
   },

   destruyeSpawner: function(){
     this.p.numSpawn--;
   },

   step: function(dt) {
     if(this.p.y <= 1700) this.p.vy = 100;
     else if(this.p.y >= 2300) this.p.vy = -100;

     if(this.p.vida<=(this.p.maxVida/2) && this.p.fase <= 1){
         this.p.fase=2;
         //this.p.sheet= "invocar2H";
         //this.play("invocar2");
     }else if(this.p.vida<=(this.p.maxVida/10) && this.p.fase <= 2){
       this.del("spellCard1Hijiri");
       this.add("spellCard2Hijiri");
       this.p.fase=3;
       this.p.vy = 100;
     }


   },

   sensor: function(colObj){
       if(colObj.isA("BalaPlayer")){
         //this.p.vida --;
         Q.stageScene('hudboss', 4, this.p);
         //colObj.destroy();
       }
       if(this.p.vida<=0){
        this.p.sheet = "muerteH";
        this.play("muerte");
      }

   }
});

//Habilidad
Q.component("spellCard1Hijiri",{
 added: function() {
   var p = this.entity.p;
   this.entity.on("step",this,"step");
 },

 step: function(dt) {
     var p = this.entity.p;
     var sheet, anim;
     sheet="invocar1H";
     anim = "invocar1";


     if(p.numSpawn <= p.fase-1){
       var enemy = Math.floor((Math.random() * 10)) % 4;
       var pos = Math.floor((Math.random() * 10)) % 4;
       switch (pos) {
        case 0:
          Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2700, y:2300, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:enemy}));
          p.numSpawn++;
          p.sheet = sheet;
          this.entity.play(anim);
          break;
        case 1:
          Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2700, y:1700, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:enemy}));
          p.numSpawn++;
          p.sheet = sheet;
          this.entity.play(anim);
          break;
        case 2:
          Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1600, y:2300, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:enemy}));
          p.numSpawn++;
          p.sheet = sheet;
          this.entity.play(anim);
          break;
        case 3:
          Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1600, y:1700, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:enemy}));
          p.numSpawn++;
          p.sheet = sheet;
          this.entity.play(anim);
          break;

       }
     }
   }


});

Q.component("spellCard2Hijiri",{
  added: function() {
    var p = this.entity.p;
    this.entity.on("step",this,"step");
  },

  step: function(dt) {
      var p = this.entity.p;
      p.time+=dt;
      if(p.numSpawn <1 && p.vida > 0){
        var enemy = Math.floor((Math.random() * 10)) % 4;
        Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2700, y:2300, time:0, timelimit:4, delay:0, numEnemy:2, level: 5, enemy:enemy}));
        enemy = Math.floor((Math.random() * 10)) % 4;
        Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2700, y:1700, time:0, timelimit:4, delay:0, numEnemy:2, level: 5, enemy:enemy}));
        enemy = Math.floor((Math.random() * 10)) % 4;
        Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1600, y:2300, time:0, timelimit:4, delay:0, numEnemy:2, level: 5, enemy:enemy}));
        enemy = Math.floor((Math.random() * 10)) % 4;
        Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1600, y:1700, time:0, timelimit:4, delay:0, numEnemy:2, level: 5, enemy:enemy}));
        p.numSpawn=4;
        p.sheet = "invocar3H";
        this.entity.play("invocar3");
      }
      /*if(Math.floor(p.time)%3 == 0 && p.fase == 3 && p.vida > 0){
        p.sheet= "invocar3";
        this.entity.play("invocar3");
      }*/
    }



});


//Enemigos
Q.Sprite.extend("EnemigoRed",{
  init: function(p) {
    this._super(p, {
      asset:"mobRed.png",
      radio:60,
      time:0,
      gravity:0,
      tipo: "enemy",
      sensor:true
    });
    if(this.p.y >= 1996) this.p.vy = -200;
    else if(this.p.y < 1996) this.p.vy = 200;
    this.add('2d, OvaloPatron');
    this.on("sensor");
  },

  step: function(dt) {
    if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1  || this.p.y > LIMITEY2 || this.p.y < LIMITEY1){
        this.destroy();
    }
  },

  sensor: function(colObj){
  }

});

Q.Sprite.extend("EnemigoBlue",{
  init: function(p) {
    this._super(p, {
      asset:"mobBlue.png",
      radio:60,
      time:0,
      gravity:0,
      tipo: "enemy",
      sensor:true
    });

    if(this.p.x >= 2200) this.p.vx = -200;
    else if(this.p.x < 2200) this.p.vx = 200;
    this.add('2d, MusicPatron');
    this.on("sensor");
  },

  step: function(dt) {
    if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1  || this.p.y > LIMITEY2 || this.p.y < LIMITEY1){
        this.destroy();
    }
  },

  sensor: function(colObj){
  }

});

Q.Sprite.extend("EnemigoOrange",{
  init: function(p) {
    this._super(p, {
      asset:"mobOrange.png",
      radio:60,
      time:0,
      gravity:0,
      tipo: "enemy",
      sensor:true
    });
    if(this.p.y >= 1996) this.p.vy = -150;
    else if(this.p.y < 1996) this.p.vy = 150;
    this.add('2d, FirePatron');
    this.on("sensor");
  },

  step: function(dt) {
    if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1  || this.p.y > LIMITEY2 || this.p.y < LIMITEY1){
        this.destroy();
    }
  },

  sensor: function(colObj){
  }

});

Q.Sprite.extend("EnemigoWhite",{
  init: function(p) {
    this._super(p, {
      asset:"mobWhite.png",
      radio:60,
      gravity:0,
      tipo: "enemy",
      sensor:true
    });

    this.add('2d');
    this.on("sensor");
  },

  step: function(dt) {
    var mar = Q('Marisa').first().p;
    if(mar!==null){
      //x
      if(this.p.x < mar.x)
          this.p.vx = 100;
      else
        this.p.vx = -100;
      //y
      if(this.p.y < mar.y)
        this.p.vy = 100;
      else
        this.p.vy = -100;

      if(mar.vidas <= 0){
        this.destroy();
      }
    }

  if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1  || this.p.y > LIMITEY2 || this.p.y < LIMITEY1){
      this.destroy();
  }

  },

  sensor: function(colObj){
  }

});

//Balas
Q.component("MusicPatron", {

    added: function() {
      var p = this.entity.p;
      this.entity.on("step",this,"step");
      this.reloadTime = 1;
    },

    step: function(dt) {
      var p = this.entity.p;
      this.entity.p.time+=dt;
      if(p.time >=this.reloadTime){
        this.entity.p.time = 0;
        var vy;
        var y = p.y;
        if(y <= 1996){
          vy = 400;
          y = p.y + 1.5*p.radio;
        }
        else{
          vy = -400;
          y = p.y - 1.5*p.radio;
        }

        Q.stage().insert(new Q.Bala({asset: "music.png", x:p.x, y:y,
                                vx:0,vy:vy,rad: 15,
                                funcionColision:function(colObj){}}));

      }

    }

});

Q.component("FirePatron", {

    added: function() {
      var p = this.entity.p;
      this.entity.on("step",this,"step");
      this.reloadTime = 0.75;
    },

    step: function(dt) {
      var p = this.entity.p;
      this.entity.p.time+=dt;
      if(p.time >=this.reloadTime){
        this.entity.p.time = 0;
        var vx;
        var x = p.x;
        if(x <= 2100){
          vx = 400;
          x = p.x + 1.5*p.radio;
        }
        else{
          vx = -400;
          x = p.x - 1.5*p.radio;
        }
        Q.stage().insert(new Q.BalaArco({asset: "fire.png", x:x, y:p.y,
                                vx:vx, vy:-100, radio: 15, gravity:0.2,
                                funcionColision:function(colObj){}}));

      }

    }

});

Q.component("OvaloPatron", {

  added: function() {
    var p = this.entity.p;
    this.entity.on("step",this,"step");
    this.reloadTime = 1;
  },

  step: function(dt) {
    var p = this.entity.p;
    this.entity.p.time+=dt;
    if(p.time >=this.reloadTime){
      this.entity.p.time = 0;
      var vx;
      var x = p.x;
      if(x <= 2100){
        vx = 400;
        x = p.x + 1.5*p.radio;
      }
      else{
        vx = -400;
        x = p.x - 1.5*p.radio;
      }
      Q.stage().insert(new Q.Bala({asset: "ovalo.png", x:x, y:p.y,
                              vx:vx,vy:0,rad: 15,
                              funcionColision:function(colObj){}}));

    }

  }
});

Q.Sprite.extend("BalaArco",{
  init: function(p){
    //como crear una bala arco
    //this.stage.insert(new Q.BalaArco(args));
    //Para un arco estandar se recomiendan los siguientes parametros: (para un reloadTime de entre 0.5 y 0.75)
    //vx: -400;
    //vy:-100;
    //grav: 0.2;
    this._super(p, {
      tipo: "bala",
      sensor:true
    });
    this.add('2d');
    this.on("sensor",function(){});
  },
  step: function(dt){
    if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1  || this.p.y > LIMITEY2)
      this.destroy();
  }
});





//Animaciones
Q.animations("futo_animations", {
  vuelta: {frames: [0, 1, 2, 3, 4, 5, 6, 7], rate: 1/4, flip: "x", loop: false, trigger: "andanada"},
  palto: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], rate: 1/4, flip: "x", loop: false, trigger: "stand"},
  fantasmas: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rate: 1/4, flip: "x", loop: false, trigger: "stand"},
  flechas: {frames: [0, 1, 2, 3, 4, 5, 6, 7], rate: 1/4, flip: "x", loop: true},
  stand: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], rate: 1/4, flip: "x", loop: true},
  muerte: {frames: [0, 1, 2, 3, 4, 5, 6], rate: 1/3, flip: "x", loop: false, trigger: "muerte"}
});
//Boss
Q.Sprite.extend("Futo",{
init: function(p) {
   this._super({
     sprite: "futo_animations",
     sheet:"vueltaF",
     x:2700,
     y:2200,
     time:0,
     time2:0,
     fase:0,
     gravity:0,
     radio:30,
     sensor:true,
     tipo: "boss",
     maxVida :2000,
     vida:2000,
     reload: 15
   });



  this.on("stand", function() {
    this.p.sheet= "standF";
    this.play("stand");
    });

  this.on("muerte", function() {
    this.p.numSpawn = 0;
     Q.stageScene("endFuto",1, { label: "You Win" });
     this.destroy();
   });

   this.on("andanada", function() {
     if(this.p.y == 1800) this.p.y = 2200;
     else if(this.p.y == 2200) this.p.y = 2000;
     else this.p.y = 1800;
     this.p.sheet = "flechasF";
     this.play("flechas");
     Q.stage().insert(new Q.AndanadaFlechas({x:this.p.x, y:this.p.y, reload:this.p.reload/10, numFlechas:3}));
    });

   this.add('2d, animation');
   this.on("sensor");
   this.comenzar();
   this.play("vuelta");

 },

 comenzar: function(){
   this.add("spellCard1Futo");
   this.add("spellCard2Futo");
   Q.stage().insert(new Q.FutoAdvise());
   Q.stage().insert(new Q.CartelAdvise({asset:"Advise-futo.png"}));
   this.p.fase = 1;
 },


 step: function(dt) {

   if(this.p.vida<=(this.p.maxVida/2) && this.p.fase <= 1){
     this.p.fase = 2;
     this.p.sheet= "fantasmasF";
     this.play("fantasmas");
     this.p.reload = 10;
   }else if(this.p.vida<=(this.p.maxVida/5) && this.p.fase <= 2){
     this.add("spellCard3Futo");
     this.p.sheet= "platoF";
     this.play("plato");
     this.p.fase=3;
   }


 },

 sensor: function(colObj){
     if(colObj.isA("BalaPlayer")){
       //this.p.vida --;
       Q.stageScene('hudboss', 4, this.p);
       //colObj.destroy();
     }
     if(this.p.vida<=0){
      this.p.sheet = "muerteH";
      this.play("muerte");
    }

 }
});


Q.component("spellCard1Futo",{
  added: function() {
    var p = this.entity.p;
    this.entity.on("step",this,"step");
  },

  step: function(dt) {
      var p = this.entity.p;
      p.time+=dt;
      if(p.time >=p.reload/5){
        this.entity.p.time = 0;


        Q.stage().insert(new Q.BalaZigZag({asset: "fantasma.png", x:p.x, y:1700,
                                vx:-200, vy:300, radio: 15, cambio:0.75,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.BalaZigZag({asset: "fantasma.png", x:p.x, y:1900,
                                vx:-200, vy:300, radio: 15, cambio:0.75,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.BalaZigZag({asset: "fantasma.png", x:p.x, y:2100,
                                vx:-200, vy:300, radio: 15, cambio:0.75,
                                funcionColision:function(colObj){}}));

      }
    }



});

Q.Sprite.extend("BalaZigZag",{
  init: function(p){

    this._super(p, {
      tipo: "bala",
      time: 0,
      gravity: 0,
      sensor:true
    });
    this.add('2d');
    this.on("sensor",function(){});
  },
  step: function(dt){

    this.p.time+=dt;

    if(this.p.time>=this.p.cambio){
      this.p.vy = - this.p.vy;
      this.p.time = 0;
    }

    if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1)
      this.destroy();
  }
});

Q.component("spellCard2Futo",{
  added: function() {
    var p = this.entity.p;
    this.entity.on("step",this,"step");
  },
  step: function(dt) {
      var p = this.entity.p;
      p.time2+=dt;
      if(p.time2 >=p.reload){
        this.entity.p.time2 = 0;
        p.sheet = "vueltaF";
        this.entity.play("vuelta");
    }
  }

});

Q.Sprite.extend("AndanadaFlechas",{
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

    if((this.p.i<this.p.numFlechas) && (this.p.time>this.p.reload || this.p.first)){
      var vx = -350;
        Q.stage().insert(new Q.BalaArco({asset: "flecha.png", x:this.p.x, y:this.p.y,
                                vx:vx, vy:-400, radio: 15, gravity:0.2,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.BalaArco({asset: "flecha.png", x:this.p.x, y:this.p.y,
                                vx:vx, vy:-300, radio: 15, gravity:0.2,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.BalaArco({asset: "flecha.png", x:this.p.x, y:this.p.y,
                                vx:vx, vy:-200, radio: 15, gravity:0.2,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.BalaArco({asset: "flecha.png", x:this.p.x, y:this.p.y,
                                vx:vx, vy:-100, radio: 15, gravity:0.2,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.BalaArco({asset: "flecha.png", x:this.p.x, y:this.p.y,
                                vx:vx, vy:0, radio: 15, gravity:0.2,
                                funcionColision:function(colObj){}}));
       this.p.i++;
       this.p.time = 0;
       this.p.first = false;
     }

     if(this.p.i == this.p.numFlechas){
       Q('Futo').first().p.sheet = "standF";
       Q('Futo').first().play("stand");
       this.destroy();
     }
  },

sensor: function(colObj){
 }

});

Q.component("spellCard3Futo",{
  added: function() {
    var p = this.entity.p;
    this.entity.on("step",this,"step");
  },

  step: function(dt) {
      var p = this.entity.p;
      p.time+=dt;

    }



});

});
