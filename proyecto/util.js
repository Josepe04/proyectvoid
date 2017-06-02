  const LIMITEX1 = 1550,LIMITEX2 = 2820,LIMITEY1 = 1000,LIMITEY2 = 2400;


  /**
   * esta funcion la utilizaremos para que el enemigo lance una bala dirigida
   * al jugador, NO TERMINADA
   */
  var balaDirigida = function(posPlayer,posBoss){
    var velocidades = {vx:0,vy:0};
    var difx = posPlayer.x-posBoss.x;
    var dify = posPlayer.y-posBoss.y;
    if(difx < 0){
      velocidades.vx = 1;
      velocidades.vy =  (dify/difx);
    }
    else{
      velocidades.vx = -1;
      velocidades.vy =  -(dify/difx);
    }
    return velocidades;
  };

  var colisionCuadrada = function(posObj1,posObj2){
    var cat1 = Math.abs(posObj1.x+20 - posObj2.x);
    var cat2 = Math.abs(posObj1.y - posObj2.y);
    if(cat2 >= cat1){
      if(cat2 < (posObj2.h/2+posObj1.radio)){
        return true;
      }
    }else{
      if(cat1 < (posObj2.w/2+posObj1.radio)){
        return true;
      }
    }
    return false;
  };

  //PLAYER COLISION CENTER DEMO

  var colisionCircular = function(posObj1,posObj2,dist){
    var cat1 = Math.abs(posObj1.x - posObj2.x);
    var cat2 = Math.abs(posObj1.y - posObj2.y);
    var value = Math.sqrt(Math.pow(cat1,2)+Math.pow(cat2,2));
    if(value <= dist)
      return true;
    else
      return false;
  };

    //ANDRES

    //ADRI

    //CHEMA

    //SERGIO