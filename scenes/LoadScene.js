//import { CST } from "../CST";
class LoadScene extends Phaser.Scene{
  constructor(){
  /*  super ({
      key: CST.SCENES.LOAD
    })*/
    super("loadGame");
  }

  preload() {

    this.load.image('space', 'assets/space.png');
      //loading hitobjects
    this.load.image('meteor', 'assets/meteor.gif');
    this.load.image('satellite', 'assets/satellite.png');
    this.load.image('stone', 'assets/stone.png');
    this.load.image('menu', 'assets/menu.jpg');
    this.load.image('title', 'assets/title.png');
    this.load.image('playButton', 'assets/playButton.png');
    //background objects
    this.load.image('star', 'assets/star.png');
    this.load.image('smallMars', 'assets/smallMars.png');
    //blocks
    this.load.image('block1', 'assets/block1.png');
    this.load.image('block2', 'assets/block2.png');
    this.load.image('block3', 'assets/block3.png');
    this.load.image('block4', 'assets/block4.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('astronaut', 'assets/astronaut.png', { frameWidth: 128.25, frameHeight: 180 });
        //theme music
      this.load.audio('spaceTheme', 'assets/menuMusic.mp3');
      //sound effects
    this.load.audio('yeet', 'assets/maxyeet.m4a');
    this.load.audio('datBei', 'assets/maxdatbei.m4a');
    //particles
    this.load.image('starParticle', 'assets/blue.png');
    this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
      //loading text
    this.add.text(20, 20, "Loading Game...");

      //loading bar
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff // white
      }
    })

    this.load.on("progress", (percent)=>{
    loadingBar.fillRect(0, 400, 800 * percent, 50);
    console.log(percent);
  })

}

  create () {
      //start menu screen
    this.scene.start("startMenu", "whats up");
  }
}
