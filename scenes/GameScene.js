/* TO DO:
Fix game over mechanic
REAL GAME MECHANICS,
Anims are trying to re define themselves, fix that.
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


var keys;
//background
var spaceBackground;
var hexColor;
var sky;
var space;
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
var children; // dont know why this has to be here
var text;
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
      //sky colors and player rotation
    sky = new Phaser.Display.Color(120, 120, 255);
    space = new Phaser.Display.Color(0, 0, 0);
    timedBackground = this.time.addEvent({ delay: 10, callback: this.moveBackground, callbackScope: this, loop: true });
      //Flying Obstacles
    flyingObject = this.physics.add.group ();
      //Game background images
    backgroundImages = this.physics.add.group();
    starsDestroyed = 0;
      //keyboard input
    keys = this.input.keyboard.addKeys('W,S,A,D,');
      //levels
    level = 0;
    text = this.add.text(32, 32, '',  {fill: '#00ff00' });
    this.switchLevel();
    timedSwitch = this.time.addEvent({ delay: 20000, callback: this.switchLevel, callbackScope: this, loop: true });
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
    player = this.physics.add.sprite(400, 0, 'dude');
    player.anims.play('turn', true);
    player.body.collideWorldBounds=true;
      //colliders
    this.physics.add.collider(player, flyingObject, this.hitObject, null, this);
    this.physics.add.collider(flyingObject, flyingObject);
      //music
    /*  music = this.sound.add('spaceTheme');
      music.play();*/

        //Background images of stars
      for (var i = 0; i < 50; i++) {
        var aStar = backgroundImages.create(Phaser.Math.FloatBetween(0, 800), Phaser.Math.FloatBetween(0, 600), 'star');
        aStar.setDepth(-1);
        aStar.setVelocityY(-20);
      }


  }



  update () {
    //DEBUG

    text.setText('timedSwitch Progress: ' + timedSwitch.getProgress().toString().substr(0, 4) + '\nEvent.repeatCount: ' +
    timedSwitch.repeatCount + '\nbackground Change Paused?: ' + timedBackground.paused + '\n Level: ' + level + '\n counter ' + counter
    + '\n stars destroyed : ' + starsDestroyed);

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
      if (child.y < 0)  {
          child.destroy();
          starsDestroyed++;
        }
    })

  }

  placeMeteor()  {
    //Meteor movement
    var nextMeteor;
    nextMeteor = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'meteor');
    nextMeteor.setScale(.5);
    nextMeteor.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextMeteor.setVelocityY(-100);
    nextMeteor.setAngularVelocity(Phaser.Math.FloatBetween(0,100));
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
    nextStone.setScale(.01);
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

  hitObject() {
    player.setTint(0xff0000);
  //  gameOver = true;
  //  this.scene.start("startMenu");
    this.physics.pause();
    this.scene.pause("enterGame");
    this.scene.launch("endGame", level);
  }

  moveBackground() {
    //spaceBackground.y += -.05;
    //spaceBackground.y += -.5;
    player.angle += 5;
  }

  switchBackgroundColor() {
    counter++;
      if (counter <= 1200) {
        hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(space, sky, 1200, counter);
        this.cameras.main.setBackgroundColor(hexColor);
      } else {
        timedBackground.paused = true;
      }



  }
    //function to change the level !
  switchLevel() {
    level += 1;

    switch(level) {
      case 1:
        timedMeteor = this.time.addEvent({ delay: 2000, callback: this.placeMeteor, callbackScope: this, loop: true });
        timedSatellite = this.time.addEvent({ delay: 5000, callback: this.placeSatellite, callbackScope: this, loop: true });
        timedStone = this.time.addEvent({ delay: 1000, callback: this.placeStone, callbackScope: this, loop: true });
        timedStar = this.time.addEvent({ delay: 500, callback: this.placebStar, callbackScope: this, loop: true });
        console.log("Level 1 !");
        break;
      case 2:
        timedMeteor.paused = true;
        timedSatellite.paused = true;
        timedStone.paused = true;
        console.log("Level 2 !");
        counter = 0;
        timedBackground = this.time.addEvent({ delay: 20, callback: this.switchBackgroundColor, callbackScope: this, loop: true });
        break;
    }
  }
    //different case levels = new games!

}
