# Magic Waifus

## 1. Diseño del juego

> Magic Waifus es un juego que pertenece al género "bullet hell" (toma claras referencias de Touhou), que lo convierte en un frenético juego en el que te enfrentas a oleadas de enemigos, esquivando sus proyectiles y lanzando los tuyos.
El juego se basa en enfrentamiento a jefes finales, por lo que no tiene ningún tipo de scroll.

## 1.1. Objetivos del juego

El objetivo principal del juego, es vencer a todos los jefes finales (8 en total). Se pierde la partida cuando ya no le quedan más vidas al jugador.

## 1.2. Principales mecánicas

El juego se basa en las siguientes mecánicas:

* **Mecánicas del jugador**

- El personaje tiene un número limitado de vidas, que puede perder cuando es alcanzado por un enemigo o por un proyectil del mismo.

- El jugador puede moverse en las cuatro direcciones en el espacio del escenario (existen unos límites) mientras lanza magia.

- El jugador puede lanzar proyectiles (magia), en un principio la magia básica es en línea recta. Existen power-ups que cambian el patrón que sigue el proyectil, lo potencian, etc. También hay un power-up que da una vida.

- Según el escenario puede haber una magia especial o no (nivel de dificultad). Esta magia es lanzada con una tecla especial, y es de gran utilidad dentro del escenario.

* **Mecánicas del enemigo**

- Los enemigos básicos (no presentes en todos los escenarios) se mueven por el escenario, haciéndole la vida imposible al jugador.

- Hay un jefe final por escenario, el cual tiene
vidas, que pierde si es alcanzado por un proyectil del jugador. También puede lanzar magia al jugador, invocar esbirros... según se tercie.

## 2. Diseño de la implementación

Para la implementación se ha usado el motor Quintus.

### Arquitectura

La organización del proyecto es la siguiente:

* *Se compone de las siguientes carpetas:*

  - **audio** - guarda todos los sonidos que usa el juego.
  - **data** - guarda todos los JSON necesarios para las animaciones.
  - **images** - guarda todos los recursos visuales que se usan en el juego.
  - **lib** - guarda las librerias de Quintus.
  - **directorio raíz** - en este directorio, están los archivos de código:
    - **enemys.js** - Guarda el código relacionado con los enemigos y jefes finales.
    - **stages.js** - Guarda el código realacionado con los stages, spawners y niveles.
    - **player.js** - Guarda el código relacionado con el jugador (con todo lo que conlleva: disparo básico, power-ups...).
    - **util.js** - Guarda código referente a distintas funcionalidades comunes que no se corresponden con los otros archivos de código (Límites, colisiones...).


### Componentes principales

* *Los componentes principales son los siguientes:*

  - **Marisa**: es la clase referente al jugador (Q.Sprite.extends("Marisa")). Se encuentra en player.js.
  - **Disparos Marisa**: cada disparo es un componente (component en Quintus). Se encuentran en player.js.
  - **Bosses**: según el nombre del boss, el nombre de la clase cambia. Por ejemplo: Boss Mamizou -> clase Mamizou (Q.Sprite.extends("Mamizou")). Se encuentran en enemys.js
  - **Disparos bosses**: cada patrón de disparo de un boss es un componente (component en Quintus). Se encuentran en enemys.js
  - **Escenarios**: se componen de un sprite para el fondo, y un stage. Se encuentran en enemys.js
  - **Funciones de colisión**: al ser un juego muy frenético, se ha tenido que crear funciones propias de colisión. Se encuentran en util.js
  - **Controles**: puesto que los controles que tenía Quintus por defecto no se adaptaban bien al juego, se han tenido que crear unos controles propios. Se encuentran en player.js
  - **Animaciones**: hay animaciones para: el jugador, enemigos, escenarios... se encuentran en player.js, enemys.js y stages.js respectivamente.

## 3. Equipo de trabajo y reparto de tareas

*Los miembros del grupo que han desarrollado el juego son:*

@Wizsmiles **- Sergio Freire Fernandez**
@Josepe04 **- José Manuel Pérez Zamorano**
@DrasenPC **- Andrés Pascual Contreras**
@Nadrixa **- Adrián Muñoz Gámez**

*El reparto de tareas ha sido el siguiente:*

- Realización en conjunto de la idea del juego, estructura, elementos que aparecen en él...

- Elementos comunes realizados entre todos (implementación del jugador, disparo del jugador, power-ups...).

- 2 escenarios por persona (8 en total):
  * Escenarios @Wizsmiles -> Hijiri y Futo.
  * Escenarios @Josepe04 -> Reimu y Mokou.
  * Escenarios @DrasenPC -> Koishi y Kokoro.
  * Escenarios @Nadrixa -> Mamizou e Ichirin.

## 4. Fuentes y referencias

- Todos los sprites de enemigos finales y el jugador principal pertenecen a Touhou 14.5 (ZUN all rights reserved).
- Los sprites de los escenarios han sido sacados de GIF encontrados en Google.
- Los enemigos son de diversos Touhou (ZUN all rights reserved).
- Los proyectiles de los enemigos, jefes finales, y el jugador son de diversos Touhou (ZUN all rights reserved).
- La música del escenario de Mokou es de Touhou 8 (ZUN all rights reserved).
- La música del escenario de Reimu es de Touhou 7 (ZUN all rights reserved).
- La música del escenario de Futo es una versión de 8 bits de "Song of storms" de Zelda (Nintendo).
- La música del escenario de Hijiri es una versión en 8 bits de "Byob" sacada del canal de youtube "8 bit universe" (youtube.com/user/8BitUniverseMusic).
- La música del escenario de Mamizou e Ichirin es de la banda sonora original (8 bits) de Fire Emblem Echoes (Nintendo).
- La música del escenario de Koishi es una versión de 8 bits de la canción principal de Hearthstone (Blizzard) sacada del canal de youtube "8 bit universe" (youtube.com/user/8BitUniverseMusic).
- La La música del escenario de Kokoro es una versión de 8 bits de la canción principal de los "Power Ranges" llamada "Go Go Power Rangers" sacada del canal de youtube "8 bit universe" (youtube.com/user/8BitUniverseMusic).
