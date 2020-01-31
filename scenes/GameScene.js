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

var keys;
var spaceBackground;
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

    //Background image
    spaceBackground = this.add.image(400, 500, 'space');
    timedBackground = this.time.addEvent({ delay: 10, callback: this.moveBackground, callbackScope: this, loop: true });
      //Flying Obstacles
    flyingObject = this.physics.add.group ();
      //keyboard input
    keys = this.input.keyboard.addKeys('W,S,A,D,');
      //levels
    level = 0;
    text = this.add.text(32, 32);
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
      //colliders
    this.physics.add.collider(player, flyingObject, this.hitObject, null, this);
    this.physics.add.collider(flyingObject, flyingObject);
      //music
    /*  music = this.sound.add('spaceTheme');
      music.play();*/



  }



  update () {
    //timer

    text.setText('timedSwitch Progress: ' + timedSwitch.getProgress().toString().substr(0, 4) + '\nEvent.repeatCount: ' +
    timedSwitch.repeatCount + '\nPaused?: ' + timedSwitch.paused + '\n Level: ' + level);
    //console.log(player.y);

    //Player movement
    if (keys.A.isDown)  {
      player.setVelocityX(-200);
    }
    else if (keys.D.isDown) {
      player.setVelocityX(200);
    } else {
      player.setVelocityX(0);
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
      if (child.x < -50)
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
      if (child.x < -50)
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
      if (child.x < -50)
          child.destroy();
    })

  }
  hitObject() {
    player.setTint(0xff0000);
  //  gameOver = true;
    this.scene.start("startMenu");
  }

  moveBackground() {
    //spaceBackground.y += -.05;
    spaceBackground.y += -.5;
    player.angle += 5;
  }
    //function to change the level !
  switchLevel() {
    level += 1;

    switch(level) {
      case 1:
        timedMeteor = this.time.addEvent({ delay: 2000, callback: this.placeMeteor, callbackScope: this, loop: true });
        timedSatellite = this.time.addEvent({ delay: 5000, callback: this.placeSatellite, callbackScope: this, loop: true });
        timedStone = this.time.addEvent({ delay: 1000, callback: this.placeStone, callbackScope: this, loop: true });
        console.log("Level 1 !");
        break;
      case 2:
        timedMeteor.paused = true;
        timedSatellite.paused = true;
        timedStone.paused = true;
        console.log("Level 2 !");
        break;
    }
  }
    //different case levels = new games!

}
