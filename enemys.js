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


  //ENEMIGO PRUEBA
  Q.Sprite.extend("EnemigoDemo",{
    init: function(p) {
      this._super(p, {
        asset:"mobRed.png",
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
        this.reloadTime = 0.9;
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
            var modV = balaSanadora(boss,p);
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
      if(colObj.p.tipo=="balaPlayer" && !this.p.impacto) {
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
      if(colObj.isA("Koishi") && !this.p.impacto && colisionCuadrada(colObj.p, this.p, 0)) {
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
        orbesInv:5,
        time:0,
        time2:0,
        gravity:0,
        radio:30,
        sensor:true,
        fase:0,
        tipo: "boss",
        vida:500,
        SpawnerInvulnerableDestruido:false,
        SpawnerSanacionDestruido:false
      });

      // Muestra el mensaje de victoria y destruye el elemento
      this.on("destruir", function() {
        // Destruimos el spawner de orbes de sanacion
        var spawner = Q('SpawnerOrbesSanacion').first();
        if(spawner !== null && !this.p.SpawnerSanacionDestruido) {
          this.p.SpawnerSanacionDestruido = true;
          spawner.destroy();
        }
        // Mensaje de victoria y destruccion del objeto boss
        Q.stage().pause();
        Q.stageScene("endKoishi",1, { label: "You Win" });
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
        if(spawner !== null && !this.p.SpawnerInvulnerableDestruido) {
          this.p.SpawnerInvulnerableDestruido = true;
          spawner.destroy();
        }
        this.p.sheet = "start";
        this.play("inicio");
      }
    },

    // Funcion para sanarse. Se llama cuando un orbe de sanacion impacta con el boss
    sanarse: function(p) {
      this.p.vida += 5;
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
        this.p.vida = 500;
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
      if(colObj.p.tipo=="balaPlayer"){
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

/*_________________________________________________NIVEL KOKORO__________________________________________________________________________________________*/
  Q.animations("kokoro_animations", {
  ataqueBasico: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], rate: 1/4, flip: "x", loop: false, trigger:"keepMoving2"},
  ataqueEspecial: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 6, 7, 8, 9, 10], rate: 1/4, flip: "x", loop: false, trigger:"keepMoving2"},
  muerte2: {frames: [0, 1, 2, 3, 4, 5], rate: 1/5, flip: "x", loop: false, trigger:"death"},
  movimiento2: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], rate: 1/4, flip: "x", loop: true}
});


// PATRONES DE DISPARO

// Ataque Basico
Q.component("kokoroPatron1", {

    added: function() {
      var p = this.entity.p;
      this.entity.on("step",this,"step");
      // Cuanto menos, mas cadencia
      this.reloadTime = 3;
    },

    step: function(dt) {
      var p = this.entity.p;
      this.entity.p.time+=dt;
      // Cuando sobrepase el tiempo de recarga disparamos y el patron2 no se este ejecutando
      if(p.time >=this.reloadTime && !this.entity.p.patron2Lock){
        // bloqueamos el candado del patron1 para que el 2 no se pueda activar
        this.entity.p.patron1Lock = true;
        this.entity.p.time = 0;
        // Como vamos a usar disparos dirigidos:
        //Extraemos la posicion del jugador
        var mar = Q('Marisa').first().p;
        // Metemos la posicion del boss
        var modV = balaDirigida(mar,p);
        // Determinamos la velocidad de los proyectiles
        modV.vx = -modV.vx *350;
        modV.vy = -modV.vy *350;
        // Usamos balas "estandard" (ver el sprite Bala)
        // 3 Disparos:
        // Un disparo lento dirigido al jugador
        var waifu = Q('Kokoro').first();
        waifu.p.sheet = "ataqueBasico";
        waifu.play("ataqueBasico");
        Q.stage().insert(new Q.Bala({asset: "kokoro_bala4.png", x:p.x - 1.5*p.radio,y:p.y,
                                vx:modV.vx,vy:modV.vy,rad: 5,
                                funcionColision:function(colObj){}}));
        // Liberamos el candado del patron1 para que el 2 pueda activarse
        this.entity.p.patron1Lock = false;
      }
    }
  });

  // Ataque especial
  Q.component("kokoroPatron2", {

      added: function() {
        var p = this.entity.p;
        this.entity.on("step",this,"step");
        // Cuanto menos, mas cadencia
        this.reloadTime = 7;
      },

      step: function(dt) {
        var p = this.entity.p;
        this.entity.p.time2+=dt;
        // Cuando sobrepase el tiempo de recarga disparamos y el patron1 no se este ejecutando
        if(p.time2 >=this.reloadTime && !p.patron1Lock){
          // bloqueamos el candado del patron1 para que el 2 no se pueda activar
          p.patron2Lock = true;
          p.time2 = 0;
          p.sheet = "ataqueEspecial";
          this.entity.play("ataqueEspecial");
          // Usamos balas "estandard" (ver el sprite Bala)
          // Lanzaremos un abanico infernal de kunais
          Q.stage().insert(new Q.AndanadaKunais({numAndanadas:5, reload:0.25, x:p.x, y:p.y}));
          // Liberamos el candado del patron2 para que el 1 pueda activarse
            p.patron2Lock = false;
        }
      }
    });


    // Patron Discipulas (enemigos)
    Q.component("discipulaElitePatron", {

        added: function() {
          var p = this.entity.p;
          this.entity.on("step",this,"step");

        },
        step: function(dt) {
          var p = this.entity.p;
          /*
          //Extraemos la posicion del jugador
          var marisa = Q('Marisa').first().p;
          // Metemos la posicion del jugador y del enemigo
          var modV = balaDirigida(marisa,p);
          // Determinamos la velocidad de los proyectiles
          modV.vx = -modV.vx *250;
          modV.vy = -modV.vy *250;
          // Modificamos las propiedades de velocidad del enemigo segun las caracteristicas de balaDirigida
          this.entity.p.vx = modV.vx;
          this.entity.p.vy = modV.vy;*/
          var mar = Q('Marisa').first().p;
          if(mar!==null){
            //x
            if(p.x < mar.x)
                p.vx = 200;
            else
              p.vx = -200;
            //y
            if(p.y < mar.y-72)
              p.vy = 100;
            else
              p.vy = -100;

            if(mar.vidas <= 0){
              this.destroy();
            }
        }
      }
      });


  // SPRITES
  // Discipulas (enemigos)
  Q.Sprite.extend("Discipula",{
    init: function(p) {
      this._super(p, {
        asset:"kokoro_bala5.png",
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
      if(colObj.p.tipo=="balaPlayer" && !this.p.impacto) {
        this.p.impacto = true;
        Q('Kokoro').first().destruye_discipula();
      }
    }
  });

  // Discipulas Elite (enemigos)
  Q.Sprite.extend("DiscipulaElite",{
    init: function(p) {
      this._super(p, {
        asset:"kokoro_bala6.png",
        radio:60,
        gravity:0,
        vida:10,
        tipo: "enemy",
        sensor:true,
        impacto:false
      });
      this.add('2d, discipulaElitePatron');
      this.on("sensor");
    },

    step: function(dt){
      if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
        this.destroy();
    },

    sensor: function(colObj){
      if(colObj.p.tipo=="balaPlayer" && !this.p.impacto) {
        this.p.impacto = true;
        Q('Kokoro').first().destruye_discipula();
      }
    }
  });

  // Boss
  Q.Sprite.extend("Kokoro",{
  init: function(p) {
      this._super(p,{
        sprite:"kokoro_animations",
        sheet:"movimiento2",
        //opacity: 0,
        x:2640,
        y:4850,
        vy:0,
        // Numero de discipulas que hay que derrotar antes de que aparezca
        discipulas:50,
        time:0,
        time2:0,
        gravity:0,
        radio:30,
        sensor:true,
        fase:0,
        tipo: "boss",
        vida:600,
        spawnersDestruidos:false,
        // Candados para que no se solapen los patrones
        patron1Lock:false,
        patron2Lock:false
      });

      // Muestra el mensaje de victoria y destruye el elemento
      this.on("death", function() {
        Q.stage().pause();
        Q.stageScene("endKokoro",1, { label: "You Win" });
      });

      // Funcion para continuar la animacion de movimiento tras curarse (se llama desde trigger en la animacion curacion)
      this.on("keepMoving2", function() {
        this.p.sheet = "movimiento2";
        this.play("movimiento2");
      });

      this.ultimo = 0;
      this.add('2d, animation');
      this.on("sensor");
      this.play("movimiento2");
    },

    // Reduce la cantidad de discipulas y destruye sus spawners cuando mueren las indicadas
    destruye_discipula: function(p) {
      this.p.discipulas--;
      // Cuando llegan a cero, destruimos el spawner y activamos el boss
      if(this.p.discipulas <= 0 && !this.p.spawnersDestruidos) {
        // variable de control que impide que una discipula que quede por pantalla despues de haber destruido los spawner llame a esta funcion y los vuelva a intentar destruir (generando un error)
        this.p.spawnersDestruidos = true;
        var spawn1 = Q('SpawnerDiscipulas').first();
        var spawn2 = Q('SpawnerDiscipulasElite').first();
        if(spawn1 !== null) {

          spawn1.destroy();
        }
        if(spawn2 !== null)
          spawn2.destroy();
        this.p.y=1800;
        this.p.vy=100;
        this.add('kokoroPatron1, kokoroPatron2');
      }
    },



    // Controla la subida y bajada vertical del boss en el escenario
    step: function(dt) {
        if(this.p.discipulas <= 0) {
          if(this.p.y <= 1764) {
            this.p.vy = 100;
          } else if(this.p.y >= 2329) {
            this.p.vy = -100;
          }
      }
    },

    // Controla las colisiones de proyectiles sobre el boss
    sensor: function(colObj){
      // Si colisiona contra una bala del jugador:
      if(colObj.p.tipo=="balaPlayer"){
        // Se muestra la vida que tiene el boss en cada momento
        Q.stageScene('hudboss', 4, Q('Kokoro').first().p);

      }
      // Cuando el boss pierde activamos la animacion de muerte (que al acabar llamara a la funcion de destruccion)
      if(this.p.vida<=0){
        // Hacemos que se deje de mover al morir
        this.p.vy = 0;
        this.p.sheet = "muerte2";
        this.play("muerte2", 3);
      }
    }
});

/*______________________________________________FIN NIVEL KOKORO__________________________________________________________________________________________*/




  //ADRI

  /*
  MAMIZOU
  */
  Q.animations("mamizouAnim", {
    "ataque-basico": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/5, flip:"x", loop: false, trigger: "ataqueBasico"},
    "inicio": {frames:[0,1,2,3,4,5,6,7,8], rate: 1/5, flip:"x", loop: false, trigger: "iniciaBatalla"},
    "giro":{frames:[0,1,2,3,4,5,6,7,8], rate: 1/5, flip:"x", loop: true},
    "muerte": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], rate: 1/5, flip:"x", loop: false, trigger: "muerte"},
    "ataque-final": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,13], rate: 1/5, flip:"x", loop: false, trigger: "ataqueFinal"},
    "movimiento": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/5, flip:"x", loop: true}
  });

  Q.Sprite.extend("MamizouGiratoria", {
    init: function(p) {
      this._super(p, {
        sprite: "mamizouAnim",
        sheet: "startMam",
        x:2700,
        y:p.y,
        time: 0,
        vida: p.vida,
        vidaInicial: p.vida,
        fake: p.fake,
        insertar: p.insertada,
        radio: 100,
        gravity: 0,
        tiempoSecundario: 10,
        sensor:true,
        tipo: "bossGiratorio",
      });
      this.add("animation, 2d");
      this.on("sensor");
      this.play("giro");
    },

    sensor: function(colObj){
      if(colObj.isA("Marisa")&&colisionCircular(colObj.p,this.p,colObj.p.radio+this.p.radio,72)&&colObj.p.invencibleTime <= 0){
        if(colObj.p.vidas>0){
          colObj.p.invencibleTime = 2;
          colObj.p.sheet = "dañoMar";
          colObj.play("daño");
          colObj.p.vidas--;
          Q.stageScene('hud', 3, colObj.p);
        }
        if(colObj.p.vidas <= 0 && !colObj.p.gameOver){
          colObj.p.sheet = "muerteMar";
          colObj.play("muerte", 3);
          colObj.p.stepDelay = 1;
          colObj.del('controles');
          colObj.del('disparoPrincipal');
          colObj.delPowerups();
          colObj.p.gameOver = true;
        }

      }
    },
    step: function(dt){
      if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
        this.destroy();
    }


  });

  Q.Sprite.extend("Mamizou", {
    init: function(p) {
      this._super(p, {
        sprite: "mamizouAnim",
        sheet: "startMam",
        x:2700,
        y:p.y,
        time: 0,
        vida: p.vida,
        vidaInicial: p.vida,
        fake: p.fake,
        insertar: p.insertada,
        timeGiratoria: 5,
        radio: 30,
        gravity: 0,
        tiempoSecundario: 10,
        sensor:true,
        tipo: p.tipo,
      });
      this.add("animation, 2d, rafagaFlotante");
      this.on("sensor");
      this.play("inicio");

      this.on("iniciaBatalla", function() {
        this.p.sheet = "standMam";
        this.play("movimiento");
        if(!this.p.fake)
          this.p.vy += 100;
      });

      this.on("muerte", function() {
        Q.stage().pause();
        Q.stageScene("endMamizou",1, { label: "You Win" });
      });

      this.on("ataqueBasico", function() {
        var balasFlotantes = Q("BalaFlotante");
        var i = 0;
        while(i < balasFlotantes.length){
          var mar = Q('Marisa').first().p;
          var modV = balaDirigida(mar, balasFlotantes.items[i].p);
          modV.vx = -modV.vx *200;
          modV.vy = -modV.vy *200;
          balasFlotantes.items[i].p.vy = modV.vy;
          balasFlotantes.items[i].p.vx = modV.vx;
          i++;
        }
        this.p.sheet= 'standMam';
        this.play('movimiento');
        this.add('rafagaFlotante');
      });
    },

    sensor: function(colObj){
        if(colObj.p.tipo=="balaPlayer" ){
          if(!this.p.fake)
            Q.stageScene('hudboss', 4, this.p);
          if(this.p.vida<=0 && this.p.tipo == "boss"){
            this.p.vy = 0;
           this.p.sheet = "deathMam";
           this.play("muerte");
         }
        }
    },

    step: function(dt) {
      if(this.p.vida < this.p.vidaInicial-this.p.vidaInicial/3 && !this.p.fake && this.p.insertar){
        this.p.insertar = false;
        Q.stage().insert(new Q.Mamizou({fake:true, vida: this.p.vidaInicial/10, insertar: false, y:this.p.y-300, opacity: 0.7, vy: 200,tipo: "enemy"}));
        Q.stage().insert(new Q.Mamizou({fake:true, vida: this.p.vidaIncial/10, insertar: false, y:this.p.y+300, opacity: 0.7, vy: -200,tipo: "enemy"}));
      }
      if (this.p.vida < this.p.vidaInicial-(this.p.vidaInicial/3)*2 && !this.p.fake && this.p.timeGiratoria <= 0){
        this.p.timeGiratoria = 5;
        Q.stage().insert(new Q.MamizouGiratoria({y:1780,x:1600,vx:210,vy:100, opacity: 0.7}));
        Q.stage().insert(new Q.MamizouGiratoria({y:1780,x:2700,vx:-210,vy:100, opacity: 0.7}));
        Q.stage().insert(new Q.MamizouGiratoria({y:2300,x:1600,vx:210,vy:-100, opacity: 0.7}));
        Q.stage().insert(new Q.MamizouGiratoria({y:2300,x:2700,vx:-210,vy:-100, opacity: 0.7}));
      }
      else {
        this.p.timeGiratoria -= dt;
      }
      if(this.p.tiempoSecundario <= 0){
        this.p.tiempoSecundario = 10;
        this.del('rafagaFlotante');
        this.p.sheet = 'attack1Mam';
        this.play("ataque-basico");
      }
      else {
        this.p.tiempoSecundario -= dt;
      }
      if(this.p.y <= 1700) {
        if(this.p.vy < 0)
          this.p.vy = -this.p.vy;
      }
      else if(this.p.y >= 2329) {
        if(this.p.vy > 0)
          this.p.vy = -this.p.vy;
      }
    }

  });

  var velocidadesFlotante = {
    1: {vx: 0.2},
    2: {vx: 0.13},
    3: {vx: 0.15},
    4: {vx: 0.8},
    5: {vx: 0.7},
    6: {vx: 0.3},
    7: {vx: 0.4},
    8: {vx: 0.5},
    9: {vx: 0.6},
  };

  const NUM_VEL_FLOTANTES = 9;

  Q.Sprite.extend("BalaFlotante",{
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
        velFlotante: tipoBala.velFlotante,
        gravity:0,
        tipo: "bala",
        sensor:true
      });
      this.add('2d');
      this.on("sensor",tipoBala.funcionColision);
    },
    step: function(dt){
      if(this.p.vx < 0) {
        this.p.vx = this.p.vx + velocidadesFlotante[this.p.velFlotante].vx;
      }

      if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
        this.destroy();
    }
  });

  Q.component("rafagaFlotante", {

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
          Q.stage().insert(new Q.BalaFlotante({asset: "bolita.png", x:p.x - 1.5*p.radio,y:p.y-100, velFlotante: calculaRandomFlotantes(),
                                  vx:-200,vy:-30,rad: 15,
                                  funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.BalaFlotante({asset: "bolita.png", x:p.x - 1.5*p.radio,y:p.y, velFlotante: calculaRandomFlotantes(),
                                  vx:-200,vy:0,rad: 15,
                                  funcionColision:function(colObj){}}));
          Q.stage().insert(new Q.BalaFlotante({asset: "bolita.png", x:p.x - 1.5*p.radio,y:p.y+100, velFlotante: calculaRandomFlotantes(),
                                  vx:-200,vy:30,rad: 15,
                                  funcionColision:function(colObj){}}));

        }

      }

  });

  var calculaRandomFlotantes = function() {
    var velFlotante = Math.floor((Math.random()*10)+1)%NUM_VEL_FLOTANTES;
    if(velFlotante === 0) {
      velFlotante += 1;
    }

    return velFlotante;
  };

  /*
  ICHIRIN
  */
  Q.animations("ichirinAnim", {
    "ataque-basico": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12], rate: 1/5, flip:"x", loop: false, trigger: "ataqueBasico"},
    "inicio": {frames:[0,1,2,3,4,5,6,7], rate: 1/5, flip:"x", loop: false, trigger: "iniciaBatalla"},
    "muerte": {frames:[0,1,2,3,4,5,6,7], rate: 1/5, flip:"x", loop: false, trigger: "muerte"},
    "ataque-final": {frames:[0,1,2,3,4,5,6,7,8], rate: 1/5, flip:"x", loop: false, trigger: "ataqueFinal"},
    "movimiento": {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], rate: 1/5, flip:"x", loop: true}
  });

  Q.Sprite.extend("Ichirin", {
    init: function(p) {
      this._super(p, {
        sprite: "ichirinAnim",
        sheet: "startIch",
        x:2700,
        y:2000,
        time: 0,
        vida: p.vida,
        vidaInicial: p.vida,
        timeGiratoria: 5,
        radio: 30,
        gravity: 0,
        tiempoSecundario: 7,
        tiempoBasico: 5,
        sensor:true,
        tipo: "boss",
      });
      this.add("animation, 2d");
      this.on("sensor");
      this.play("inicio");

      this.on("iniciaBatalla", function() {
        this.p.sheet = "standIch";
        this.play("movimiento");
        if(!this.p.fake)
          this.p.vy += 100;
      });

      this.on("muerte", function() {
        Q.stage().pause();
        Q.stageScene("endIchirin",1, { label: "You Win" });
      });

      this.on("ataqueBasico", function() {
        this.del("rafagaLateral");
        this.add("rafagaInferior");
        this.p.sheet= 'standIch';
        this.play('movimiento');
      });

      this.on("ataqueFinal", function() {
        this.del("rafagaInferior");
        this.add("rafagaLateral");
        this.p.sheet= 'standIch';
        this.play('movimiento');
      });
    },

    sensor: function(colObj){
        if(colObj.p.tipo=="balaPlayer" ){
          if(!this.p.fake)
            Q.stageScene('hudboss', 4, this.p);
          if(this.p.vida<=0 && this.p.tipo == "boss"){
            this.p.vy = 0;
           this.p.sheet = "deathIch";
           this.play("muerte");
         }
        }
    },

    step: function(dt) {
      if(this.p.tiempoSecundario <= 0){
        console.log("final");
        this.p.tiempoSecundario = 8;
        this.p.sheet = 'attack2Ich';
        this.play("ataque-final",2);
      }
      else {
        this.p.tiempoSecundario -= dt;
      }

      if(this.p.tiempoBasico <= 0){
        console.log("basico");
        this.p.tiempoBasico = 5;
        this.p.sheet = 'attack1Ich';
        this.play("ataque-basico");
      }
      else {
        this.p.tiempoBasico -= dt;
      }

      if(this.p.y <= 1700) {
        if(this.p.vy < 0)
          this.p.vy = -this.p.vy;
      }
      else if(this.p.y >= 2329) {
        if(this.p.vy > 0)
          this.p.vy = -this.p.vy;
      }
    }

  });




  Q.component("rafagaInferior", {

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
          var posIni= 2.5;
          var modPos = 0;
          for(var i = 0; i < 10; i++){
            Q.stage().insert(new Q.Bala({asset: "bolita.png", x:p.x - (posIni+modPos)*p.radio,y:LIMITEY2,
                                    vx:0,vy:-150,rad: 15,
                                    funcionColision:function(colObj){}}));
            modPos += 5;
          }
        }

      }

  });

  Q.component("rafagaLateral", {

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
          var modPos = 0;
          var posIni = Math.floor((Math.random()*10)+1)%2;
          if(modPos === 0) {
            modPos += 1;
          }
          for(var i = 0; i < 15; i++){
            Q.stage().insert(new Q.Bala({asset: "bolita.png", x:LIMITEX1,y:LIMITEY1 + 500 +(posIni+modPos)*p.radio,
                                    vx:150,vy:0,rad: 15,
                                    funcionColision:function(colObj){}}));
            modPos += 3.5;
          }
        }

      }

  });



  //CHEMA


  //NIVEL FINAL (NIVEL DE REIMU)

  /*Estos son los patrones de disparo de
  los enemigos del nivel de reimu*/
  Q.component("orbePatron", {

          added: function() {
            var p = this.entity.p;
            this.entity.on("step",this,"step");
            this.reloadTime = 6;
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
              Q.stage().insert(new Q.OrbeEnemigo({asset: "reimu_onmyoBall.png", x:p.x - 1.5*p.radio,y:p.y,
                                      vx:modV.vx,vy:modV.vy,radio: 15,
                                      funcionColision:function(colObj){}}));

            }

          }

  });

  Q.component("ooiriPatron", {

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
              var mar = Q('Marisa').first().p;
              var modV = balaDirigida(mar,p);
              modV.vx = -modV.vx *200;
              modV.vy = -modV.vy *200;
              Q.stage().insert(new Q.Bala({asset: "ooiri.png", x:p.x - 1.5*p.radio,y:p.y,
                                      vx:modV.vx,vy:modV.vy,rad: 15,
                                      funcionColision:function(colObj){}}));

            }

          }

  });

  Q.component("orbesPatron", {

        added: function() {
          var p = this.entity.p;
          this.entity.on("step",this,"step");
          this.reloadTime = 4;
        },

        step: function(dt) {
          var p = this.entity.p;
          this.entity.p.time+=dt;
          if(p.time >=this.reloadTime){
            this.entity.p.time = 0;
            Q.stage().insert(new Q.Bala({asset: "miniOrbeRojo.png", x:p.x - 1.5*p.radio,y:p.y,
                                    vx:0,vy:-100,rad: 15,
                                    funcionColision:function(colObj){}}));

          }

        }
  });

  /**
   * Este es el nuevo enemigo introducido en el nivel
   * de reimu
   */
  Q.Sprite.extend("EnemigoChema",{
    init: function(p,componentes) {
      this._super(p, {
        radio:60,
        time: 0,
        time2:0,
        gravity:0,
        vida:10,
        tipo: "enemy",
        sensor:true
      });
      this.ultimo = 0;
      this.add(componentes);
      this.on("sensor");
    },

    step: function(dt) {
    },

    sensor: function(colObj){
    }
  });


  /**
   * Esta es la bala que utiliza el enemigo
   * del nivel de reimu
   */
  Q.Sprite.extend("OrbeEnemigo",{
        init: function(p){
          //como crear una bala concreta
          //this.stage.insert(new Q.Bala(args));
          this._super(p,{
            tipo: "bala",
            gravity:0,
            sensor:true,
            timeDestroy:12,
            time:0,
            colisionado:false
          });
          this.add('2d');
          this.on("sensor",function(colObj){
            if (colObj.p.tipo=="balaPlayer" && !this.p.colisionado) {
              this.p.colisionado = true;
              if (Math.random() < 0.15) {
                Q.stage().insert(new Q.upDisplay({ x: this.p.x, y: this.p.y }));
              }
            }
          });
        },
        step: function(dt){
          this.p.time+=dt;
          if(this.p.time < this.p.timeDestroy){
            if(this.p.x > LIMITER){
              this.p.vx = -100;
            }else if(this.p.x < LIMITEL){
              this.p.vx = 100;
            }else if(this.p.y < LIMITEUP){
              this.p.vy = 100;
            }else if(this.p.y > LIMITEDOWN){
              this.p.vy = -100;
            }
          }
          else
            this.destroy();
        }
  });


  /**
   * REIMU
   */
  Q.animations("Reimu_animations", {
    stand: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13], rate: 1/5, flip: "x", loop: true},
    ataque: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rate: 1/3, flip: "x", loop: false, trigger: "continuar"},
    ataque2: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rate: 1/3, flip: "x", loop: false, trigger: "continuar2"},
    inicio: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12], rate: 1/3, flip: "x", loop: false, trigger: "empezar"},
    death: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], rate: 1/3, flip: "x", loop: false, trigger: "destruir"}
  });

  Q.Sprite.extend("Reimu",{
      init: function(p) {
          this._super({
            sprite:"Reimu_animations",
            sheet: "inicior",
            frame:0,
            x:2700,
            y:2000,
            vy:0,
            time:0,
            time2:0,
            tfase:0,
            gravity:0,
            radio:30,
            sensor:true,
            fase:0,
            loadFaseTime:5,
            cambioFase:false,
            numFases:3,
            tipo: "boss",
            vida:1000,
            invencible: true
          });
          this.ultimo = 0;
          this.add('2d,animation');
          this.play("inicio");
          this.on("sensor");
          this.on("destruir",function(){
            Q.audio.stop();
            Q.audio.play("staffroll.mp3",{ loop: true });
            this.destroy();
          });
          this.on("empezar",function(){
            this.add("spellCard1Reimu1");
            this.p.vida = 300;
            this.p.vy = 100;
            this.p.invencible = false;
            this.p.sheet = "standr";
            this.play("stand");
          });
          this.on("continuar",function(){
            this.add("spellCard1Reimu2");
            this.p.vy = 100;
            this.p.invencible = false;
            this.p.sheet = "standr";
            this.play("stand");
          });
          this.on("continuar2",function(){
            this.add("spellCard1Reimu3");
            this.p.vy = 100;
            this.p.invencible = false;
            this.p.sheet = "standr";
            this.play("stand");
          });
        },

        step: function(dt) {
          if(this.p.cambioFase)
            this.p.tfase += dt;

          if(this.p.tfase >= this.p.loadFaseTime){
              this.p.cambioFase = false;
              this.p.tfase = 0;
              if(this.p.fase == 0){
                this.p.vy = 0;
                this.p.sheet = "ataquer";
                this.play("ataque");
                this.p.vida = 200;
              }else if(this.p.fase == 1){
                this.p.sheet = "ataquer";
                this.play("ataque2");
                this.p.vy = 0;
                this.p.vida = 200;
              }
              this.p.fase++;
          }

          if(this.p.y <= 1664) this.p.vy = 100;
          else if(this.p.y >= 2329) this.p.vy = -100;
        },

        sensor: function(colObj){
            if(colObj.p.tipo=="balaPlayer" ){
              Q.stageScene('hudboss', 4, this.p);
            }

            if(this.p.vida<=0 && !this.p.invencible){
              this.p.cambioFase = true;
              if(this.p.fase >= this.p.numFases-1){
                if(this.spellCard1Reimu3!=null){
                  this.spellCard1Reimu3.limpiar();
                  this.del("spellCard1Reimu3");
                }
                this.p.vy = 0;
                this.p.sheet = "finr";
                this.play("death");
                Q.stageScene("endGame",1, { label: "You Win" });
              }else if(this.p.fase == 0){
                this.del("spellCard1Reimu1");
              }else if(this.p.fase == 1){
                if(this.spellCard1Reimu2 != null)
                  this.spellCard1Reimu2.limpiar();
                this.del("spellCard1Reimu2");
              }
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
        tipo: "orbe",
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
          Q.stage().insert(new Q.BalaTemporal({asset: "bola.png", x:p.x ,y:p.y,radio: 15,destroyTime:5}));
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
      this._super(p,{
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
      this.reloadTime2 = 0.03;
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
      this.orbe = Q.stage().insert(new Q.OrbeReimu({x:p.x, y:p.y,reloadTime:0.2,vel:250}));
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
      this.balas = [];
      this.j = 0;
      p.time = 0;
      Math.floor((Math.random() * 10) + 1);
      for(var i = LIMITEUP;i < LIMITEDOWN;i+=30){
         this.balas[this.j] = Q.stage().insert(new Q.Bala({asset: "ooiri.png", x:2600,y:i,
                                  vx:-40,vy:0,rad: 15,
                                  funcionColision:function(colObj){}}));
         this.j++;
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
    },
    limpiar: function(){
      for(var i = 0;i<this.j;i++){
        this.balas[i].destroy();
      }
    }
  });

  ///////////////
  //NIVEL MOKOU//
  ///////////////
  ///////////////


  Q.animations("Mokou_animations", {
    stand: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12], rate: 1/5, flip: "x", loop: true},
    ataque: {frames: [0, 1, 2, 3, 4, 5, 6, 7], rate: 1/3, flip: "x", loop: false, trigger: "continuar"},
    ataque2: {frames: [0, 1, 2, 3, 4, 5, 6, 7], rate: 1/3, flip: "x", loop: false, trigger: "continuar2"},
    ataqueloop: {frames: [0, 1, 2, 3, 4, 5, 6, 7], rate: 1/3, flip: "x", loop: false, trigger: "finalatq"},
    inicio: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], rate: 1/3, flip: "x", loop: false, trigger: "empezar"},
    death: {frames: [0, 1, 2, 3, 4, 5, 6], rate: 1/3, flip: "x", loop: false, trigger: "destruir"}
  });

  Q.Sprite.extend("Mokou",{
      init: function(p) {
          this._super({
            sprite:"Mokou_animations",
            sheet: "iniciom",
            frame:0,
            x:2700,
            y:2000,
            vy:0,
            time:0,
            time2:0,
            tfase:0,
            gravity:0,
            radio:30,
            sensor:true,
            fase:0,
            loadFaseTime:5,
            cambioFase:false,
            numFases:3,
            tipo: "boss",
            vida:1000,
            invencible: true
          });
          this.ultimo = 0;
          this.add('2d,animation');
          this.play("inicio");
          this.on("sensor");
          this.on("finalatq",function(){
            this.p.sheet = "standm";
            this.play("stand");
          });
          this.on("destruir",function(){
            Q.stage().pause();
            Q.stageScene("endMokou",1, { label: "Next Stage" });
          });
          this.on("empezar",function(){
            this.add("spellCard1Mokou");
            this.p.vida = 300;
            this.p.invencible = false;
            this.p.sheet = "standm";
            this.play("stand");
          });
          this.on("continuar",function(){
            this.add("spellCard2Mokou");
            this.p.vy = 100;
            this.p.invencible = false;
            this.p.sheet = "standm";
            this.play("stand");
          });
          this.on("continuar2",function(){
            this.add("spellCard3Mokou");
            this.p.vy = 100;
            this.p.invencible = false;
            this.p.sheet = "standm";
            this.play("stand");
          });
        },

        step: function(dt) {
          if(this.p.cambioFase)
            this.p.tfase += dt;

          if(this.p.tfase >= this.p.loadFaseTime){
              this.p.cambioFase = false;
              this.p.tfase = 0;
              if(this.p.fase == 0){
                this.p.vy = 0;
                this.p.sheet = "ataquem";
                this.play("ataque");
                this.p.vida = 200;
              }else if(this.p.fase == 1){
                this.p.sheet = "ataquem";
                this.play("ataque2");
                this.p.vy = 0;
                this.p.vida = 200;
              }
              this.p.fase++;
          }

          if(this.p.y <= 1664) this.p.vy = 100;
          else if(this.p.y >= 2329) this.p.vy = -100;
        },

        sensor: function(colObj){
            if(colObj.p.tipo=="balaPlayer" ){
              Q.stageScene('hudboss', 4, this.p);
            }

            if(this.p.vida<=0 && !this.p.invencible){
              this.p.cambioFase = true;
              if(this.p.fase >= this.p.numFases-1){
                if(this.spellCard3Mokou!=null){
                  this.spellCard3Mokou.limpiar();
                  this.del("spellCard3Mokou");
                }
                this.p.vy = 0;
                this.p.sheet = "finm";
                this.play("death");
              }else if(this.p.fase == 0){
                this.del("spellCard1Mokou");
              }else if(this.p.fase == 1){
                if(this.spellCard2Mokou != null)
                  this.spellCard2Mokou.limpiar();
                this.del("spellCard2Mokou");
              }
            }
        }
  });




  Q.component("spellCard2Mokou",{
    added: function() {
      var p = this.entity.p;
      this.orbe = Q.stage().insert(new Q.OrbeMokou({vy:-100,x:2600,y:2000}));
      this.orbe2 = Q.stage().insert(new Q.OrbeMokou2({vy:-100,x:2600,y:1600}));
    },
    limpiar: function(){
      if(this.orbe!=null)
        this.orbe.destroy();
      if(this.orbe2 != null)
        this.orbe2.destroy();
    }
  });

  Q.component("spellCard1Mokou",{
    added: function() {
      var p = this.entity.p;
      this.entity.on("step",this,"step");
      this.radio = 350;
      this.time=18,
      this.reloadTime = 10
      this.orbe = Q.stage().insert(new Q.OrbeMokou3({vx:-100,x:2600,y:1600}));
    },
    step:function(dt){
      this.time+=dt;
      var centro = Q("Marisa").first().p;
      if(this.time > this.reloadTime){
        this.entity.p.sheet = "ataquem";
        this.entity.play("ataqueloop");
        this.orbe = Q.stage().insert(new Q.OrbeMokou3({vx:-100,x:2600,y:1600}));
        this.time = 0;
        //(x-a)2 +(y-b)2 = r2
        var izqL = centro.x + this.radio;
        var derL = centro.x - this.radio;
        var j = 5;
        for(var i = 0;i < 350;i+=j){
          var aux = centro.x+i - centro.x;
          var y2 = Math.abs(Math.sqrt((this.radio*this.radio) - (aux*aux)))+centro.y;
          Q.stage().insert(new Q.Bala({asset: "bola.png", x:centro.x+i,y:y2,
                                  vx:-50,vy:0,rad: 15,
                                  funcionColision:function(colObj){}}));
          var y3 = centro.y - (y2-centro.y);
          Q.stage().insert(new Q.Bala({asset: "bola.png", x:centro.x+i,y:y3,
                                  vx:-50,vy:0,rad: 15,
                                  funcionColision:function(colObj){}}));
        }
      }
    },
    limpiar: function(){
      if(this.orbe!=null)
        this.orbe.destroy();
    }
  });

  Q.component("spellCard3Mokou",{
    added: function() {
      var p = this.entity.p;
      this.entity.on("step",this,"step");
      this.radio = 200;
      this.time=18,
      this.reloadTime = 8
    },
    step:function(dt){
      this.time+=dt;
      if(this.time > this.reloadTime){
      this.time+=dt;
      var centro = Q("Marisa").first().p;
      if(this.time > this.reloadTime){
        this.entity.p.sheet = "ataquem";
        this.entity.play("ataqueloop");
        this.time = 0;
        //(x-a)2 +(y-b)2 = r2
        var izqL = centro.x + this.radio;
        var derL = centro.x - this.radio;
        var j = 40;
        var y2 = centro.y+20;
        var y3 = centro.y-20;
        for(var i = 0;i < 100;i+=j){
          var aux = centro.x+i - centro.x;
          y2 += j;
          Q.stage().insert(new Q.BalaFuego({time:2, x:2600,y:y2,
                                  vx:-50,vy:0,rad: 15}));
          y3 -= j;
          Q.stage().insert(new Q.BalaFuego({time:2, x:2600,y:y3,
                                  vx:-50,vy:0,rad: 15}));
        }
      }
      }
    },
    limpiar: function(){
      if(this.orbe!=null)
        this.orbe.destroy();
    }
  });

  Q.Sprite.extend("OrbeMokou",{
    init: function(p) {
      this._super(p,{
        asset:"miniOrbeRojo.png",
        sensor:true,
        gravity:0,
        time:0,
        vida:200,
        tipo:"enemy",
        reloadTime:1.5
      });
      this.add("2d");
      this.on("sensor",function(){});
    },
    step:function(dt){
      var p = this.p;
      if(p.vida<0)
        this.destroy();
      if(p.y < ORBEUP)
        this.p.vy = 50;
      else if(p.y > LIMITEDOWN){
        this.p.vy = -50;
      }
      p.time+=dt;
      if(p.time > p.reloadTime){
        p.time=0;
        Q.stage().insert(new Q.Bala({asset: "bola.png", x:p.x,y:p.y,
                                  vx:-50,vy:0,rad: 15,
                                  funcionColision:function(colObj){}}));
      }
    }
  });

  Q.Sprite.extend("OrbeMokou2",{
    init: function(p) {
      this._super(p,{
        asset:"miniOrbeRojo.png",
        sensor:true,
        gravity:0,
        time:0,
        vida:200,
        tipo:"enemy",
        reloadTime:1.5
      });
      this.add("2d");
      this.on("sensor",function(){});
    },
    step:function(dt){
      var p = this.p;
      if(p.vida<0)
        this.destroy();
      if(p.y < LIMITEUP)
        this.p.vy = 50;
      else if(p.y > ORBEDOWN){
        this.p.vy = -50;
      }
      p.time+=dt;
      if(p.time > p.reloadTime){
        p.time=0;
        Q.stage().insert(new Q.BalaFuego({x:p.x,y:p.y,
                                  vx:-50,vy:100,radio: 15}));
      }
    }
  });

  Q.Sprite.extend("OrbeMokou3",{
    init: function(p) {
      this._super(p,{
        asset:"miniOrbeRojo.png",
        sensor:true,
        gravity:0,
        time:0,
        vida:200,
        tipo:"enemy",
        reloadTime:2
      });
      this.add("2d");
      this.on("sensor",function(){});
    },
    step:function(dt){
      var p = this.p;
      if(p.vida<0 || p.x < LIMITEX1)
        this.destroy();
      p.time+=dt;
      if(p.time > p.reloadTime){
        p.time=0;
        Q.stage().insert(new Q.BalaFuego({x:p.x,y:p.y,
                                  vx:0,vy:150,radio: 15}));
      }
    }
  });

  Q.Sprite.extend("BalaFuego",{
      init: function(p) {
        this._super(p,{
          asset:"fuego.png",
          sensor:true,
          gravity:0,
          time:0,
          tipo:"bala",
          numDiv:3,
          reloadTime:3
        });
        this.add("2d");
        this.on("sensor",function(){});
      },
      step:function(dt){
        var p = this.p;
        if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
          this.destroy();
        p.time+=dt;
        var vy2 = -this.p.vy;
        if(p.time > p.reloadTime && p.numDiv >= 0){
          p.time=0;
          p.numDiv--;
          if(vy2 != 0)
            Q.stage().insert(new Q.BalaFuego({x:p.x,y:p.y,
                                      vx:-50,vy:-this.p.vy,radio: 15}));
          else
            Q.stage().insert(new Q.BalaFuego({x:p.x,y:p.y,
                                      vx:-50,vy:100,radio: 15}));

        }
      }
    });


    Q.component("spellCard1Mokou1",{
      added: function() {
        var p = this.entity.p;
        this.entity.on("step",this,"step");
        this.reloadTime1 = 0.1;
        this.reloadTime2 = 0.03;
        this.posy1 = 200
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
       maxVida :1000,
       vida:1000
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
      Q.stage().pause();
      Q.stageScene("endHijiri",1, { label: "You Win" });
     });

     this.add('2d, animation');
     this.on("sensor");
     this.comenzar();
     this.play("aparecer");

   },

   comenzar: function(){
     this.add("spellCard1Hijiri");
   },

   destruyeSpawner: function(){
     this.p.numSpawn--;
   },

   step: function(dt) {
     if(this.p.y <= 1700) this.p.vy = 100;
     else if(this.p.y >= 2300) this.p.vy = -100;

     if(this.p.vida<=(this.p.maxVida/2) && this.p.fase <= 1){
         this.p.fase=2;
     }else if(this.p.vida<=(this.p.maxVida/5) && this.p.fase <= 2){
       this.del("spellCard1Hijiri");
       this.add("spellCard2Hijiri");
       this.p.fase=3;
       this.p.vy = 100;
     }


   },

   sensor: function(colObj){
       if(colObj.p.tipo=="balaPlayer"){
         //this.p.vida --;
         Q.stageScene('hudboss', 4, this.p);
         //colObj.destroy();
       }
       if(this.p.vida<=0){
         this.p.vy = 0;
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
          Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2800, y:2300, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:enemy}));
          p.numSpawn++;
          p.sheet = sheet;
          this.entity.play(anim);
          break;
        case 1:
          Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2800, y:1700, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:enemy}));
          p.numSpawn++;
          p.sheet = sheet;
          this.entity.play(anim);
          break;
        case 2:
          Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1700, y:2300, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:enemy}));
          p.numSpawn++;
          p.sheet = sheet;
          this.entity.play(anim);
          break;
        case 3:
          Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1700, y:1700, time:0, timelimit:2, delay:2, numEnemy:5, level: 1, enemy:enemy}));
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
        Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2800, y:2300, time:0, timelimit:4, delay:0, numEnemy:2, level: 5, enemy:enemy}));
        enemy = Math.floor((Math.random() * 10)) % 4;
        Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:2800, y:1700, time:0, timelimit:4, delay:0, numEnemy:2, level: 5, enemy:enemy}));
        enemy = Math.floor((Math.random() * 10)) % 4;
        Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1700, y:2300, time:0, timelimit:4, delay:0, numEnemy:2, level: 5, enemy:enemy}));
        enemy = Math.floor((Math.random() * 10)) % 4;
        Q.stage().insert(new Q.SpawnerHijiri({asset: "spawner.png",x:1700, y:1700, time:0, timelimit:4, delay:0, numEnemy:2, level: 5, enemy:enemy}));
        p.numSpawn=4;
        p.sheet = "invocar3H";
        this.entity.play("invocar3");
      }

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
      if(this.p.y < mar.y-72)
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
    if(colObj.isA('Marisa') && colisionCuadrada(colObj.p, this.p, 0) && colObj.p.invencibleTime>0){
      this.destroy();
    }
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
  plato: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], rate: 1/4, flip: "x", loop: false, trigger: "stand"},
  fantasmas: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rate: 1/4, flip: "x", loop: false, trigger: "stand"},
  flechas: {frames: [0, 1, 2, 3, 4, 5, 6, 7], rate: 1/4, flip: "x", loop: true},
  stand: {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], rate: 1/4, flip: "x", loop: true},
  muerte: {frames: [0, 1, 2, 3, 4, 5, 6], rate: 1/4, flip: "x", loop: false, trigger: "muerte"}
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
     time3:0,
     fase:0,
     gravity:0,
     radio:30,
     sensor:true,
     tipo: "boss",
     maxVida :500,
     vida:500,
     reload: 15
   });



  this.on("stand", function() {
    this.p.sheet= "standF";
    this.play("stand");
    });

  this.on("muerte", function() {
    Q.stage().pause();
     Q.stageScene("endFuto",1, { label: "You Win" });
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
     if(colObj.p.tipo=="balaPlayer"){
       Q.stageScene('hudboss', 4, this.p);
     }
     if(this.p.vida<=0){
      this.p.sheet = "muerteF";
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
                                vx:-200, vy:200, radio: 15, cambio:0.75,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.BalaZigZag({asset: "fantasma.png", x:p.x, y:1900,
                                vx:-200, vy:200, radio: 15, cambio:0.75,
                                funcionColision:function(colObj){}}));
        Q.stage().insert(new Q.BalaZigZag({asset: "fantasma.png", x:p.x, y:2100,
                                vx:-200, vy:200, radio: 15, cambio:0.75,
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
    var first = true;
    this.entity.on("step",this,"step");
  },

  step: function(dt) {
      var p = this.entity.p;
      p.time3+=dt;
      var i = LIMITEY1;
      if(p.time3>p.reload/2 || this.first){
        while(i<LIMITEY2){
            Q.stage().insert(new Q.Bala({asset: "plato.png", x:p.x, y:i,
                                    vx:-200, vy:0, radio: 10,
                                    funcionColision:function(colObj){}}));

         i+=150;
         first = false;
       }
       p.time3 = 0;
    }
  }
});





});
