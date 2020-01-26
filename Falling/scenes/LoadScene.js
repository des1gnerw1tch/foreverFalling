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
    this.load.image('meteor', 'assets/meteor.gif');
    this.load.image('menu', 'assets/menu.jpg');
    this.load.image('title', 'assets/title.png');
    this.load.image('playButton', 'assets/playButton.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

      //simulate large load
    for (var i = 0; i < 1000; i++)  {
      this.load.audio('spaceTheme', 'assets/spaceMusic.mp3');
    }
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
