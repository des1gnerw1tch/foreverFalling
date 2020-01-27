/* TO DO:
Fix game over mechanic
REAL GAME MECHANICS,
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
      //player
    player = this.physics.add.sprite(250, 300, 'dude');
    player.anims.play('turn', true);
      //keyboard input
    keys = this.input.keyboard.addKeys('W,S,A,D,');
      //levels
    level = 0;
    text = this.add.text(32, 32);
    this.switchLevel();
    timedSwitch = this.time.addEvent({ delay: 20000, callback: this.switchLevel, callbackScope: this, loop: true });
      //spawns

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

  }

  placeMeteor()  {
    //Meteor movement
    var nextMeteor;
    nextMeteor = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'meteor');
    nextMeteor.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
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
    nextSatellite.setScale(.3);
    nextSatellite.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
    nextSatellite.setVelocityY(-100);
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
    nextStone.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
    nextStone.setVelocityY(-100);
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
    spaceBackground.y += -.05;
    player.angle += 1;
  }
    //function to change the level !
  switchLevel() {
    level += 1;

    switch(level) {
      case 1:
        timedMeteor = this.time.addEvent({ delay: 2500, callback: this.placeMeteor, callbackScope: this, loop: true });
        timedSatellite = this.time.addEvent({ delay: 2500, callback: this.placeSatellite, callbackScope: this, loop: true });
        timedStone = this.time.addEvent({ delay: 2500, callback: this.placeStone, callbackScope: this, loop: true });
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
