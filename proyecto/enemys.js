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

  //ADRI

  //CHEMA


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
            if(colObj.isA("BalaPlayer") && !this.p.colisionado ){
              this.p.colisionado = true;
              if(Math.random()<0.1){
                Q.stage().insert(new Q.powChemaDisplay({x:this.p.x,y:this.p.y}));
                this.destroy();
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
                                    funcionColision:function(colObj){
                                       if(colObj.isA("BalaPlayer") && ! this.p.colisionado){
                                          this.p.colisionado=true;
                                          if(Math.random() < 0.15){
                                            Q.stage().insert(new Q.upDisplay({x:this.p.x, y:this.p.y}));
                                          }
                                        }
                                    }}));

          }

        }
  });


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
            sheet: "inicio",
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
          this.on("destruir",function(){this.destroy();});
          this.on("empezar",function(){
            this.add("spellCard1Reimu1");
            this.p.vida = 300;
            this.p.vy = 100;
            this.p.invencible = false;
            this.p.sheet = "stand";
            this.play("stand");
          });
          this.on("continuar",function(){
            this.add("spellCard1Reimu2");
            this.p.vy = 100;
            this.p.invencible = false;
            this.p.sheet = "stand";
            this.play("stand");
          });
          this.on("continuar2",function(){
            this.add("spellCard1Reimu3");
            this.p.vy = 100;
            this.p.invencible = false;
            this.p.sheet = "stand";
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
                this.p.sheet = "ataque";
                this.play("ataque");              
                this.p.vida = 200;
              }else if(this.p.fase == 1){
                this.p.sheet = "ataque";
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
            if(colObj.isA("BalaPlayer") ){
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
                this.p.sheet = "fin";
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
  



  //SERGIO

});
