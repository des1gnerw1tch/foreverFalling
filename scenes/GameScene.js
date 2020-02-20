/* TO DO:
Fix game over mechanic
Anims are trying to re define themselves, fix that.
FIX CLOUD HITBOX
*/
var player;
var platforms;
var timedBackground;
var timedSwitch;
  //timers
var timedMeteor;
var timedSatellite;
var timedStone;
var timedBackground;
var timedStar;
var timedFireball;
var timedLMonster;
var timedEnergyBall;
var timedFairy;
var timedKeyCatch;
var timedSpaceship;
var timedIceCloud;
var timedPlane;

var keys;
//background
var spaceBackground;
var hexColor;
//atmosphere colors
var sky;
var cExo;
var cThermo;
var cIon;
var cMeso;
var cStrato;

var counter;
var stars;
var rect;
var randomRect;
var movingScreen;
var backgroundImages;
var starsDestroyed = 0;


var music;
var gameOver = false;
var level = 0;

var atmosphere; // text holder for atmosphere player is in
var aText;
var children; // dont know why this has to be here
var debug;
var showDebug = false;
//obstacles
var flyingObject;
var timeText;
//particles (Not usable yet)
var particles;
var emitter;

class GameScene extends Phaser.Scene{
  constructor(){
  /*  super ({
      key: CST.SCENES.LOAD
    })*/
    super("enterGame");
  }

