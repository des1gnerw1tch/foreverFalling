//import { CST } from "../CST";
class MenuScene extends Phaser.Scene{
  constructor(){

      super("startMenu");
  }
    //testing passing data down from scene
  init(data) {
    console.log(data);
    console.log("I got it! :)");
  }

  create() {
    //create menu background image
    let menu;
    menu = this.add.image(400, 300, 'menu');
    menu.setScale(1);
    this.add.image(400, 200, 'title').setScale(.6);
    //play button
    let playButton = this.add.image(400, 400, 'playButton').setScale(.6);
    playButton.setInteractive();

    playButton.on("pointerover", ()=>  {
      playButton.setScale(.7);
    })

    playButton.on("pointerout", ()=>  {
      playButton.setScale(.6);
    })

    playButton.on("pointerup", ()=>  {
    //  music.pause();
      this.scene.start("enterIntro");
    })

      //menu music
      music = this.sound.add('spaceTheme');
    //  music.play();
      music.setLoop(true);
        //particles test

      //emitter.setBlendMode(Phaser.BlendModes.ADD);

  }

}
