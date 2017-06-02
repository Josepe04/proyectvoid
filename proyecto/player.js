window.addEventListener("load",function(){

var Q = window.Q = Quintus({audioSupported: [ 'mp3','ogg' ]})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
    .setup({width: 1280, height: 700})
    .controls().touch()
    .enableSound();


    Q.component("controles", {

        added: function() {
          var p = this.entity.p;

          if(!p.stepDistance) { p.stepDistance = 9; }
          if(!p.stepDelay) { p.stepDelay = 0.01; }

          p.stepWait = 0;
          this.entity.on("step",this,"step");
        },

        cambiarVelocidad: function(newVel){
          if(!this.entity.p.stepDistance) { p.stepDistance = newVel; }
        },

        step: function(dt) {
          var p = this.entity.p,
              moved = false;
          p.stepWait -= dt;

          if(p.stepping) {
            p.x += p.diffX * dt / p.stepDelay ;
            p.y += p.diffY * dt / p.stepDelay ;
          }

          if(p.stepWait > 0) { return; }
          if(p.stepping) {
            p.x = p.destX;
            p.y = p.destY;
          }
          p.stepping = false;

          p.diffX = 0;
          p.diffY = 0;

          if(Q.inputs["shift"]){
            p.stepDistance = 4;
          }else{
            p.stepDistance = 9;
          }

          if(Q.inputs['left'] && p.x > 1559) {
            p.diffX = -p.stepDistance;
          } else if(Q.inputs['right'] && p.x < 2805) {
            p.diffX = p.stepDistance;
          }

          if(Q.inputs['up'] && p.y > 1664) {
            p.diffY = -p.stepDistance;
          } else if(Q.inputs['down'] && p.y < 2329) {
            p.diffY = p.stepDistance;
          }

          if(p.diffY || p.diffX ) {
            p.stepping = true;
            p.origX = p.x;
            p.origY = p.y;
            p.destX = p.x + p.diffX;
            p.destY = p.y + p.diffY;
            p.stepWait = p.stepDelay;
          }
        }

    });


    Q.Sprite.extend("BalaPlayer",{
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
          sensor:true
        });
        this.add('2d');
        this.on("sensor");
      },
      step: function(dt){
        this.p.x += dt*this.p.vx;
        this.p.y += dt*this.p.vy;
        if(this.p.x > LIMITEX2 || this.p.x < LIMITEX1 || this.p.y < LIMITEY1 || this.p.y > LIMITEY2)
          this.destroy();
      },
      sensor: function(colObj){
        if(colObj.p.tipo == "enemy"){
          if(colObj.p.vida <= 0)
            colObj.destroy();
          else
            colObj.p.vida--;
            this.destroy();
        }
      }
    });

    Q.component("disparoPrincipal",{
      added: function() {
          this.tAcomulada = 0;
          this.reloadTime = 0.1;
          this.entity.on("step",this,"step");
      },
      step: function(dt){
        this.tAcomulada += dt;
        var p = this.entity.p;
        if(this.tAcomulada >= this.reloadTime && Q.inputs['fire']){
          this.tAcomulada = 0;
          var velocidadX = 0;
          if(p.diffX > 0){
            velocidadX = p.diffX * dt/ p.stepDelay;
          }
          Q.stage().insert(new Q.BalaPlayer({asset:"pruebabala.png",x:p.x + 1.5*p.radio,y:p.y,
                                  vx:400 + velocidadX,vy:0,rad: 2
                                  }));
        }
      }
    });


    Q.component("powerupDemo",{
      added: function() {
          this.tAcomulada = 0;
          this.reloadTime = 0.1;
          this.entity.on("step",this,"step");
          this.active = true;
      },
      step: function(dt){

        if(this.active){

          this.tAcomulada += dt;
          var p = this.entity.p;
          if(this.tAcomulada >= this.reloadTime && Q.inputs['fire']){
            this.tAcomulada = 0;
            var velocidadX = 0;
            if(p.diffX > 0){
              velocidadX = p.diffX * dt/ p.stepDelay;
            }
            Q.stage().insert(new Q.BalaPlayer({asset:"pu1.png",x:p.x + 1.5*p.radio,y:p.y,
                                    vx:400 + velocidadX,vy:0,rad: 2,
                                    }));
           Q.stage().insert(new Q.BalaPlayer({asset:"pu1.png",x:p.x + 1.5*p.radio,y:p.y,
                                    vx:400 + velocidadX,vy:100,rad: 2,
                                    }));
            Q.stage().insert(new Q.BalaPlayer({asset:"pu1.png",x:p.x + 1.5*p.radio,y:p.y,
                                    vx:400 + velocidadX,vy:-100,rad: 2,
                                    }));
          }
        }
      },

        habilitar: function(){
          if(this.active) this.active =false;
          else this.active = true;
        }
    });



    //POWER UP DISPLAY
    Q.Sprite.extend("PowerDisplay",{
      init: function(p) {
        this._super(p, {
          asset:"pu1D.png",
          gravity:0,
          radio:30,
          sensor:true
        });
        this.add('2d');
        this.on("sensor");
      },

      sensor: function(colObj){
        if(colObj.isA("Marisa")){
          colObj.add('powerupDemo');
          this.destroy();
        }
      }


    });







    //PLAYER DEMO
    Q.Sprite.extend("Marisa",{
      init: function(p) {
        this._super({
          asset:"pruebaMarisa.png",
          x:2000,
          y:2000,
          gravity:0,
          radio:5,
    	    invencibleTime: 0,
          vidas:4,
          sensor:true
        });
        this.ultimo = 0;
        this.delPowerups = function(){
          if(this.powerupDemo != null)  this.del("powerupDemo");
        };
        this.add('2d, controles , disparoPrincipal');
        this.on("sensor");
      },

      step: function(dt) {
        if(this.p.invencibleTime > 0){
          this.p.invencibleTime = this.p.invencibleTime-dt;
        }
      },

      sensor: function(colObj){
        if(this.p.invencibleTime <= 0 && colObj.isA("Bala")//){
              && colisionCuadrada(this.p,colObj.p)){
             if(this.p.vidas > 0)
        	       this.p.vidas--;
             Q.stageScene('hud', 3, this.p);
             console.log("muerto");
             if(this.p.vidas <= 0){
               Q.stageScene("endGame",1, { label: "You Died" });
               this.p.stepDelay = 1;
               this.del('controles');
               this.del('disparoPrincipal');
               this.delPowerups();
             }else{
               this.p.invencibleTime = 2;
               colObj.destroy();
             }
        }
      }

    });



      //ANDRES

      //ADRI

      //CHEMA

      //SERGIO



  });
