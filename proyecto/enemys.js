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
            this.p.vida --;
            Q.stageScene('hudboss', 4, Q('Reimu').first().p);
            colObj.destroy();
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

/*_________________________________________________NIVEL KOISHI__________________________________________________________________________________________*/
  Q.animations("koishi_animations", {
  invulnerable: {frames: [0, 1, 2, 3], rate: 1/4, flip: "x", loop: true},
  inicio: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rate: 1/4, flip: "x", loop: false, trigger: "battleStart"},
  stand: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], rate: 1/5, flip: "x", loop: true},
  curacion: {frames: [0, 1, 2, 3, 4, 5, 6], rate: 1/5, flip: "x", loop: false, trigger: "keepMoving"},
  death: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], rate: 1/4, flip: "x", loop: false, trigger: "destruir"}
});


// PATRONES DE DISPARO

// Patron Boss
Q.component("koishiPatron1", {

    added: function() {
      var p = this.entity.p;
      this.entity.on("step",this,"step");
      // Cuanto menos, mas cadencia
      this.reloadTime = 0.6;
    },

    step: function(dt) {
      var p = this.entity.p;
      // Aumentamos el tiempo de la Torreta (ver sprite Torreta)
      this.entity.p.time+=dt;
      // Cuando sobrepase el tiempo de recarga disparamos:
      if(p.time >=this.reloadTime){
        this.entity.p.time = 0;
        // Como vamos a usar disparos dirigidos:
        //Extraemos la posicion del jugador
        var mar = Q('Marisa').first().p;
        // Metemos la posicion del boss
        var modV = balaDirigida(mar,p);
        // Determinamos la velocidad de los proyectiles
        modV.vx = -modV.vx *250;
        modV.vy = -modV.vy *250;
        // Usamos balas "estandard" (ver el sprite Bala)
        // 3 Disparos:
        // Un disparo lento dirigido al jugador
        Q.stage().insert(new Q.Bala({asset: "koishi_bala5.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:modV.vx,vy:modV.vy,rad: 15,
                                funcionColision:function(colObj){}}));
        // Dos disparos rapidos no dirigidos
        Q.stage().insert(new Q.Bala({asset: "koishi_bala2.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:-500,vy:-200,rad: 15,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.Bala({asset: "koishi_bala2.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:-500,vy:200,rad: 15,
                                funcionColision:function(colObj){}}));
      }
    }
  });

  // Patron Torreta
  Q.component("torretaPatron", {

      added: function() {
        var p = this.entity.p;
        this.entity.on("step",this,"step");
        // Cuanto menos, mas cadencia
        this.reloadTime = 0.7;
      },

      step: function(dt) {
        var p = this.entity.p;
        // Aumentamos el tiempo de la Torreta (ver sprite Torreta)
        this.entity.p.time+=dt;
        // Cuando sobrepase el tiempo de recarga disparamos:
        if(p.time >=this.reloadTime){
          this.entity.p.time = 0;
          // Como vamos a usar disparos dirigidos:
          //Extraemos la posicion del jugador
          var mar = Q('Marisa').first().p;
          // Metemos la posicion de la torreta que dispara y la del jugador
          var modV = balaDirigida(mar,p);
          // Determinamos la velocidad de los proyectiles
          modV.vx = -modV.vx *200;
          modV.vy = -modV.vy *200;
          // Usamos balas "estandard" (ver el sprite Bala)
          Q.stage().insert(new Q.Bala({asset: "koishi_bala1.png", x:p.x - 1.5*p.radio,y:p.y,
                                  vx:modV.vx,vy:modV.vy,rad: 15,
                                  funcionColision:function(colObj){}}));
        }
      }
    });

    // Patron Orbes Sanacion (usan un patron para ir hacia el boss)
    Q.component("sanacionPatron", {

        added: function() {
          var p = this.entity.p;
          this.entity.on("step",this,"step");

        },
        step: function(dt) {
          var p = this.entity.p;
          //Extraemos la posicion del Boss
          var boss = Q('Koishi').first();
          // Prevenir que un orbe alcance al boss despues de muerto (destruido)
          if(boss !== null) {
            boss =  Q('Koishi').first().p;

            // Metemos la posicion de la torreta que dispara y del bossr
            var modV = balaDirigida(boss,p);
            // Determinamos la velocidad de los proyectiles
            modV.vx = -modV.vx *100;
            modV.vy = -modV.vy *100;
            // Modificamos las propiedades de velocidad del orbe segun las caracteristicas de balaDirigida
            this.entity.p.vx = modV.vx;
            this.entity.p.vy = modV.vy;
          }
        }
      });


  // SPRITES
  // Orbe de Invulnerabilidad (No usan patron, su velocidad (y sentido de movimiento) se controlan desde su spawner)
  Q.Sprite.extend("OrbeInvulnerabilidad",{
    init: function(p) {
      this._super(p, {
        asset:"koishi_bala3.png",
        radio:60,
        gravity:0,
        vida:0,
        tipo: "enemy",
        sensor:true,
        impacto:false
      });
      this.add('2d');
      this.on("sensor");
    },

    step: function(dt){
      if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
        this.destroy();
    },

    sensor: function(colObj){
      if(colObj.isA("BalaPlayer") && !this.p.impacto) {
        this.p.impacto = true;
        Q('Koishi').first().destruye_orbe();
      }
    }
  });

  // Orbe de Sanacion
  Q.Sprite.extend("OrbeSanacion",{
    init: function(p) {
      this._super(p, {
        asset:"koishi_bala4.png",
        radio:60,
        gravity:0,
        vida:0,
        tipo: "enemy",
        sensor:true,
        impacto:false
      });
      this.add('2d, sanacionPatron');
      this.on("sensor");
    },

    step: function(dt){
      if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
        this.destroy();
    },

    sensor: function(colObj){
      if(colObj.isA("Koishi") && !this.p.impacto) {
        this.p.impacto = true;
        colObj.sanarse();
        this.destroy();
      }
    }
  });