  create()  {
    music.play();
      //sky colors and player rotation
    sky = new Phaser.Display.Color(120, 120, 255);
    cExo = new Phaser.Display.Color(0, 0, 0);
    cThermo = new Phaser.Display.Color(200, 34, 0);
    cIon = new Phaser.Display.Color(141, 5, 182);
    cMeso = new Phaser.Display.Color(8, 18, 107);
    cStrato = new Phaser.Display.Color(0, 255, 255);

    timedBackground = this.time.addEvent({ delay: 10, callback: this.moveBackground, callbackScope: this, loop: true });
    timedKeyCatch = this.time.addEvent({ delay: 100, callback: this.resetKeys, callbackScope: this, loop: false });
      //Flying Obstacles
    flyingObject = this.physics.add.group ();
      //Game background images
    backgroundImages = this.physics.add.group();
    starsDestroyed = 0;
      //keyboard input
    keys = this.input.keyboard.addKeys('W,S,A,D,Z');
      //levels
    level = 0;
    debug = this.add.text(32, 32, '',  {fill: '#00ff00' });
    aText = this.add.text(500, 50, '', {fontSize: 32});
    this.switchLevel();
    timedSwitch = this.time.addEvent({ delay: 25500, callback: this.switchLevel, callbackScope: this, loop: true });
  //  timedSwitch = this.time.addEvent({ delay: 1000, callback: this.switchLevel, callbackScope: this, loop: true });
      //spawns

      //particles
    /*  particles = this.add.particles('flares');
      emitter = particles.createEmitter({
        frame: 'yellow',
        x: 300,
        y: 400,
        lifespan: 2000,
        speedY: { min: -100, max: -600 },
        speedX: { min: -100, max: 100 },
        angle: -90,
        gravityY: 300,
        scale: { start: 0.4, end: 0 },
        quantity: 50,
        blendMode: 'ADD'
    });*/

//STAR PARTICLES TEST
  /*  var p = this.add.particles('starParticle');
    var emitter1 = p.createEmitter();
    var emitter2 = p.createEmitter();
    var emitter3 = p.createEmitter();
    emitter1.setScale(.1)
    emitter1.setPosition(0, 600);
    emitter1.setSpeed(600);
    emitter2.setScale(.1)
    emitter2.setPosition(400, 600);
    emitter2.setSpeed(600);
    emitter3.setScale(.1)
    emitter3.setPosition(800, 600);
    emitter3.setSpeed(600);*/

      //player
    player = this.physics.add.sprite(400, 0, 'astronaut').setScale(.7);
    player.anims.play('falling', true);
    player.body.collideWorldBounds=true;
      //colliders
    this.physics.add.collider(player, flyingObject, this.hitObject, null, this);
  //  this.physics.add.collider(flyingObject, flyingObject);
      //music
    /*  music = this.sound.add('spaceTheme');
      music.play();*/

        //Background images of stars/ planets
      for (var i = 0; i < 50; i++) {
        var aStar = backgroundImages.create(Phaser.Math.FloatBetween(0, 800), Phaser.Math.FloatBetween(0, 600), 'star');
        aStar.setDepth(-1);
        aStar.setVelocityY(-20);
      }

      backgroundImages.create(700, 600, 'bigPlanet1').setScale(1).setVelocityY(-20).setDepth(-1);

      //animations -------------------------------------------------------------
      //Meteor Types
      this.anims.create({
        key: 'm0',
        frames: [ { key: 'meteor', frame: 0 } ],
        frameRate: 20,
      })
      this.anims.create({
        key: 'm1',
        frames: [ { key: 'meteor', frame: 1 } ],
        frameRate: 20,
      })
      this.anims.create({
        key: 'm2',
        frames: [ { key: 'meteor', frame: 2 } ],
        frameRate: 20,
      })
      this.anims.create({
        key: 'm3',
        frames: [ { key: 'meteor', frame: 3 } ],
        frameRate: 20,
      })
      this.anims.create({
        key: 'm4',
        frames: [ { key: 'meteor', frame: 4 } ],
        frameRate: 20,
      })
      this.anims.create({
        key: 'm5',
        frames: [ { key: 'meteor', frame: 5 } ],
        frameRate: 20,
      })

      //Lava Dude
      this.anims.create({
        key: 'aLavaMonster',
        frames: this.anims.generateFrameNumbers('lavaMonster', {start: 0, end: 6}),
        frameRate: 12,
        repeat: -1
      })

      //Energy Ball animations
      this.anims.create({
        key: 'aEnergyBall',
        frames: this.anims.generateFrameNumbers('energyBall', {start: 0, end: 6}),
        frameRate: 48,
        repeat: -1
      })

      //Fairy animations
      this.anims.create({
        key: 'aFairy',
        frames: this.anims.generateFrameNumbers('fairy', {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
      })

      //Spaceship animations
      this.anims.create({
        key: 'aSpaceship',
        frames: this.anims.generateFrameNumbers('spaceship', {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
      })

      //Ice cloud animations
      this.anims.create({
        key: 'aIceCloud',
        frames: this.anims.generateFrameNumbers('iceCloud', {start: 0, end: 2}),
        frameRate: 9,
        repeat: -1
      })

      //Plane animation
      this.anims.create({
        key: 'aPlane',
        frames: this.anims.generateFrameNumbers('plane', {start: 0, end: 1}),
        frameRate: 6,
        repeat: -1
      })

//------------------------------------------------------------------------------
  }



  update () {
    //DEBUG

    if (this.input.keyboard.checkDown(keys.Z, 1000))  {
      if (showDebug)  {
      showDebug = false;
      } else {
        showDebug = true;
      }
    }
    if (showDebug)  {
      debug.setText('timedSwitch Progress: ' + timedSwitch.getProgress().toString().substr(0, 4) + '\nEvent.repeatCount: ' +
      timedSwitch.repeatCount + '\nbackground Change Paused?: ' + timedBackground.paused + '\n Level: ' + atmosphere + '\n counter ' + counter
      + '\n stars destroyed : ' + starsDestroyed + '\nA key Down? : ' + keys.A.isDown + '\nD key Down? : ' + keys.D.isDown);
    } else {
      debug.setText('');
    }
    //level UI
    aText.setText(atmosphere);
    //Player movement
    if (keys.A.isDown)  {
      player.setAccelerationX(-500);
    }
    else if (keys.D.isDown) {
      player.setAccelerationX(500);
    } else {
      player.setAccelerationX(0);
    }
    if (gameOver == true) {
      this.physics.pause();
    }

    //Beginning falling
    if (player.y > 300) {
      player.body.allowGravity = false;
      player.setVelocityY(0);
      //alert("hello?");
    } else if (player.y < 300) {
        player.body.gravity.y = 800;
    }
    //emitter.setPosition(player.x, player.y);

  }

//background star placement
  placebStar()  {

    var nextStar;
    nextStar = backgroundImages.create(Phaser.Math.FloatBetween(0, 800), 650, 'star');
    nextStar.setDepth(-1);
    nextStar.setVelocityY(-20);
//  nextStar.setVelocityY(Phaser.Math.Between(1, 3));

    //used to destroy old meteors.. ? need to add other bounds other than -x
    backgroundImages.children.iterate(function (child) {
        //bit found in code that works, no idea what it does. ..
      if (child == undefined)
          return;
      if (child.y < -300)  {
          child.destroy();
          starsDestroyed++;
        }
    })

  }

/*Hit objects spawn functions
------------------------------------------------------------------------
*/
  placeMeteor()  {
    //Meteor movement
    var nextMeteor;
    nextMeteor = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'meteor');
    //random meteor skin
    var num = Phaser.Math.Between(0, 2);
    console.log(num);
    switch (num)  {
      case 0: nextMeteor.anims.play('m0', true);
      break;
      case 1: nextMeteor.anims.play('m1', true);
      break;
      case 2: nextMeteor.anims.play('m2', true);
      break;
      case 3: nextMeteor.anims.play('m3', true);
      break;
      case 4: nextMeteor.anims.play('m4', true);
      break;
      case 5: nextMeteor.anims.play('m5', true);
      break;
    }

      //meteors will turn red when in thermosphere, need to add counter
    if (level == 2 && counter >= 350)
      nextMeteor.setTint(0xff0000);

    nextMeteor.setScale(.5);
    nextMeteor.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextMeteor.setVelocityY(-100);
  //  nextMeteor.setAngularVelocity(Phaser.Math.FloatBetween(0,100));
    //used to destroy old meteors.. ? need to add other bounds other than -x
    flyingObject.children.iterate(function (child) {
        //bit found in code that works, no idea what it does. ..
      if (child == undefined)
          return;
      if (child.y < 0)
          child.destroy();
    })

  }

  placeSatellite()  {
    //Satellite movement
    var nextSatellite;
    nextSatellite = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'satellite');
    nextSatellite.setScale(.2);
    nextSatellite.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextSatellite.setVelocityY(-200);
    nextSatellite.setAngularVelocity(Phaser.Math.FloatBetween(300,500));
    //used to destroy old satellites.. ? need to add other bounds other than -x
    flyingObject.children.iterate(function (child) {
        //bit found in code that works, no idea what it does. ..
        if (child == undefined)
            return;
        if (child.y < 0)
            child.destroy();
    })

  }

  placeStone()  {
    //Stone movement
    var nextStone;
    nextStone = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'stone');
    nextStone.setScale(2);
    nextStone.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextStone.setVelocityY(-300);
    nextStone.setAngularVelocity(Phaser.Math.FloatBetween(0,100));
    //used to destroy old stones.. ? need to add other bounds other than -x
    flyingObject.children.iterate(function (child) {
        //bit found in code that works, no idea what it does. ..
        if (child == undefined)
            return;
        if (child.y < 0)
            child.destroy();
    })

  }

  placeFireball() {
    var nextFireball;
    nextFireball = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'fireball');
    nextFireball.setScale(.01);
    nextFireball.setVelocityX(Phaser.Math.FloatBetween(-100, 100));
    nextFireball.setVelocityY(-300);
    nextFireball.setAngle(120);
    nextFireball.setAngularVelocity(Phaser.Math.FloatBetween(0,20));
    //used to destroy old stones.. ? need to add other bounds other than -x
    flyingObject.children.iterate(function (child) {
        //bit found in code that works, no idea what it does. ..
        if (child == undefined)
            return;
        if (child.y < 0)
            child.destroy();
    })
  }

