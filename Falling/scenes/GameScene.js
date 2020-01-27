/* TO DO:
Fix game over mechanic
REAL GAME MECHANICS, 
*/
var player;
var platforms;
var timedBackground;
var timedSpawn;
var meteors;
var keys;
var spaceBackground;
var music;
var gameOver = false;
var children; // dont know why this has to be here

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
      //meteors
    meteors = this.physics.add.group();
      //player
    player = this.physics.add.sprite(250, 300, 'dude');
      //keyboard input
    keys = this.input.keyboard.addKeys('W,S,A,D,');
      //spawns
    timedSpawn = this.time.addEvent({ delay: 2500, callback: this.placeMeteor, callbackScope: this, loop: true });
      //colliders
    this.physics.add.collider(player, meteors, this.hitObject, null, this);
      //music
    /*  music = this.sound.add('spaceTheme');
      music.play();*/


  }



  update () {
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
    nextMeteor = meteors.create(Phaser.Math.FloatBetween(0, 800), 650, 'meteor');
    nextMeteor.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
    nextMeteor.setVelocityY(-100);
    //used to destroy old meteors.. ? need to add other bounds other than -x
    meteors.children.iterate(function (child) {

      if (child == undefined)
          return;
      if (child.x < -50)
          child.destroy();
    })

  }
  hitObject() {
    player.setTint(0xff0000);
  //  gameOver = true;
    music.pause();
    this.scene.start("startMenu");
  }

  moveBackground() {
    spaceBackground.y += -.05;
  }

}