// Torreta
Q.Sprite.extend("Torreta",{
  init: function(p) {
    this._super(p, {
      asset:"Torreta.png",
      radio:60,
      time: 0,
      time2:0,
      gravity:0,
      vida:10,
      tipo: "torreta",
      sensor:true
    });
    this.add('2d, torretaPatron');
    this.on("sensor");
  },

  step: function(dt) {
  },

  sensor: function(){
  }

});

  // Boss
  Q.Sprite.extend("Koishi",{
  init: function(p) {
      this._super(p,{
        sprite:"koishi_animations",
        sheet:"invulnerable",
        x:2740,
        y:1850,
        vy:0,
        // Numero de orbes que hay que romper para que el boss deje de ser invulnerable
        orbesInv:1,
        time:0,
        time2:0,
        gravity:0,
        radio:30,
        sensor:true,
        fase:0,
        tipo: "boss",
        vida:100
      });

      // Muestra el mensaje de victoria y destruye el elemento
      this.on("destruir", function() {
        // Destruimos el spawner de orbes de sanacion
        var spawner = Q('SpawnerOrbesSanacion').first();
        if(spawner !== null)
          spawner.destroy();
        // Mensaje de victoria y destruccion del objeto boss
        Q.stageScene("endGame",1, { label: "You Win" });
        this.destroy();
      });

      // Evento que inicia la Fase Boss
      this.on("battleStart", function() {
        // Empieza el movimiento del boss
        this.p.sheet = "movimiento";
        this.play("stand", 2);
        this.p.x = 2670;
        this.p.vy = 100;
        // Introducimos su patron de disparo
        this.add('koishiPatron1');
        // Desactivamos el disparo de las torretas
        this.p.t1.del('torretaPatron');
        this.p.t2.del('torretaPatron');
        this.p.t3.del('torretaPatron');

        Q.stage().insert(new Q.SpawnerOrbesSanacion({time:0, timelimit:1, delay:3}));
      });

      this.ultimo = 0;
      this.add('2d, animation');
      this.on("sensor");
      //Provisional
      this.play("invulnerable", 0);
    },

    // Reduce la cantidad de orbes
    destruye_orbe: function(p) {
      this.p.orbesInv--;
      // Cuando llegan a cero, destruimos el spawner y activamos el boss
      if(this.p.orbesInv <= 0) {
        var spawner = Q('SpawnerOrbesInvulnerabilidad').first();
        if(spawner !== null)
          spawner.destroy();
        this.p.sheet = "start";
        this.play("inicio");
      }
    },

    // Funcion para sanarse. Se llama cuando un orbe de sanacion impacta con el boss
    sanarse: function(p) {
      this.p.vida += 10;
      Q.stageScene('hudboss', 4, this.p);
      this.p.sheet = "curacion";
      this.play("curacion");

    },

    // Funcion para continuar la animacion de movimiento tras curarse (se llama desde trigger en la animacion curacion)
    keepMoving: function(p) {
      this.p.sheet = "movimiento";
      this.play("stand");
    },

    // Controla la subida y bajada vertical del boss en el escenario
    step: function(dt) {
      if(this.p.orbesInv > 0) {
        this.p.vida = 100;
      } else {
        if(this.p.y <= 1764) {
          this.p.vy = 100;
        } else if(this.p.y >= 2329) {
          this.p.vy = -100;
        }
      }
    },

    // Controla las colisiones de proyectiles sobre el boss
    sensor: function(colObj){
      // Si colisiona contra una bala del jugador pierde vida
      if(colObj.isA("BalaPlayer")){
        // Se muestra la vida que tiene el boss en cada momento
        Q.stageScene('hudboss', 4, Q('Koishi').first().p);

      }
      // Cuando el boss pierde activamos la animacion de muerte (que al acabar llamara a la funcion de destruccion)
      if(this.p.vida<=0){
        // Hacemos que se deje de mover al morir
        this.p.vy = 0;
        this.p.sheet = "muerte";
        this.play("death", 3);
      }
    }
});

/*______________________________________________FIN NIVEL KOISHI__________________________________________________________________________________________*/



  //ADRI

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

});