  placeLMonster() {
    var nextLMonster;
    nextLMonster = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'lavaMonster');
    nextLMonster.setScale(1);
    nextLMonster.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextLMonster.setVelocityY(-100);
    nextLMonster.anims.play('aLavaMonster', true);
  //  nextLMonster.setAngle(120);
    nextLMonster.setAngularVelocity(Phaser.Math.FloatBetween(0,20));

    flyingObject.children.iterate(function (child) {
        if (child == undefined)
            return;
        if (child.y < 0)
            child.destroy();
    })
  }

  placeEnergyBall() {
    if (counter > 200)  {
      var nextEnergyBall;
      nextEnergyBall = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'energyBall');
      nextEnergyBall.setScale(.5);
      nextEnergyBall.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
      nextEnergyBall.setVelocityY(-100);
      nextEnergyBall.anims.play('aEnergyBall', true);
      nextEnergyBall.setAngularVelocity(Phaser.Math.FloatBetween(200, 250));
    }

    flyingObject.children.iterate(function (child) {
        if (child == undefined)
            return;
        if (child.y < 0)
            child.destroy();
    })
  }

  placeFairy()  {
    var nextFairy;
    nextFairy = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'fairy');
    nextFairy.setScale(.75);
    nextFairy.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextFairy.setVelocityY(-120);
    nextFairy.setAngle(-10);
    nextFairy.anims.play('aFairy', true);
    nextFairy.setAngularVelocity(Phaser.Math.FloatBetween(-1, -2));
  }

  placeSpaceship()  {
    var num = Phaser.Math.Between(0, 2);
    if (num == 0) {
      var nextSpaceship;
      nextSpaceship = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'spaceship');
      nextSpaceship.setScale(1);
  //  nextSpaceship.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
      nextSpaceship.setVelocityY(-350);
      nextSpaceship.setAngle(0);
      nextSpaceship.anims.play('aSpaceship', true);
    }
  }

  placeIceCloud()  {
      var nextCloud;
      nextCloud = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 700, 'iceCloud');
      nextCloud.setScale(1);
      nextCloud.setVelocityY(-25);
      nextCloud.setAngle(0);
      nextCloud.anims.play('aIceCloud', true);
    }

  placePlane()  {
    var nextPlane;
    var posY = Phaser.Math.Between(0, 600);
    nextPlane = flyingObject.create(-100, posY, 'plane');
    nextPlane.setVelocityX(Phaser.Math.Between(100, 500));
    nextPlane.anims.play('aPlane', true);
    nextPlane.setScale(.75);
    /*ensures that there will be a chance of collision when plane spawns.
    When plane is spawned in the upper half, it will have a velocity that sends
    the plane down, vice versa. Also sets plane angle corresponding to direction*/
    if (posY > 300) {
      var velY = Phaser.Math.Between(-300, 0);
      nextPlane.setVelocityY(velY);
      nextPlane.setAngle(velY/10);
    } else if (posY < 300)  {
      var velY = Phaser.Math.Between(0, 300);
      nextPlane.setVelocityY(velY);
      nextPlane.setAngle(velY/10);
    }

    if (posY < 384 && posY > 216 && velY < 100) {
      nextPlane.destroy();
      console.log("Destroyed impossible plane");
    }


  }


  //------------------------------------------------------------------


  hitObject() {
    player.setTint(0xff0000);
    keys.A.isDown = false;
    keys.D.isDown = false;
    this.scene.pause("enterGame");
    this.scene.launch("endGame", atmosphere);
  }

  moveBackground() {
    //spaceBackground.y += -.05;
    //spaceBackground.y += -.5;
    player.angle += 5;
  }
    //temporary fix to movement glitch. resets the keys 100 ms after scene starts
  resetKeys() {
    keys.A.isDown = false;
    keys.D.isDown = false;
  }
    /*this function switches the background color with a counter and interpolate.
    Is called multiple times until paused. the Switch is used so that the right colors
    are switched for each level.
    */
  switchBackgroundColor() {
    counter++;
    switch(level) {
      case 2:
        if (counter <= 600) {
          hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(cExo, cThermo, 600, counter);
          this.cameras.main.setBackgroundColor(hexColor);
        } else {
          timedBackground.paused = true;
          }
        break;
      case 3:
        if (counter <= 600) {
          hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(cThermo, cIon, 600, counter);
          this.cameras.main.setBackgroundColor(hexColor);
          } else {
          timedBackground.paused = true;
          }
        break;
      case 4:
        if (counter <= 600) {
          hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(cIon, cMeso, 600, counter);
          this.cameras.main.setBackgroundColor(hexColor);
          } else {
            timedBackground.paused = true;
          }
        break;
      case 5:
        if (counter <= 600) {
          hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(cMeso, cStrato, 600, counter);
          this.cameras.main.setBackgroundColor(hexColor);
          } else {
          timedBackground.paused = true;
          }
        break;

    }



  }

    //function to change the level !
  switchLevel() {
    level += 1;

    switch(level) {
      case 1:
        atmosphere = "Exosphere";
        timedMeteor = this.time.addEvent({ delay: 2000, callback: this.placeMeteor, callbackScope: this, loop: true });
        timedSatellite = this.time.addEvent({ delay: 5000, callback: this.placeSatellite, callbackScope: this, loop: true });
        timedStone = this.time.addEvent({ delay: 1000, callback: this.placeStone, callbackScope: this, loop: true });
        timedStar = this.time.addEvent({ delay: 500, callback: this.placebStar, callbackScope: this, loop: true });
        console.log("Level 1 !");
        break;
      case 2:
        atmosphere = "Thermosphere";
        counter = 0;
        timedBackground = this.time.addEvent({ delay: 20, callback: this.switchBackgroundColor, callbackScope: this, loop: true });
          //pausing old objects so that they don't spawn
        timedSatellite.paused = true;
        timedStone.paused = true;
        console.log("Level 2 !");
        //starting new spawns
        timedFireball = this.time.addEvent({ delay: 300, callback: this.placeFireball, callbackScope: this, loop: true });
        timedLMonster = this.time.addEvent({ delay: 3000, callback: this.placeLMonster, callbackScope: this, loop: true });

        break;
      case 3:
        atmosphere = "Ionosphere";
        counter = 0;
        timedBackground = this.time.addEvent({ delay: 20, callback: this.switchBackgroundColor, callbackScope: this, loop: true });
        //pausing old objects
        timedMeteor.paused = true;
        timedFireball.paused = true;
        timedLMonster.paused = true;

        //starting new spawns
        timedEnergyBall = this.time.addEvent({delay: 500, callback: this.placeEnergyBall, callbackScope: this, loop: true});
        timedFairy = this.time.addEvent({delay: 6000, callback: this.placeFairy, callbackScope: this, loop: true});
        break;
        case 4:
          atmosphere = 'Mesosphere';
          counter = 0;
          timedBackground = this.time.addEvent({ delay: 20, callback: this.switchBackgroundColor, callbackScope: this, loop: true });
          //pausing old hitobjects
          timedEnergyBall.paused = true;
          timedFairy.paused = true;

          //starting new spawns
          timedSpaceship = this.time.addEvent({delay: 333, callback: this.placeSpaceship, callbackScope: this, loop: true});
          timedIceCloud = this.time.addEvent({delay: 2000, callback: this.placeIceCloud, callbackScope: this, loop: true});
          break;
        case 5:
          atmosphere = 'Stratosphere'
          counter = 0;
          timedBackground = this.time.addEvent({ delay: 20, callback: this.switchBackgroundColor, callbackScope: this, loop: true });
            //paused old objects
          timedSpaceship.paused = true;
          timedIceCloud.paused = true;
          //new objects
          timedPlane = this.time.addEvent({delay: 2000, callback: this.placePlane, callbackScope: this, loop: true});
          break;

    }
  }
    //different case levels = new games!

}
